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
import {UserProfileComponent} from '../components/user-profile/user-profile.component';


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
  { path: 'profile', component: UserProfileComponent},

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
