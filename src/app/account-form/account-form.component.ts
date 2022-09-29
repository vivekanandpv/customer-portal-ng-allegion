import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { RestService } from '../rest.service';
import {
  AccountCreateViewModel,
  AccountUpdateViewModel,
  AccountViewModel,
  CustomerIdNamePair,
  CustomerViewModel,
} from '../_models/app.models';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  form: FormGroup;
  formId: number;
  customers$: Observable<CustomerIdNamePair[]>;

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private toastr: ToastrService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [],
      accountNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{12}$/)],
      ],
      type: ['', [Validators.required]],
      rateOfInterest: ['', [Validators.required]],
      createdOn: ['', [Validators.required]],
      status: ['', [Validators.required]],
      closedOn: [],
      ifsc: ['', [Validators.required]],
      cardNumber: ['', [Validators.pattern(/^[0-9]{16}$/)]],
      cardActive: [],
      currency: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
    });

    const possibleId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.formId = isNaN(possibleId) ? 0 : possibleId;

    if (this.formId > 0) {
      //get the customer
      this.restService
        .read<AccountViewModel>(`accounts/${this.formId}`)
        .subscribe({
          next: (res) => {
            //  required for date deserialization
            res.createdOn = res.createdOn.split('T')[0];
            res.closedOn = res.closedOn?.split('T')[0];
            console.log(res);
            this.form.patchValue(res);
            this.toastr.success(`Account ${this.formId} loaded successfully`);
          },
          error: (error) => {
            this.toastr.error(error.message, 'Cannot process the request');
            this.router.navigate(['accounts']);
          },
        });
    }

    this.customers$ = this.restService
      .read<CustomerViewModel[]>('customers')
      .pipe(
        map((v) => {
          return v.map((c) => {
            return {
              id: c.id,
              fullName: `${c.firstName} ${c.lastName}`,
            } as CustomerIdNamePair;
          });
        })
      );
  }

  get id(): FormControl {
    return this.form.controls['id'] as FormControl;
  }
  get accountNumber(): FormControl {
    return this.form.controls['accountNumber'] as FormControl;
  }
  get type(): FormControl {
    return this.form.controls['type'] as FormControl;
  }
  get rateOfInterest(): FormControl {
    return this.form.controls['rateOfInterest'] as FormControl;
  }
  get createdOn(): FormControl {
    return this.form.controls['createdOn'] as FormControl;
  }
  get status(): FormControl {
    return this.form.controls['status'] as FormControl;
  }
  get closedOn(): FormControl {
    return this.form.controls['closedOn'] as FormControl;
  }
  get ifsc(): FormControl {
    return this.form.controls['ifsc'] as FormControl;
  }
  get cardNumber(): FormControl {
    return this.form.controls['cardNumber'] as FormControl;
  }
  get cardActive(): FormControl {
    return this.form.controls['cardActive'] as FormControl;
  }
  get currency(): FormControl {
    return this.form.controls['currency'] as FormControl;
  }
  get customerId(): FormControl {
    return this.form.controls['customerId'] as FormControl;
  }

  ngOnInit(): void {}

  onSubmit() {
    //  what if an empty form is submitted?
    this.form.markAllAsTouched();

    if (this.form.valid) {
      if (this.formId === 0) {
        //post
        this.restService
          .post<AccountCreateViewModel, AccountViewModel>(
            'accounts',
            this.form.value
          )
          .subscribe({
            next: (res) => {
              this.toastr.success(`Account creation success. Id = ${res.id}`);
              this.router.navigate(['accounts']);
            },
            error: (error) => {
              this.toastr.error(error.message, 'Cannot process');
            },
          });
      } else {
        //put
        this.restService
          .put<AccountUpdateViewModel, AccountViewModel>(
            `accounts/${this.formId}`,
            this.form.value
          )
          .subscribe({
            next: (res) => {
              this.toastr.success(`Account update success`);
              this.router.navigate(['accounts']);
            },
            error: (error) => {
              this.toastr.error(error.message, 'Cannot process');
            },
          });
      }
    } else {
      this.toastr.error('Invalid form');
    }
  }
}
