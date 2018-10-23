import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './components/youtube-history.component';
import { AboutComponent } from './components/youtube-about.component';
import { SettingsComponent } from './components/youtube-settings.component';
import { CategoryComponent } from './components/category/category.component';

export const router: Routes = [
    { path: 'home', component: CategoryComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '**', redirectTo: 'home' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
