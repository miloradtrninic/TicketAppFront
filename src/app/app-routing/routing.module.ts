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
import { AddCinemaComponent } from '../components/cinema/add-cinema/add-cinema.component';
import { AddTheatreComponent } from '../components/theatre/add-theatre/add-theatre.component';
import { UserProfileComponent} from '../components/user-profile/user-profile.component';
import { CinemaListComponent } from '../components/cinema/cinema-list/cinema-list.component';
import { TheatreListComponent } from '../components/theatre/theatre-list/theatre-list.component';
import { AdminFanZoneComponent} from '../components/admin-panel/admin-fan-zone/admin-fan-zone.component';
import { AdminFanZoneItemsComponent} from '../components/admin-panel/admin-fan-zone/admin-fan-zone-items/admin-fan-zone-items.component';
import { AddMovieComponent } from '../components/cinema/movie/add-movie/add-movie.component';
import {UserAdministrationComponent} from '../components/admin-panel/user-administration/user-administration.component';
import {MembershipAdminComponent} from '../components/admin-panel/membership-admin/membership-admin.component';
import {AllAdsComponent} from '../components/admin-panel/fanad-admin/all-ads/all-ads.component';
import {FanadAdminComponent} from '../components/admin-panel/fanad-admin/fanad-admin.component';
import {HomeAdminComponent} from '../components/admin-panel/home-admin/home-admin.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'cinema', component: CinemaListComponent},
  { path: 'cinema/:id', component: CinemaComponent},
  { path: 'cinema/:id/new', component: AddMovieComponent},
  { path: 'cinema/:id/movie/:movieId', component: MovieComponent},
  { path: 'theatre', component: TheatreListComponent},
  { path: 'theatre/:id', component: TheatreComponent},
  { path: 'theatre/:id/play/:playId', component: TheatreComponent},
  { path: 'fanzone', component: FanZoneComponent},
  { path: 'admin-panel', component: AdminPanelComponent, children: [
    {path: '', component: HomeAdminComponent},
    {path: 'fan-zone', component: AdminFanZoneComponent},
    {path: 'fan-zone/:id', component: AdminFanZoneItemsComponent},
    {path: 'user-admin', component: UserAdministrationComponent},
    {path: 'memberships', component: MembershipAdminComponent},
    {path: 'fan-ads', component: FanadAdminComponent, children: [
      {path: '', component: AllAdsComponent},
      {path: 'to-approve', component: AllAdsComponent}
    ]}
  ]},
  { path: 'register', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: UserProfileComponent}

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
