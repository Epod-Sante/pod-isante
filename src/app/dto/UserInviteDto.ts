 export class UserInviteDto {

  adminUsername : string;
  email : string;
  role : string;
  tokenExist : boolean;
   emailExist :boolean;
  errorMessage : string;
   tokenValid : boolean;
   tokenExpired : boolean;
   accountEnabled : boolean;



   constructor(adminUsername: string,
               email: string,
               role: string,
               tokenExist : boolean,
               errorMessage : string,
               emailExist : boolean,
               tokenValid : boolean,
               tokenExpired : boolean,
               accountEnabled : boolean

               ) {
     this.adminUsername = adminUsername;
     this.email = email;
     this.role = role;
     this.errorMessage = errorMessage;
     this.tokenExist = tokenExist;
     this.emailExist = emailExist;
     this.tokenValid = tokenValid;
     this.tokenExpired = tokenExpired;
     this.accountEnabled = accountEnabled;

   }
 }
