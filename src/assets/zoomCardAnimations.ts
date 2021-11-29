import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const zoomCardAnimations = [
  trigger('zoomCardIn', [
    state('active', style({
      transform: 'scale(1.10) translateY(-10px) translateX(10px)'
    })),
    transition('* <=> *', animate('150ms ease-out')),
  ]),
  trigger('zoomCardOut', [
    state('active', style({
      transform: 'scale(1)'
    })),
    transition('* <=> *', animate('5ms ease-in')),
  ]),
  trigger('scaleOut', [
    state('active', style({
      transform: 'translateX(-210px)'
    })),
    transition('* <=> *', animate('0.5s ease-out')),
  ]),
  trigger('scaleIn', [
    state('inactive', style({
      transform: 'translateX(0px)'
    })),
    transition('* <=> *', animate('5ms ease-in')),
  ]),
];
