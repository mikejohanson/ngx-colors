import { animate, style, transition, trigger } from '@angular/animations'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { NgxColorsComponent } from '../../../../../ngx-colors/src/lib/ngx-colors.component'
import { NgxColorsTriggerDirective } from '../../../../../ngx-colors/src/lib/directives/ngx-colors-trigger.directive'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-detect-change-example',
  templateUrl: './detect-change-example.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ background: 'red' }),
        animate('1s ease-out', style({}))
      ])
    ])
  ],
  styleUrls: ['./detect-change-example.style.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NgxColorsComponent,
    NgxColorsTriggerDirective,
    ReactiveFormsModule,
    FormsModule,
    MatButton
  ]
})
export class DetectChangeExampleComponent {
  color = '#0070f3'
  colorIndex = 0
  colors = [
    '#0070f3',
    '#00796B',
    '#D81B60',
    '#7986CB'
  ]

  logs: any[][] = []

  public rotateColor(): void {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length
    this.color = this.colors[this.colorIndex]
  }

  public logEvent(event: any, trigger: any) {
    this.logs.unshift([
      this.logs.length + 1,
      trigger,
      event
    ])
  }
}
