import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../home/invite/invite.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {ContactDto} from "../../../../dto/patient/ContactDto";
import {FamilyDoctorDto} from "../../../../dto/patient/FamilyDoctorDto";
import {PharmacyDto} from "../../../../dto/patient/PharmacyDto";
import {ProfessionalDto} from "../../../../dto/patient/ProfessionalDto";
import {ErrorDto} from "../../../../dto/ErrorDto";
import {PatientService} from "../../../../_services/patient.service";
import {first} from "rxjs/operators";
import {UserService} from "../../../../_services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Request} from "../../../../dto/Request";
import {NavigationEnd, Router, RouterModule} from "@angular/router";


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  @Output() exampleOutput = new EventEmitter<PatientDto>()
  @Input() error: string | null;
  mySubscription: any
  birthday: string = "";
  submitted = false;
  phonee : string = "";
  patient_added = true;
  constructor(private patientService : PatientService,private userService : UserService,
              private _snackBar : MatSnackBar, private router : Router
  ) {   this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });


  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  changePhone(value : string){
    if(value.length == 3 || value.length === 7  ){
      console.log(value)
      let tiret = "-";
      this.phonee = value.concat(tiret)
    }
  }
  ngOnInit() {
    this.error = null
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);
    console.log(d)

    let date = d.getDate();
    let jr = date.toString()
    if(date>9){

    }else{
      jr= "0"+date
    }
    console.log(jr)
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString()
    if(month>9){

    }else{
      mois= "0"+month
    }
    const year = d.getFullYear();

    this.birthday = year + '-' + mois + '-' + jr;
    console.log(this.birthday)
  }

  matcher = new MyErrorStateMatcher();
  ajouter(firstName : string, lastName : string, motherName : string, phone : string, email : string, gender : string){
    this.error = null

    if(firstName === "" || lastName === "" || motherName === "" || phone === "" || this.birthday === "")
    {
      this.openSnackBar("Vous devrez remplir tous les champs obligatoires*\"","Ok")
    } else if (firstName.length <3 || lastName.length < 3 ){
      this.openSnackBar("les champs nom et prenoms doivent contenir au minimum 3 caracteres","Ok")
    } else {
      this.submitted = true;
      let familyDoctor = null
      let pharmacy = null
      let birth = this.birthday
      for(let i=0; i < phone.length; i++ ){
        let exist = phone.indexOf("-")
        if(exist >= 0){
          let phont = phone.split('')
          phont.splice(exist, 1);
          phone = phont.join('')
        }
      }


      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.userService.info_user(user["user_name"]).subscribe(
        rep => {
          console.log(rep)
          let pro : ProfessionalDto[] = [new ProfessionalDto(rep["id"], rep["firstName"],rep["lastName"], true)]
      let data = new PatientDto(null,null,firstName,lastName,birth,motherName,
        new ContactDto(null,phone,email,null),
        familyDoctor , pharmacy,pro
        ,true,null,null, null,
        null,null,null,null, false,gender);
      let request = new Request(data);
      console.log(request)

          this.patientService.addPatient(request).pipe(first())
            .subscribe(
              dat => {
                let obj = JSON.parse(JSON.stringify(dat))
                if(obj.object != null){
                  this.patient_added = true;
                  console.log(dat)
                  this.exampleOutput.emit(data)
                  this.openSnackBar("Patient ajoute","Ok")
                }else {
                  this.error = obj.error.message
                }




              },
              error => {
                this.openSnackBar(error.error,"Ok")


              });







    })
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })




}
}
