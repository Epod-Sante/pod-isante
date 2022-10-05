// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.production.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // firebase : {
  //   apiKey: 'AIzaSyB8xKzoTy5mVoTGfX42ZKJfSgTIS5v-uys',
  //   authDomain: 'ipodsante-92c27.firebaseapp.com',
  //   databaseURL: 'https://ipodsante-92c27.firebaseio.com',
  //   projectId: 'ipodsante-92c27',
  //   storageBucket: 'ipodsante-92c27.appspot.com',
  //   messagingSenderId: '26554076167',
  //   appId: '1:26554076167:web:96d000417a85f2c3a62ea2',
  //   measurementId: 'G-BD9XWB2ELC'
  // },
  LOGIN_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/oauth/token',
  FORGET_PASSWORD_URL  : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/update/password/mail',
  CONFIRMATION_EMAIL_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/registration/confirm?token=',
  PASSWORD_UPDATE_TOKEN_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/update/password?token=',
  PASSWORD_UPDATE_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/update/password',
  LOG_OUT_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/logingout',
  REGISTER_URL: 'https://zuul-container-service.kf47arub8hkq2.ca-central-1.cs.amazonlightsail.com/api/v1/auth-service/user/create',
  INVITER_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/user/invite',
  VERIF_TOK_INVITE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/user/invite?token=',
  USERS_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/user/all',
  BLOCK_USER_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/update/user/enable',
  ADD_PATIENT_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/create',
  LIST_PATIENT_URL : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/all/professional',
  ADD_SOCIO : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/socio',
  ADD_ANTE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/antecedents',
  GET_SOCIO : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/socio',
  ADD_EXAM : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/clinicalexamination',
  ADD_LIPID : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/lipidprofile',
  GET_PATIENT_BY_ID : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/id',
  VERIF_TOKEN_PATIENT : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/questionnaire?token=',
  LOGIN_PATIENT : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/login',
  ADD_DEVICE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device',
  RM_DEVICE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device',
  LIST_DEVICES : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/all',
  AUTH_DEVICE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/authorization',
  LIST_DEVICE_AVAILABLE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/all/available/institution',
  AFFECT_DEVICE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/assign',
  RECUP_DEVICE : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/back',
  ADD_RDV : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/appointment',
  LIST_RDV : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/appointment/all',
  ADD_QUIZ : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/questionnaire',
  ADD_RECO : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/recommendation',
  ALL_RECO : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/recommendation/all',
  REFRESH_TOKEN : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/auth-service/oauth/token',
  GET_STEPS : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/activity/steps',
  GET_ACTIVEMINUTES : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/activity/activeminutes',
  GET_QUIZ : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/questionnaire/all',
  ADD_QUIZINDI : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/patient-service/questionnaire/individual',
  GET_PATIENT_DEVICES : 'http://ec2-3-97-178-51.ca-central-1.compute.amazonaws.com:8762/api/v1/fitbit-service/device/patient'




};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
