import { Component, ChangeDetectionStrategy } from "@angular/core";
import { api } from "../../const/api";
import { snippets } from "../../const/snippets";

@Component({
    selector: "app-api-example",
    templateUrl: "./api.component.html",
    styleUrls: ["./api.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ApiComponent {
  constructor() {}
  api = api;
  snippets = snippets;
}
