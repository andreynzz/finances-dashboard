import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Transaction {
  id: number;
  label: string;
  value: number;
  type: 'income' | 'expense';
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private mockData: Transaction[] = [
    { id: 1, label: 'Mensalidade Contabilizei', value: 195.00, type: 'expense', date: '10/02/2026' },
    { id: 2, label: 'Cliente: Tech Solutions', value: 4500.00, type: 'income', date: '11/02/2026' },
    { id: 3, label: 'Servidor AWS', value: 850.00, type: 'expense', date: '12/02/2026' },
    { id: 4, label: 'Consultoria Avulsa', value: 1200.00, type: 'income', date: '12/02/2026' },
    { id: 5, label: 'Equipamentos', value: 3200.00, type: 'expense', date: '13/02/2026' },
    { id: 6, label: 'Reembolso', value: 150.00, type: 'income', date: '14/02/2026' }
  ];

  constructor() {}

  getTransactions(): Observable<Transaction[]> {
    return of(this.mockData).pipe(delay(800));
  }
}
