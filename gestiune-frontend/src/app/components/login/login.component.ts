import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    permiteNavigarea = false;
    isRegister = false;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private _matSnackBar: MatSnackBar
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            parola: ['', Validators.required],
            email: ['', Validators.required],
            rang: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    login() {

        if ( this.loginService.login(this.loginForm.controls['username'].value, this.loginForm.controls['parola'].value) === true ){
            this.permiteNavigarea = true;
        } else {
            console.log("Logarea nu s-a putut realiza");
            this._matSnackBar.open("Logarea nu s-a putut realiza!", "Inchide");
        }
        
    }

    moveToRegister() {
        this.isRegister = true;
    }

    register() {
        this.loginService.register(this.loginForm.controls['username'].value,  this.loginForm.controls['parola'].value, 
                                    this.loginForm.controls['email'].value,  this.loginForm.controls['rang'].value).subscribe((response: any) => {
                                        this.isRegister = false;
                                        console.log("inregistrarea a avut succes!");
                                        this.loginForm.reset();
                                    });
    }

}
