import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-change-label-example',
    templateUrl: './change-accept-label.component.html',
    styleUrls: ['./change-accept-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ChangeAcceptLabelExampleComponent {

  constructor() { }
  color:string = '#EC407A';

}
