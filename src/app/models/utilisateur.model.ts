import Categorie from "./categorie.model"
import Coordonnee from "./coordonnee.model"
import Permission from "./permission.model"

export default interface Utilisateur{
  id?: number,
  nom: string,
  prenom: string,
  numeroAdherent: number,
  pseudo: string,
  numeroTelephone:string,
  email: string,
  hashMotDePasse: string,
  coordonnees: Partial<Coordonnee>[],
  permission: Partial<Permission>,
  fichier: string
}