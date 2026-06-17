import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  HostListener,
  HostBinding,
  ChangeDetectionStrategy,
  inject,
  AfterViewInit,
  viewChild
} from '@angular/core'
import { ColorFormats } from '../../enums/formats'
import { ConverterService } from '../../services/converter.service'
import { defaultColors } from '../../helpers/default-colors'
import { formats } from '../../helpers/formats'
import { NgxColorsTriggerDirective } from '../../directives/ngx-colors-trigger.directive'
import { Hsva } from '../../clases/formats'
import { NgxColorsColor } from '../../clases/color'

import { ColorPickerComponent } from '../color-picker/color-picker.component'

@Component({
  selector: 'ngx-colors-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ColorPickerComponent]
})
export class PanelComponent implements OnInit, AfterViewInit {
  service = inject(ConverterService)
  private cdr = inject(ChangeDetectorRef)

  @HostListener('document:mousedown', ['$event'])
  click(event: any) {
    if (this.isOutside(event)) {
      this.emitClose('cancel')
    }
  }

  @HostListener('document:scroll')
  onScroll() {
    this.onScreenMovement()
  }
  @HostListener('window:resize')
  onResize() {
    this.onScreenMovement()
  }

  @HostBinding('style.top.px') public top!: number
  @HostBinding('style.left.px') public left!: number
  readonly panelRef = viewChild.required<ElementRef>('dialog')

  public color = '#000000'
  public previewColor = '#000000'
  public hsva = new Hsva(0, 1, 1, 1)

  public colorsAnimationEffect = 'slide-in'

  public palette = defaultColors
  public variants = []

  public userFormats: string[] = []
  public colorFormats = formats
  public format: ColorFormats = ColorFormats.HEX
  public formatMap = {
    hex: ColorFormats.HEX,
    rgba: ColorFormats.RGBA,
    hsla: ColorFormats.HSLA,
    cmyk: ColorFormats.CMYK
  }

  public canChangeFormat = true

  public menu = 1

  public hideColorPicker = false
  public hideTextInput = false
  public acceptLabel!: string
  public cancelLabel!: string
  public colorPickerControls: 'default' | 'only-alpha' | 'no-alpha' = 'default'
  private triggerInstance!: NgxColorsTriggerDirective
  private TriggerBBox: any
  public isSelectedColorInPalette!: boolean
  public indexSeleccionado: any
  public positionString: any
  public temporalColor: any
  public backupColor: any
  public placeholder = '#FFFFFF'

  public ngOnInit() {
    this.setPosition()
    this.hsva = this.service.stringToHsva(this.color)!
    this.indexSeleccionado = this.findIndexSelectedColor(this.palette)
  }
  public ngAfterViewInit() {
    this.setPositionY()
  }

  private onScreenMovement() {
    this.setPosition()
    this.setPositionY()
    const panelRef = this.panelRef()
    if (!panelRef.nativeElement.style.transition) {
      panelRef.nativeElement.style.transition = 'transform 0.5s ease-out'
    }
  }

  private findIndexSelectedColor(colors: any): number {
    let resultIndex: any = undefined
    if (this.color) {
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i]
        if (typeof color == 'string') {
          if (
            this.service.stringToFormat(this.color, ColorFormats.HEX) ==
            this.service.stringToFormat(color, ColorFormats.HEX)
          ) {
            resultIndex = i
          }
        } else if (color === undefined) {
          this.color = undefined as any
        } else {
          if (this.findIndexSelectedColor(color.variants) != undefined) {
            resultIndex = i
          }
        }
      }
    }
    return resultIndex
  }

  public iniciate(
    triggerInstance: NgxColorsTriggerDirective,
    triggerElementRef: any,
    color: any,
    palette: any,
    animation: any,
    format: string | undefined,
    hideTextInput: boolean,
    hideColorPicker: boolean,
    acceptLabel: string,
    cancelLabel: string,
    colorPickerControls: 'default' | 'only-alpha' | 'no-alpha',
    position: 'top' | 'bottom',
    userFormats: string[] = []
  ) {
    this.colorPickerControls = colorPickerControls
    this.triggerInstance = triggerInstance
    this.TriggerBBox = triggerElementRef
    this.color = color
    this.hideColorPicker = hideColorPicker
    this.hideTextInput = hideTextInput
    this.acceptLabel = acceptLabel
    this.cancelLabel = cancelLabel

    if (userFormats.length) {
      const allFormatsValid = userFormats.every((frt) => formats.includes(frt))
      if (allFormatsValid) {
        this.colorFormats = userFormats
      }
    }

    if (format) {
      if (this.colorFormats.includes(format)) {
        this.format = this.colorFormats.indexOf(format.toLowerCase())
        this.canChangeFormat = false
        if (this.service.getFormatByString(this.color) != format.toLowerCase()) {
          this.setColor(this.service.stringToHsva(this.color)!)
        }
      } else {
        console.error('Format provided is invalid, using HEX')
        this.format = ColorFormats.HEX
      }
    } else {
      this.format = this.colorFormats.indexOf(this.service.getFormatByString(this.color))
      if (this.format < 0) {
        this.format = 0
      }
    }

    this.previewColor = this.color
    this.palette = palette ?? defaultColors
    this.colorsAnimationEffect = animation
    if (position == 'top') {
      const TriggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect()
      this.positionString = 'transform: translateY(calc( -100% - ' + TriggerBBox.height + 'px ))'
    }
  }

  public setPosition(): void {
    if (this.TriggerBBox) {
      const panelWidth = 250
      const viewportOffset = this.TriggerBBox.nativeElement.getBoundingClientRect()
      this.top = viewportOffset.top + viewportOffset.height
      if (viewportOffset.left + panelWidth > window.innerWidth) {
        this.left =
          viewportOffset.right < panelWidth ? window.innerWidth / 2 - panelWidth / 2 : viewportOffset.right - panelWidth
      } else {
        this.left = viewportOffset.left
      }
    }
  }

  private setPositionY(): void {
    const panelRef = this.panelRef()
    if (!this.TriggerBBox || !panelRef) {
      return
    }
    const triggerBBox = this.TriggerBBox.nativeElement.getBoundingClientRect()
    const panelBBox = panelRef.nativeElement.getBoundingClientRect()
    const panelHeight = panelBBox.height
    // Check for space below the trigger
    if (triggerBBox.bottom + panelHeight > window.innerHeight) {
      // there is no space, move panel over the trigger
      this.positionString =
        triggerBBox.top < panelBBox.height
          ? 'transform: translateY(-' + triggerBBox.bottom + 'px );'
          : 'transform: translateY(calc( -100% - ' + triggerBBox.height + 'px ));'
    } else {
      this.positionString = ''
    }
    this.cdr.detectChanges()
  }

  public hasVariant(color: any): boolean {
    if (!this.previewColor) {
      return false
    }
    return (
      typeof color != 'string' && color.variants.some((v: any) => v.toUpperCase() == this.previewColor.toUpperCase())
    )
  }

  public isSelected(color: any) {
    if (!this.previewColor) {
      return false
    }
    return typeof color == 'string' && color.toUpperCase() == this.previewColor.toUpperCase()
  }

  public getBackgroundColor(color: any): string {
    if (typeof color == 'string') {
      return color
    } else {
      return color?.preview
    }
  }

  public onAlphaChange(event: any) {
    this.palette = this.ChangeAlphaOnPalette(event, this.palette)
  }

  private ChangeAlphaOnPalette(alpha: any, colors: (string | NgxColorsColor)[]): any[] {
    const result = []
    for (const color of colors) {
      if (typeof color == 'string') {
        const newColor = this.service.stringToHsva(color)!
        newColor.onAlphaChange(alpha)
        result.push(this.service.toFormat(newColor, this.format))
      } else {
        const newColor = new NgxColorsColor()
        const newColorPreview = this.service.stringToHsva(color.preview)!
        newColorPreview.onAlphaChange(alpha)
        newColor.preview = this.service.toFormat(newColorPreview, this.format)
        newColor.variants = this.ChangeAlphaOnPalette(alpha, color.variants)
        result.push(newColor)
      }
    }
    return result
  }

  /**
   * Change color from default colors
   * @param string color
   */
  public changeColor(color: string): void {
    this.setColor(this.service.stringToHsva(color)!)
    // this.triggerInstance.onChange();
    this.emitClose('accept')
  }

  public onChangeColorPicker(event: Hsva) {
    this.temporalColor = event
    this.color = this.service.toFormat(event, this.format)
    // this.setColor(event);
    this.triggerInstance.sliderChange(this.service.toFormat(event, this.format))
  }

  public changeColorManual(color: string): void {
    this.previewColor = color
    this.color = color
    this.hsva = this.service.stringToHsva(color)!
    this.setPreviewColor(this.hsva)
    this.temporalColor = this.hsva
    this.triggerInstance.setColor(this.color, this.previewColor)
    // this.triggerInstance.onChange();
  }

  setColor(value: Hsva, colorIndex = -1) {
    this.hsva = value

    const formatName = this.colorFormats[this.format]
    let index = colorIndex
    if (index < 0) {
      index = (this.formatMap as Record<string, ColorFormats>)[formatName]
    }

    this.color = this.service.toFormat(value, index as ColorFormats)
    this.setPreviewColor(value)
    this.triggerInstance.setColor(this.color, this.previewColor)
  }

  setPreviewColor(value: Hsva) {
    this.previewColor = value ? this.service.hsvaToRgba(value).toString() : (undefined as any)
  }
  onChange() {
    // this.triggerInstance.onChange();
  }

  public onColorClick(color: any) {
    if (typeof color == 'string' || color === undefined) {
      this.changeColor(color)
    } else {
      this.variants = color.variants
      this.menu = 2
    }
  }

  public addColor() {
    this.menu = 3
    this.backupColor = this.color
    // this.color = "#FF0000";
    this.temporalColor = this.service.stringToHsva(this.color)
  }

  public nextFormat() {
    if (this.canChangeFormat) {
      this.format = (this.format + 1) % this.colorFormats.length

      const formatName = this.colorFormats[this.format]
      const index = (this.formatMap as Record<string, ColorFormats>)[formatName]

      this.setColor(this.hsva, index)
      this.placeholder = this.service.toFormat(new Hsva(0, 0, 1, 1), index)
    }
  }

  public emitClose(status: 'cancel' | 'accept') {
    if (this.menu == 3 && status == 'accept') {
      this.setColor(this.temporalColor)
    }
    this.triggerInstance.closePanel()
  }

  public onClickBack() {
    if (this.menu == 3) {
      this.color = this.backupColor
      this.hsva = this.service.stringToHsva(this.color)!
    }
    this.indexSeleccionado = this.findIndexSelectedColor(this.palette)
    this.menu = 1
  }

  isOutside(event: any) {
    return event.target.classList.contains('ngx-colors-overlay')
  }
}
