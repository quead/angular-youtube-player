import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerComponent } from '../player/player.component';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { NotifyService } from '../../services/notify.service';
import { NumberVal } from '../../services/validators.service';

@Component({
	selector: 'app-settings',
	templateUrl: 'settings.component.html',
	providers: [NumberVal],
	styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

	internalSettings: FormGroup;
	externalSettings: FormGroup;

	constructor(
		private shared: SharedService,
		private globals: GlobalsService,
		public playerComp: PlayerComponent,
		private notify: NotifyService
	) { }

	ngOnInit() {
		console.log('settings');
		this.getDefaultSettings();
	}

	initExternalForm() {
		this.externalSettings = new FormGroup({
			fcApi: new FormControl(this.globals.settings.api_settings.key.value),
			fcRegion: new FormControl(
				this.globals.settings.api_settings.region.value,
				Validators.required
			),
			fcSearchresults: new FormControl(
				this.globals.settings.api_settings.search_num.value,
				[
					Validators.required,
					NumberVal.max(50),
					NumberVal.min(1),
					NumberVal.isNumber(true)
				]
			),
			fcRelatedResults: new FormControl(
				this.globals.settings.api_settings.related_num.value,
				[
					Validators.required,
					NumberVal.max(50),
					NumberVal.min(1),
					NumberVal.isNumber(true)
				]
			)
		});
	}

	initInternalForm() {
		this.internalSettings = new FormGroup({
			fcThumbnails: new FormControl(
				this.globals.settings.form_settings.thumbnails.value
			),
			fcList: new FormControl(
				this.globals.settings.form_settings.listToggle.value
			),
			fcRepeat: new FormControl(
				this.globals.settings.form_settings.repeat.value
			)
		});
	}

	checkInputs() {
		this.globals.settings.form_settings.thumbnails.value = this.internalSettings.controls.fcThumbnails.value;
		this.globals.settings.form_settings.listToggle.value = this.internalSettings.controls.fcList.value;
		this.globals.settings.form_settings.repeat.value = this.internalSettings.controls.fcRepeat.value;
		this.save();
	}

	save() {
		this.shared.updateLocalStorageSettings();
		this.shared.getSettings();
		if (this.globals.currentState !== 1) {
			this.playerComp.setDefaultPlayer();
		} else {
			this.shared.initFeed();
		}
		this.notify.triggerNotify(22);
	}

	getDefaultSettings() {
		this.shared.getSettings();
		this.initExternalForm();
		this.initInternalForm();
		this.globals.loadingState.settings = false;
	}

	externalSave() {
		if (this.externalSettings.valid) {
			this.globals.settings.api_settings.key.value = this.externalSettings.controls.fcApi.value;
			this.globals.settings.api_settings.region.value = this.externalSettings.controls.fcRegion.value;
			this.globals.settings.api_settings.search_num.value = parseInt(
				this.externalSettings.controls.fcSearchresults.value,
				10
			);
			this.globals.settings.api_settings.related_num.value = parseInt(
				this.externalSettings.controls.fcRelatedResults.value,
				10
			);
			this.globals.feedVideos = null;
			this.save();
		} else {
			this.notify.triggerNotify(10);
		}
	}
}
