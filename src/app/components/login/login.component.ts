import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm = new FormGroup({
    username:new FormControl(''),
    password: new FormControl(''),
  }); 

  constructor(private auth: AuthService, private router: Router) {}


  ngOnInit():void {

  }
  
  onSubmit(): void {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    this.auth.login({ username, password } as { username: string, password: string }).subscribe(
      (result) => {
        if (result.role === 'teacher') {
          this.router.navigate(['teacher']);
        } else if (result.role === 'student') {
          this.router.navigate(['student']);
        }
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
  
}

