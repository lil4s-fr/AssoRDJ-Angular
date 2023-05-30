export default interface Reservation{
    id_reservation: number,
    demandeur: string,
    participant: string,
    validation: boolean,
    date_reservation: string,
    date_evenement: string,
    heure_debut: string,
    duree: number,
    description: string
}