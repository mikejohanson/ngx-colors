import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectorRef,
  OnChanges,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
  viewChild
} from '@angular/core'

import { Hsva } from '../../clases/formats'
import { SliderDimension, SliderPosition } from '../../clases/slider'

import { ConverterService } from '../../services/converter.service'
import { SliderDirective } from '../../directives/slider.directive'

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SliderDirective]
})
export class ColorPickerComponent implements OnInit, AfterViewInit, OnChanges {
  private service = inject(ConverterService)
  private cdr = inject(ChangeDetectorRef)

  //IO color
  readonly color = input<Hsva>(new Hsva(0, 1, 1, 1))
  readonly controls = input<'default' | 'only-alpha' | 'no-alpha'>('default')
  readonly sliderChange = output<Hsva>()
  readonly onAlphaChange = output<any>()
  //Event triggered when any slider change
  // @Output() colorSelectedChange:EventEmitter<Hsva> = new EventEmitter<Hsva>(false);

  private hsva: Hsva = new Hsva(0, 1, 1, 1)
  private outputColor!: Hsva
  public selectedColor = '#000000'
  private fallbackColor = '#000000'

  // private sHue: number;
  private sliderDimMax!: SliderDimension
  public slider!: SliderPosition

  public hueSliderColor!: string
  public alphaSliderColor!: string

  readonly hueSlider = viewChild.required<ElementRef>('hueSlider')
  readonly alphaSlider = viewChild.required<ElementRef>('alphaSlider')

  ngOnInit(): void {
    this.slider = new SliderPosition(0, 0, 0, 0)
    this.update()
  }

  ngOnChanges(changes: any): void {
    if (changes.color && this.color()) {
      this.update()
    }
  }

  ngAfterViewInit(): void {
    const hueWidth = this.hueSlider()?.nativeElement.offsetWidth || 140
    const alphaWidth = this.alphaSlider()?.nativeElement.offsetWidth || 140
    this.sliderDimMax = new SliderDimension(hueWidth, 220, 130, alphaWidth)
    this.update()
  }

  public onSliderChange(type: string, event: any) {
    switch (type) {
      case 'saturation-lightness':
        this.hsva.onColorChange(event)
        break
      case 'hue':
        this.hsva.onHueChange(event)
        break
      case 'alpha':
        this.hsva.onAlphaChange(event)
        this.onAlphaChange.emit(event)
        break
      case 'value':
        this.hsva.onValueChange(event)
        break
    }
    // this.sHue = this.hsva.h;
    this.update()
    this.setColor(this.outputColor)
  }

  setColor(color: any) {
    this.sliderChange.emit(color)
  }

  public getBackgroundColor(color: any): string {
    return 'linear-gradient(90deg, rgba(36,0,0,0) 0%, ' + color + ' 100%)'
  }

  private update(): void {
    this.hsva = this.color()
    if (this.sliderDimMax) {
      const rgba = this.service.hsvaToRgba(this.hsva).denormalize()
      const hue = this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)).denormalize()

      this.hueSliderColor = 'rgb(' + hue.r + ',' + hue.g + ',' + hue.b + ')'
      this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')'

      this.outputColor = this.hsva
      this.selectedColor = this.service.hsvaToRgba(this.hsva).toString()

      this.slider = new SliderPosition(
        // (this.sHue || this.hsva.h) * this.sliderDimMax.h - 8,
        this.hsva.h * this.sliderDimMax.h - 5,
        this.hsva.s * this.sliderDimMax.s - 8,
        (1 - this.hsva.v) * this.sliderDimMax.v - 8,
        this.hsva.a * this.sliderDimMax.a - 5
      )
      this.cdr.detectChanges()
    }
  }
}
