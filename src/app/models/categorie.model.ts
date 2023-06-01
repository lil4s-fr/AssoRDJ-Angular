import Reservation from "./reservation.model"

export default interface Categorie{
    id: number,
    reservations: Reservation[],
    nom: string,
    description: string
}