import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateDetailsService } from '../candidate-details.service';
import { Candidatedetails } from '../candidatedetails';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Form:any;
  constructor(private router: Router,
    private data: CandidateDetailsService) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message)
    this.candidateDetails=this.message
    this.Form = new FormGroup({
      firstname: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      state: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobilenumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]+$')]),
      country: new FormControl('', []),
      age: new FormControl(0, []),
      address:new FormControl('', []),
      homeAddress1:new FormControl('', []),
      homeAddress2:new FormControl('', []),
      comapanyAddress1:new FormControl('', []),
      comapanyAddress2:new FormControl('', []),
      file: new FormControl('', []),
      fileSource: new FormControl('', []),
      hobbies: new FormControl([], [])
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  get firstname() { return this.Form.get('firstname') }
  get lastname() { return this.Form.get('lastname') }
  get username() { return this.Form.get('username') }
  get email() { return this.Form.get('email') }
  get mobilenumber() { return this.Form.get('mobilenumber') }
  get password() { return this.Form.get('password') }
  get age() { return this.Form.get('age') }
  get address() { return this.Form.get('address') }
  get homeAddress1() { return this.Form.get('homeAddress1') }
  get homeAddress2() { return this.Form.get('homeAddress2') }
  get comapanyAddress1() { return this.Form.get('comapanyAddress1') }
  get comapanyAddress2() { return this.Form.get('comapanyAddress2') }


  candidateDetails : Candidatedetails = new Candidatedetails;
  message:any;
  subscription: Subscription;

  onSubmit() {
    console.log(this.candidateDetails)
    this.data.changeMessage(this.candidateDetails);
    this.router.navigate(['/userprofile']);

    
  }
  change(e){
    this.candidateDetails.address=e.target.value;

    console.log(e.target.value);  
  }
      
  get f(){
    return this.Form.controls;
  }
     
  onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Form.patchValue({
        fileSource: file
      });
    }
  }


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  hobby: any[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.hobby.push({name: value});
      this.candidateDetails.hobbies= this.hobby
    }

    // Clear the input value
    // event.chipInput!.clear();
  }

  remove(hobby: any): void {
    const index = this.hobby.indexOf(hobby);

    if (index >= 0) {
      this.hobby.splice(index, 1);
      this.candidateDetails.hobbies= this.hobby
    }
  }
  

}
