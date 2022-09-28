import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AccountViewModel } from '../_models/app.models';

@Component({
  selector: 'app-account-aggregation',
  templateUrl: './account-aggregation.component.html',
  styleUrls: ['./account-aggregation.component.scss'],
})
export class AccountAggregationComponent implements OnInit {
  accounts$: Observable<AccountViewModel[]>;

  constructor(private restService: RestService) {
    this.accounts$ = this.restService.read<AccountViewModel[]>('accounts');
  }

  ngOnInit(): void {}
}
