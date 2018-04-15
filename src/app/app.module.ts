import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuditoriumListComponent } from './components/auditorium-list/auditorium-list.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { TheatreComponent } from './components/theatre/theatre.component';
import { MovieComponent } from './components/cinema/movie/movie.component';
import { PlayComponent } from './components/theatre/play/play.component';
import { FanZoneComponent } from './components/fan-zone/fan-zone.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { OneClickTicketComponent } from './components/one-click-ticket/one-click-ticket.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AdminFanZoneComponent } from './components/admin-panel/admin-fan-zone/admin-fan-zone.component';
import { HomeComponent } from './components/home/home.component';
import { BidService} from './services/bid.service';
import { CinemaService} from './services/cinema.service';
import { FanItemService} from './services/fan-item.service';
import { FanadService} from './services/fanad.service';
import { FanzoneService} from './services/fanzone.service';
import { TheatreService} from './services/theatre.service';
import { SearchComponent } from './shared/components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AddCinemaComponent } from './components/cinema/add-cinema/add-cinema.component';
import { AddTheatreComponent } from './components/theatre/add-theatre/add-theatre.component';


import { ListComponent } from './shared/components/list/list.component';
import { RoutingModule } from './app-routing/routing.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { CinemaListComponent } from './components/cinema/cinema-list/cinema-list.component';
import { AuthService } from './services/auth.service';
import { TheatreListComponent } from './components/theatre/theatre-list/theatre-list.component';
import { AdminFanZoneItemsComponent } from './components/admin-panel/admin-fan-zone/admin-fan-zone-items/admin-fan-zone-items.component';
import { AddMovieComponent } from './components/cinema/movie/add-movie/add-movie.component';
import { MovieListComponent } from './components/cinema/movie/movie-list/movie-list.component';
import { MovieService } from './services/movie.service';
import { ActorService } from './services/actor.service';
import { DirectorService } from './services/director.service';
import { GenreService } from './services/genre.service';
import {HomeAdminComponent} from './components/admin-panel/home-admin/home-admin.component';
import {UserAdministrationComponent} from './components/admin-panel/user-administration/user-administration.component';
import {MembershipAdminComponent} from './components/admin-panel/membership-admin/membership-admin.component';
import {FanadAdminComponent} from "app/components/admin-panel/fanad-admin/fanad-admin.component";
import {AllAdsComponent} from "app/components/admin-panel/fanad-admin/all-ads/all-ads.component";
import {AuditoriumService} from "app/services/auditorium.service";
import {UserRoleService} from './services/user-role.service';
import {MembershipService} from './services/membership.service';
import {FanadToApproveComponent} from './components/admin-panel/fanad-admin/fanad-to-approve/fanad-to-approve.component';
import { AddPlayComponent } from './components/theatre/play/add-play/add-play.component';
import { PlayListComponent } from './components/theatre/play/play-list/play-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuditoriumListComponent,
    CinemaComponent,
    TheatreComponent,
    MovieComponent,
    PlayComponent,
    FanZoneComponent,
    ReservationComponent,
    RegistrationComponent,
    OneClickTicketComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AdminFanZoneComponent,
    HomeComponent,
    SearchComponent,
    UserProfileComponent,
    AddCinemaComponent,
    AddTheatreComponent,
    LoginComponent,
    ListComponent,
    CinemaListComponent,
    TheatreListComponent,
    AdminFanZoneItemsComponent,
    AddMovieComponent,
    MovieListComponent,
    HomeAdminComponent,
    UserAdministrationComponent,
    MembershipAdminComponent,
    FanadAdminComponent,
    AllAdsComponent,
    FanadToApproveComponent,
    AddPlayComponent,
    PlayListComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BidService, CinemaService, FanItemService, AuthService,
     FanadService, FanzoneService, TheatreService, UserService, MovieService,
     DirectorService, ActorService, GenreService, AuditoriumService, UserRoleService,
    MembershipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
