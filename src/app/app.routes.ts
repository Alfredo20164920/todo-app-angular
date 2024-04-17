import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: ":filter",
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: "",
        redirectTo: "/all",
        pathMatch: "full"
      }
    ]
  }
];

