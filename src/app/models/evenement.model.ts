import Categorie from "./categorie.model"

export default interface Evenement{
    id: number,
    categories: Categorie[],
    nom: string,
    dateCreation: string,
    dateDebut: string,
    dateFin: string,
    description: string
}