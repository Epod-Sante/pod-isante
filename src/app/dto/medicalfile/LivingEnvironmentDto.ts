
export class LivingEnvironmentDto {
    zone : string;
    type : string;
    services : boolean;

  constructor(zone: string, type: string, services: boolean) {
    this.zone = zone;
    this.type = type;
    this.services = services;
  }
}
