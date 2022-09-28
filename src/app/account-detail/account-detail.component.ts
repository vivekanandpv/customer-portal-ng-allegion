import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AccountViewModel } from '../_models/app.models';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  accountId: number;
  account$: Observable<AccountViewModel>;

  constructor(private ar: ActivatedRoute, private restService: RestService) {
    this.accountId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.account$ = this.restService.read<AccountViewModel>(
      `accounts/${this.accountId}`
    );
  }

  ngOnInit(): void {}
}
