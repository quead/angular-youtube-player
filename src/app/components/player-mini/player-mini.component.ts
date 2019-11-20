import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalsService } from '../../services/globals.service';
import { PlayerComponent } from '../player/player.component';
import { ButtonsComponent } from '../player/buttons/buttons.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-player-mini',
	templateUrl: './player-mini.component.html',
	styleUrls: ['./player-mini.component.scss'],
	providers: [PlayerComponent]
})
export class PlayerMiniComponent implements OnInit {
	setPlayerVisible = false;
	disablePlayer = false;

	constructor(public globals: GlobalsService, public player: PlayerComponent, public playerCTA: ButtonsComponent, private router: Router) { }

	ngOnInit() {
		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: NavigationEnd) => {
			if (val.url !== '/home') {
				this.disablePlayer = true;
			} else {
				this.disablePlayer = false;
			}
		});
	}

	@HostListener('window:scroll', ['$event'])
	onWindowScroll() {
		if (window.scrollY > 280) {
			this.setPlayerVisible = true;
		} else {
			this.setPlayerVisible = false;
		}
	}
}
