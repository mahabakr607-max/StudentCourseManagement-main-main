import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Courses } from './pages/courses/courses';
import { MyCoursesComponent } from './pages/my-courses/my-courses';
import { Homepage } from './pages/homepage/homepage';

import { ProfileComponent } from './pages/profile/profile';

import { EditProfileComponent } from './pages/edit-profile/edit-profile';

import { ChangePasswordComponent } from './pages/change-password/change-password';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  {
    path: 'login',
    component: Login
  },


  {
    path: 'register',
    component: Register
  },


  {
    path: 'courses',
    component: Courses
  },


  {
    path: 'profile',
    component: ProfileComponent
  },


  {
    path: 'editprofile',
    component: EditProfileComponent
  },


  {
    path: 'change-password',
    component: ChangePasswordComponent
  },


  {
    path: 'home',
    component: Homepage
  },


  {
    path: 'my-courses',
    component: MyCoursesComponent
  },


  {
    path: '**',
    redirectTo: 'login'
  }

];