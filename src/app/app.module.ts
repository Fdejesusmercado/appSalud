  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { LoginComponent } from './login/login.component';
  import { PerfilComponent } from './perfil/perfil.component';
  import { ChatsComponent } from './chats/chats.component';
  import { HttpClientModule } from '@angular/common/http';
  import { ReactiveFormsModule } from '@angular/forms';
  import { CookieService } from 'ngx-cookie-service';
  import { MapsModule } from './maps/maps.module';
  import { ToastrModule } from 'ngx-toastr';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { SocketIoModule } from 'ngx-socket-io';
  import { PerfilDocComponent } from './perfil-doc/perfil-doc.component';
  import { HistorialComponent } from './historial/historial.component';
  import { RegistroComponent } from './registro/registro.component';
  @NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      PerfilComponent,
      ChatsComponent,
      PerfilDocComponent,
      HistorialComponent,
      RegistroComponent
    ],
    imports: [
      BrowserModule,
      MapsModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      SocketIoModule.forRoot({ url: 'http://localhost:3000' })
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
