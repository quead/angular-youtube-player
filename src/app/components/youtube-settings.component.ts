import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../config/shared.module';
import { Http } from '@angular/http';

@Component({
    selector: 'app-settings',
    templateUrl: 'youtube-settings.component.html'
})

export class SettingsComponent implements OnInit {

    private finished = false;

    _fb: any;
    _shared: any;

    settingsForm: FormGroup;

    playerAttr = {
        settings: []
    };

    constructor(private fb: FormBuilder, private http: Http, private shared: SharedService) {
        this._fb = fb;
        this._shared = shared;
    }

    ngOnInit() {
        console.log('settings');
        console.log(this._shared);
        this.fetchJSONsettings();
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

    fetchJSONsettings() {
        this.http.get('assets/settings.json')
            .map(res => res.json())
            .subscribe(
            data => {
                this.playerAttr.settings = data;
            },
            err => console.log('JSON Settings ' + err),
            () => {
                this.finished = true; this.setForm();
            }
        );
    }

    checkInputs() {
        this._shared.settings = this.playerAttr.settings;
        //this._app.setSettings(this.playerAttr.settings, 1);
        this.settingsForm.valueChanges.subscribe((data) => {
            Object.keys(data.settings).map(i => {
                this.playerAttr.settings[i].selected = data.settings[i];
            });
            console.log('se schimba ceva prin settings');
        });
    }

    mapSettings() {
        const arr = this.playerAttr.settings.map(s => {
            return this._fb.control(s.selected);
        });
        return this.fb.array(arr);
    }

}
