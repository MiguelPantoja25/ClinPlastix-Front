import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalBusquedaPacienteComponent } from './modal-busqueda-paciente.component';


describe('ModalBusquedaPacienteComponent', () => {
  let component: ModalBusquedaPacienteComponent;
  let fixture: ComponentFixture<ModalBusquedaPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalBusquedaPacienteComponent],
    })
   .compileComponents();
    fixture = TestBed.createComponent(ModalBusquedaPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

