import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';

import { SettingsComponent } from './settings.component';
import { PlayerComponent } from '../player/player.component';
import { ButtonsComponent } from '../player/buttons/buttons.component';
import { SharedService } from '../../services/shared.service';
import { GlobalsService } from '../../services/globals.service';
import { PlaylistControlService } from '../../services/playlist-control.service';
import { YoutubeGetVideo } from '../../services/youtube.service';
import { SessionManagerService } from '../../services/session-manager.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  const config: SocketIoConfig = { url: environment.serverURL, options: {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, SocketIoModule.forRoot(config)],
      declarations: [ SettingsComponent ],
      providers: [ PlayerComponent, ButtonsComponent, PlaylistControlService, SharedService, GlobalsService, SessionManagerService, YoutubeGetVideo, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
