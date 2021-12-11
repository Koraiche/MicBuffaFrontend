import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router) {}
            canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
            Observable<boolean> | Promise<boolean> | boolean{
                return Observable.create(
                    (observer:any) => {
                        this.auth.isAuth$.subscribe(
                            (auth) => {
                                  if (!auth) {
                                      console.log('NON CONNECTe¡')
                                      this.router.navigate(['/']);
                                  }
                                  observer.next(true);
                            }
                        );
                    }
                );
            }
}
