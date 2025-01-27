import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormationServiceService } from '../../service/formation-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FormsModule,RouterModule],
  templateUrl: './formations.component.html',
  styleUrl: './formations.component.css'
})
export class FormationsComponent implements OnInit {
  
  formations:any[] = [];
  filteredFormations: any[] = [];
  searchQuery: string = '';

  constructor(private formationService: FormationServiceService) { }
ngOnInit(): void {
  this.formationService.getAllformation().subscribe((data) => {
    this.formations = data;
    this.filteredFormations = this.formations;
  });
}

getAllformation() {
  this.formationService.getAllformation().subscribe((res: any) => {
    this.formations = res;
  });
}




 
    onSearch(): void {
      this.filteredFormations = this.formations.filter((formation) => {
        const titleLowerCase = (formation.title || '').toLowerCase();
        const tagsIncludeQuery = this.tagsIncludeQuery(formation.tags, this.searchQuery.toLowerCase());
    
        return titleLowerCase.includes(this.searchQuery.toLowerCase()) || tagsIncludeQuery;
      });
    }
    
  
    private tagsIncludeQuery(tags: string[] | undefined, query: string): boolean {
      if (!tags) {
        return false;
         
      }

      return tags.some(tag => tag.toLowerCase().includes(query));
    }
  }

