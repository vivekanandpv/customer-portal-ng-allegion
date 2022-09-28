import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AccountViewModel, CustomerViewModel } from '../_models/app.models';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  accountId: number;
  account$: Observable<AccountViewModel>;
  customer$: Observable<CustomerViewModel>;

  constructor(private ar: ActivatedRoute, private restService: RestService) {
    this.accountId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.account$ = this.restService.read<AccountViewModel>(
      `accounts/${this.accountId}`
    );

    this.customer$ = this.account$.pipe(
      mergeMap((v) => {
        return this.restService.read<CustomerViewModel>(
          `customers/${v.customerId}`
        );
      })
    );
  }

  ngOnInit(): void {}
}
