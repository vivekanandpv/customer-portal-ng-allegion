import { Component, Input, OnInit } from '@angular/core';
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
  @Input() customer?: CustomerViewModel | null;

  constructor() {}

  ngOnInit(): void {}
}
