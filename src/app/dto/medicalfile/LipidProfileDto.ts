export class LipidProfileDto {


   id: string;
   ldl: number;
   hdl: number;
   nohdl: number;
   triglyceride: number;
   hba1c: number;
   date: string;
  glucoseJeun: number;
  glucoseAleatoire: number;


  constructor(id: string, ldl: number, hdl: number, nohdl: number, triglyceride: number, hba1c: number, date: string, glucoseJeun: number, glucoseAleatoire: number) {
    this.id = id;
    this.ldl = ldl;
    this.hdl = hdl;
    this.nohdl = nohdl;
    this.triglyceride = triglyceride;
    this.hba1c = hba1c;
    this.date = date;
    this.glucoseJeun = glucoseJeun;
    this.glucoseAleatoire = glucoseAleatoire;
  }
}
