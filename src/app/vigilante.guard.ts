import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class VigilanteGuard implements CanActivate {
  
  constructor(private msg:ToastrService,private cookieService: CookieService,private router : Router){}

  redirect(flag:boolean){
    if (!flag){
      this.router.navigate(['/login'])
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const cookie = this.cookieService.check('loginToken')
    if (!cookie) { 
      this.msg.error(`Antes debe iniciar sesion`, 'Permiso denegado', {
      timeOut: 3000,
      progressBar:true,
      });
    }else{

    }
    this.redirect(cookie)
    return cookie;
  }
  
}
