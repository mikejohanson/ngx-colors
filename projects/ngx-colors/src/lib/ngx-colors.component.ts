import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
  OutputRefSubscription
} from '@angular/core'
import { NgxColorsTriggerDirective } from './directives/ngx-colors-trigger.directive'

@Component({
  selector: 'ngx-colors',
  templateUrl: './ngx-colors.component.html',
  styleUrls: ['./ngx-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class NgxColorsComponent implements OnInit, OnDestroy {
  private cdRef = inject(ChangeDetectorRef)
  private triggerDirective = inject(NgxColorsTriggerDirective, { host: true })

  private triggerDirectiveColorChangeSubscription: OutputRefSubscription | null = null

  ngOnInit(): void {
    this.triggerDirectiveColorChangeSubscription = this.triggerDirective.change.subscribe((color) => {
      this.color = color
      this.cdRef.markForCheck()
    })
  }

  ngOnDestroy(): void {
    if (this.triggerDirectiveColorChangeSubscription) {
      this.triggerDirectiveColorChangeSubscription.unsubscribe()
    }
  }

  //IO color
  color: string = this.triggerDirective.color
}
