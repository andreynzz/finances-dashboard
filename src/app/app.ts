import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';
import Lenis from 'lenis';
import { TransactionService, Transaction } from './services/transaction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('contentWrapper') contentWrapper!: any;

  transactions: Transaction[] = [];

  isLoading: boolean = true;

  constructor(
    private translate: TranslateService,
    private TransactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.TransactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;

        this.cdr.detectChanges();

        setTimeout(() => {
          gsap.from('.list-item', {
            x: -20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
          });
        }, 50)
      },
      error: (err) => {
        console.error("Erro ao carregar transações: ", err)
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log("Transações carregadas com sucesso!")
      }
    })
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
  }
  protected readonly title = signal('finances-dashboard');
}
