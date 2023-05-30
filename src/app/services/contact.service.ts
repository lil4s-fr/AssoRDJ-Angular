import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    // valeur en dur temporaires pour le temps du codage
    private _nom: string = "Dias";
    private _prenom: string = "Antoine";
    private _adresse: string = "Rue de l'avenir 59144 Dunkerque";
    private _numeroAsso: number = 123456;

    constructor() {}

    get nom(): string{
        return this._nom;
    }

    get prenom(): string{
        return this._prenom;
    }

    get adresse(): string{
        return this._adresse;
    }

    get numeroAsso(): number{
        return this._numeroAsso;
    }
}