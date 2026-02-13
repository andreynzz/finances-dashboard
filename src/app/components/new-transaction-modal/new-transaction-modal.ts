import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { Transaction } from '../../services/transaction';

@Component({
  selector: 'app-new-transaction-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-transaction-modal.html',
  styleUrl: './new-transaction-modal.scss',
})
export class NewTransactionModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Transaction>();

  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      value: [null, [Validators.required, Validators.min(0.01)]],
      type: ['expense', Validators.required],
      date: [new Date().toLocaleDateString('pt-BR'), Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = {
        id: Math.random(),
        ...this.transactionForm.value
      };
      this.save.emit(newTransaction);
      this.transactionForm.reset();
    }
  }
  onCancel() {
    this.close.emit();
  }
}
