import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crypto-card',
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent implements OnInit {

  @Input() titulo: string | undefined;
  @Input() precio: string | undefined;
  @Input() imageUrl: string | undefined;
  @Input() porcentaje: string | undefined;

  constructor() { }

  ngOnInit() {
  }

}
