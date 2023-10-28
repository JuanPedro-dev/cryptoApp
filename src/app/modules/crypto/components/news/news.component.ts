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

  notices: News = {
    Data: [] // Inicializa el arreglo de datos como vacío
  };
  
  
  private subscription: Subscription | undefined;

  constructor(private noticesCryptoService: noticesCriptoService) {}

  ngOnInit() {
    this.getNotices();
    console.log('ENTROOOOOO');
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