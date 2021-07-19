

export class Token {
  access_token : string;
  token_type : string;
  expires_in : number;
  sccope : string;
  organization : string;
  jti : string;


  constructor(access_token: string, token_type: string, expires_in: number, scope: string, organization: string, jti: string) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
    this.sccope = scope;
    this.organization = organization;
    this.jti = jti;
  }
}
