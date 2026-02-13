import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { TransactionService } from '../../services/transaction';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements AfterViewInit{
  @Input() transaction: TransactionService[] = [];
  @Input() isLoading: boolean = true;

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('pt');
    this.translate.use('pt');

  }

  switchLanguage(language: string) {
    this.translate.use(language);
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
}
