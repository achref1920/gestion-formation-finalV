import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationServiceService {
  link="http://localhost:3000";
  constructor(private http:HttpClient) { 
  }


  getAllformation(): Observable<any> {
    return this.http.get<any>(`${this.link}/formations`);
  }
  getFormationById(id: number) {
    return this.http.get<any>(`${this.link}/formations/${id}`);
  }
  addFormation(formation: any) {
    return this.http.post<any>(`${this.link}/formations`, formation);
  }
  deleteFormation(id: number) {
    return this.http.delete<any>(`${this.link}/formations/${id}`);
  }
  editFormation(id: number, formation: any) {
    return this.http.put<any>(`${this.link}/formations/${id}`, formation);
  }



  getAllCandidat(){
    return this.http.get<any>(`${this.link}/candidats`);
  }
  getAllformateur(){
    return this.http.get<any>(`${this.link}/formateurs`);
  }
  addCandidat(user:any){
    return this.http.post<any>(`${this.link}/candidats`,user);
  }
 addFormateur(user:any){
    return this.http.post<any>(`${this.link}/formateurs`,user);
  }
  deleteCandidat(id: number) {
    return this.http.delete<any>(`${this.link}/candidats/${id}`);
  }
  deleteFormateur(id: number) {
    return this.http.delete<any>(`${this.link}/formateurs/${id}`);
  }
  editCandidate(id: number, user: any) {
    return this.http.put<any>(`${this.link}/candidats/${id}`, user);
  }
  getCondidatById(id: number) {
    return this.http.get<any>(`${this.link}/candidats/${id}`);
  }
  editFormateur(id: number, user: any) {
    return this.http.put<any>(`${this.link}/formateurs/${id}`, user);
  }








  getAllsessions(){
    return this.http.get<any>(`${this.link}/sessions`);
  }
  getsession(id:number){
    return this.http.get<any>(`${this.link}/sessions/${id}`);
  }
  GetformateurById(id:number){
    return this.http.get<any>(`${this.link}/formateurs/${id}`);
  }
  getSessionByIdFormation(formation_id:number){
    return this.http.get<any>(`${this.link}/sessions/${formation_id}`);
  }

  editSession(id:number,session:any){
    return this.http.put<any>(`${this.link}/sessions/${id}`,session);
  }
  deleteSession(id:number){
    return this.http.delete<any>(`${this.link}/sessions/${id}`);}
addSession(session:any){
  return this.http.post<any>(`${this.link}/sessions`,session);}

  getSessionById(id:number){
    return this.http.get<any>(`${this.link}/sessions/${id}`);
  }
}
