import { Component, OnInit, ChangeDetectionStrategy, inject, input } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { MatTabGroup, MatTab } from '@angular/material/tabs'
import { Highlight } from 'ngx-highlightjs'

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatTabGroup,
    MatTab,
    Highlight
  ]
})
export class DocumentViewerComponent implements OnInit {
  private http = inject(HttpClient)

  readonly documents = input<any>(undefined)

  ngOnInit(): void {
    for (const document of this.documents()) {
      this.http.get(document.file, { responseType: 'text' }).subscribe((data) => {
        document['content'] = data
      })
    }
  }
}
