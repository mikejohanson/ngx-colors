import { Component, provideZonelessChangeDetection, signal } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { form, FormField } from '@angular/forms/signals'
import { By } from '@angular/platform-browser'

import { NgxColorsModule } from './ngx-colors.module'

// Side-by-side comparison of how reactive forms vs signal forms feed the initial value.
// This documents WHY the initial-value bug only appeared after the reactive -> signal
// migration: the two forms systems call `writeValue` at different points in the lifecycle.
// The preview must reflect the initial value in both cases.

@Component({
  template: `<form [formGroup]="fg">
    <ngx-colors ngx-colors-trigger formControlName="primaryColor"></ngx-colors>
  </form>`,
  imports: [NgxColorsModule, ReactiveFormsModule]
})
class ReactiveHostComponent {
  readonly fg = new FormGroup({ primaryColor: new FormControl('#7cbe4a') })
}

@Component({
  template: `<ngx-colors ngx-colors-trigger [formField]="f.primaryColor"></ngx-colors>`,
  imports: [NgxColorsModule, FormField]
})
class SignalHostComponent {
  readonly model = signal({ primaryColor: '#7cbe4a' })
  readonly f = form(this.model)
}

// The preview swatch (`.circle`) loses its `colornull` class and paints its background
// once a non-empty color is present — assert through the real DOM rather than internals.
function previewReflectsColor(fixture: ComponentFixture<unknown>): boolean {
  const circle = fixture.debugElement.query(By.css('.circle'))
  return !circle.nativeElement.classList.contains('colornull') && !!circle.nativeElement.style.background
}

describe('NgxColorsComponent initial-value timing', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    }).compileComponents()
  })

  it('reactive forms: preview shows initial value', () => {
    const fixture = TestBed.createComponent(ReactiveHostComponent)
    fixture.detectChanges()
    expect(previewReflectsColor(fixture)).toBe(true)
  })

  it('signal forms: preview shows initial value', () => {
    const fixture = TestBed.createComponent(SignalHostComponent)
    fixture.detectChanges()
    expect(previewReflectsColor(fixture)).toBe(true)
  })
})
