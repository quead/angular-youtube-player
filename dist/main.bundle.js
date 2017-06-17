webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n    <app-settings (states)=\"getStates($event)\"></app-settings>\r\n    <img src=\"assets/img/logo.svg\" height=\"25\" id=\"logo\"/>\r\n    <div class=\"win-controls\">\r\n        <button id=\"win-minimize\"><span class=\"fa fa-window-minimize\"></span></button>\r\n        <button id=\"win-maximize\"><span class=\"fa fa-window-maximize\"></span></button>\r\n        <!--<button id=\"win-unmaximize\"><span class=\"fa fa-window-restore\"></span></button>-->\r\n        <button id=\"win-close\"><span class=\"fa fa-close\"></span></button>\r\n    </div>\r\n</header>\r\n<app-search [showStates]=\"event\"></app-search>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var AppComponent = (function () {
    function AppComponent() {
        this.event = '';
    }
    AppComponent.prototype.getStates = function (event) {
        this.event = event;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-yt',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var youtube_config_1 = __webpack_require__("../../../../../src/app/config/youtube.config.ts");
var youtube_settings_component_1 = __webpack_require__("../../../../../src/app/components/youtube-settings.component.ts");
var youtube_search_component_1 = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
var ng2_youtube_player_1 = __webpack_require__("../../../../ng2-youtube-player/modules/ng2-youtube-player.es5.js");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.ReactiveFormsModule,
            ng2_youtube_player_1.YoutubePlayerModule
        ],
        declarations: [
            app_component_1.AppComponent,
            youtube_settings_component_1.SettingsComponent,
            youtube_search_component_1.SearchComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [youtube_config_1.YoutubeGetVideo]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-search.component.html":
/***/ (function(module, exports) {

module.exports = "<main>\r\n  <form id=\"main-search\" role=\"search\" [formGroup]=\"searchForm\" (ngSubmit)=\"onSubmit($event)\" novalidate>\r\n      <div class=\"form-group\">\r\n        <div class=\"input-group\">\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"Search\" autofocus formControlName=\"searchInput\">\r\n          <button class=\"clear-button\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></button>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"searchForm.valid\" id=\"search-video-list\" class=\"video-list\">\r\n        <div *ngFor=\"let video of videos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickVideo($event, i)\">\r\n          <div class=\"video-item-content\">\r\n            <p>{{ video.snippet.title }}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"relatedVideos\" id=\"related-video-list\" class=\"video-list\">\r\n        <div class=\"video-item-head\">\r\n            Recommended videos\r\n        </div>\r\n        <div *ngFor=\"let relatedVideo of relatedVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickRelatedVideo($event, i)\">\r\n          <div class=\"video-item-image\">\r\n            <img src=\"{{ relatedVideo.snippet.thumbnails.high.url }}\" alt=\"video thumbnail\" />\r\n          </div>\r\n          <div class=\"video-item-content\">\r\n            <h2>{{ relatedVideo.snippet.title }}</h2>\r\n            <p class=\"author\">By {{ relatedVideo.snippet.channelTitle }}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </form>\r\n  <div class=\"debugging-info\" [ngClass]=\"{'active': debuggingInfo }\">\r\n    <p *ngIf=\"currentVideoID\">Current video ID: {{ currentVideoID }}</p>\r\n    <p>MaxRange {{videoMaxFull}} - {{videoMaxRange}}</p>\r\n    <p>CurRange {{videoCurFull}} - {{videoCurRange}}</p>\r\n    <a href=\"#\" class=\"btn btn-primary btn-round\">Button Primary</a>\r\n    <a href=\"#\" class=\"btn btn-secondary\">Button Secondary</a>\r\n    <a href=\"#\" class=\"btn btn-default btn-round\">Button Secondary</a>\r\n  </div>\r\n  <youtube-player [videoId]=\"currentVideoID\" (ready)=\"savePlayer($event)\" (change)=\"onStateChange($event)\" [playerVars]=\"playerVars()\"></youtube-player>\r\n</main>\r\n<footer>\r\n    <div class=\"volume-range-value\" [ngClass]=\"videoCurVolume <= 0 ? 'inactive' : 'active'\">\r\n      <span class=\"fa\" (click)=\"toggleMute()\" [ngClass]=\"currentMuteState ? 'fa-volume-off' : 'fa-volume-up'\"></span>\r\n      <div class=\"volume-input-container\">\r\n        <input type=\"range\" id=\"youtube-volume-range\" class=\"volume-input\" [value]=\"videoCurVolume\" min=\"0\" max=\"100\" #volumeRange (mouseup)=\"volumeRangeMouseUp(volumeRange.value)\">\r\n        <span class=\"volume-input-shadow\" [ngClass]=\"{'inactive': currentMuteState }\" [style.width]=\"volumeRange.value + '%'\"></span>\r\n      </div>\r\n    </div>\r\n    <p *ngIf=\"currentVideoName\" class=\"current-video-name\">{{ currentVideoName }}</p>\r\n    <p *ngIf=\"!currentVideoName\" class=\"current-video-name\">Not Playing</p>\r\n    <div class=\"current-video-range\">\r\n      <input type=\"range\" id=\"youtube-player-range\" class=\"player-range\" [ngClass]=\"videoMaxRange <= 0 ? 'inactive' : 'active'\" [value]=\"videoCurRange\" min=\"0\" max=\"{{videoMaxRange}}\" (mousedown)=\"RangeNouseDown($event)\" #videoRange (mouseup)=\"RangeMouseUp(videoRange.value)\">\r\n      <p class=\"current-video-range-value\">{{videoCurFull}}</p>\r\n      <p class=\"current-video-range-max-value\">{{videoMaxFull}}</p>\r\n    </div>\r\n    <div id=\"player-controls\">\r\n        <div class=\"player-buttons\">\r\n            <button id=\"previous-song\" ondragstart=\"return false;\"><span class=\"fa fa-backward\"></span></button>\r\n            <button id=\"play-song\" (click)=\"playPauseVideo()\" ><span class=\"fa\" [ngClass]=\"currentState === 1 ? 'fa-pause' : 'fa-play' \"></span></button>\r\n            <button id=\"next-song\"><span class=\"fa fa-forward\"></span></button>\r\n        </div>\r\n    </div>\r\n</footer>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-search.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var youtube_config_1 = __webpack_require__("../../../../../src/app/config/youtube.config.ts");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var SearchComponent = (function () {
    function SearchComponent(youtube, ref) {
        this.youtube = youtube;
        this.relatedVideos = false;
        this.debuggingInfo = true;
        this.currentVideoID = 'Not Exist';
        this.currentMuteState = true;
        this.videoCurRange = 0;
        this.videoMaxRange = 0;
        this.videoCurFull = '00:00:00';
        this.videoMaxFull = '00:00:00';
        this.videoCurVolume = -1;
        this._ref = ref;
    }
    Object.defineProperty(SearchComponent.prototype, "showStates", {
        set: function (event) {
            if (event) {
                this.changeStates(event);
            }
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent.prototype.ngOnInit = function () {
        this.searchFunction();
    };
    SearchComponent.prototype.searchFunction = function () {
        var _this = this;
        this.searchForm = new forms_1.FormGroup({
            searchInput: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(2)])
        });
        this.searchForm.valueChanges.subscribe(function (form) {
            _this.youtube.searchVideo(form.searchInput).subscribe(function (result) {
                if (!_this.searchForm.invalid) {
                    _this.videos = result.items;
                }
                else {
                    _this.videos = null;
                }
            }, function (error) {
                console.log('error on search');
            });
        });
    };
    SearchComponent.prototype.playerVars = function () {
        var playerVars = {
            'controls': 0,
            'disablekb': 1,
            'rel': 0
        };
        return playerVars;
    };
    SearchComponent.prototype.changeStates = function (event) {
        // Trigger from youtube-settings.component
        if (event.settings[0].selected != null) {
            this.debuggingInfo = event.settings[0].selected;
        }
        else {
            this.debuggingInfo = event.settings[0];
        }
    };
    SearchComponent.prototype.getRelatedVideos = function () {
        var _this = this;
        this.youtube.relatedVideos(this.currentVideoID).subscribe(function (result) {
            _this.relatedVideos = result.items;
        }, function (error) {
            console.log('error on related videos');
        });
    };
    SearchComponent.prototype.clearSearch = function () {
        this.searchForm.reset();
        this.videos = null;
    };
    SearchComponent.prototype.onSubmit = function (event) {
        event.preventDefault();
    };
    SearchComponent.prototype.onClickVideo = function (event, i) {
        var clickedVideo = this.videos[i];
        this.currentVideoID = clickedVideo.id.videoId;
        this.currentVideoName = clickedVideo.snippet.title;
        console.log(this.currentVideoID);
        this.player.loadVideoById(this.currentVideoID);
        this.getRelatedVideos();
        this.clearSearch();
    };
    SearchComponent.prototype.onClickRelatedVideo = function (event, i) {
        var clickedVideo = this.relatedVideos[i];
        this.currentVideoID = clickedVideo.id.videoId;
        this.currentVideoName = clickedVideo.snippet.title;
        this.player.loadVideoById(this.currentVideoID);
        this.getRelatedVideos();
    };
    SearchComponent.prototype.toggleMute = function () {
        if (this.currentMuteState) {
            this.player.unMute();
            this.currentMuteState = false;
        }
        else {
            this.player.mute();
            this.currentMuteState = true;
        }
    };
    SearchComponent.prototype.savePlayer = function (player) {
        this.player = player;
    };
    SearchComponent.prototype.onStateChange = function (event) {
        this.currentState = event.data;
        this.videoMaxRange = this.player.getDuration();
        if (this.currentState === 1) {
            this.videoMaxFull = this.timeFormat(this.videoMaxRange);
            this.videoCurVolume = this.player.getVolume();
            this.currentMuteState = this.player.isMuted();
            this.startRange();
        }
        if (this.currentState === 0) {
            this.stopRange();
        }
    };
    SearchComponent.prototype.playPauseVideo = function () {
        if (this.currentState === 0) {
            this.player.playVideo();
        }
        if (this.currentState === 1) {
            this.player.pauseVideo();
        }
        if (this.currentState === 2) {
            this.player.playVideo();
        }
    };
    SearchComponent.prototype.startRange = function () {
        var _this = this;
        this.stopRange();
        this.videoRangeTimer = setInterval(function () {
            _this.videoCurRange = _this.player.getCurrentTime();
            _this.videoCurFull = _this.timeFormat(_this.videoCurRange);
            _this._ref.markForCheck();
        }, 1000);
    };
    SearchComponent.prototype.stopRange = function () {
        clearTimeout(this.videoRangeTimer);
    };
    SearchComponent.prototype.RangeNouseDown = function (event) {
        if (event['buttons'] === 1) {
            this.stopRange();
        }
    };
    SearchComponent.prototype.RangeMouseUp = function (value) {
        this.player.seekTo(value, true);
        this.videoCurRange = value;
        this.startRange();
    };
    SearchComponent.prototype.volumeRangeMouseUp = function (value) {
        if (this.currentMuteState) {
            this.player.unMute();
            this.currentMuteState = false;
        }
        this.player.setVolume(value);
    };
    SearchComponent.prototype.timeFormat = function (time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time % 3600 / 60);
        var seconds = Math.floor(time % 3600 % 60);
        var value = (parseInt(hours, 10) < 10 ? '0' : '') + parseInt(hours, 10) + ':'
            + (parseInt(minutes, 10) < 10 ? '0' : '') + parseInt(minutes, 10) + ':'
            + (parseInt(seconds, 10) < 10 ? '0' : '') + parseInt(seconds, 10);
        return value;
    };
    return SearchComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SearchComponent.prototype, "showStates", null);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/components/youtube-search.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof youtube_config_1.YoutubeGetVideo !== "undefined" && youtube_config_1.YoutubeGetVideo) === "function" && _a || Object, typeof (_b = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _b || Object])
], SearchComponent);
exports.SearchComponent = SearchComponent;
var _a, _b;
//# sourceMappingURL=youtube-search.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<button class=\"open-menu\" (click)=\"toggleMenu()\"><span class=\"fa fa-bars\"></span></button>\r\n<nav id=\"main-nav\" [class.active]=\"menuOpened\">\r\n    <button class=\"close-menu\" (click)=\"toggleMenu()\"><span class=\"fa fa-bars\"></span></button>\r\n    <h2>Settings</h2>\r\n    <form *ngIf=\"finished\" [formGroup]=\"settingsForm\" id=\"settingsForm\" novalidate>\r\n        <div *ngFor=\"let setting of getSettings.controls; let i=index\" class=\"form-group\">\r\n            <input type=\"checkbox\" [attr.id]=\"'setting-' + i\" [formControl]=\"setting\"/>\r\n            <label [attr.for]=\"'setting-' + i\">{{playerAttr.settings[i].name}}<span class=\"round-check\"></span></label>\r\n        </div>\r\n    </form>\r\n</nav>\r\n<div class=\"nav-overlay\" (click)=\"toggleMenu()\"></div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-settings.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var SettingsComponent = (function () {
    function SettingsComponent(fb, http) {
        this.fb = fb;
        this.http = http;
        this.states = new core_1.EventEmitter();
        this.menuOpened = false;
        this.finished = false;
        this.playerAttr = {
            settings: []
        };
        this.fb = fb;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.fetchJSONsettings();
    };
    SettingsComponent.prototype.setForm = function () {
        this.settingsForm = this.fb.group({
            settings: this.mapSettings()
        });
        this.checkInputs();
    };
    Object.defineProperty(SettingsComponent.prototype, "getSettings", {
        get: function () {
            return this.settingsForm.get('settings');
        },
        enumerable: true,
        configurable: true
    });
    ;
    SettingsComponent.prototype.fetchJSONsettings = function () {
        var _this = this;
        this.http.get('assets/settings.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { _this.playerAttr.settings = data; }, function (err) { return console.log('JSON Settings ' + err); }, function () { _this.finished = true; _this.setForm(); });
    };
    SettingsComponent.prototype.checkInputs = function () {
        var _this = this;
        this.showSettings(this.playerAttr);
        this.settingsForm.valueChanges.subscribe(function (data) {
            Object.keys(data.settings).map(function (i) {
                _this.playerAttr.settings[i] = data.settings[i];
            });
            _this.showSettings(data);
        });
    };
    SettingsComponent.prototype.mapSettings = function () {
        var _this = this;
        var arr = this.playerAttr.settings.map(function (s) {
            return _this.fb.control(s.selected);
        });
        return this.fb.array(arr);
    };
    SettingsComponent.prototype.toggleMenu = function () {
        this.menuOpened = !this.menuOpened;
    };
    SettingsComponent.prototype.showSettings = function (data) {
        this.states.emit(data);
    };
    return SettingsComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SettingsComponent.prototype, "states", void 0);
SettingsComponent = __decorate([
    core_1.Component({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/app/components/youtube-settings.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _b || Object])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
var _a, _b;
//# sourceMappingURL=youtube-settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/youtube.config.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var YoutubeGetVideo = (function () {
    function YoutubeGetVideo(http) {
        this.http = http;
        this.url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
        this.apiKey = 'AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc';
    }
    YoutubeGetVideo.prototype.searchVideo = function (query) {
        return this.http.get(this.url + '&q=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(function (response) { return response.json(); });
    };
    YoutubeGetVideo.prototype.relatedVideos = function (query) {
        return this.http.get(this.url + '&relatedToVideoId=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(function (response) { return response.json(); });
    };
    return YoutubeGetVideo;
}());
YoutubeGetVideo = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], YoutubeGetVideo);
exports.YoutubeGetVideo = YoutubeGetVideo;
var _a;
//# sourceMappingURL=youtube.config.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map