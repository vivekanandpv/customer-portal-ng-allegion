import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { AccountViewModel } from '../_models/app.models';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit {
  @Input() accounts?: AccountViewModel[] | null;

  constructor() {}

  ngOnInit(): void {}
}
