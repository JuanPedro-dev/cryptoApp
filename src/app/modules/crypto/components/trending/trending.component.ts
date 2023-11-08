import { Component, inject } from '@angular/core';
import { Trending } from './interface/trendingCrypto';
import { ServiceTrending } from './service/service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent {
  private trendingResponse: ServiceTrending = inject(ServiceTrending);
  private subscription: Subscription = new Subscription();
  
  cryptoTrending: Trending = { coins: [], nfts: [] };

  ngOnInit() {
    this.getListTrending();
  }

  getListTrending() {
    this.subscription = this.trendingResponse.getTrending().subscribe({
      next: (data: Trending) => (this.cryptoTrending = data),
      error: (err) => console.error('Error getTrending():', err),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
