import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestService } from '../rest.service';
import {
  CustomerCreateViewModel,
  CustomerUpdateViewModel,
  CustomerViewModel,
} from '../_models/app.models';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;
  formId = 0;

  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private toastr: ToastrService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: [],
      folioNumber: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{7}$/)],
      ],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      maritalStatus: ['', [Validators.required]],
      sourceOfIncome: ['', [Validators.required]],
      annualIncome: ['', [Validators.required]],
      addressLine1: ['', [Validators.required, Validators.maxLength(100)]],
      addressLine2: [, [Validators.maxLength(100)]],
      addressLine3: [, [Validators.maxLength(100)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      pin: [, [Validators.pattern(/^[1-9][0-9]{5}$/)]],
      pan: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)],
      ],
      dateOfBirth: ['', [Validators.required]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)],
      ],
      telephone: [, [Validators.pattern(/^[0-9]{11}$/)]],
      nomineeFirstName: ['', [Validators.required, Validators.maxLength(50)]],
      nomineeLastName: ['', [Validators.maxLength(50)]],
      nomineeRelationship: [
        '',
        [Validators.required, Validators.maxLength(50)],
      ],
    });

    const possibleId = +(this.ar.snapshot.paramMap.get('id') ?? '');
    this.formId = isNaN(possibleId) ? 0 : possibleId;

    if (this.formId > 0) {
      //get the customer
      this.restService
        .read<CustomerViewModel>(`customers/${this.formId}`)
        .subscribe({
          next: (res) => {
            //  required for date deserialization
            res.dateOfBirth = res.dateOfBirth.split('T')[0];
            console.log(res);
            this.form.patchValue(res);
            this.toastr.success(`Customer ${this.formId} loaded successfully`);
          },
          error: (error) => {
            this.toastr.error(error.message, 'Cannot process the request');
            this.router.navigate(['customers']);
          },
        });
    }
  }

  get id(): FormControl {
    return this.form.controls['id'] as FormControl;
  }
  get folioNumber(): FormControl {
    return this.form.controls['folioNumber'] as FormControl;
  }
  get firstName(): FormControl {
    return this.form.controls['firstName'] as FormControl;
  }
  get lastName(): FormControl {
    return this.form.controls['lastName'] as FormControl;
  }
  get gender(): FormControl {
    return this.form.controls['gender'] as FormControl;
  }
  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }
  get maritalStatus(): FormControl {
    return this.form.controls['maritalStatus'] as FormControl;
  }
  get sourceOfIncome(): FormControl {
    return this.form.controls['sourceOfIncome'] as FormControl;
  }
  get annualIncome(): FormControl {
    return this.form.controls['annualIncome'] as FormControl;
  }
  get addressLine1(): FormControl {
    return this.form.controls['addressLine1'] as FormControl;
  }
  get addressLine2(): FormControl {
    return this.form.controls['addressLine2'] as FormControl;
  }
  get addressLine3(): FormControl {
    return this.form.controls['addressLine3'] as FormControl;
  }
  get city(): FormControl {
    return this.form.controls['city'] as FormControl;
  }
  get state(): FormControl {
    return this.form.controls['state'] as FormControl;
  }
  get pin(): FormControl {
    return this.form.controls['pin'] as FormControl;
  }
  get pan(): FormControl {
    return this.form.controls['pan'] as FormControl;
  }
  get dateOfBirth(): FormControl {
    return this.form.controls['dateOfBirth'] as FormControl;
  }
  get mobileNumber(): FormControl {
    return this.form.controls['mobileNumber'] as FormControl;
  }
  get telephone(): FormControl {
    return this.form.controls['telephone'] as FormControl;
  }
  get nomineeFirstName(): FormControl {
    return this.form.controls['nomineeFirstName'] as FormControl;
  }
  get nomineeLastName(): FormControl {
    return this.form.controls['nomineeLastName'] as FormControl;
  }
  get nomineeRelationship(): FormControl {
    return this.form.controls['nomineeRelationship'] as FormControl;
  }

  ngOnInit(): void {}

  onSubmit() {
    //  what if an empty form is submitted?
    this.form.markAllAsTouched();

    if (this.form.valid) {
      if (this.formId === 0) {
        //post
        this.restService
          .post<CustomerCreateViewModel, CustomerViewModel>(
            'customers',
            this.form.value
          )
          .subscribe({
            next: (res) => {
              this.toastr.success(`Customer creation success. Id = ${res.id}`);
              this.router.navigate(['customers']);
            },
            error: (error) => {
              this.toastr.error(error.message, 'Cannot process');
            },
          });
      } else {
        //put
        this.restService
          .put<CustomerUpdateViewModel, CustomerViewModel>(
            `customers/${this.formId}`,
            this.form.value
          )
          .subscribe({
            next: (res) => {
              this.toastr.success(`Customer update success`);
              this.router.navigate(['customers']);
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
