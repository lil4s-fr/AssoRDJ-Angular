import Categorie from "./categorie.model";
import Utilisateur from "./utilisateur.model";

export default interface Article{
    id: number,
    categories: Categorie[],
    utilisateurs?: Utilisateur[],
    titre: string,
    corps: string,
    date_ecriture?: string,
    date_modif?: string,
    like_dislike?: string    
}