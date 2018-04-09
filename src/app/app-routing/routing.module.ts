import {NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {AuditoriumListComponent} from '../components/auditorium-list/auditorium-list.component';
import {CinemaComponent} from '../components/cinema/cinema.component';
import {MovieComponent } from '../components/cinema/movie/movie.component';
import {TheatreComponent} from '../components/theatre/theatre.component';
import {PlayComponent} from '../components/theatre/play/play.component';
import {FanZoneComponent} from '../components/fan-zone/fan-zone.component';
import {AdminPanelComponent} from '../components/admin-panel/admin-panel.component';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../components/home/home.component';
import {RegistrationComponent} from '../components/registration/registration.component';
import {LoginComponent} from '../components/login/login.component';
<<<<<<< HEAD
import { AddCinemaComponent } from '../components/cinema/add-cinema/add-cinema.component';
import { AddTheatreComponent } from '../components/theatre/add-theatre/add-theatre.component'; 
=======
import {UserProfileComponent} from '../components/user-profile/user-profile.component';
>>>>>>> 225b9b1976769f02a6e251f3a7d6e157f0fba5ec


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'auditorium/:type', component: AuditoriumListComponent},
  { path: 'auditorium/cinema', component: CinemaComponent},
  { path: 'auditorium/cinema/:id', component: MovieComponent},
  { path: 'auditorium/theatre', component: TheatreComponent},
  { path: 'auditorium/theatre/:id', component: PlayComponent},
  { path: 'fanzone', component: FanZoneComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
<<<<<<< HEAD
  { path: 'addCinema', component: AddCinemaComponent},
  { path: 'addTheatre', component: AddTheatreComponent},
=======
  { path: 'profile', component: UserProfileComponent},
>>>>>>> 225b9b1976769f02a6e251f3a7d6e157f0fba5ec

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports : [RouterModule],
  declarations: []
})
export class RoutingModule { }
