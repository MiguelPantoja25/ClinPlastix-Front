import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ModalGenericoComponent, DataModal } from '../../@components/modal-generico/modal-generico.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isMenuOpen = true;
  isMobile = false;
  pageTitle: string = 'ClinPlatix';
  usuario: any = { nombre: 'Juan', rol: 'Administrador'};

  constructor(private router: Router, private ar: ActivatedRoute, private title: Title, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.checkScreenSize();

    //Recuperar usuario
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }

    this.router.events.pipe(
      filter(ev => ev instanceof NavigationEnd)
    ).subscribe(() => {
      // ir al hijo más profundo (la ruta activa real)
      let r = this.ar;
      while (r.firstChild) r = r.firstChild;

      const t = r.snapshot.data['titulo'] as string | undefined;
      this.pageTitle = t ?? 'ClinPlatix';
      this.title.setTitle(`${this.pageTitle} | ClinPlatix`); // título del documento (opcional)
    });
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

  } 
 
  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  onMenuItemClick() {
  if (this.isMobile) {
    this.isMenuOpen = false;
  }
}

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.isMenuOpen = false;
          } else {
        this.isMobile = false;
      this.isMenuOpen = true;
    }
  }
  
logout() {
    const datosConfirmacion: DataModal = {
      clase: '',
      titulo: 'Aviso',
      texto: '¿Está seguro que desea cerrar sesión?',
      textoBtnExito: 'Aceptar',
      textoBtnCancelar: 'Cancelar'
    };

    const opciones: MatDialogConfig = {
      disableClose: true,
      hasBackdrop: true,
      data: datosConfirmacion
    };

    this.dialog.open(ModalGenericoComponent, opciones)
      .afterClosed()
      .subscribe(confirmado => {
        if (confirmado) {

          localStorage.clear();
          this.router.navigate(['/login']);
          Swal.fire({
            icon: 'success',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente',
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }

}
