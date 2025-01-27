import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './private/admin-layout/admin-layout.component';
import { AceuilComponent } from './public/aceuil/aceuil.component';
import { FormationsComponent } from './public/formations/formations.component';
import { GestCondidatComponent } from './private/gest-condidat/gest-condidat.component';
import { GestFormateursComponent } from './private/gest-formateurs/gest-formateurs.component';
import { GestSessionComponent } from './private/gest-session/gest-session.component';
import { GestFormationComponent } from './private/gest-formation/gest-formation.component';
import { DetailsComponent } from './public/details/details.component';

export const routes: Routes = [

    {
        path:'',
        pathMatch:'full',
        component:AceuilComponent,
    },
    {
        path:'acceuil',
        component:AceuilComponent,
    },

    {
        path:'admin-space'
        ,component:AdminLayoutComponent ,
    },
    {
        path:'formation',
        component:FormationsComponent,
    },
    {
        path:'condidat',
        component:GestCondidatComponent
    }
    ,{
        path:'formateur',
        component:GestFormateursComponent
    },
    {
        path:'session',
        component:GestSessionComponent
    }
    ,{
        path:'gesformation',
        component:GestFormationComponent
    }
    ,{
        path:'deatails/:id',
        component:DetailsComponent
    }
];
