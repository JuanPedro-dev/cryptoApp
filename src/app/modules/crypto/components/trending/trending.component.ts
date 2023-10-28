import { Component } from '@angular/core';
import { Trending } from './interface/trendingCrypto';
import { ServiceTrending } from './service/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  cryptoTrending: Trending = { coins: [], nfts: [] };

  constructor(private trendingResponse: ServiceTrending) {}
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.getListTrending();
  }

  getListTrending() {
    this.subscription = this.trendingResponse.getTrending().subscribe(
      (data: Trending) => {
        this.cryptoTrending = data;
        console.log('Data from API:', this.cryptoTrending);
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
