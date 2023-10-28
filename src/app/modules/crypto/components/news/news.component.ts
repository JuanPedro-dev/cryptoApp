import { Component, OnDestroy, OnInit } from '@angular/core';
import { noticesCriptoService } from './service/new-service';
import { News } from './interface/new';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  // TODO: si hay ganas refactorizar, sacar subscribe deprecado... 
  
  notices: News = {
    Data: [] 
  };
    
  private subscription: Subscription | undefined;

  constructor(private noticesCryptoService: noticesCriptoService) {}

  ngOnInit() {
    this.getNotices();
  }

  getNotices() {
    this.subscription = this.noticesCryptoService.getNoticesApi().subscribe(
      (data: News) => {
        this.notices = data;
        console.log('Data from API NOTICES:', this.notices);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
