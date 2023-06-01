import Article from "./article.model";
import Utilisateur from "./utilisateur.model";

export default interface Commentaire{
    id: number,
    utilisateur: Utilisateur,
    article: Article,
    commentaire: string,
    like_dislike: string   
}