import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationServiceService } from '../../service/formation-service.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../navbar/navbar.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  id:number=0
   formation:any;
   session:any;
   train:any;
   candidat:any = {};
   candidatList: any[] = [];


   constructor( private route: ActivatedRoute,  private sess:FormationServiceService){}   
   



    ngOnInit(){

      this.route.params.subscribe((param)=>
        {
          this.id=+param['id']
        }
        )
      this.appCadnidat();
      console.log(this.candidatList+"candidat"+this.candidatList.length +"candidat")

      this.appformation();
      this.appsession();
   
    }
    appformation(){

      this.sess. getFormationById(this.id).subscribe((data:any )=>{
       this.formation =data
        console.log(this.formation+"formation")
      }

      )

      
     }
     appCadnidat(){
     this.sess.getAllCandidat().subscribe((data:any)=>{
        this.candidatList=data;
        console.log(this.candidatList+"candidat"+this.candidatList.length +"candidat")
      })
      }


     appsession() {
      this.sess.getSessionByIdFormation(this.id).subscribe((data: any) => {
        this.session = data;
        if (this.session && this.session.formateurIds && this.session.formateurIds.length > 0) {
          for (let i = 0; i <= this.session.formateurIds.length; i++) {
            this.appformateur(this.session.formateurIds[i]);
          }
          
        }
      });
    }
   
     appformateur(id:number){
      this.train= this.sess.GetformateurById(id).subscribe((data:any)=>{
        console.log(data);
       this.train=data
       
      })
     }

     inscrti() {
      Swal.fire({
        title: 'Inscription Candidat',
        html: `
          <div class="form-group">
            <label for="prenom">Prenom:</label>
            <input type="text" id="prenom" class="form-control swal2-input">
            <label for="nom">Nom:</label>
            <input type="text" id="nom" class="form-control swal2-input">
            <label for="email">Email:</label>
            <input type="email" id="email" class="form-control swal2-input">
            <label for="cin">CIN:</label>
            <input type="text" id="cin" class="form-control swal2-input">
            <label for="photo">Photo URL:</label>
            <input type="text" id="photo" class="form-control swal2-input">
            <label for="motDePasse">Mot de Passe:</label>
            <input type="password" id="motDePasse" class="form-control swal2-input">
          </div>
        `,
        confirmButtonText: 'Valider',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
          const nom = (document.getElementById('nom') as HTMLInputElement).value;
          const email = (document.getElementById('email') as HTMLInputElement).value;
          const cin = (document.getElementById('cin') as HTMLInputElement).value;
          const photo = (document.getElementById('photo') as HTMLInputElement).value;
          const motDePasse = (document.getElementById('motDePasse') as HTMLInputElement).value;
    
          this.candidat = {
            id: String(this.candidatList.length + 1),
            prenom,
            nom,
            email,
            cin,
            photo,
            motDePasse
          };
    
          return this.sess.addCandidat(this.candidat).toPromise();
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.session.registerCandidat++;
          if (this.session.candidatsInscrits) {
            this.session.candidatsInscrits.push(this.candidat.id);
            this.sess.editSession(this.session.id, this.session).subscribe();
          }
          Swal.fire('Inscription réussie', '', 'success');
        }
      });
    }


  }
