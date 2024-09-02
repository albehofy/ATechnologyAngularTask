import { Routes } from '@angular/router';
import { HouseComponent } from './Pages/house/house.component';

export const routes: Routes = [
    {
        path: '**', 
        component: HouseComponent
    }
];
