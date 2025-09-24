import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isMenuOpen = true;
  isMobile = false;
  pageTitle: string = 'ClinPlatix';

  constructor(private router: Router, private ar: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.checkScreenSize();

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
}
