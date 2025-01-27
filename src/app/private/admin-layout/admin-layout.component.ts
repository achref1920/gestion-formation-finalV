import { Component } from '@angular/core';
import { AdminNavBarComponent } from '../../admin-nav-bar/admin-nav-bar.component';
import { GestFormationComponent } from '../gest-formation/gest-formation.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminNavBarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
