// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.production.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase : {
    apiKey: "AIzaSyB8xKzoTy5mVoTGfX42ZKJfSgTIS5v-uys",
    authDomain: "ipodsante-92c27.firebaseapp.com",
    databaseURL: "https://ipodsante-92c27.firebaseio.com",
    projectId: "ipodsante-92c27",
    storageBucket: "ipodsante-92c27.appspot.com",
    messagingSenderId: "26554076167",
    appId: "1:26554076167:web:96d000417a85f2c3a62ea2",
    measurementId: "G-BD9XWB2ELC"
  },
  LOGIN_URL : 'https://epod-zuul.herokuapp.com/api/v1/auth-service/oauth/token',
  FORGET_PASSWORD_URL  : "https://epod-zuul.herokuapp.com/api/v1/auth-service/update/password/mail",
  CONFIRMATION_EMAIL_URL : "https://epod-zuul.herokuapp.com/api/v1/auth-service/registration/confirm?token=",
  PASSWORD_UPDATE_TOKEN_URL : "https://epod-zuul.herokuapp.com/api/v1/auth-service/update/password?token=",
  PASSWORD_UPDATE_URL : 'https://epod-zuul.herokuapp.com/api/v1/auth-service/update/password',
  LOG_OUT_URL :'https://epod-zuul.herokuapp.com/api/v1/auth-service/logingout',
  REGISTER_URL: 'https://epod-zuul.herokuapp.com/api/v1/auth-service/user/create',
  INVITER_URL : 'https://epod-zuul.herokuapp.com/api/v1/auth-service/user/invite',
  VERIF_TOK_INVITE : "https://epod-zuul.herokuapp.com/api/v1/auth-service/user/invite?token=",
  USERS_URL : "https://epod-zuul.herokuapp.com/api/v1/auth-service/user/all",
  BLOCK_USER_URL : "https://epod-zuul.herokuapp.com/api/v1/auth-service/update/user/enable",
  ADD_PATIENT_URL :"https://epod-zuul.herokuapp.com/api/v1/patient-service/create",
  LIST_PATIENT_URL :"https://epod-zuul.herokuapp.com/api/v1/patient-service/all/professional",
  ADD_SOCIO :"https://epod-zuul.herokuapp.com/api/v1/patient-service/socio",
  ADD_ANTE :"https://epod-zuul.herokuapp.com/api/v1/patient-service/antecedents",
  GET_SOCIO :"https://epod-zuul.herokuapp.com/api/v1/patient-service/socio",
  ADD_EXAM : "https://epod-zuul.herokuapp.com/api/v1/patient-service/clinicalexamination",
  ADD_LIPID : "https://epod-zuul.herokuapp.com/api/v1/patient-service/lipidprofile",
  GET_PATIENT_BY_ID : "https://epod-zuul.herokuapp.com/api/v1/patient-service/id",
  VERIF_TOKEN_PATIENT :"https://epod-zuul.herokuapp.com/api/v1/patient-service/questionnaire?token=",
  LOGIN_PATIENT : "https://epod-zuul.herokuapp.com/api/v1/patient-service/login",
  ADD_DEVICE : "https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device",
  RM_DEVICE : "https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device",
  LIST_DEVICES : "https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device/all",
  AUTH_DEVICE : "https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device/authorization",
  LIST_DEVICE_AVAILABLE :"https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device/all/available/institution",
  AFFECT_DEVICE :"https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device/assign",
  RECUP_DEVICE :"https://epod-zuul.herokuapp.com/api/v1/fitbit-service/device/back",
  ADD_RDV :"https://epod-zuul.herokuapp.com/api/v1/patient-service/appointment",
  LIST_RDV : "https://epod-zuul.herokuapp.com/api/v1/patient-service/appointment/all",
  ADD_QUIZ : "https://epod-zuul.herokuapp.com/api/v1/patient-service/questionnaire",
  ADD_RECO : "https://epod-zuul.herokuapp.com/api/v1/patient-service/recommendation",
  ALL_RECO : "https://epod-zuul.herokuapp.com/api/v1/patient-service/recommendation/all",
  REFRESH_TOKEN : 'https://epod-zuul.herokuapp.com/api/v1/auth-service/oauth/token',
  GET_STEPS : 'https://epod-zuul.herokuapp.com/api/v1/fitbit-service/activity/steps',
  GET_ACTIVEMINUTES : 'https://epod-zuul.herokuapp.com/api/v1/fitbit-service/activity/activeminutes',
  GET_QUIZ : 'https://epod-zuul.herokuapp.com/api/v1/patient-service/questionnaire/all',
  ADD_QUIZINDI : "https://epod-zuul.herokuapp.com/api/v1/patient-service/questionnaire/individual"












};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
