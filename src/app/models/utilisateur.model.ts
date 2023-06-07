import Categorie from "./categorie.model"
import Coordonnee from "./coordonnee.model"
import Permission from "./permission.model"

export default interface Utilisateur{
  id: number,
  nom: string,
  prenom: string,
  numeroAdherent: number,
  pseudo: string,
  email: string,
  numeroTelephone: string,
  hashMotDePasse: string,
  coordonnees: Coordonnee[],
  permission: Permission,
  categories: Categorie[]
}