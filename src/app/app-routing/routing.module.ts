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
import {FanadToApproveComponent} from '../components/admin-panel/fanad-admin/fanad-to-approve/fanad-to-approve.component';
import { AddPlayComponent } from '../components/theatre/play/add-play/add-play.component';
import { ReservationComponent } from '../components/reservation/reservation.component';
import { TerminComponent } from '../components/termin/termin.component';
import { OnlyAdminGuard } from './guards/only-admin-guard';
import { OnlyLoggedInGuard } from './guards/only-logged-in-guard';
import {FriendsComponent} from '../components/friends/friends.component';
import { MovieListComponent } from '../components/cinema/movie/movie-list/movie-list.component';
import {AuditoriumAdminComponent} from '../components/admin-panel/auditorium-admin/auditorium-admin.component';
import {HallAdminComponent} from '../components/admin-panel/auditorium-admin/hall-admin/hall-admin.component';
import {ModifyHallComponent} from '../components/admin-panel/auditorium-admin/hall-admin/modify-hall/modify-hall.component';
import {AuditoriumsAdminComponent} from '../components/admin-panel/auditorium-admin/auditoriums/auditoriums.component';
import {FanItemsComponent} from '../components/fan-zone/fan-items/fan-items.component';
import {FanAdsComponent} from '../components/fan-zone/fan-ads/fan-ads.component';
import {SingleAdComponent} from '../components/fan-zone/fan-ads/single-ad/single-ad.component';
import {MyAdsComponent} from '../components/user-panel/my-ads/my-ads.component';
import {MyItemsComponent} from '../components/user-panel/my-items/my-items.component';
import {MyBidsComponent} from '../components/user-panel/my-bids/my-bids.component';
import {InvitationComponent} from '../components/invitation/invitation.component';
import {AdminAudGuardService} from './guards/admin-aud-guard.service';
import {AdminFanGuardService} from './guards/admin-fan-guard.service';
import {AdminSysGuardService} from "app/app-routing/guards/admin-sys-guard.service";
import {OnlyAnonymousService} from './guards/only-anonymous.service';
import {MyZonesComponent} from '../components/admin-panel/admin-fan-zone/my-zones/my-zones.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'cinema', component: CinemaListComponent},
  { path: 'cinema/update/:id', component: CinemaListComponent},
  { path: 'cinema/:id', component: CinemaComponent},
  { path: 'cinema/:id/new', component: AddMovieComponent},
  { path: 'cinema/:id/movies', component: MovieListComponent},
  { path: 'cinema/:id/movie/:projId/termin', component: TerminComponent},
  { path: 'cinema/:id/termin', component: TerminComponent},
  { path: 'cinema/:id/reservation', component: ReservationComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'cinema/:id/movie/:movieId', component: MovieComponent},
  { path: 'theatre', component: TheatreListComponent},
  { path: 'theatre/:id', component: TheatreComponent},
  { path: 'theatre/:id/new', component: AddPlayComponent},
  { path: 'theatre/:id/play/:projId/termin', component: TerminComponent},
  { path: 'theatre/:id/play/:playId', component: PlayComponent},
  { path: 'friends', component: FriendsComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'fan-zones/:id/zone', component: FanZoneComponent, children: [
    {path: 'official-items', component: FanItemsComponent},
    {path: 'fan-ads', component: FanAdsComponent},
    {path: 'fan-ads/:adId', component: SingleAdComponent}
  ]},
  { path: 'admin-panel', component: AdminPanelComponent, children: [
    {path: '', component: HomeAdminComponent},
    {path: 'auditorium', component: AuditoriumAdminComponent, children: [
      {path: '', component: AuditoriumsAdminComponent, canActivate: [AdminSysGuardService]},
      {path: 'halls', component: HallAdminComponent, canActivate: [AdminAudGuardService]},
      {path: 'halls/modify/:hallId', component: ModifyHallComponent, canActivate: [AdminAudGuardService]},
      {path: 'halls/new', component: ModifyHallComponent, canActivate: [AdminAudGuardService]}
    ]},
    {path: 'fan-zone', component: AdminFanZoneComponent, canActivate: [AdminSysGuardService]},
    {path: 'my-zones', component: MyZonesComponent, canActivate: [AdminFanGuardService]},
    {path: 'my-zones/:id', component: AdminFanZoneItemsComponent, canActivate: [AdminFanGuardService]},
    {path: 'user-admin', component: UserAdministrationComponent, canActivate: [AdminSysGuardService]},
    {path: 'memberships', component: MembershipAdminComponent, canActivate: [AdminSysGuardService]},
    {path: 'fan-ads', component: FanadAdminComponent, canActivate: [AdminFanGuardService], children: [
      {path: '', component: AllAdsComponent},
      {path: 'to-approve', component: FanadToApproveComponent}
    ]}
  ]},
  { path: 'register', component: RegistrationComponent, canActivate: [OnlyAnonymousService]},
  { path: 'login', component: LoginComponent, canActivate: [OnlyAnonymousService]},
  { path: 'profile', component: UserProfileComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'my-ads', component: MyAdsComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'my-items', component: MyItemsComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'my-bids', component: MyBidsComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'reservations', component: ReservationComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'home/createReservation', component: ReservationComponent, canActivate: [OnlyLoggedInGuard]},
  { path: 'invitations', component: InvitationComponent, canActivate: [OnlyLoggedInGuard]}
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
