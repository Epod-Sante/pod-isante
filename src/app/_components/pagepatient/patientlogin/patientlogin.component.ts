import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../home/invite/invite.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService, AuthenticationService, UserService} from "../../../_services";
import {PatientService} from "../../../_services/patient.service";
import {PatientDto} from "../../../dto/patient/PatientDto";
import {ContactDto} from "../../../dto/patient/ContactDto";
import {Request, Response} from "../../../dto";
import {first, map} from "rxjs/operators";

@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {
  obj = null;

  constructor(private router: Router,
              private patientService: PatientService,
              private route: ActivatedRoute) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      //this.submitEM.emit(this.form.value);
      if(this.form.value.password=="" || this.emailFormControl.value==""){
          this.error = "Veuillez Remplir tous les champs"
      }else if(this.form.value.password.length>4){
        this.error = "NIP INVALIDE"
      }else {
       let data = new  PatientDto(null,null,null,null,null,null,
         new ContactDto(null,null ,this.emailFormControl.value,null),null,null,
         null, null, null, this.form.value.password,null,
         null,null, null,null, null,null);
        let request = new Request(data)
        this.patientService.login(request).pipe(first())
          .subscribe(token =>  {
            console.log(token)
            //this.router.navigate(["patient/questionnaire"])
              this.obj = JSON.parse(JSON.stringify(token))
            if(this.obj.object!=null){
              localStorage.setItem("currentPatientToken",this.obj.object.questionnaireToken)
              this.router.navigate(["patient/questionnaire"])
            }else{
              this.error =this.obj.error.message

            }

        }, error => {
          console.log(error)
          this.error = error.error.error_description+" "+error.error.message+" : "+error.status
          }
        )
      }

    }
  }
  @Input() error: string | null;

 // @Output() submitEM = new EventEmitter();

}
