import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch:"full"
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'userprofile',
    component: UserProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
