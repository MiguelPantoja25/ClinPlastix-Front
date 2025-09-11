import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirugiasFormComponent } from './cirugias-form.component';

describe('CirugiasFormComponent', () => {
  let component: CirugiasFormComponent;
  let fixture: ComponentFixture<CirugiasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CirugiasFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CirugiasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
