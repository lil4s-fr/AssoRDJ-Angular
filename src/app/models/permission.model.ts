import Utilisateur from "./utilisateur.model";

export default interface Permission{
    id: number,    
    utilisateurs: Utilisateur[],
    statut: string
}