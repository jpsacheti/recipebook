import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;
    authObs = this.isLoginMode ? this.authService.login(email, password) : this.authService.signUp(email, password);
    authObs.subscribe(respData => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      });
    authForm.reset();
  }

  onClose() {
    this.error = null;
  }

  private showErrorAlert(errorMessage: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const viewContainerRef = this.alertHost.viewContainerRef;
    viewContainerRef.clear();
    const compRef = viewContainerRef.createComponent(factory);
    compRef.instance.message = errorMessage;
    this.subscription = compRef.instance.close.subscribe(() => {
      this.onClose();
      this.subscription.unsubscribe();
      viewContainerRef.clear();
    });
  }
}
