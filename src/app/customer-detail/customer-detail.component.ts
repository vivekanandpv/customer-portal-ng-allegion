import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { CustomerViewModel } from '../_models/app.models';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  customerId: number;
  customer$: Observable<CustomerViewModel>;

  constructor(private ar: ActivatedRoute, private restService: RestService) {
    this.customerId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.customer$ = this.restService.read<CustomerViewModel>(
      `customers/${this.customerId}`
    );
  }

  ngOnInit(): void {}
}
