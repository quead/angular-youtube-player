import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-settings',
  templateUrl: 'youtube-settings.component.html'
})

export class SettingsComponent implements OnInit {

    @Output() states = new EventEmitter();

    private menuOpened = false;
    private finished = false;

    settingsForm: FormGroup;

    playerAttr = {
        settings: []
    };

    constructor(private fb: FormBuilder, private http: Http) {
        this.fb = fb;
    }

    ngOnInit() {
        this.fetchJSONsettings();
    }

    setForm() {
        this.settingsForm = this.fb.group({
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
        this.showSettings(this.playerAttr);
        this.settingsForm.valueChanges.subscribe((data) => {
            Object.keys(data.settings).map(i => {
                this.playerAttr.settings[i].selected = data.settings[i];
            });
            this.showSettings(data);
        });
    }

    mapSettings() {
        const arr = this.playerAttr.settings.map(s => {
            return this.fb.control(s.selected);
        });
        return this.fb.array(arr);
    }

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

    showSettings(data: any) {
        this.states.emit(data);
    }

}
