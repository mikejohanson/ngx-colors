import { Component, provideZonelessChangeDetection, viewChild } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NgxColorsComponent } from './ngx-colors.component'
import { NgxColorsModule } from './ngx-colors.module'

// NgxColorsComponent injects NgxColorsTriggerDirective with `{ host: true }`, so it
// must always be used together with the `ngx-colors-trigger` directive on the same
// element. Test it through a host component that reflects real usage.
@Component({
  template: `<ngx-colors ngx-colors-trigger></ngx-colors>`,
  imports: [NgxColorsModule]
})
class TestHostComponent {
  readonly component = viewChild.required(NgxColorsComponent)
}

describe('NgxColorsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(fixture.componentInstance.component()).toBeTruthy()
  })
})
