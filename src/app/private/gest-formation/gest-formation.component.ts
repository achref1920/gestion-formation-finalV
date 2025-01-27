import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormationServiceService } from '../../service/formation-service.service';
import Swal from 'sweetalert2';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar.component';

@Component({
  selector: 'app-gest-formation',
  standalone: true,
  imports: [CommonModule, FormsModule,AdminNavBarComponent],
  templateUrl: './gest-formation.component.html',
  styleUrls: ['./gest-formation.component.css']
})
export class GestFormationComponent implements OnInit {
  formationList: any[] = [];
  formationRegister: any = {}

  constructor(private formationService: FormationServiceService) { }

  ngOnInit(): void {
    this.getAllformation();
  }

  getAllformation() {
    this.formationService.getAllformation().subscribe((res: any) => {
      this.formationList = res;
    });
  }

  ajout() {
    Swal.fire({
      title: 'Ajouter une formation',
      html: `
        <div class="form-group">
          <label for="titre">Titre:</label>
          <input type="text" id="titre" class="form-control">
          <label for="description">Description:</label>
          <input type="text" id="description" class="form-control">
          <label for="chargeHoraire">Charge Horaire:</label>
          <input type="number" id="chargeHoraire" class="form-control">
          <label for="difficulte">Niveau de Difficulte:</label>
          <input type="text" id="difficulte" class="form-control">
          <label for="tags">Tags:</label>
          <input type="text" id="tags" class="form-control">
          <label for="categories">Catégories:</label>
          <input type="text" id="categories" class="form-control">
          <label for="programme">Programme:</label>
          <input type="text" id="programme" class="form-control">
          <label for="image">Image URL:</label>
          <input type="text" id="image" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Ajouter',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const titre = (document.getElementById('titre') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        const chargeHoraire = (document.getElementById('chargeHoraire') as HTMLInputElement).value;
        const difficulte = (document.getElementById('difficulte') as HTMLInputElement).value;
        const tags = (document.getElementById('tags') as HTMLInputElement).value.split(',').map(tag => tag.trim());
        const categories = (document.getElementById('categories') as HTMLInputElement).value.split(',').map(cat => cat.trim());
        const programme = (document.getElementById('programme') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
  
        this.formationRegister = {
          titre,
          description,
          chargeHoraire,
          difficulte,
          tags,
          categories,
          programme,
          image
        };
  
        this.formationService.addFormation(this.formationRegister).subscribe((res => {
          Swal.fire({ title: 'Formation ajoutée avec succès', icon: 'success' });
          this.getAllformation();
        }));
      }
    });
  }
deleteFormation(id: any) {
  Swal.fire({
    title: 'Êtes-vous sûr de vouloir supprimer cette formation?',
    showCancelButton: true,
    confirmButtonText: 'Supprimer',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      this.formationService.deleteFormation(id).subscribe((res) => {
        Swal.fire({ title: 'Formation supprimée avec succès', icon: 'success' });
        this.getAllformation();
      });
    }
  });
}
EditFormation(id1: number) {
  this.formationService.getFormationById(id1).subscribe((formation: any) => {
    Swal.fire({
      title: 'Modifier une formation',
      html: `
        <div class="form-group">
          <label for="titre">Titre:</label>
          <input type="text" id="titre" value="${formation.titre}" class="form-control">
          <label for="description">Description:</label>
          <input type="text" id="description" value="${formation.description}" class="form-control">
          <label for="chargeHoraire">Charge Horaire:</label>
          <input type="text" id="chargeHoraire" value="${formation.chargeHoraire}" class="form-control">
          <label for="programme">Programme:</label>
          <input type="text" id="programme" value="${formation.programme}" class="form-control">
          <label for="difficulte">Niveau de Difficulte:</label>
          <input type="text" id="difficulte" value="${formation.difficulte}" class="form-control">
          <label for="categories">Catégories:</label>
          <input type="text" id="categories" value="${formation.categories.join(', ')}" class="form-control">
          <label for="tags">Tags:</label>
          <input type="text" id="tags" value="${formation.tags.join(', ')}" class="form-control">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Modifier',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const titre = (document.getElementById('titre') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        const chargeHoraire = (document.getElementById('chargeHoraire') as HTMLInputElement).value;
        const programme = (document.getElementById('programme') as HTMLInputElement).value;
        const difficulte = (document.getElementById('difficulte') as HTMLInputElement).value;
        const categories = (document.getElementById('categories') as HTMLInputElement).value.split(',').map(cat => cat.trim());
        const tags = (document.getElementById('tags') as HTMLInputElement).value.split(',').map(tag => tag.trim());
        const image = formation.image;

        this.formationRegister = {
          titre,
          description,
          chargeHoraire,
          programme,
          difficulte,
          categories,
          tags,
          image
        };

        return this.formationService.editFormation(id1, this.formationRegister).toPromise();
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Formation mise à jour avec succès',
        });
        this.getAllformation();
      }
    });
  });
}}