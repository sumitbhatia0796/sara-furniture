import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder, private CommonServiceService: CommonServiceService,
    private router: Router
  ) { 
   
  }

  ngOnInit(): void {
    this.setRegisterControl();
   }
   getFormControl(controlName: string) {
    return this.registerForm.get(controlName);
  }
  setRegisterControl(){
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
    console.log(this.registerForm.value)
    let data = this.registerForm.value;
    let userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
      mobile: data.mobileNo,
      dataOfBirth: data.dob,
      gender: data.gender,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      pin: data.pin
  };
    this.CommonServiceService.registerUser(userData).subscribe((res:any)=>{
      if (!!res) {
        // Redirect to home page
        alert("User Saved Successfully")
        this.router.navigate(['home']);
    } else {
      alert("there is a error")
        // Handle error or display appropriate message
        console.error('Error occurred while saving user');
    }
    })
  }
  resetForm(){
    this.registerForm.resetForm()
  }
  
}
