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
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.getListTrending();
  }

  getListTrending() {
    this.subscription = this.trendingResponse.getTrending().subscribe(
      (data: Trending) => this.cryptoTrending = data,
      (error) => console.error('Error fetching Trending data:', error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
