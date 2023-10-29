import { Component, OnDestroy, OnInit } from '@angular/core';
import { noticesCriptoService } from './service/new.service';
import { News } from './interface/new';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {

  // TODO: si hay ganas refactorizar, sacar subscribe deprecado...
  notice = {
    id: '19514702',
    guid: 'https://es.cointelegraph.com/news/crypto-biz-blockfi-emerges-bankruptcy-worldcoin-halts-usdc-payments',
    published_on: 1698511800,
    imageUrl: 'https://resources.cryptocompare.com/news/17/19514702.jpeg',
    tittle:
      'Crypto Biz: BlockFi sale de la quiebra, Worldcoin suspende pagos en USDC y mucho más',
    url: 'https://es.cointelegraph.com/news/crypto-biz-blockfi-emerges-bankruptcy-worldcoin-halts-usdc-payments',
    body: 'El Crypto Biz de esta semana analiza la salida de BlockFi de la bancarrota, los avances del ETF de Bitcoin de BlackRock, las mejoras en el esquema de pagos a operadores de Worldcoin y mucho más',
    tags: 'ETF|Ledger|Wallet',
    lang: 'ES',
    upvotes: '0',
    downvotes: '0',
    categories: 'BTC|WALLET',
    source_info: {
      name: 'CoinTelegraph',
      img: 'https://images.cryptocompare.com/news/default/cointelegraph.png',
      lang: 'ES',
    },
    source: "cointelegraph_es"
  };

  notices: News = {
    Data: [],
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
