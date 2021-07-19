 export class AccountDto{
  accountNonExpired :	Boolean;
  accountNonLocked :	Boolean;
  credentialsNonExpired	: Boolean;
  enabled :	Boolean;
  password	: String;
  username	: String;
  verificationToken	: String;
  verificationTokenExpirationDate: String;


   constructor(username: String, password: String) {
     this.password = password;
     this.username = username;
   }


 }
