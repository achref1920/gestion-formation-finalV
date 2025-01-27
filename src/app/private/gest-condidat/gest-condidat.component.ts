import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar.component';
import { FormationServiceService } from '../../service/formation-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gest-condidat',
  standalone: true,
  imports: [AdminNavBarComponent,CommonModule],
  templateUrl: './gest-condidat.component.html',
  styleUrl: './gest-condidat.component.css'
})
export class GestCondidatComponent implements OnInit {
  candidat:any={};
  CandidatList:any={};
  constructor( private userService:FormationServiceService) { }

  ngOnInit(): void {
    this.getAllCandidat();
  }
  getAllCandidat() {
    this.userService.getAllCandidat().subscribe((res: any) => {
      this.CandidatList = res;
    });
  }
  deleteUser(id1:number){
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette user ?',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        this.userService.deleteCandidat(id1).subscribe((res) => {
          Swal.fire({ title: 'Formation supprimée avec succès', icon: 'success' });
          this.getAllCandidat();
        });
      }
    });
  }

editCandidat(id:number){
  this.userService.getCondidatById(id).subscribe((candidat: any) => {
  
  ;
  Swal.fire({
    title: 'Modifier un candidat',
    html: `
    <div class="form-group">
      <label for="prenom">Prenom:</label>
      <input type="text" id="prenom" class="form-control" value="${candidat.prenom}">
      <label for="nom">Nom:</label>
      <input type="text" id="nom" class="form-control" value="${candidat.nom}">
      <label for="email">Email:</label>
      <input type="email" id="email" class="form-control" value="${candidat.email}">
      <label for="cin">CIN:</label>
      <input type="text" id="cin" class="form-control" value="${candidat.cin}">
      <label for="photo">Photo URL:</label>
      <input type="text" id="photo" class="form-control" value="${candidat.photo}">
      <label for="motDePasse">Mot de Passe:</label>
      <input type="password" id="motDePasse" class="form-control" value="${candidat.motDePasse}">
    </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Modifier',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
      const nom = (document.getElementById('nom') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const cin = (document.getElementById('cin') as HTMLInputElement).value;
      const photo = (document.getElementById('photo') as HTMLInputElement).value;
      const motDePasse = (document.getElementById('motDePasse') as HTMLInputElement).value;

      this.candidat = { prenom, nom, email, cin, photo, motDePasse };

      this.userService.editCandidate(id, this.candidat).subscribe((res => {
        Swal.fire({ title: 'Candidat modifié avec succès', icon: 'success' });
        this.getAllCandidat();
      }));
    }
  });
})}


ajoutCandidat() {
  Swal.fire({
    title: 'Ajouter un candidat',
    html: `
      <div class="form-group">
        <label for="prenom">Prenom:</label>
        <input type="text" id="prenom" class="form-control">
        <label for="nom">Nom:</label>
        <input type="text" id="nom" class="form-control">
        <label for="email">Email:</label>
        <input type="email" id="email" class="form-control">
        <label for="cin">CIN:</label>
        <input type="text" id="cin" class="form-control">
        <label for="photo">Photo URL:</label>
        <input type="text" id="photo" class="form-control">
        <label for="motDePasse">Mot de Passe:</label>
        <input type="password" id="motDePasse" class="form-control">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Ajouter',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const id = this.CandidatList.length + 1;
      const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
      const nom = (document.getElementById('nom') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const cin = (document.getElementById('cin') as HTMLInputElement).value;
      const photo = (document.getElementById('photo') as HTMLInputElement).value;
      const motDePasse = (document.getElementById('motDePasse') as HTMLInputElement).value;

      this.candidat = { id, prenom, nom, email, cin, photo, motDePasse };

      this.userService.addCandidat(this.candidat).subscribe((res => {
        Swal.fire({ title: 'Candidat ajouté avec succès', icon: 'success' });
        this.getAllCandidat();
      }));
    }
  });
}


}
