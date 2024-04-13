import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
login(username: string,password: string) {
  if(username=='sumit' && password=='1234'){
    localStorage.setItem("isloggedIn","true");
  }else{
    localStorage.setItem("isloggedIn","false");
  }
}
  loginForm: any;

  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
      
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    }
  }
