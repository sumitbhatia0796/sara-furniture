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
    states: string[] = ['Himachal Pradesh', 'Punjab', 'Haryana'];
    cities: string[] = ['Hamirpur', 'Bilaspur'];
    countries: string[] = ['India', 'China', 'USA'];

    passwordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;
    errorMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private commonService: CommonServiceService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setRegisterControl();
    }

    getFormControl(controlName: string) {
        return this.registerForm.get(controlName);
    }

    setRegisterControl() {
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

    togglePasswordVisibility(): void {
        this.passwordVisible = !this.passwordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    passwordsMatch(): boolean {
        const password = this.registerForm.get('password').value;
        const confirmPassword = this.registerForm.get('confirmPassword').value;
        return password === confirmPassword;
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        if (this.registerForm.invalid || !this.passwordsMatch()) {
            return;
        }

        const data = this.registerForm.value;
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            confirmPassword: data.password,
            mobile: data.mobileNo,
            dateOfBirth: data.dob,
            gender: data.gender,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            pin: data.pin,
        };

        this.commonService.registerUser(userData).subscribe(
            (res: any) => {
                if (res) {
                    alert("User Saved Successfully");
                    this.router.navigate(['home']);
                } else {
                    alert("There is an error");
                    console.error('Error occurred while saving user');
                }
            },
            (error) => {
                if (error && error.error && error.error.message) {
                    this.errorMessage = error.error.message;
                } else {
                    this.errorMessage = 'An error occurred. Please try again later.';
                }

                setTimeout(() => {
                    this.errorMessage = '';
                }, 10000);
            }
        );
    }

    resetForm() {
        this.registerForm.reset();
    }
}
