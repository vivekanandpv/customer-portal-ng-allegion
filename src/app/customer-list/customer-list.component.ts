import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { CustomerViewModel } from '../_models/app.models';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<CustomerViewModel[]>;

  constructor(private restService: RestService) {
    this.customers$ = this.restService.read<CustomerViewModel[]>('customers');
  }

  ngOnInit(): void {}
}
