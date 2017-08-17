import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { SearchComponent } from './youtube-search.component';
import { SharedService } from '../config/shared.module';
import { Http } from '@angular/http';

@Component({
    selector: 'app-settings',
    templateUrl: 'youtube-settings.component.html',
    providers: [ SearchComponent ]
})

export class SettingsComponent implements OnInit {

    private finished = false;
    notify: any;

    _shared: any;
    _fb: any;
    _app: any;
    _search: any;

    settingsForm: FormGroup;
    RegionSettings = new FormControl();

    private settings: Array<any>;
    private apiKey: string;
    private regionCode: string;
    private numSearchRes: string;
    private numRelatedRes: string;
    private loadingRegion = false;

    constructor(
        private fb: FormBuilder,
        private http: Http,
        private shared: SharedService,
        private app: AppComponent,
        private search: SearchComponent
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
        this.settingsForm = this._fb.group({
            settings: this.mapSettings()
        });
        this.checkInputs();
    }

    get getSettings(): FormArray {
        return this.settingsForm.get('settings') as FormArray;
    };

    checkInputs() {
        this.settingsForm.valueChanges.subscribe((data) => {
            Object.keys(data.settings).map(i => {
                this.settings[i].value = data.settings[i];
            });
            this._app.setSettings(this.settings, 0);
            this._search.setSettings(this.settings, 1);
            this.notifySettings();
        });
    }

    mapSettings() {
        const arr = this.settings.map(s => {
            return this._fb.control(s.value);
        });
        return this.fb.array(arr);
    }

    getDefaultSettings() {
        this._shared.getSettings().subscribe(data => {
            this.settings = data.form_settings;
            this.apiKey = data.api_settings[0].value;
            this.regionCode = data.api_settings[1].value;
            this.numSearchRes = data.api_settings[2].value;
            this.numRelatedRes = data.api_settings[3].value;
            this.finished = true;
            this.setForm();
        });
    }

    changeRegion(data: any) {
        this.loadingRegion = true;
        this._shared.settings.api_settings[1].value = data;
        this._shared.setApiSettings();
        this._shared.feedVideos = null;
        this._app.getSettings();
        this._app.getFeedVideos();
        this.notifySettings();
        setTimeout(() => this.loadingRegion = false, 500);
    }

    notifySettings() {
        if (!this.notify.enabled) {
            this._shared.triggerNotify('Changed');
            this.updateNotify();
        } else {
            setTimeout(() => {
                this._shared.triggerNotify('Changed');
                this.updateNotify();
            }, 1000);
        }
    }

    updateNotify() {
        this.notify = this._shared.notify;
        setTimeout(() => this.notify = this._shared.notify, 1000);
    }
}
