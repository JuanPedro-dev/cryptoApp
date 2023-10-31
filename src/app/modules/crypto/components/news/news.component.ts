import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { noticesCriptoService } from './service/new.service';
import { News } from './interface/new';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  private subs: Subscription | undefined;
  private noticesCryptoService: noticesCriptoService = inject(noticesCriptoService)
  notices: News = {
    Data: [],
  };

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.subs = this.noticesCryptoService.getNoticesApi().subscribe(
      (data: News) => this.notices = data,
      (error) => console.error('Error fetching data:', error)
    );
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
