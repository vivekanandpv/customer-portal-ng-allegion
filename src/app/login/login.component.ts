import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string | null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private ar: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(25)]],
    });
    this.returnUrl = this.ar.snapshot.queryParamMap.get('returnUrl');
  }

  get username(): FormControl {
    return this.form.controls['username'] as FormControl;
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (v) => {
          if (v) {
            this.toastr.success('Login success');
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['']);
            }
          }
        },
      });
    } else {
      this.form.reset();
      this.toastr.error('Invalid data');
    }
  }
}
