import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalsService } from "../../services/globals.service";
import { PlayerComponent } from "../player/player.component";
import { ButtonsComponent } from '../player/buttons/buttons.component';

@Component({
	selector: 'app-player-mini',
	templateUrl: './player-mini.component.html',
	styleUrls: ['./player-mini.component.scss'],
	providers: [PlayerComponent]
})
export class PlayerMiniComponent implements OnInit {
	setPlayerVisible = false;

	constructor(public globals: GlobalsService, public player: PlayerComponent, public playerCTA: ButtonsComponent) { }

	ngOnInit() {
	}

	@HostListener("window:scroll", ["$event"])
	onWindowScroll() {
		if (window.scrollY > 280) {
			this.setPlayerVisible = true;
		} else {
			this.setPlayerVisible = false;
		}
	}
}
