import {
  Injectable,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ComponentRef,
  EnvironmentInjector,
  createComponent,
  inject
} from '@angular/core'

import { PanelComponent } from '../components/panel/panel.component'
import { OVERLAY_STYLES } from './overlay-styles'

@Injectable()
export class PanelFactoryService {
  private applicationRef = inject(ApplicationRef)
  private injector = inject(Injector)
  private environmentInjector = inject(EnvironmentInjector)

  componentRef!: ComponentRef<PanelComponent>
  overlay!: HTMLDivElement

  createPanel(attachTo: string | undefined, overlayClassName: string | undefined): ComponentRef<PanelComponent> {
    if (this.componentRef != undefined) {
      this.removePanel()
    }

    this.componentRef = createComponent(PanelComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.injector
    })

    this.applicationRef.attachView(this.componentRef.hostView)
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement

    this.overlay = document.createElement('div')
    this.overlay.id = 'ngx-colors-overlay'
    this.overlay.classList.add('ngx-colors-overlay')
    if (overlayClassName) {
      this.overlay.classList.add(overlayClassName)
    }
    Object.keys(OVERLAY_STYLES).forEach((attr: string) => {
      ;(this.overlay.style as any)[attr] = (OVERLAY_STYLES as Record<string, any>)[attr]
    })
    if (attachTo) {
      document.getElementById(attachTo)?.appendChild(this.overlay)
    } else {
      document.body.appendChild(this.overlay)
    }
    this.overlay.appendChild(domElem)

    return this.componentRef
  }

  removePanel() {
    this.applicationRef.detachView(this.componentRef.hostView)
    this.componentRef.destroy()
    this.overlay.remove()
  }
}
