import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideZonelessChangeDetection } from '@angular/core'

import { DocumentViewerComponent } from './document-viewer.component'

describe('DocumentViewerComponent', () => {
  let component: DocumentViewerComponent
  let fixture: ComponentFixture<DocumentViewerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentViewerComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
