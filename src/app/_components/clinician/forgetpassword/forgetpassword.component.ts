import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthenticationService } from '../../../_services';
import {ActivatedRoute, Router} from '@angular/router';
import {MyErrorStateMatcher} from '../../register/register.component';
import {NbToastrService} from '@nebular/theme';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private toastrService: NbToastrService) {
    if (this.authenticationService.currentUser === undefined) {
      this.router.navigate(['login']);
    }
  }
  get f() { return this.forgetForm.controls; }
  forgetForm: FormGroup;
  loading = false;
  submitted = false;
   email: string;
  matcher = new MyErrorStateMatcher();

  connexionr() {
    this.router.navigate(['login']);
  }
  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [


      ]]
    });
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetForm.invalid) {
      return;
    }

    this.loading = false;
    this.forgetPassword();

  }

  forgetPassword(){
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (this.emailInput.nativeElement.value.length === 0) {
      this.showToast('top-right', 'info', 'Info', 'Veuillez saisir votre adresse e-mail');
    } else if (!regexp.test(this.emailInput.nativeElement.value)) {
      this.showToast('top-right', 'warning', 'Échec', 'E-mail invalide');
    } else {
      this.authenticationService.forgetPassword(this.emailInput.nativeElement.value)
        .pipe(first())
        .subscribe(
          result => {
            // @ts-ignore
            if (result.emailExist) {
              this.showToast('top-right', 'success', 'Success', 'Nous vous avons envoyé un e-mail pour réinitialiser votre mot de passe');
            } else {
              this.showToast('top-right', 'danger', 'Échec', 'L\'e-mail n\'existe pas');
            }
          });
    }
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}
