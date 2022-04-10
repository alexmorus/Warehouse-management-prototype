import { Angajati } from "./angajati.model";
import { Distribuitori } from "./distribuitori.model";
import { Producatori } from "./producatori.model";

export class Produse {
    id: number;
    denumireProducator: string;
    denumireDistribuitor: string;
    producator: Producatori;
    distribuitor: Distribuitori;
    model: string;
    descriere: string;
    pret: string;
    poza: string;
    stoc: number;
    documentIntrare: string;
    dataIntrare: Date;
    idAngajatPreluare: string;
}