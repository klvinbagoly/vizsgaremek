import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(/^[a-ű0-9\.\-]+@[a-z\.\-]+.[a-z]{2,4}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  hidePassword = true
  errorMessage = ''

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  validateEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'This field is required.'
    }
    return this.form.controls['email'].hasError('pattern') ? 'Not a valid email' : 'Error'
  }

  onLogin() {
    this.auth.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => {
        console.error(err)
        if (err.status === 401) {
          this.errorMessage = 'Invalid password!'
        }
        if (err.status === 404) {
          this.errorMessage = 'User not found.'
        }
      }
    })
  }

}
