import { Component, OnInit } from '@angular/core';
import { FormationServiceService } from '../../service/formation-service.service';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gest-formateurs',
  standalone: true,
  imports: [AdminNavBarComponent,CommonModule],
  templateUrl: './gest-formateurs.component.html',
  styleUrl: './gest-formateurs.component.css'
})
export class GestFormateursComponent implements OnInit {
  formateur:any={};
  formateurList: any = {};
  ngOnInit(): void {
    this.getallFormateur();
  }
  constructor(private userService: FormationServiceService) { }

  getallFormateur() {
    this.userService.getAllformateur().subscribe((res: any) => {
      this.formateurList = res;
    });
  }


  ajoutFormateur() {
    Swal.fire({
      title: 'Ajouter un formateur',
      html: `
        <div class="form-group">
          <label for="nom">Nom:</label>
          <input type="text" id="nom" class="form-control">
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" class="form-control">
          <label for="email">Email:</label>
          <input type="text" id="email" class="form-control">
          <label for="telephone">Téléphone:</label>
          <input type="text" id="telephone" class="form-control">
          <label for="cin">CIN:</label>
          <input type="text" id="cin" class="form-control">
          <label for="photo">Photo URL:</label>
          <input type="text" id="photo" class="form-control">
          <label for="cv">CV:</label>
          <input type="text" id="cv" class="form-control">
          <label for="specialites">Spécialités:</label>
          <input type="text" id="specialites" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
        const nom = (document.getElementById('nom') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const telephone = (document.getElementById('telephone') as HTMLInputElement).value;
        const cin = (document.getElementById('cin') as HTMLInputElement).value;
        const photo = (document.getElementById('photo') as HTMLInputElement).value;
        const cv = (document.getElementById('cv') as HTMLInputElement).value;
        const specialites = (document.getElementById('specialites') as HTMLInputElement).value.split(',').map(spec => spec.trim());
        const id=String(this.formateurList.length + 1);
        this.formateur = {
          id,
          prenom,
          nom,
          email,
          telephone,
          cin,
          photo,
          cv,
          specialites
        };
  
        this.userService.addFormateur(this.formateur).subscribe((res => {
          Swal.fire({ title: 'Formateur ajouté avec succès', icon: 'success' });
          this.getallFormateur();
        }));
      }
    });
  }
  
  deleteFormateur(id1:number){
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir supprimer cette user ?',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          this.userService.deleteFormateur(id1).subscribe((res) => {
            Swal.fire({ title: 'Formation supprimée avec succès', icon: 'success' });
            this.getallFormateur();
          });
        }
      });
    }


    editFormateur(id1: number) {
      this.userService.GetformateurById(id1).subscribe((formateur: any) => {
        Swal.fire({
          title: 'Modifier un formateur',
          html: `
            <div class="form-group">
              <label for="nom">Nom:</label>
              <input type="text" id="nom" value="${formateur.nom}" class="form-control">
              <label for="prenom">Prénom:</label>
              <input type="text" id="prenom" value="${formateur.prenom}" class="form-control">
              <label for="email">Email:</label>
              <input type="text" id="email" value="${formateur.email}" class="form-control">
              <label for="telephone">Téléphone:</label>
              <input type="text" id="telephone" value="${formateur.telephone}" class="form-control">
              <label for="cin">CIN:</label>
              <input type="text" id="cin" value="${formateur.cin}" class="form-control">
              <label for="photo">Photo URL:</label>
              <input type="text" id="photo" value="${formateur.photo}" class="form-control">
              <label for="cv">CV:</label>
              <input type="text" id="cv" value="${formateur.cv}" class="form-control">
              <label for="specialites">Spécialités:</label>
              <input type="text" id="specialites" value="${formateur.specialites.join(', ')}" class="form-control">
            </div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Modifier',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const nom = (document.getElementById('nom') as HTMLInputElement).value;
            const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
            const email = (document.getElementById('email') as HTMLInputElement).value;
            const telephone = (document.getElementById('telephone') as HTMLInputElement).value;
            const cin = (document.getElementById('cin') as HTMLInputElement).value;
            const photo = (document.getElementById('photo') as HTMLInputElement).value;
            const cv = (document.getElementById('cv') as HTMLInputElement).value;
            const specialites = (document.getElementById('specialites') as HTMLInputElement).value.split(',').map(spec => spec.trim());
    
            this.formateur = {
              id: formateur.id,
              nom,
              prenom,
              email,
              telephone,
              cin,
              photo,
              cv,
              specialites
            };
    
            return this.userService.editFormateur(id1, this.formateur).toPromise();
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Formateur modifié avec succès',
            });
            this.getallFormateur();
          }
        });
      });
    }

}
