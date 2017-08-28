import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/youtube-search.component';
import { HistoryComponent } from './components/youtube-history.component';
import { AboutComponent } from './components/youtube-about.component';
import { SettingsComponent } from './components/youtube-settings.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SearchComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
