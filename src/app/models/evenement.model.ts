import Categorie from "./categorie.model"
import Utilisateur from "./utilisateur.model"

export default interface Evenement{
    id: number,
    categories: Categorie[],
    nom: string,
    dateCreation: string,
    dateDebut: string,
    dateFin: string,
    description: string,
    lieu: string,
    utilisateur: Utilisateur[]
}