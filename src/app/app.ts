import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import Lenis from 'lenis';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: any;

  // Mock Data
  transactions = [
    { id: 1, label: 'Mensalidade Contabilizei', value: 195.00, type: 'expense', date: '10/02/2026' },
    { id: 2, label: 'Cliente: Tech Solutions', value: 4500.00, type: 'income', date: '11/02/2026' },
    { id: 3, label: 'Servidor AWS', value: 850.00, type: 'expense', date: '12/02/2026' },
    { id: 4, label: 'Consultoria Avulsa', value: 1200.00, type: 'income', date: '12/02/2026' },
    { id: 5, label: 'Equipamentos', value: 3200.00, type: 'expense', date: '13/02/2026' },
    { id: 6, label: 'Reembolso', value: 150.00, type: 'income', date: '14/02/2026' },
  ];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  ngAfterViewInit(): void {
    const tl = gsap.timeline();

    tl.from('.header-animate', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('card-animate', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, '-=0.4')
    .from('.list-item', {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1
    }, '-=0.2');
  }
  protected readonly title = signal('finances-dashboard');
}
