import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './components/history/history.component';
import { AboutComponent } from './components/about/about.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FeedComponent } from './components/feed/feed.component';

const routes: Routes = [
	{ path: 'home', component: FeedComponent },
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
