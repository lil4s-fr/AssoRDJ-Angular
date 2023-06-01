import Salle from "./salle.model";
import Utilisateur from "./utilisateur.model";

export default interface Reservation{
    id: number,
    salle: Salle,
    utilisateurs: Utilisateur[],
    participant: number,
    validation: boolean,
    date_reservation: string,
    creneau: string,
    date_evenement: string,
    description: string
}