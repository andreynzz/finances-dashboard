import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionService, Transaction } from './services/transaction';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { HeaderComponent } from './components/header/header';
import gsap from 'gsap';
import Lenis from 'lenis';
import { NewTransactionModalComponent } from './components/new-transaction-modal/new-transaction-modal';
import { FinancialChartComponent } from './components/financial-chart/financial-chart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SummaryCardsComponent,
    TransactionListComponent,
    HeaderComponent,
    NewTransactionModalComponent,
    FinancialChartComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  @ViewChild('contentWrapper') contentWrapper!: any;

  allTransactions: Transaction[] = [];

  transactions: Transaction[] = [];

  isLoading: boolean = true;

  currentFilter: 'all' | 'income' | 'expense' = 'all';

  constructor(
    private TransactionService: TransactionService,
    private cdr: ChangeDetectorRef
  ) {}

  setFilter(filterType: 'all' | 'income' | 'expense') {
    this.currentFilter = filterType;

    if (filterType === 'all') {
      this.transactions = [...this.allTransactions];
    } else {
      this.transactions = this.allTransactions.filter(item => item.type === filterType);
    }

    this.cdr.detectChanges();

    gsap.fromTo('.transaction-item',
      { x: -10, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 }
    );
  }

  isModalOpen: boolean = false;

  // Função para abrir/fechar o modal
  toggleModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleAddTransaction(newTransaction: Transaction) {
    this.allTransactions = [newTransaction, ...this.allTransactions];
    this.setFilter(this.currentFilter);
    this.toggleModal(false);
  }

  // Função para remover a transação
  handleDeleteTransaction(id: number) {
    this.allTransactions = this.allTransactions.filter(t => t.id !== id);

    // Atualiza a visualização (mantendo o filtro atual)
    this.setFilter(this.currentFilter);
  }

  ngOnInit(): void {
    this.TransactionService.getTransactions().subscribe({
      next: (data) => {
        this.allTransactions = data;
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
  protected readonly title = signal('finances-dashboard');
}
