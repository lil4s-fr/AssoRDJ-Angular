import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private _nom!: string;
    private _prenom!: string;
    private _adresse!: string;
    private _numeroAsso!: number;

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