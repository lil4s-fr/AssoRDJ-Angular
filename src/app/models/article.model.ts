import Categorie from "./categorie.model";
import Utilisateur from "./utilisateur.model";

export default interface Article{
    id?: number,
    categories: Partial<Categorie>[] | {id:number},
    utilisateurs?: Utilisateur[],
    titre: string,
    corps: string,
    fichier: string,
    date_ecriture?: string,
    date_modif?: string,
    like_dislike?: number    
}