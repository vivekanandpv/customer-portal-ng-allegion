import { Component, Input, OnInit } from '@angular/core';
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
  @Input() account?: AccountViewModel | null;

  constructor() {}

  ngOnInit(): void {}
}
