import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeCredit } from '../entities/DemandeCredit';
import { Echeance } from '../entities/echeance';
import { Statut } from '../Enum/enums';

@Injectable({
  providedIn: 'root'
})
export class DemandeCreditService {
  private apiDemande: string = 'http://localhost:4444/DemandesCredit';
  private apiEcheance: string = 'http://localhost:4444/echeances';
  private apiPieceJointe : string ='http://localhost:4444/piece-jointes'


  constructor(private http : HttpClient) {  }


  createDemandeCredit(demandeCredit: DemandeCredit): Observable<DemandeCredit> {
    return this.http.post<DemandeCredit>(this.apiDemande, demandeCredit);
  }

  getDemandeByUserId(id: number): Observable<DemandeCredit[]> {
    return this.http.get<DemandeCredit[]>(`${this.apiDemande}/user/${id}`);
  }
  getnbreDemandes() : Observable<number> {
    return this.http.get<number> (`${this.apiDemande}/nbreDemandes`)
  }
  getnbreDemandesAcc() : Observable<number> {
    return this.http.get<number> (`${this.apiDemande}/nbreDemandesAcc`)
  }
  getnbreDemandesRej() : Observable<number> {
    return this.http.get<number> (`${this.apiDemande}/nbreDemandesRej`)
  }
  generateEcheances(montant: number, duree: number, typeCredit: string): Observable<Echeance[]> {
    // Prepare URL parameters
    const params = new HttpParams()
      .set('montant', montant.toString())
      .set('duree', duree.toString())
      .set('typeCredit', typeCredit);

    return this.http.post<Echeance[]>(`${this.apiEcheance}/generateEcheances`, null, { params });
  }

  getAllDemandesCredit(): Observable<DemandeCredit[]> {
    return this.http.get<DemandeCredit[]>(`${this.apiDemande}`);
  }
  updateStatus(id: number, statut: Statut): Observable<any> {
    const payload = { statut: statut };  // Wrap the status in an object
    return this.http.patch(`${this.apiDemande}/${id}/status`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  }

  uploadFile(file: File, obligatoire: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('obligatoire', obligatoire.toString());

    return this.http.post(`${this.apiPieceJointe}/upload`, formData, {
      responseType: 'text' // Adjust response type as needed
    });
  }

}
