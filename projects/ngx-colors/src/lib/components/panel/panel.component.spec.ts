import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideZonelessChangeDetection } from '@angular/core'

import { PanelComponent } from './panel.component'
import { ConverterService } from '../../services/converter.service'

describe('PanelComponent', () => {
  let component: PanelComponent
  let fixture: ComponentFixture<PanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent],
      providers: [ConverterService, provideZonelessChangeDetection()]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
