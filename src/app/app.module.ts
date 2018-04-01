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
import {RoutingModule} from './routing/routing.module';
import { HomeComponent } from './components/home/home.component';

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
    OneClickTicketComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AdminFanZoneComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
