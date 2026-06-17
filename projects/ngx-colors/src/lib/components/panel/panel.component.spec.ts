import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { PanelComponent } from './panel.component'
import { ConverterService } from '../../services/converter.service'

describe('PanelComponent', () => {
  let component: PanelComponent
  let fixture: ComponentFixture<PanelComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PanelComponent],
      providers: [ConverterService]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
