import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CirugiasListComponent } from './cirugias-list.component';

describe('CirugiasListComponent', () => {
  let component: CirugiasListComponent;
  let fixture: ComponentFixture<CirugiasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CirugiasListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CirugiasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
