import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuditoriumListComponent } from '../components/auditorium-list/auditorium-list.component';
import { CinemaComponent } from '../components/cinema/cinema.component';
import { TheatreComponent } from '../components/theatre/theatre.component';
import { FanZoneComponent } from '../components/fan-zone/fan-zone.component';
import { AdminPanelComponent } from '../components/admin-panel/admin-panel.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { AddCinemaComponent } from '../components/cinema/add-cinema/add-cinema.component';
import { AddTheatreComponent } from '../components/theatre/add-theatre/add-theatre.component'; 


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auditorium/:type', component: AuditoriumListComponent},
  { path: 'auditorium/cinema/:id', component: CinemaComponent},
  { path: 'auditorium/theatre/:id', component: TheatreComponent},
  { path: 'fanzone', component: FanZoneComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'addCinema', component: AddCinemaComponent},
  { path: 'addTheatre', component: AddTheatreComponent},


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
