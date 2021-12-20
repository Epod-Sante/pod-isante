import {Uimessage} from "./uimessage";
import {Message} from "./message";

let messageLogin : Message[] = [
  new Message(" la connexion n'est pas autorise, contacter l'clinician",true,"500"),
  new Message("Donnees de connexion invalides ",true,"400"),
  new Message("Problemes internes du serveur, Contacter l'clinician : clinician@epod.com ",true,"500"),
  new Message("Connexion reussite, Bienvenue",false,"500")

]
let messageRegister : Message[] = [
  new Message(" l'enregistrement n'est pas autorise, contacter l'clinician",true,"500"),
  new Message("Donnees saisies invalides ",true,"500"),
  new Message("Problemes internes du serveur, Contacter l'clinician : clinician@epod.com ",true,"500"),
  new Message("operation reussite , vous pouvez se connecter a votre profil",false,"500")

]

export const  messages : Uimessage[]=  [new Uimessage("/login",messageLogin),
                                        new Uimessage("/register", messageRegister)

]
