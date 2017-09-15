import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SearchComponent } from './youtube-search.component';
import { SharedService } from '../shared/lists.service';
import { NumberVal } from '../shared/validators.service';
import { Http } from '@angular/http';

@Component({
    selector: 'app-settings',
    templateUrl: 'youtube-settings.component.html',
    providers: [ SearchComponent, NumberVal ]
})

export class SettingsComponent implements OnInit {

    private finished = false;
    notify: any;

    _shared: any;
    _fb: any;
    _app: any;
    _search: any;

    internalSettings: FormGroup;
    externalSettings: FormGroup;

    private internal_settings: Array<any>;
    private external_settings: Array<any>;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private shared: SharedService,
        private app: AppComponent,
        private search: SearchComponent,
    ) {
        this._shared = shared;
        this._fb = fb;
        this._app = app;
        this._search = search;
        this.notify = this._shared.notify;
    }

    ngOnInit() {
        console.log('settings');
        this.getDefaultSettings();
    }

    setForm() {
        this.internalSettings = this._fb.group({
            settings: this.mapSettings()
        });
        this.checkInputs();
    }

    initExternalForm() {
        this.externalSettings = new FormGroup({
            fcApi: new FormControl(this.external_settings[0].value),
            fcRegion: new FormControl(this.external_settings[1].value, Validators.required),
            fcSearchresults: new FormControl(this.external_settings[2].value,
                            [Validators.required,
                            NumberVal.max(50),
                            NumberVal.min(1),
                            NumberVal.isNumber(true)]),
            fcRelatedResults: new FormControl(this.external_settings[3].value,
                            [Validators.required,
                            NumberVal.max(50),
                            NumberVal.min(1),
                            NumberVal.isNumber(true)])
        });
    }

    get initInternalForm(): FormArray {
        return this.internalSettings.get('settings') as FormArray;
    }

    checkInputs() {
        this.internalSettings.valueChanges.subscribe((data) => {
            Object.keys(data.settings).map(i => {
                this.internal_settings[i].value = data.settings[i];
            });
            this._shared.form_settings = this.internal_settings;

            this._app.setSettings();
            this._app.checkVolumeRange();
            this._search.setSettings();
            this._shared.updateSettings();

            this._shared.triggerNotify('Changed');
            this.updateNotify();
        });
    }

    mapSettings() {
        const arr = this.internal_settings.map(s => {
            return this._fb.control(s.value);
        });
        return this.fb.array(arr);
    }

    getDefaultSettings() {
        this._shared.getSettings().subscribe(data => {
            this.internal_settings = data.form_settings;
            this.external_settings = data.api_settings;
            this.initExternalForm();
            this.finished = true;
            this.setForm();
        });
    }

    updateNotify() {
        this.notify = this._shared.notify;
        setTimeout(() => this.notify = this._shared.notify, 1000);
    }

    externalSave() {
        if (this.externalSettings.valid) {
            this.external_settings[0].value = this.externalSettings.controls.fcApi.value;
            this.external_settings[1].value = this.externalSettings.controls.fcRegion.value;
            this.external_settings[2].value = parseInt(this.externalSettings.controls.fcSearchresults.value, 10);
            this.external_settings[3].value = parseInt(this.externalSettings.controls.fcRelatedResults.value, 10);
            this._shared.settings.api_settings = this.external_settings;

            this._shared.feedVideos = null;

            this._shared.setApiSettings();
            this._app.setSettings();
            this._app.getFeedVideos();
            this._shared.updateSettings();

            this._shared.triggerNotify('Saved');
            this.updateNotify();
        } else {
            this._shared.triggerNotify('Please check external settings');
            this.updateNotify();
        }
    }
}
