import {
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  NbIconConfig,
  NbMenuItem,
  NbPopoverDirective, NbWindowControlButtonsConfig,
  NbWindowService
} from '@nebular/theme';
import {Subscription} from 'rxjs';
import {PatientDto} from '../../../../dto/patient/PatientDto';
import {Router} from '@angular/router';
import {ObjectifV2Component} from '../objectif-v2/objectif-v2.component';
import {speedDialFabAnimations} from '../../../../../assets/speed-dial-fab.animations';
import {AffectpodometreComponent} from "../affectpodometre/affectpodometre.component";
import {ExamencliniqueComponent} from "../examen-clinique/examenclinique.component";
import {BilanLipidiqueComponent} from "../bilan-lipidique/bilan-lipidique.component";
import {ObjectifComponent} from "../objectif/objectif.component";
import {PatientDataBetweenComponentsService} from "../../../../_services/PatientDataBetweenComponentsService";

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
  animations: speedDialFabAnimations
})
export class FabButtonComponent implements OnInit, OnChanges, OnDestroy {
  @Input() id: string;
  @Input() name: string;

  title = 'IPOD-SANTE';
  currentRole = localStorage.getItem('currentRole');
  disabledIconConfig: NbIconConfig = {icon: 'settings-2-outline', pack: 'eva'};


  @ViewChild('escClose', {read: TemplateRef}) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', {read: TemplateRef}) disabledEscTemplate: TemplateRef<HTMLElement>;
  @ViewChildren(NbPopoverDirective) popover: QueryList<NbPopoverDirective>;

  toggleOn = false;
  toggleOff = true;
  selectedItem: string;

  fabButtons = [
    {
      icon: 'file-add-outline',
      title: 'Objectif, barrieres et solutions',
    },
    {
      icon: 'file-add-outline',
      title: 'Examen clinique et bilan lipidique',
    },
    {
      icon: 'file-add-outline',
      title: 'Podometre',
    },
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  message: string;
  subscription: Subscription;
  patient: PatientDto;

  constructor(private windowService: NbWindowService,
              private router: Router,
              private data: PatientDataBetweenComponentsService) {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
    this.data.changeMessage(this.id);
  }


  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
    setTimeout(() => {
      this.openPopover();
    }, 5);
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
    this.closePopover();
  }

  onToggleFab() {
    if (this.buttons.length) {
      this.hideItems();
    } else {
      this.showItems();
    }
  }

  openWindow(window: string) {
    let component;
    let title;
    if (window === 'Objectif, barrieres et solutions'){
      component = ObjectifComponent;
      title = 'Objectifs, barrieres et solutions pour: ';
    } else if (window === 'Podometre'){
      component = AffectpodometreComponent;
      title = 'Affecter/Récupérer un podometre pour: \n';
    } else if (window === 'Examen clinique et bilan lipidique'){
      component = ExamencliniqueComponent;
      title = 'Examen clinique et bilan lipidique pour: ';
    }
    const buttonsConfig: NbWindowControlButtonsConfig = {
      minimize: true,
      maximize: false,
      fullScreen: false,
    };

    this.windowService.open(component, {title : title  + this.name, buttons: buttonsConfig} );
  }

  openPopover() {
    this.popover.toArray().forEach(elm => elm.show());
  }

  closePopover() {
    this.popover.toArray().forEach(elm => elm.hide());
  }

}
