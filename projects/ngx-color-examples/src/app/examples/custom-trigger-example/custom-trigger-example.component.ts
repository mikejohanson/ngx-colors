import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "app-custom-trigger-example",
    templateUrl: "./custom-trigger-example.component.html",
    styleUrls: ["./custom-trigger-example.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CustomTriggerExampleComponent {
  constructor() {}

  input1: string = "#00897B";
}
