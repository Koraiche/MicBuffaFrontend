import { Routes } from "@angular/router";
import { AddAssignmentComponent } from "./assignments/add-assignment/add-assignment.component";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { AssignmentsComponent } from "./assignments/assignments.component";
import { EditAssignmentComponent } from "./assignments/edit-assignment/edit-assignment.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NotfoundComponent } from "./home/notfound/notfound.component";
import { ReceptionComponent } from "./home/reception/reception.component";
import { AuthGuard } from "./shared/auth.guard";

const routes:Routes = [
  {
    path : '', 
    component : ReceptionComponent
  },

  {
    path : 'login', component : LoginComponent
  },
  { 
    path: 'signup', component: SignupComponent
  },
  {
    path:"assignments",
    component:AssignmentsComponent,
    canActivate: [AuthGuard ]
  },
  
  {
    path:"add",
    component:AddAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"assignments/:id",
    component:AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"assignments/:id/edit",
    component:EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  // appelé lorsque aucune route n'a matché...
  {
     path: '**', 
    component : NotfoundComponent
    
  },
]

export {routes}
