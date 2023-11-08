import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { News } from './interface/new';
import { Subscription } from 'rxjs';
import { NewsCryptoService } from './service/newsCrypto.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private newsCryptoService: NewsCryptoService = inject(NewsCryptoService);

  notices: News = {
    Data: [],
  };

  ngOnInit() {
    this.getNotices();
  }
  
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getNotices() {
    this.subs = this.newsCryptoService.getNoticesApi().subscribe({
      next: (data: News) => this.notices = data,
      error: (err) => console.error('Error fetching data getNotices(): ', err),
    });
  }

}
