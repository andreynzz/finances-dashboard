import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../services/transaction';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() isLoading: boolean = true;

  @Output() deleteTransaction = new EventEmitter<number>();

  onDelete(id: number) {
    if(confirm('Tem a certeza que deseja excluir esta transação?')) {
      this.deleteTransaction.emit(id);
    }
  }
}
