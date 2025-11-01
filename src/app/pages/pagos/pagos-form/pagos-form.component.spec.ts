import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosFromComponent } from './pagos-from.component';

describe('PagosFromComponent', () => {
  let component: PagosFromComponent;
  let fixture: ComponentFixture<PagosFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagosFromComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagosFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
