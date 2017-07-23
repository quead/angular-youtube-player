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

module.exports = "<div class=\"loading-bar inactive\"></div>\r\n<header>\r\n    <div class=\"win-controls\">\r\n        <button id=\"win-minimize\"><span class=\"fa fa-window-minimize\"></span></button>\r\n        <button id=\"win-maximize\"><span class=\"fa fa-window-maximize\"></span></button>\r\n        <!--<button id=\"win-unmaximize\"><span class=\"fa fa-window-restore\"></span></button>-->\r\n        <button id=\"win-close\"><span class=\"fa fa-close\"></span></button>\r\n    </div>\r\n</header>\r\n<div class=\"container\">\r\n  <div class=\"col col-2\">\r\n      <div class=\"app app-services\">\r\n          <div class=\"app-head\">\r\n              <div id=\"logo\">\r\n                <img src=\"assets/img/logo.svg\" height=\"35\"/>\r\n                <small *ngIf=\"regionCode\">{{ regionCode }}</small>\r\n              </div>\r\n          </div>\r\n          <div class=\"app-content\">\r\n            <nav>\r\n              <ul>\r\n                <li><a routerLink=\"/home\" [routerLinkActive]=\"['is-active']\" title=\"Homepage\"><span class=\"fa fa-home\"></span>Home</a></li>\r\n                <li><a routerLink=\"/about\" [routerLinkActive]=\"['is-active']\" title=\"About application page\"><span class=\"fa fa-info-circle\"></span>About</a></li>\r\n                <li><a routerLink=\"/settings\" [routerLinkActive]=\"['is-active']\" title=\"Settings page\"><span class=\"fa fa-gear\"></span>Settings</a></li>\r\n              </ul>\r\n            </nav>\r\n            <div class=\"debugging-info\" [ngClass]=\"{'active': debuggingInfo }\">\r\n              <p *ngIf=\"currentVideoID\">Current video ID: {{ currentVideoID }}</p>\r\n              <p>MaxRange {{videoMaxFull}} - {{videoMaxRange}}</p>\r\n              <p>CurRange {{videoCurFull}} - {{videoCurRange}}</p>\r\n            </div>\r\n            <div id=\"history-video-list\" class=\"video-list\">\r\n              <div class=\"video-item-head\">\r\n                  Recently played\r\n              </div>\r\n              <div class=\"history-video-content\">\r\n                <div *ngIf=\"historyVideos.length === 0\" class=\"video-list-info\">\r\n                  No history\r\n                </div>\r\n                <div *ngFor=\"let historyVideo of historyVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickHistory($event, i)\">\r\n                  <div class=\"video-item-image\">\r\n                    <img src=\"{{ historyVideo.thumbnail }}\" alt=\"history video thumbnail\" />\r\n                  </div>\r\n                  <div class=\"video-item-content\">\r\n                    <p>{{ historyVideo.title }}</p>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n  <div class=\"col col-6\">\r\n      <div class=\"app app-feed\">\r\n        <router-outlet></router-outlet>\r\n      </div>\r\n  </div>\r\n  <div class=\"col col-4\">\r\n      <div class=\"app app-player\">\r\n          <div class=\"app-head\">\r\n              <p>Player</p>\r\n              <div class=\"settings\">\r\n                  <p id=\"toggle-video-player\" [ngClass]=\"{'active': displayVideoPlayer }\" (click)=\"toggleHeadSettings(0)\"><span class=\"fa fa-youtube-play\"></span>Toggle video</p>\r\n                  <p id=\"toggle-repeat-mode\" [ngClass]=\"{'active': repeatMode }\" (click)=\"toggleHeadSettings(1)\"><span class=\"fa fa-refresh\"></span>Repeat</p>\r\n              </div>\r\n          </div>\r\n          <div class=\"app-content\">\r\n            <div id=\"youtube-player\" *ngIf=\"feedVideos\" [ngClass]=\"{'active': displayVideoPlayer }\">\r\n              <youtube-player [videoId]=\"currentVideoID\" (ready)=\"savePlayer($event)\" (change)=\"onStateChange($event)\" [playerVars]=\"playerVars()\"></youtube-player>\r\n            </div>\r\n            <div class=\"current-video-all\">\r\n              <div class=\"current-video-details\">\r\n                <p *ngIf=\"currentVideoName\" class=\"current-video-name\">{{ currentVideoName }}</p>\r\n                <p *ngIf=\"!currentVideoName\" class=\"current-video-none\">Not Playing</p>\r\n              </div>\r\n                <div id=\"player-controls\">\r\n                    <div class=\"player-buttons\">\r\n                        <button id=\"previous-song\" ondragstart=\"return false;\"><span class=\"fa fa-backward\"></span></button>\r\n                        <button id=\"play-song\" (click)=\"playPauseVideo()\" ><span class=\"fa\" [ngClass]=\"currentState === 1 ? 'fa-pause' : 'fa-play' \"></span></button>\r\n                        <button id=\"next-song\"><span class=\"fa fa-forward\"></span></button>\r\n                    </div>\r\n                </div>\r\n                <div class=\"current-video-range\">\r\n                  <input type=\"range\" id=\"youtube-player-range\" class=\"player-range\" [ngClass]=\"videoMaxRange <= 0 ? 'inactive' : 'active'\" [value]=\"videoCurRange\" min=\"0\" max=\"{{videoMaxRange}}\" (mousedown)=\"RangeNouseDown($event)\" #videoRange (mouseup)=\"RangeMouseUp(videoRange.value)\">\r\n                  <p class=\"current-video-range-value\">{{videoCurFull}}</p>\r\n                  <p class=\"current-video-range-max-value\">{{videoMaxFull}}</p>\r\n                </div>\r\n                <div class=\"volume-range-value\" [ngClass]=\"videoCurVolume <= 0 ? 'inactive' : 'active'\">\r\n                  <span class=\"fa\" (click)=\"toggleHeadSettings(2)\" [ngClass]=\"currentMuteState ? 'fa-volume-off' : 'fa-volume-up'\"></span>\r\n                  <div class=\"volume-input-container\">\r\n                    <input type=\"range\" id=\"youtube-volume-range\" class=\"volume-input\" [value]=\"videoCurVolume\" min=\"0\" max=\"100\" #volumeRange (mouseup)=\"volumeRangeMouseUp(volumeRange.value)\">\r\n                    <span class=\"volume-input-shadow\" [ngClass]=\"{'inactive': currentMuteState }\" [style.width]=\"volumeRange.value + '%'\"></span>\r\n                  </div>\r\n                </div>\r\n            </div>  \r\n            <div id=\"related-video-list\" class=\"video-list\" [ngClass]=\"{'activePlayer': displayVideoPlayer }\">\r\n              <div class=\"video-item-head\">\r\n                  Recommended videos\r\n              </div>\r\n              <div class=\"related-video-content\">\r\n                <div *ngFor=\"let relatedVideo of relatedVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickRelated($event, i)\">\r\n                  <div class=\"video-item-image\">\r\n                    <img src=\"{{ relatedVideo.snippet.thumbnails.default.url }}\" alt=\"related video thumbnail\" />\r\n                  </div>\r\n                  <div class=\"video-item-content\">\r\n                    <p>{{ relatedVideo.snippet.title }}</p>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      </div>\r\n  </div>\r\n</div>"

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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var youtube_config_1 = __webpack_require__("../../../../../src/app/config/youtube.config.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/config/shared.module.ts");
var AppComponent = (function () {
    function AppComponent(youtube, ref, shared) {
        this.youtube = youtube;
        this.ref = ref;
        this.shared = shared;
        this.historyVideos = [];
        this.debuggingInfo = false;
        this.displayVideoPlayer = true;
        this.repeatMode = true;
        this.currentState = -1;
        this.currentMuteState = true;
        this.videoCurRange = 0;
        this.videoMaxRange = 0;
        this.videoCurFull = '00:00:00';
        this.videoMaxFull = '00:00:00';
        this.videoCurVolume = -1;
        this.loading = true;
        this._ref = ref;
        this._shared = shared;
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log('app comp');
        this.getSettings();
        this.getFeedVideos();
    };
    AppComponent.prototype.addHistoryVideo = function (data) {
        var key;
        for (key in this.historyVideos) {
            if (this.historyVideos[key].id === data.id) {
                this.historyVideos.splice(key, 1);
                if (this.historyVideos[this.historyVideos.length - 1] === data) {
                    this.historyVideos.splice(-1, 1);
                }
            }
        }
        this.historyVideos.unshift(data);
    };
    AppComponent.prototype.onClickRelated = function (event, i) {
        this.getVideo(this.relatedVideos[i]);
    };
    AppComponent.prototype.onClickHistory = function (event, i) {
        this.playVideo(this.historyVideos[i]);
    };
    AppComponent.prototype.getVideo = function (data) {
        var tempData = {
            id: '',
            title: '',
            thumbnail: ''
        };
        if (data.id.videoId) {
            tempData.id = data.id.videoId;
        }
        else if (data.id) {
            tempData.id = data.id;
        }
        tempData.title = data.snippet.title;
        tempData.thumbnail = data.snippet.thumbnails.medium.url;
        this.playVideo(tempData);
    };
    AppComponent.prototype.playVideo = function (data) {
        if (data.id !== this.currentVideoID || this.currentState === -1) {
            this.currentVideoID = data.id;
            this.currentVideoName = data.title;
            this.historyVideos.push(data);
            this.addHistoryVideo(data);
            this.player.loadVideoById(this.currentVideoID);
            this.getRelatedVideos();
        }
    };
    AppComponent.prototype.playerVars = function () {
        var playerVars = {
            'enablejsapi': 1,
            'controls': 0,
            'disablekb': 0,
            'showinfo': 0,
            'playsinline': 1,
            'rel': 0
        };
        return playerVars;
    };
    AppComponent.prototype.getSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.debuggingInfo = data.form_settings[0].value;
            _this.regionCode = data.api_settings[1].value;
        });
    };
    AppComponent.prototype.getFeedVideos = function () {
        var _this = this;
        this._shared.getFeed().subscribe(function (data) {
            _this.feedVideos = data;
            if (typeof _this.currentVideoID === 'undefined') {
                _this.setDefaultPlayer();
            }
        });
    };
    AppComponent.prototype.getRelatedVideos = function () {
        var _this = this;
        this.youtube.relatedVideos(this.currentVideoID).subscribe(function (result) {
            _this.relatedVideos = result.items;
        }, function (error) {
            console.log('error on related videos');
        });
    };
    AppComponent.prototype.setDefaultPlayer = function () {
        this.feedVideos = this._shared.feedVideos;
        this.currentVideoID = this.feedVideos[0].id;
        this.currentVideoName = this.feedVideos[0].snippet.title;
        this.getRelatedVideos();
    };
    AppComponent.prototype.setSettings = function (data, from) {
        if (from === 0) {
            this.debuggingInfo = data[from].value;
        }
    };
    AppComponent.prototype.toggleHeadSettings = function (int) {
        if (int === 0) {
            if (this.displayVideoPlayer) {
                this.displayVideoPlayer = false;
            }
            else {
                this.displayVideoPlayer = true;
            }
        }
        if (int === 1) {
            if (this.repeatMode) {
                this.repeatMode = false;
            }
            else {
                this.repeatMode = true;
            }
        }
        if (int === 2) {
            if (this.currentMuteState) {
                this.player.unMute();
                this.currentMuteState = false;
            }
            else {
                this.player.mute();
                this.currentMuteState = true;
            }
        }
    };
    AppComponent.prototype.savePlayer = function (player) {
        this.player = player;
    };
    AppComponent.prototype.onStateChange = function (event) {
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
            if (this.repeatMode) {
                this.player.playVideo();
            }
        }
    };
    AppComponent.prototype.playPauseVideo = function () {
        if (this.currentState === 1) {
            this.player.pauseVideo();
        }
        else {
            this.player.playVideo();
        }
    };
    AppComponent.prototype.startRange = function () {
        var _this = this;
        this.stopRange();
        this.videoRangeTimer = setInterval(function () {
            _this.videoCurRange = _this.player.getCurrentTime();
            _this.videoCurFull = _this.timeFormat(_this.videoCurRange);
            _this._ref.markForCheck();
        }, 1000);
    };
    AppComponent.prototype.stopRange = function () {
        clearTimeout(this.videoRangeTimer);
    };
    AppComponent.prototype.RangeNouseDown = function (event) {
        if (event['buttons'] === 1) {
            this.stopRange();
        }
    };
    AppComponent.prototype.RangeMouseUp = function (value) {
        this.player.seekTo(value, true);
        this.videoCurRange = value;
        this.startRange();
    };
    AppComponent.prototype.volumeRangeMouseUp = function (value) {
        if (this.currentMuteState) {
            this.player.unMute();
            this.currentMuteState = false;
        }
        this.player.setVolume(value);
    };
    AppComponent.prototype.timeFormat = function (time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time % 3600 / 60);
        var seconds = Math.floor(time % 3600 % 60);
        var value = (parseInt(hours, 10) < 10 ? '0' : '') + parseInt(hours, 10) + ':'
            + (parseInt(minutes, 10) < 10 ? '0' : '') + parseInt(minutes, 10) + ':'
            + (parseInt(seconds, 10) < 10 ? '0' : '') + parseInt(seconds, 10);
        return value;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-yt',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof youtube_config_1.YoutubeGetVideo !== "undefined" && youtube_config_1.YoutubeGetVideo) === "function" && _a || Object, typeof (_b = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _b || Object, typeof (_c = typeof shared_module_1.SharedService !== "undefined" && shared_module_1.SharedService) === "function" && _c || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a, _b, _c;
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
var app_router_1 = __webpack_require__("../../../../../src/app/app.router.ts");
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/config/shared.module.ts");
var youtube_config_1 = __webpack_require__("../../../../../src/app/config/youtube.config.ts");
var youtube_settings_component_1 = __webpack_require__("../../../../../src/app/components/youtube-settings.component.ts");
var youtube_search_component_1 = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
var youtube_about_component_1 = __webpack_require__("../../../../../src/app/components/youtube-about.component.ts");
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
            ng2_youtube_player_1.YoutubePlayerModule,
            app_router_1.routes
        ],
        declarations: [
            app_component_1.AppComponent,
            youtube_settings_component_1.SettingsComponent,
            youtube_search_component_1.SearchComponent,
            youtube_about_component_1.AboutComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [youtube_config_1.YoutubeGetVideo, shared_module_1.SharedService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.router.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var youtube_search_component_1 = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
var youtube_about_component_1 = __webpack_require__("../../../../../src/app/components/youtube-about.component.ts");
var youtube_settings_component_1 = __webpack_require__("../../../../../src/app/components/youtube-settings.component.ts");
exports.router = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: youtube_search_component_1.SearchComponent },
    { path: 'about', component: youtube_about_component_1.AboutComponent },
    { path: 'settings', component: youtube_settings_component_1.SettingsComponent }
];
exports.routes = router_1.RouterModule.forRoot(exports.router);
//# sourceMappingURL=app.router.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-about.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <p>About</p>\r\n</div>\r\n<div class=\"app-content\">\r\n    this\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-about.component.ts":
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
var AboutComponent = (function () {
    function AboutComponent() {
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'app-about',
        template: __webpack_require__("../../../../../src/app/components/youtube-about.component.html")
    })
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=youtube-about.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <p>Home</p>\r\n</div>\r\n<div class=\"app-content\">\r\n  <form id=\"main-search\" role=\"search\" [formGroup]=\"searchForm\" (ngSubmit)=\"onSubmit($event)\" novalidate>\r\n      <div class=\"form-group\">\r\n        <div class=\"input-group\">\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"Search\" autofocus formControlName=\"searchInput\">\r\n          <button class=\"clear-button\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></button>\r\n        </div>\r\n      </div>\r\n      <div class=\"settings\">\r\n        <span>List mode:</span>\r\n        <div id=\"toggle-list-mode\">\r\n          <p class=\"fa fa-list\" [ngClass]=\"{'active': listGrid }\" (click)=\"toggleList(0)\"></p>\r\n          <p class=\"fa fa-th\" [ngClass]=\"{'active': !listGrid }\" (click)=\"toggleList(1)\"></p>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"searchForm.valid\" id=\"search-video-list\" class=\"video-list\">\r\n        <div *ngFor=\"let video of videos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickVideo($event, i, 1)\">\r\n          <div *ngIf=\"searchVideoImage\" class=\"video-item-image\">\r\n            <img src=\"{{ video.snippet.thumbnails.default.url }}\" alt=\"video thumbnail\" />\r\n          </div>\r\n          <div class=\"video-item-content\">\r\n            <p>{{ video.snippet.title }}</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n  </form>\r\n  <div *ngIf=\"feedVideos\" id=\"feed-video-list\" class=\"video-list\" [ngClass]=\"{'grid-list': !listGrid }\">\r\n    <div *ngFor=\"let feedVideo of feedVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\" (click)=\"onClickVideo($event, i, 3)\">\r\n      <div class=\"video-item-image\">\r\n        <img src=\"{{ feedVideo.snippet.thumbnails.medium.url }}\" alt=\"feed video thumbnail\" />\r\n      </div>\r\n      <div class=\"video-item-content\">\r\n        <p>{{ feedVideo.snippet.title }}</p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"

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
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/config/shared.module.ts");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var SearchComponent = (function () {
    function SearchComponent(youtube, shared, app) {
        this.youtube = youtube;
        this.shared = shared;
        this.app = app;
        this.searchVideoImage = false;
        this.listGrid = true;
        this._shared = shared;
        this._app = app;
    }
    SearchComponent.prototype.ngOnInit = function () {
        console.log('search');
        this.getSettings();
        this.searchFunction();
        this.getFeedVideos();
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
    SearchComponent.prototype.getSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.searchVideoImage = data.form_settings[1].value;
        });
    };
    SearchComponent.prototype.getFeedVideos = function () {
        var _this = this;
        this._shared.getFeed().subscribe(function (data) {
            _this.feedVideos = data;
        });
    };
    SearchComponent.prototype.clearSearch = function () {
        this.searchForm.reset();
        this.videos = null;
    };
    SearchComponent.prototype.onSubmit = function (event) {
        event.preventDefault();
    };
    SearchComponent.prototype.onClickVideo = function (event, i, list) {
        if (list === 1) {
            this._app.getVideo(this.videos[i]);
            this.clearSearch();
        }
        else if (list === 3) {
            this._app.getVideo(this.feedVideos[i]);
        }
    };
    SearchComponent.prototype.setSettings = function (data, from) {
        if (from === 0) {
            this.searchVideoImage = data[from].value;
        }
    };
    SearchComponent.prototype.toggleList = function (int) {
        if (int === 1) {
            this.listGrid = false;
        }
        else {
            this.listGrid = true;
        }
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/components/youtube-search.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof youtube_config_1.YoutubeGetVideo !== "undefined" && youtube_config_1.YoutubeGetVideo) === "function" && _a || Object, typeof (_b = typeof shared_module_1.SharedService !== "undefined" && shared_module_1.SharedService) === "function" && _b || Object, typeof (_c = typeof app_component_1.AppComponent !== "undefined" && app_component_1.AppComponent) === "function" && _c || Object])
], SearchComponent);
exports.SearchComponent = SearchComponent;
var _a, _b, _c;
//# sourceMappingURL=youtube-search.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <p>Settings</p>\r\n</div>\r\n<div class=\"app-content\">\r\n    <form *ngIf=\"finished\" [formGroup]=\"settingsForm\" id=\"settingsForm\" novalidate>\r\n        <div *ngFor=\"let setting of getSettings.controls; let i=index\" class=\"form-group\">\r\n            <input type=\"checkbox\" [attr.id]=\"'setting-' + i\" [formControl]=\"setting\"/>\r\n            <label [attr.for]=\"'setting-' + i\">{{ settings[i].name }}<span class=\"round-check\"></span></label>\r\n        </div>\r\n        <div class=\"form-group form-select\">\r\n            <label for=\"val-search-results\">Set trending country</label>\r\n            <span *ngIf=\"loadingRegion\" class=\"loading-region fa fa-circle-o-notch fa-spin fa-fw\"></span>\r\n            <select class=\"form-field\" [value]=\"regionCode\" (change)=\"changeRegion($event.target.value)\" [disabled]=\"loadingRegion\">\r\n                <option value=\"US\">United States</option>\r\n                <option value=\"GB\">United Kingdom</option>\r\n                <option value=\"RO\">Romania</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-api-key\">Api Key</label>\r\n            <input type=\"text\" id=\"val-api-key\" class=\"form-field\" placeholder=\"Your key\" [value]=\"apiKey\" disabled>\r\n            <span class=\"fa fa-exclamation-circle fa-color-danger\"></span>\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-search-results\">Results for search (Max. 50)</label>\r\n            <input type=\"text\" id=\"val-search-results\" class=\"form-field\" placeholder=\"1 to 50\" [value]=\"numSearchRes\" disabled>\r\n            <span class=\"fa fa-exclamation-circle fa-color-danger\"></span>\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-related-results\">Results for related videos (Max. 50)</label>\r\n            <input type=\"text\" id=\"val-related-results\" class=\"form-field\" placeholder=\"1 to 50\" [value]=\"numRelatedRes\" disabled>\r\n            <span class=\"fa fa-exclamation-circle fa-color-danger\"></span>\r\n        </div>\r\n        <div class=\"alert alert-danger\" role=\"alert\">\r\n            <span class=\"fa fa-exclamation-circle\"></span>All marked fields you can change in upcoming verions (<a href=\"https://github.com/quead/angular2-yt-player#changelog\" target=\"_blank\">check changelog</a>). Now you can only change it from \"assets/settings.json\".\r\n        </div>\r\n        <div class=\"alert alert-info\" role=\"alert\">\r\n            <span class=\"fa fa-info-circle\"></span>The settings will be saved in upcoming versions (<a href=\"https://github.com/quead/angular2-yt-player#changelog\" target=\"_blank\">check changelog</a>). You can set default settings from \"assets/settings.json\".\r\n        </div>\r\n    </form>\r\n</div>"

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
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var youtube_search_component_1 = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/config/shared.module.ts");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var SettingsComponent = (function () {
    function SettingsComponent(fb, http, shared, app, search) {
        this.fb = fb;
        this.http = http;
        this.shared = shared;
        this.app = app;
        this.search = search;
        this.finished = false;
        this.RegionSettings = new forms_1.FormControl();
        this.loadingRegion = false;
        this._shared = shared;
        this._fb = fb;
        this._app = app;
        this._search = search;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        console.log('settings');
        this.getDefaultSettings();
    };
    SettingsComponent.prototype.setForm = function () {
        this.settingsForm = this._fb.group({
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
    SettingsComponent.prototype.checkInputs = function () {
        var _this = this;
        this.settingsForm.valueChanges.subscribe(function (data) {
            Object.keys(data.settings).map(function (i) {
                _this.settings[i].value = data.settings[i];
            });
            _this._app.setSettings(_this.settings, 0);
            _this._search.setSettings(_this.settings, 1);
        });
    };
    SettingsComponent.prototype.mapSettings = function () {
        var _this = this;
        var arr = this.settings.map(function (s) {
            return _this._fb.control(s.value);
        });
        return this.fb.array(arr);
    };
    SettingsComponent.prototype.getDefaultSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.settings = data.form_settings;
            _this.apiKey = data.api_settings[0].value;
            _this.regionCode = data.api_settings[1].value;
            _this.numSearchRes = data.api_settings[2].value;
            _this.numRelatedRes = data.api_settings[3].value;
            _this.finished = true;
            _this.setForm();
        });
    };
    SettingsComponent.prototype.changeRegion = function (data) {
        var _this = this;
        this.loadingRegion = true;
        this._shared.settings.api_settings[1].value = data;
        this._shared.setApiSettings();
        this._shared.feedVideos = null;
        this._app.getSettings();
        this._app.getFeedVideos();
        setTimeout(function () { return _this.loadingRegion = false; }, 3000);
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/app/components/youtube-settings.component.html"),
        providers: [youtube_search_component_1.SearchComponent]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _a || Object, typeof (_b = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _b || Object, typeof (_c = typeof shared_module_1.SharedService !== "undefined" && shared_module_1.SharedService) === "function" && _c || Object, typeof (_d = typeof app_component_1.AppComponent !== "undefined" && app_component_1.AppComponent) === "function" && _d || Object, typeof (_e = typeof youtube_search_component_1.SearchComponent !== "undefined" && youtube_search_component_1.SearchComponent) === "function" && _e || Object])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
var _a, _b, _c, _d, _e;
//# sourceMappingURL=youtube-settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/config/shared.module.ts":
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
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var Observable_1 = __webpack_require__("../../../../rxjs/Observable.js");
__webpack_require__("../../../../rxjs/add/operator/map.js");
var SharedService = (function () {
    function SharedService(youtube, http) {
        this.youtube = youtube;
        this.http = http;
    }
    SharedService.prototype.getFeed = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            if (_this.feedVideos) {
                observer.next(_this.feedVideos);
                return observer.complete();
            }
            _this.getSettings().subscribe(function (data) {
                _this.setApiSettings();
                _this.settings = data;
                _this.youtube.feedVideos().subscribe(function (result) {
                    _this.feedVideos = result.items;
                    observer.next(_this.feedVideos);
                    observer.complete();
                }, function (error) {
                    console.log('error on feed videos' + error);
                });
            });
        });
    };
    SharedService.prototype.getSettings = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            if (_this.settings) {
                observer.next(_this.settings);
                return observer.complete();
            }
            else {
                _this.http.get('assets/settings.json')
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.settings = data;
                    observer.next(_this.settings);
                    observer.complete();
                }, function (error) {
                    console.log('error on get settings ' + error);
                });
            }
        });
    };
    SharedService.prototype.setApiSettings = function () {
        this.youtube.defaultApiSet(this.settings);
    };
    return SharedService;
}());
SharedService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof youtube_config_1.YoutubeGetVideo !== "undefined" && youtube_config_1.YoutubeGetVideo) === "function" && _a || Object, typeof (_b = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _b || Object])
], SharedService);
exports.SharedService = SharedService;
var _a, _b;
//# sourceMappingURL=shared.module.js.map

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
        this.url = 'https://www.googleapis.com/youtube/v3/';
        this.videoDetails = 'part=snippet,contentDetails,statistics,status';
        this.feedDetails = '&chart=mostPopular';
    }
    YoutubeGetVideo.prototype.defaultApiSet = function (data) {
        this.settings = data.api_settings;
        this.apiKey = this.settings[0].value;
        this.regionCode = this.settings[1].value;
        this.numSearchRes = this.settings[2].value;
        this.numRelatedRes = this.settings[3].value;
    };
    YoutubeGetVideo.prototype.searchVideo = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&q=' + query + '&maxResults=' + this.numSearchRes + '&type=video&key=' + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.relatedVideos = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&relatedToVideoId=' + query + '&maxResults=' + this.numRelatedRes + '&type=video&key=' + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.feedVideos = function () {
        if (this.apiKey) {
            return this.http.get(this.url + 'videos?' + this.videoDetails + this.feedDetails + '&regionCode=' + this.regionCode + '&maxResults=25&key=' + this.apiKey)
                .map(function (response) { return response.json(); });
        }
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