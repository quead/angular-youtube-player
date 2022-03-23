import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlayerComponent } from 'src/app/components/player/player.component';
import { GlobalsService } from 'src/app/services/globals.service';
import { NotifyService } from 'src/app/services/notify.service';
import { SharedService } from 'src/app/services/shared.service';
import { NumberVal } from 'src/app/services/validators.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [NumberVal],
})
export class SettingsComponent implements OnInit {
  internalSettings!: FormGroup;
  externalSettings!: FormGroup;

  constructor(
    private shared: SharedService,
    public globals: GlobalsService,
    public playerComp: PlayerComponent,
    private notify: NotifyService
  ) {}

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
          NumberVal.isNumber(),
        ]
      ),
      fcRelatedResults: new FormControl(
        this.globals.settings.api_settings.related_num.value,
        [
          Validators.required,
          NumberVal.max(50),
          NumberVal.min(1),
          NumberVal.isNumber(),
        ]
      ),
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
      ),
    });
  }

  checkInputs() {
    this.globals.settings.form_settings.thumbnails.value =
      this.internalSettings.controls['fcThumbnails'].value;
    this.globals.settings.form_settings.listToggle.value =
      this.internalSettings.controls['fcList'].value;
    this.globals.settings.form_settings.repeat.value =
      this.internalSettings.controls['fcRepeat'].value;
    this.save();
  }

  save() {
    this.shared.updateLocalStorageSettings();
    this.shared.getSettings();
    this.shared.initFeed();
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
      this.globals.settings.api_settings.key.value =
        this.externalSettings.controls['fcApi'].value;
      this.globals.settings.api_settings.region.value =
        this.externalSettings.controls['fcRegion'].value;
      this.globals.settings.api_settings.search_num.value = parseInt(
        this.externalSettings.controls['fcSearchresults'].value,
        10
      );
      this.globals.settings.api_settings.related_num.value = parseInt(
        this.externalSettings.controls['fcRelatedResults'].value,
        10
      );
      this.globals.feedVideos = [];
      this.save();
    } else {
      this.notify.triggerNotify(10);
    }
  }
}
