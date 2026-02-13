import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Transaction } from '../../services/transaction';
import { TranslateModule } from '@ngx-translate/core';

Chart.register(...registerables);

@Component({
  selector: 'app-financial-chart',
  imports: [CommonModule, TranslateModule],
  templateUrl: './financial-chart.html',
  styleUrl: './financial-chart.scss',
})
export class FinancialChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() transactions: Transaction[] = [];
  @ViewChild('chartCanvas') private chartCanvas!: ElementRef;

  chart: any;

  ngAfterViewInit(): void {
    if (this.transactions && this.transactions.length > 0) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Atualiza o gráfico se a lista de transações mudar e o gráfico já existir
    if (changes['transactions'] && !changes['transactions'].firstChange) {
      if (this.chart) {
        this.updateChartData();
      } else {
        this.createChart();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    if (!this.chartCanvas) return;

    const data = this.processData();

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Entradas',
            data: data.incomeData,
            backgroundColor: '#10B981',
            borderRadius: 4,
            barPercentage: 0.6,
          },
          {
            label: 'Saídas',
            data: data.expenseData,
            backgroundColor: '#EF4444',
            borderRadius: 4,
            barPercentage: 0.6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              boxWidth: 8
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: '#F1F5F9'
            },
            ticks: {
              callback: (value) => 'R$ ' + value
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }

  private updateChartData(): void {
    if (!this.chart) return;

    const data = this.processData();

    this.chart.data.labels = data.labels;
    this.chart.data.datasets[0].data = data.incomeData;
    this.chart.data.datasets[1].data = data.expenseData;

    this.chart.update();
  }

  // Função auxiliar para processar os dados brutos
  private processData() {
    // 1. Agrupar transações por data
    const groupedData: Record<string, { income: number; expense: number }> = {};

    this.transactions.forEach(t => {
      // Usa a data como chave (ex: "12/02/2026")
      if (!groupedData[t.date]) {
        groupedData[t.date] = { income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        groupedData[t.date].income += t.value;
      } else {
        groupedData[t.date].expense += t.value;
      }
    });

    // 2. Ordenar as datas (assumindo formato DD/MM/YYYY)
    const sortedDates = Object.keys(groupedData).sort((a, b) => {
      const dateA = this.parseDate(a);
      const dateB = this.parseDate(b);
      return dateA.getTime() - dateB.getTime();
    });

    // 3. Separar em arrays para o Chart.js
    const incomeData = sortedDates.map(date => groupedData[date].income);
    const expenseData = sortedDates.map(date => groupedData[date].expense);

    return {
      labels: sortedDates.map(date => date.substring(0, 5)), // Mostra apenas DD/MM
      incomeData,
      expenseData
    };
  }

  // Helper para converter string "DD/MM/YYYY" em objeto Date
  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
