import { Component, ChangeDetectionStrategy } from "@angular/core";
import { examples } from "../../const/examples";

@Component({
    selector: "app-examples-example",
    templateUrl: "./examples.component.html",
    styleUrls: ["./examples.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExamplesComponent {
  constructor() {}
  examples = examples;
}
