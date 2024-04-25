import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private userService: UserService, 
    private router:Router, private CommonServiceService: CommonServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userService.login(this.loginForm.value).subscribe({
        next: (response: any) => { 
          console.log(response)
          this.CommonServiceService.login(response.name,response.token,)
          // localStorage.setItem("token", response.token);
          // localStorage.setItem("name", response.name);
  
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error(error); 
          if (error && error.error && error.error.message) {
            this.errorMessage = error.error.message; // Assuming your API returns an error message
          } else {
            this.errorMessage = 'An error occurred. Please try again later.'; // Default error message
          }
        }
      });
    }
  }
}
