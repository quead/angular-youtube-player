import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './components/youtube-history.component';
import { AboutComponent } from './components/youtube-about.component';
import { SettingsComponent } from './components/youtube-settings.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
    { path: 'home', component: CategoryComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
