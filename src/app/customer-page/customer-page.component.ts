import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AccountViewModel, CustomerViewModel } from '../_models/app.models';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.scss'],
})
export class CustomerPageComponent implements OnInit {
  customerId: number;
  customer$: Observable<CustomerViewModel>;
  accounts$: Observable<AccountViewModel[]>;

  constructor(private ar: ActivatedRoute, private restService: RestService) {
    this.customerId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.customer$ = this.restService.read<CustomerViewModel>(
      `customers/${this.customerId}`
    );
    this.accounts$ = this.restService.read<AccountViewModel[]>(
      `accounts/by-customer/${this.customerId}`
    );
  }

  ngOnInit(): void {}
}
