import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Transaction } from '../../services/transaction';

@Component({
  selector: 'app-summary-cards',
  imports: [CommonModule, TranslateModule],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.scss',
})
export class SummaryCardsComponent implements OnChanges {
  @Input() transactions: Transaction[] = [];

  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.totalIncome = this.transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, val) => acc + val.value, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.value, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }
}
