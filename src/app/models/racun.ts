import { Klijent } from './klijent';
import { tipRacuna } from './tipRacuna';

export class Racun {
  id: number;
  naziv: string;
  opis: string;
  oznaka: string;
  klijent: Klijent;
  tipRacuna: tipRacuna;
}
