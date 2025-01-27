import { Component, NgModule, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormationServiceService } from '../../service/formation-service.service';

@Component({
  selector: 'app-aceuil',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './aceuil.component.html',
  styleUrl: './aceuil.component.css'
})
export class AceuilComponent implements OnInit{
formations:any = {};
constructor( private formationService:FormationServiceService) { }
ngOnInit(): void {
  this.getAllformation();
}

getAllformation() {
  this.formationService.getAllformation().subscribe((res: any) => {
    this.formations = res;
  });
}
}