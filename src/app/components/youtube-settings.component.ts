import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Component({
  selector: 'yt-settings',
  templateUrl: 'youtube-settings.component.html'
})

export class SettingsComponent {

    @Output() states = new EventEmitter();

    private menuOpened: boolean = false;
    playerSettings: any[];
    private finished: boolean = false;

    settingsForm: FormGroup;
    // This is temporary, soon will be from JSON
    playerAttr = {
        settings: []
    }

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
        this.sendToInput();
    }

    get getSettings(): FormArray {
        return this.settingsForm.get('settings') as FormArray;
    };

    fetchJSONsettings() {
        this.http.get('assets/settings.json')
            .map(res => res.json())
            .subscribe(
            data =>  { 
                this.playerAttr.settings = data
            },
            err => console.log('JSON Settings ' + err),
            () => { 
                this.finished = true; 
                this.setForm(); 
            }
        );
    }

    sendToInput() {
        this.states.emit(this.playerAttr);
        this.settingsForm.valueChanges.subscribe((data) => {
            for (let i in data.settings) {
                this.playerAttr.settings[i].selected = data.settings[i];
            }
            this.showSettings(this.playerAttr);
        });
    }

    mapSettings() {
        const arr = this.playerAttr.settings.map(s => {
            return this.fb.control(s.selected);
        })
        return this.fb.array(arr);
    }

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }

    showSettings(data: any) {
        this.states.emit(this.playerAttr);
    }

}