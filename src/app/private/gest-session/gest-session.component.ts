import { Component, OnInit } from '@angular/core';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar.component';
import { FormationServiceService } from '../../service/formation-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gest-session',
  standalone: true,
  imports: [AdminNavBarComponent,CommonModule],
  templateUrl: './gest-session.component.html',
  styleUrl: './gest-session.component.css'
})
export class GestSessionComponent implements OnInit {

  sessionRegister:any = {};
  sessionList:any[] = [];
  constructor(private sess:FormationServiceService) { }
  ngOnInit(): void {
    this.getAllsessions();
  }

  getAllsessions(){
    this.sess.getAllsessions().subscribe((res: any) => {
      this.sessionList = res;
    });
  }

  deleteSession(id1:number){
    this.sess.deleteSession(id1).subscribe((res: any) => {
      this.getAllsessions();
    });
  }

  EditSession(id1: number) {
    this.sess.getSessionById(id1).subscribe((session: any) => {
      Swal.fire({
        title: 'Modifier une session',
        html: `
          <div class="form-group">
            <label for="formationId">Formation ID:</label>
            <input type="text" id="formationId" value="${session.formationId}" class="form-control">
            <label for="dateDebut">Date de début:</label>
            <input type="text" id="dateDebut" value="${session.dateDebut}" class="form-control">
            <label for="dateFin">Date de fin:</label>
            <input type="text" id="dateFin" value="${session.dateFin}" class="form-control">
            <label for="formateurIds">Formateurs:</label>
            <input type="text" id="formateurIds" value="${session.formateurIds.join(', ')}" class="form-control">
            <label for="candidatsInscrits">Participants:</label>
            <input type="text" id="candidatsInscrits" value="${session.candidatsInscrits.join(', ')}" class="form-control">
            <label for="registerCandidat">Nombre de candidats inscrits:</label>
            <input type="text" id="registerCandidat" value="${session.registerCandidat}" class="form-control">
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Modifier',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const formationId = (document.getElementById('formationId') as HTMLInputElement).value;
          const dateDebut = (document.getElementById('dateDebut') as HTMLInputElement).value;
          const dateFin = (document.getElementById('dateFin') as HTMLInputElement).value;
          const formateurIds = (document.getElementById('formateurIds') as HTMLInputElement).value.split(',').map(id => id.trim());
          const candidatsInscrits = (document.getElementById('candidatsInscrits') as HTMLInputElement).value.split(',').map(id => id.trim());
          const registerCandidat = (document.getElementById('registerCandidat') as HTMLInputElement).value;
  
          this.sessionRegister = {
            formationId,
            dateDebut,
            dateFin,
            formateurIds,
            candidatsInscrits,
            registerCandidat
          };
  
          return this.sess.editSession(id1, this.sessionRegister).toPromise();
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'Session mise à jour avec succès',
          });
          this.getAllsessions();
        }
      });
    });
  }

  ajout() {
    Swal.fire({
      title: 'Ajouter une session',
      html: `
        <div class="form-group">
          <label for="formationId">Formation ID:</label>
          <input type="text" id="formationId" class="form-control">
          <label for="dateDebut">Date de début:</label>
          <input type="text" id="dateDebut" class="form-control">
          <label for="dateFin">Date de fin:</label>
          <input type="text" id="dateFin" class="form-control">
          <label for="formateurIds">Formateurs:</label>
          <input type="text" id="formateurIds" class="form-control">
          <label for="candidatsInscrits">Participants:</label>
          <input type="text" id="candidatsInscrits" class="form-control">
          <label for="registerCandidat">Nombre de candidats inscrits:</label>
          <input type="text" id="registerCandidat" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const formationId = (document.getElementById('formationId') as HTMLInputElement).value;
        const dateDebut = (document.getElementById('dateDebut') as HTMLInputElement).value;
        const dateFin = (document.getElementById('dateFin') as HTMLInputElement).value;
        const formateurIds = (document.getElementById('formateurIds') as HTMLInputElement).value.split(',').map(id => id.trim());
        const candidatsInscrits = (document.getElementById('candidatsInscrits') as HTMLInputElement).value.split(',').map(id => id.trim());
        const registerCandidat = (document.getElementById('registerCandidat') as HTMLInputElement).value;
        const id= String(this.sessionList.length + 1);
        this.sessionRegister = {
          id,
          formationId,
          dateDebut,
          dateFin,
          formateurIds,
          candidatsInscrits,
          registerCandidat
        };
  
        this.sess.addSession(this.sessionRegister).subscribe((res => {
          Swal.fire({ title: 'Session ajoutée avec succès', icon: 'success' });
          this.getAllsessions();
        }));
      }
    });
  }
}
