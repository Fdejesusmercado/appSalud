import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ChatsComponent } from './chats/chats.component';
import { VigilanteGuard } from './vigilante.guard';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';
const routes: Routes = [
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'login',component :LoginComponent },
  {path:'perfil',component : PerfilComponent,canActivate:[VigilanteGuard]},
  {path:'chats',component : ChatsComponent,canActivate:[VigilanteGuard]},
  {path:'maps',component : MapScreenComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
