import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'

@Component({
  selector: 'app-changelog-example',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ChangelogComponent implements OnInit {
  private http = inject(HttpClient)

  versions!: any[]
  ngOnInit() {
    this.http.get<any[]>('/assets/changelog.json').subscribe((data: any[]) => {
      this.versions = Array.from(data)
      this.versions = this.versions.sort((a, b) => {
        let diff
        const segmentsA: string[] = a.version.split('.')
        const segmentsB: string[] = b.version.split('.')
        for (let index = 0; index < segmentsA.length; index++) {
          if (segmentsA[index].includes('x')) {
            return 1
          }
          diff = Number.parseInt(segmentsA[index]) - Number.parseInt(segmentsB[index])
          if (diff != 0) {
            return -diff
          }
        }
        return 0
      })
    })
  }
}
