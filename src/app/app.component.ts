import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { noSpaceContain } from './Validators/noSpaceContain.validator'
import { customValidators } from './Validators/noSpaceContain.validator'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularProject2';

  reactiveForm: FormGroup;
  formStatus: string = '';
  allFormData : any = {};
  afterSubmit : boolean = false;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, noSpaceContain]),
      lastName: new FormControl(null, [Validators.required, customValidators.noSpaceContain]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl('female'),

      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('india', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, Validators.required),
      }),

      skills: new FormArray([
        new FormControl(null, Validators.required)
      ]),

      experience: new FormArray([

      ])

    })

    // valueChanges event on formControl
    // this.reactiveForm.get('firstname').valueChanges.subscribe(value => {
    //   console.log(value);
    // })

    // valueChanges event on formGroup
    // this.reactiveForm.valueChanges.subscribe(data => {
    //   console.log(data);
    // })

    // statusChanges event on formGroup
    // this.reactiveForm.get('email').statusChanges.subscribe(status => {
    //   console.log(status);
    // })

    // statusChanges event on formGroup
    this.reactiveForm.statusChanges.subscribe(statusData => {
      console.log(statusData);
      this.formStatus = statusData;
    })
  }

  onFormSubmit() {
    console.log(this.reactiveForm.value);

    // retriving form data and reseting form after Submit

    this.allFormData = this.reactiveForm.value
    console.log(this.allFormData);
    this.afterSubmit = true;
    // this.resetForm();

    // this.reactiveForm.reset({
    //   firstName: null,
    //   lastName: null,
    //   email: null,
    //   username: null,
    //   dob: null,
    //   gender: 'male',
    //   address:{
    //     street: null,
    //     country: 'India',
    //     city: null,
    //     region: null,
    //     postal: null,
    //   },
    //   skills: [null],
    //   experience: []
    // });

  }

  resetForm(){
    this.reactiveForm.reset();
  }

  // skills

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  deleteSkill(i: any) {
    const control = <FormArray>this.reactiveForm.get('skills');
    control.removeAt(i);
  }

  // experience

  addExp() {
    const formgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(formgroup);
  }

  deleteExp(i: any) {
    const control = <FormArray>this.reactiveForm.get('experience');
    control.removeAt(i);
  }

  createUsername() {

    // setValue on the click of button using setValue() method

    let username = '';
    const fname: string = this.reactiveForm.get('firstName').value;
    const lname: string = this.reactiveForm.get('lastName').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fname.length >= 3) {
      username += fname.slice(0, 3);
    } else {
      username += fname;
    }

    if (lname.length >= 3) {
      username += lname.slice(0, 3);
    } else {
      username += lname;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();
    username = username.toLowerCase();
    console.log(username);

    // when you want to update multiple fields then we have to go with formGroup like below :

    // this.reactiveForm.setValue({
    //   firstName: this.reactiveForm.get('firstName').value,
    //   lastName: this.reactiveForm.get('lastName').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   address: {
    //     street: this.reactiveForm.get('address.street').value,
    //     country: this.reactiveForm.get('address.country').value,
    //     city: this.reactiveForm.get('address.city').value,
    //     region: this.reactiveForm.get('address.region').value,
    //     postal: this.reactiveForm.get('address.postal').value,
    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value,
    // })


    // when you want to call one field then we can update in formcontrol itself like below

    this.reactiveForm.get('username').setValue(username);

    // patchValue on the click of button using patchValue() method : 
    // If we want to update the fromGroup then we can go with patchValue() bcoz the structure of patchValue is easier than setvalue

    // this.reactiveForm.patchValue({
    //   username: username,
    //   address:{
    //     city: 'Mumbai'
    //   }
    // })

  }

}
