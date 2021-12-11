import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentsComponent, DialogOverviewExampleDialog } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonrenduDirective } from './shared/nonrendu.directive';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { routes } from './app.routing';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { NotfoundComponent } from './home/notfound/notfound.component';
import { ReceptionComponent } from './home/reception/reception.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonrenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    NotfoundComponent,
    ReceptionComponent,
    SignupComponent,
    LoginComponent, DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule, FormsModule,
    BrowserAnimationsModule, MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule, MatTableModule,
    MatPaginatorModule, MatSortModule, ScrollingModule, MatSnackBarModule,
    MatSliderModule, MatDialogModule,
    HttpClientModule,  ReactiveFormsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
