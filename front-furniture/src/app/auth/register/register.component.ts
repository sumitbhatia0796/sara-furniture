import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  states: string[] = ['Himachal pardesh', 'Punjab', 'Haryana']; 
  cities: string[] = ['hamirpur', 'bilaspur']; 
  countries: string[] = ['India', 'China', 'USA']

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobileNo: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  
  onSubmit() {
    // Implement registration logic here
    console.log(this.registerForm.value);
  }
  resetForm(){
    this.registerForm.resetForm()
  }
  
}
