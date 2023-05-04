import {Component, ElementRef, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {messages} from '../../../_services/messages';
import { Keepalive } from '@ng-idle/keepalive';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticationService, AlertService} from '../../../_services';
import {LoginClientDTO} from '../../../dto/LoginClientDTO';
import {UserIdleService} from 'angular-user-idle';
import {EncrDecrService} from '../../../_services/EncrDecrService';
import {IddleUserDialogComponent} from '../../iddle-user-dialog/iddle-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('usernameInput') usernameInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  page = this.router.url;

  constructor(
    private userIdle: UserIdleService,
    private keepalive: Keepalive,
    public dialog: MatDialog,
    private EncrDecr: EncrDecrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private toastrService: NbToastrService
  ) {
    if (localStorage.getItem('currentUser')) {
      // redirect to admin if already logged in
      if (localStorage.getItem('currentRole') === 'role_professional') {
        this.router.navigate(['/listpatient']);
      } else if (localStorage.getItem('currentRole') === 'role_admin') {
        this.router.navigate(['/']);
      } else if (localStorage.getItem('currentRole') === 'role_researcher') {
        this.router.navigate(['/admin/researcher']);
      }

    }


  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,

      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      remember: []

    });
  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    this.loading = true;
    const encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.f.password.value);
    const decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    this.authenticationService.login(new LoginClientDTO(this.usernameInput.nativeElement.value, this.passwordInput.nativeElement.value, 'password'))
      .pipe(first())
      .subscribe(
        data => {
          if (localStorage.getItem('currentRole') === 'role_admin') {
            this.router.navigate(['']);
          } else if (localStorage.getItem('currentRole') === 'role_professional') {
            this.router.navigate(['listpatient']);
          } else if (localStorage.getItem('currentRole') === 'role_researcher') {
            this.router.navigate(['admin/researcher']);
          } else {
            this.router.navigate(['login']);
          }
        },
        error => {
          this.loading = false;
          this.showToast('top-right', 'danger', 'Échec', 'Veuillez contacter l\'admin');
        });
  }

  showToast(position, status, statusFR, title) {
    this.toastrService.show(
      statusFR || 'success',
      title,
      { position, status });
  }
}
