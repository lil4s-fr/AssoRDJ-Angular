import Typedemande from "./typedemande.model";
import Utilisateur from "./utilisateur.model";

export default interface Contact{
    id: number,
    utilisateur: Utilisateur,
    mail: string,
    message: string,
    typeDemande: Typedemande
}