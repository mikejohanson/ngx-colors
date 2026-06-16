import { Component, ChangeDetectionStrategy } from '@angular/core'
import { api } from '../../const/api'
import { snippets } from '../../const/snippets'
import { Highlight } from 'ngx-highlightjs'

@Component({
  selector: 'app-api-example',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [Highlight]
})
export class ApiComponent {
  api = api
  snippets = snippets
}
