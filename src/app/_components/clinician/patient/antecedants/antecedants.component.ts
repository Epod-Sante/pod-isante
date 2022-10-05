import {Component, Input, OnInit} from '@angular/core';
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";
import {Request} from "../../../../dto";
import {first} from "rxjs/operators";
import {PatientService} from "../../../../_services/patient.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-antecedants',
  templateUrl: './antecedants.component.html',
  styleUrls: ['./antecedants.component.css']
})
export class AntecedantsComponent implements OnInit {
  lis_antecedant : AntecedentsDto[];
  annee : number = null;
  name : string;
  ant;
  mySubscription : any

  constructor(private patientService : PatientService,private _snackBar : MatSnackBar, private router : Router) {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
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
  @Input() id: string;


  ngOnInit() {
  }
  ajouter(others_fact: string,depression: string,troubles_anxieux: string,
          atcd_famlly_cancer: string,atcd_famlly_cardiovas: string,arret_tabac_plus6: string,arret_tabac_plus: string,arret_tabac_moins6: string,actif_tabac: string,obes_3: string,obes_2: string,obes_1: string,surpoids: string,diabete: string,hypertension_artrielle: string,dyslipidmiestyle: string,others: string,neurodgnrative: string,
          touble_muscle_squel: string,cancer3: string,cancer2: string,cancer1: string,dialyse: string,insuffisance_renale: string,mpoc: string,Chirurgie_vasculairep: string,claudication: string,thrombectomie: string,
          ait: string,avc: string,insuf_cardiaque_nyha3_4: string,insuf_cardiaque_nyha1_2: string,maladievalvulaire: string,angioplasticoronarienne: string,pontagescoronariens: string,pontagescoronarien: string,angineinfractus: string)
  {    let checked_dialyse = document.getElementById("dialyse")
  }
  ajouterr(list_antecedants : any [],cancer1_year : string,
           cancer1_organe: string,cancer2_organe: string,
           cancer2_year : string,
           cancer3_organe : string,cancer3_year : string,mpocyear ,
           claudicationyear ,thrombectomieyear ,aityear ,
           avcyear ,others : string,others_fac: string){
   for (let i = 0 ; i< list_antecedants.length; i++){
     if(i==0 && list_antecedants[i].value != "Cancer1"){
       this.lis_antecedant = [new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)]
     } else  if ((list_antecedants[i].value === "Cancer1" || list_antecedants[i].value === "Cancer2"  ||
       list_antecedants[i].value === "Cancer2") && i==0 ){
       let cancer;
       if(cancer1_year != ""){
          cancer = "Cancer de "+cancer1_organe
         this.annee = +cancer1_year
         this.lis_antecedant = [new AntecedentsDto(cancer ,this.annee, null,null,null)]
       }  if(cancer2_year != ""){
          cancer = "Cancer de "+cancer2_organe
         this.lis_antecedant = [new AntecedentsDto(cancer ,this.annee, null,null,null)]
         this.annee = +cancer2_year
       }  if(cancer3_year != ""){
          cancer = "Cancer de "+cancer3_organe
         this.annee = +cancer3_year
         this.lis_antecedant = [new AntecedentsDto(cancer ,this.annee, null,null,null)]
       }



     }
     else if ((list_antecedants[i].value === "Cancer1" || list_antecedants[i].value === "Cancer2"  ||
       list_antecedants[i].value === "Cancer2")){
       let cancer;
       if(cancer1_year != ""){
         cancer = "Cancer de "+cancer1_organe
         this.annee = +cancer1_year
         this.ant = new AntecedentsDto(cancer,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }  if(cancer2_year != ""){
         cancer = "Cancer de "+cancer2_organe
         this.annee = +cancer2_year
         this.ant = new AntecedentsDto(cancer,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }  if(cancer3_year != ""){
         cancer = "Cancer de "+cancer3_organe
         this.annee = +cancer3_year
         this.ant = new AntecedentsDto(cancer,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }

     }else{
       if(list_antecedants[i].value="MPOC"){
         if(mpocyear.value != ""){
           this.annee = +mpocyear

         }
         this.ant = new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }
        else if(list_antecedants[i].value="CLAUDICATION"){
         if(claudicationyear.value != ""){
           this.annee = +claudicationyear
         }
         this.ant = new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)


       }
       else if(list_antecedants[i].value="THROMEBECTOMIE"){
         if(mpocyear.value != ""){
           this.annee = +thrombectomieyear
         }
         this.ant = new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)


       }
       else if(list_antecedants[i].value="AIT"){
         if(aityear.value != ""){
           this.annee = +aityear


         }
         this.ant = new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }
       else if(list_antecedants[i].value="AVC"){
         if(avcyear.value != ""){
           this.annee = +avcyear
         }
         this.ant = new AntecedentsDto(list_antecedants[i].value,this.annee, null,null,null)
         let count = this.lis_antecedant.push(this.ant)

       }
       else {
         this.ant = new AntecedentsDto(list_antecedants[i].value,null, null,null,null)

       }

     }


   }
    let request = new Request(this.lis_antecedant);
    this.patientService.addAntecedants(request,this.id).pipe(first())
      .subscribe(
        data => {
          this.openSnackBar(" AJOUT REUSSI","Ok")


        },
        error => {


        });


  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    })}

}
