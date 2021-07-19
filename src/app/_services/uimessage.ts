import {Message} from "./message";

export class Uimessage {
  page : string
  value : Message[]


  constructor(page: string, value: Message[]) {
    this.page = page;
    this.value = value;
  }
}
