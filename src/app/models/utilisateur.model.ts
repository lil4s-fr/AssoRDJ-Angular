import Categorie from "./categorie.model"
import Coordonnee from "./coordonnee.model"

export default interface Utilisateur{
    id: number,
    nom: string,
    prenom: string,
    numeroAdherent: number,
    pseudo: string,
    email: string,
    hashMotDePasse: string,
    coordonnees: Coordonnee[],
    categories: Categorie[]
}