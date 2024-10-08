import { LieuNaissance, Role, Sexe, SituationFamiliale, TypeRisque } from "../Enum/enums";
import { Compte } from "./compte";

export interface User {
    id: number;
    role: Role;
    numCin: number;
    nom: string;
    prenom: string;
    dateNaiss: Date;
    formattedDateNaiss?: string;
    lieuNaiss: LieuNaissance;
    sexe: Sexe;
    sf: SituationFamiliale;
    profilePicture: string;
    email: string;
    password: string;
    age: number;
    typeRisque: TypeRisque;
    salaire: number;
    comptes: Compte[];
  }