import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  form: FormGroup;
  isSubmit: boolean = false;
  message: string;

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.isSubmit = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.isSubmit = false;
      },
      () => {
        this.isSubmit = false;
      }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please enter email and password';
      } else if (params['authFailed']) {
        this.message = 'Please enter email and password';
      }
    });
    this.buildForm();
  }
}
