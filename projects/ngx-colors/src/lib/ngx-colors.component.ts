import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { NgxColorsTriggerDirective } from './directives/ngx-colors-trigger.directive'

@Component({
  selector: 'ngx-colors',
  templateUrl: './ngx-colors.component.html',
  styleUrls: ['./ngx-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxColorsComponent {
  private triggerDirective = inject(NgxColorsTriggerDirective, { host: true })

  // The preview swatch derives directly from the trigger directive's color signal, so it
  // reacts to every `writeValue` (and panel selection) without lifecycle hooks, manual
  // change detection, or any dependency on subscription-vs-emit timing.
  protected readonly color = this.triggerDirective.color
}
