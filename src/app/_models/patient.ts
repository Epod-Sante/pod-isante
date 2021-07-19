
export interface Patient {

  //infos personnels
  id: number;
  firstName: string;
  lastName: string;
  dateStart: string;
  dateEnd: string;
  birthday: string;
  genre : string;
  /*
  niveau AP
  activities: Activity[];*/

  statut_civil : string;
  statut_socio_econ : string;
  niveau_scolarite: string;
  adresse : string;
  emploi : string;
  //permenant_code : string;

  //dossier medical

  //atcd_medicaux
  //VO2_peak : La consommation maximale d'oxygène
  VO2_peak : number;
  /*Pressions arterielle
  L'augmentation isolée de la pression artérielle systolique au-dessus de 14 (140 mm de mercure) ;
  a pression artérielle diastolique au dessus de 9 (90 mm de mercure).*/
  pression_artérielle : number;
  /*fc_repos
  Valeures normales. Chez l'adulte en bonne santé, au repos,
   la fréquence cardiaque se situe entre 50 (sportif pratiquant l'endurance)
    et 80 pulsations par minute. Pendant un effort, la fréquence cardiaque maximale
     théorique est de 220 moins l'âge (exemple : 220 - 40 ans = 180)
   */
  fc_repos : number;
  //imc
  imc : number;
  //tour_taille

  tour_taille: number;

  /*bilan_lipidique
  Le bilan lipidique est considéré comme normal quand :
  le cholestérol total &lt; 2 g/l (le taux est considéré comme élevé s'il dépasse 2,4 g/l)
   le cholestérol-LDL &lt; 1 g/l (le taux est considéré comme élevé s'il dépasse 1,6 g/l)
   le cholestérol-HDL compris entre 0,4 et 0,6 g/l.
  */
  bilan_lipidique : number;
  //glycemine : Entre 4,0 et 7,0 mmol/L à jeun  ou avant un repas
  glycemine : number;
  /*hbA1c
    L'hémoglobine glyquée (ou HbA1c) est le reflet de la glycémie.
     Tandis que la glycémie capillaire et la glycémie à jeun sont
     des instantanés de l'état glycémique, l'HbA1c permet, par un dosage sanguin,
      d'évaluer l'équilibre glycémique sur une plus longue période (environ deux à trois mois).
*/
  hbA1c : number;


}
