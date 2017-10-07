webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <div class=\"header-bar\">\r\n      <h1><span class=\"favicon-app\"></span>YouTube Player v2.0</h1>\r\n      <div class=\"win-controls\">\r\n          <button id=\"win-minimize\" (click)=\"winMinimize();\"></button>\r\n          <button id=\"win-maximize\" (click)=\"winMaximize();\"></button>\r\n          <button id=\"win-close\" (click)=\"winClose();\"></button>\r\n      </div>\r\n      <div class=\"linux-controls\">\r\n          <button id=\"linux-close\" (click)=\"winMinimize();\"></button>\r\n          <button id=\"linux-minimize\" (click)=\"winMaximize();\"></button>\r\n          <button id=\"linux-maximize\" (click)=\"winClose();\"></button>\r\n      </div>\r\n  </div>\r\n  <div class=\"device-bar\">\r\n    <button type=\"button\" class=\"trigger-nav\" (click)=\"openMobileMenu()\"><span class=\"fa fa-navicon\"></span>Menu</button>\r\n    <div id=\"logo\">\r\n        <a routerLink=\"/home\" class=\"logo-svg-small\" title=\"Homepage\"></a>\r\n        <small *ngIf=\"regionCode\">{{ regionCode }}</small>\r\n      </div>\r\n  </div>\r\n</header>\r\n<div id=\"app-container\" [ngClass]=\"{'light-mode': !darkMode, 'menu-active': menuActive }\">\r\n  <div class=\"loading-bar inactive\"></div>\r\n  <input type=\"text\" class=\"hide-input\" #videoItemIDvalue />\r\n  <div class=\"container\">\r\n    <div class=\"col col-1\">\r\n        <div class=\"app app-services\">\r\n            <div class=\"app-head\">\r\n                <div id=\"logo\">\r\n                  <a routerLink=\"/home\" class=\"logo-svg\" title=\"Homepage\"></a>\r\n                  <small *ngIf=\"regionCode\">{{ regionCode }}</small>\r\n                </div>\r\n            </div>\r\n            <div class=\"app-content\">\r\n              <nav>\r\n                <ul>\r\n                  <li><a routerLink=\"/home\" routerLinkActive=\"is-active\" title=\"Homepage\"><span class=\"fa fa-home\"></span>Home<span class=\"description\">Trending videos and search</span></a></li>\r\n                  <li><a routerLink=\"/history\" routerLinkActive=\"is-active\" title=\"History page\"><span class=\"fa fa-history\"></span>History<span class=\"description\">Recently played</span></a></li>\r\n                  <li><a routerLink=\"/about\" routerLinkActive=\"is-active\" title=\"About application page\"><span class=\"fa fa-info-circle\"></span>About<span class=\"description\">All informations about the app</span></a></li>\r\n                  <li><a routerLink=\"/settings\" routerLinkActive=\"is-active\" title=\"Settings page\"><span class=\"fa fa-gear\"></span>Settings<span class=\"description\">Change app settings</span></a></li>\r\n                </ul>\r\n              </nav>\r\n              <div id=\"playlist-video-list\" class=\"video-list\">\r\n                <div class=\"video-item-head\">\r\n                    Current playlist\r\n                    <button type=\"button\" class=\"video-item-head-btn\" (click)=\"clearPlaylist()\"><span class=\"fa fa-close\"></span>clear</button>\r\n                    <!--<button type=\"button\" class=\"video-item-head-btn\" (click)=\"exportPlaylist()\"><span class=\"fa fa-cog\"></span>manage</button>-->\r\n                </div>\r\n                <div class=\"playlist-video-content\" #playlistContainer>\r\n                  <div *ngIf=\"playlistVideos.length === 0\" class=\"video-list-info\">\r\n                    Empty playlist\r\n                  </div>\r\n                  <div *ngFor=\"let playlistVideo of playlistVideos; let i = index\" [ngClass]=\"currentPlaylistItem === i ? 'active' : ''\" [attr.data-index]=\"i\" class=\"video-item\">\r\n                    <div class=\"video-item-info\">\r\n                      <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + playlistVideo.snippet.thumbnails.default.url +')'}\"></div>\r\n                      <div class=\"video-item-content\">\r\n                        <ng-container *ngIf=\"currentPlaylistItem === i &&  currentState === 1\">\r\n                          <p class=\"video-item-hint\"><span class=\"fa fa-play\"></span>Playing</p>\r\n                        </ng-container>\r\n                        <ng-container *ngIf=\"currentPlaylistItem === i && currentState !== 1 && currentState !== -1\">                        \r\n                          <p class=\"video-item-hint\"><span class=\"fa fa-pause\"></span>Paused</p> \r\n                        </ng-container>                       \r\n                        <ng-container *ngIf=\"currentPlaylistItem === i &&  currentState === -1\">                        \r\n                          <p class=\"video-item-hint\"><span class=\"fa fa-stop\"></span>Not started</p> \r\n                        </ng-container>                       \r\n                        <p class=\"video-item-title\">{{ playlistVideo.snippet.title }}</p>\r\n                        <p class=\"video-item-autor\">by <span>{{ playlistVideo.snippet.channelTitle }}</span></p>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"video-item-settings\">\r\n                      <button class=\"video-item-play\" (click)=\"onClickPlaylist($event, i)\">\r\n                        <span class=\"fa \" [ngClass]=\"currentPlaylistItem === i &&  currentState === 1 ? 'fa-pause' : 'fa-play'\"></span>\r\n                      </button>\r\n                      <button class=\"video-item-share\" (click)=\"onCopyVideoItemLink(i, 3)\">\r\n                        <span class=\"fa fa-share-alt\"></span>\r\n                      </button>\r\n                      <button class=\"video-item-remove\" (click)=\"showPlaylistModal(i)\">\r\n                        <span class=\"fa fa-times\"></span>\r\n                      </button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col col-2\">\r\n        <div class=\"app app-player\">\r\n            <div class=\"app-head\">\r\n                <h2>Player</h2>\r\n                <div class=\"settings\">\r\n                    <p (click)=\"addPlaylistItem(0, 3)\"><span class=\"fa fa-plus\"></span>Add to playlist</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"app-content\">\r\n              <div id=\"youtube-player\" *ngIf=\"feedVideos\" [ngClass]=\"{'active': displayVideoPlayer }\">\r\n                <youtube-player [videoId]=\"currentVideo.id\" (ready)=\"savePlayer($event)\" (change)=\"onStateChange($event)\" [playerVars]=\"playerVars()\"></youtube-player>\r\n              </div>\r\n              <div *ngIf=\"currentVideo.id\" class=\"current-video-all\">\r\n                  <div class=\"current-video-details\">\r\n                    <p class=\"current-video-name\">{{ currentVideo.title }}</p>\r\n                  </div>\r\n                  <div *ngIf=\"!displayVideoPlayer\" id=\"player-controls\">\r\n                    <div class=\"player-buttons\">\r\n                        <button id=\"previous-song\" (click)=\"playPlaylistItem('prev', currentPlaylistItem)\"><span class=\"fa fa-backward\"></span></button>\r\n                        <button id=\"play-song\" (click)=\"playPauseVideo()\" ><span class=\"fa\" [ngClass]=\"currentState === 1 ? 'fa-pause' : 'fa-play' \"></span></button>\r\n                        <button id=\"next-song\" (click)=\"playPlaylistItem('next', currentPlaylistItem)\"><span class=\"fa fa-forward\"></span></button>\r\n                    </div>\r\n                    <div class=\"current-video-range\">\r\n                      <div class=\"duration-range-container\">\r\n                        <input type=\"range\" id=\"youtube-player-range\" class=\"player-range\" [ngClass]=\"videoMaxRange <= 0 ? 'inactive' : 'active'\" [value]=\"videoCurRange\" min=\"0\" max=\"{{videoMaxRange}}\" #videoRange (mousedown)=\"RangeNouseDown()\" (mousemove)=\"RangeMouseMove(videoRange.value)\" (mouseup)=\"RangeMouseUp(videoRange.value)\" [disabled]=\"currentState === -1\">\r\n                        <span class=\"duration-input-shadow\" [ngStyle]=\"{'width': videoRangePercent + '%'}\"></span>\r\n                      </div>\r\n                      <p class=\"current-video-range-value\">{{videoCurFull}}</p>\r\n                      <p class=\"current-video-range-max-value\">{{videoMaxFull}}</p>\r\n                    </div>\r\n                    <div class=\"volume-range-value\" [ngClass]=\"videoCurVolume <= 0 ? 'inactive' : 'active'\">\r\n                      <span class=\"fa\" (click)=\"toggleHeadSettings(2)\" [ngClass]=\"currentMuteState ? 'fa-volume-off' : 'fa-volume-up'\"></span>\r\n                      <div class=\"volume-input-container\">\r\n                        <input type=\"range\" id=\"youtube-volume-range\" class=\"volume-input\" [value]=\"videoCurVolume\" min=\"0\" max=\"100\" #volumeRange (mousemove)=\"volumeRangeMouseMove(volumeRange.value)\" (mouseup)=\"volumeRangeMouseUp(volumeRange.value)\">\r\n                        <span class=\"volume-input-shadow\" [ngClass]=\"{'inactive': currentMuteState }\" [style.width]=\"volumeRange.value + '%'\"></span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"current-video-stats\">\r\n                      <p class=\"stats-views\">{{ currentVideo.stats.views | number:'1.0' }} Views</p>\r\n                      <p class=\"stats-likes\"><span class=\"fa fa-thumbs-up\"></span> {{ currentVideo.stats.likes | number:'1.0' }}</p>\r\n                      <p class=\"stats-dislikes\"><span class=\"fa fa-thumbs-down\"></span> {{ currentVideo.stats.dislikes | number:'1.0' }}</p>\r\n                  </div>\r\n                  <div class=\"current-video-share\">\r\n                    <label for=\"shareInput\">Share link</label>\r\n                    <input id=\"shareInput\" type=\"text\" name=\"current video share\" #shareInput [value]=\"shareLink\" (click)=\"copyShareLink(shareInput.select())\" readonly>\r\n                  </div>\r\n              </div>\r\n              <div id=\"related-video-list\" class=\"video-list\" [ngClass]=\"{'activePlayer': displayVideoPlayer }\">\r\n                <div class=\"video-item-head\">\r\n                    Similar videos\r\n                </div>\r\n                <div class=\"related-video-content\">\r\n                  <div *ngFor=\"let relatedVideo of relatedVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\">\r\n                    <div class=\"video-item-info\">\r\n                      <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + relatedVideo.snippet.thumbnails.default.url +')'}\"></div>\r\n                      <div class=\"video-item-content\">\r\n                        <p class=\"video-item-title\">{{ relatedVideo.snippet.title }}</p>\r\n                        <p class=\"video-item-autor\">by <span>{{ relatedVideo.snippet.channelTitle }}</span></p>                      \r\n                      </div>\r\n                    </div>\r\n                    <div class=\"video-item-settings\">\r\n                      <button class=\"video-item-play\" (click)=\"onClickRelated($event, i)\">\r\n                        <span class=\"fa fa-play\"></span>\r\n                      </button>\r\n                      <button class=\"video-item-share\" (click)=\"onCopyVideoItemLink(i, 2)\">\r\n                        <span class=\"fa fa-share-alt\"></span>\r\n                      </button>\r\n                      <button class=\"video-item-add\" (click)=\"addPlaylistItem(i, 2)\">\r\n                        <span class=\"fa fa-plus\"></span>\r\n                      </button>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col col-3\">\r\n        <div class=\"app app-feed\">\r\n          <router-outlet></router-outlet>\r\n        </div>\r\n        <div [ngClass]=\"{'active': notify.enabled }\" class=\"notif notif-primary\">\r\n          <span class=\"fa fa-cog fa-spin fa-fw\"></span>\r\n          <p>{{ notify.message }}</p>\r\n        </div>\r\n    </div>\r\n  </div>\r\n  <div *ngIf=\"modal\" class=\"modal-overlay\">\r\n    <div class=\"modal-background-overlay\" (click)=\"closeModal()\"></div>\r\n    <div *ngIf=\"modalPlaylist\" class=\"modal-container\">\r\n      <h2>Do you want to remove this item from playlist?</h2>\r\n      <div class=\"modal-content\">\r\n        <img src=\"{{ playlistVideos[modalPlaylistItem].snippet.thumbnails.medium.url }}\" alt=\"{{ playlistVideos[modalPlaylistItem].snippet.title }}\" />\r\n        <p>{{ playlistVideos[modalPlaylistItem].snippet.title }}</p>\r\n      </div>\r\n      <button class=\"modal-close\" (click)=\"closeModal()\">\r\n        <span class=\"fa fa-times\"></span>\r\n      </button>\r\n      <div class=\"modal-buttons\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirmModal()\">Confirm</button>        \r\n        <button type=\"button\" class=\"btn btn-link\" (click)=\"closeModal()\">Cancel</button>        \r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"modalExportPlaylist\" class=\"modal-container\">\r\n      <h2>Manage playlist</h2>\r\n      <div class=\"modal-content\">\r\n        <textarea class=\"export-playlist\" [value]=\"this.playlistVideos | json\" readonly></textarea>\r\n      </div>\r\n      <button class=\"modal-close\" (click)=\"closeModal()\">\r\n        <span class=\"fa fa-times\"></span>\r\n      </button>\r\n      <div class=\"modal-buttons\">\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"exportFilePlaylist()\">Export playlist</button>        \r\n        <button type=\"button\" class=\"btn btn-link\" (click)=\"closeModal()\">Cancel</button>        \r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div id=\"mobile-unavailable\">\r\n    The app is not available for mobile/tablet.\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__ = __webpack_require__("../../../../../src/app/shared/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__ = __webpack_require__("../../../../../src/app/shared/lists.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_nwjs_service__ = __webpack_require__("../../../../../src/app/shared/nwjs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(youtube, shared, nwjs) {
        this.youtube = youtube;
        this.shared = shared;
        this.nwjs = nwjs;
        this.videoRangePercent = 0;
        this.playlistVideos = [];
        this.currentVideoObject = [];
        this.thumbnails = true;
        this.darkMode = true;
        this.menuActive = false;
        this.modal = false;
        this.modalPlaylist = false;
        this.modalExportPlaylist = false;
        this.playlistPrefill = true;
        this.displayVideoPlayer = true;
        this.repeatMode = true;
        this.shareLink = '';
        this.currentVideo = {
            id: '',
            title: '',
            channelTitle: '',
            stats: {
                likes: '',
                dislikes: '',
                views: ''
            }
        };
        this.currentState = -1;
        this.currentMuteState = false;
        this.videoRangeMouseActive = false;
        this.volumeRangeMouseActive = false;
        this.videoCurRange = 0;
        this.videoMaxRange = 0;
        this.videoCurFull = '00:00:00';
        this.videoMaxFull = '00:00:00';
        this.videoCurVolume = -1;
        this.loading = true;
        this.maximized = false;
        this._shared = shared;
        this._nwjs = nwjs;
        this.notify = this._shared.notify;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._nwjs.init().subscribe(function (data) {
            if (typeof data !== 'undefined') {
                _this.nw = data;
                _this.initNWJS();
                _this.initShortcut();
            }
        });
        this.preventOldSettings();
        this.setSettings();
        this.getFeedVideos();
    };
    // ---------------- Init player ----------------
    AppComponent.prototype.savePlayer = function (player) {
        /*let playerSrc = player.a.src;
        if (playerSrc.indexOf('origin') > 0) {
          const playerSrcOrigin = playerSrc.substr(playerSrc.indexOf('origin'));
          const playerOrigin = playerSrcOrigin.substr(0, playerSrcOrigin.indexOf('&'));
          const playerNewSrc = playerSrc.replace(playerOrigin, 'origin=http%3A%2F%2Fgoogle.com');
          player.a.src = playerNewSrc;
        }
        console.log(player);*/
        this.player = player;
    };
    AppComponent.prototype.playerVars = function () {
        var playerVars = {
            'enablejsapi': 1,
            'controls': 1,
            'disablekb': 0,
            'showinfo': 0,
            'playsinline': 1,
            'autoplay': 0,
            'loop': 0,
            'origin': 'http://google.com',
            'rel': 0
        };
        return playerVars;
    };
    AppComponent.prototype.getFeedVideos = function () {
        var _this = this;
        this._shared.getFeed().subscribe(function (data) {
            _this.feedVideos = data;
            if (!_this.currentVideo.id) {
                _this.setDefaultPlayer();
            }
        });
    };
    AppComponent.prototype.setCurrentVideoObject = function (data) {
        this.currentVideoObject = [];
        this.currentVideoObject.push(data);
    };
    AppComponent.prototype.setDefaultPlayer = function () {
        this.feedVideos = this._shared.feedVideos;
        this.setCurrentVideoObject(this.feedVideos[0]);
        this.currentVideo.id = this.feedVideos[0].id;
        this.currentVideo.title = this.feedVideos[0].snippet.title;
        this.currentVideo.stats.likes = this.feedVideos[0].statistics.likeCount;
        this.currentVideo.stats.dislikes = this.feedVideos[0].statistics.dislikeCount;
        this.currentVideo.stats.views = this.feedVideos[0].statistics.viewCount;
        this.shareLink = 'https://youtu.be/' + this.currentVideo.id;
        this.getRelatedVideos();
        this.findPlaylistItem();
    };
    AppComponent.prototype.onStateChange = function (event) {
        this.currentState = event.data;
        this.videoMaxRange = this.player.getDuration();
        this.videoCurVolume = this.player.getVolume();
        if (this.currentState === 1) {
            this.videoMaxFull = this.timeFormat(this.videoMaxRange);
            this.currentMuteState = this.player.isMuted();
            this.startRange();
        }
        else {
            this.stopRange();
        }
        if (this.currentState === 0) {
            this.stopRange();
            if (this.repeatMode) {
                if (this.playlistVideos.length) {
                    this.findPlaylistItem();
                    if (this.currentPlaylistItem < 0) {
                        this.playPlaylistItem('next', this.currentPlaylistItem);
                    }
                    else {
                        this.playPlaylistItem('next', this.currentPlaylistItem);
                    }
                    if (this.playlistVideos.length === 1) {
                        this.player.playVideo();
                    }
                }
                else {
                    this.player.playVideo();
                }
            }
        }
    };
    AppComponent.prototype.startRange = function () {
        var _this = this;
        this.stopRange();
        if (this.currentState) {
            this.videoRangeTimer = setInterval(function () {
                console.log('Rangeu merge de nebun...');
                _this.videoCurRange = _this.player.getCurrentTime();
                _this.videoCurFull = _this.timeFormat(_this.videoCurRange);
                _this.videoRangePercent = (_this.videoCurRange / _this.videoMaxRange) * 100;
            }, 1000);
        }
    };
    AppComponent.prototype.stopRange = function () {
        clearInterval(this.videoRangeTimer);
    };
    // ---------------- Playlist settings ----------------
    AppComponent.prototype.playlistInit = function () {
        if (localStorage.getItem('playlist') === null || localStorage.getItem('playlist').length === 2) {
            this.playlistVideos = JSON.parse(JSON.stringify(this.relatedVideos));
            this._shared.playlist = JSON.parse(JSON.stringify(this.playlistVideos));
            this._shared.updatePlaylist();
        }
        else {
            this._shared.getPlaylist();
            this.playlistVideos = JSON.parse(JSON.stringify(this._shared.playlist));
        }
        this.findPlaylistItem();
    };
    AppComponent.prototype.findPlaylistItem = function () {
        var _this = this;
        var playlistItem;
        if (typeof this.currentVideoObject[0].id.videoId !== 'undefined') {
            playlistItem = this.playlistVideos.find(function (item) { return item.id.videoId === _this.currentVideoObject[0].id.videoId; });
        }
        else {
            playlistItem = this.playlistVideos.find(function (item) { return item.id === _this.currentVideoObject[0].id; });
        }
        this.currentPlaylistItem = this.playlistVideos.indexOf(playlistItem);
    };
    AppComponent.prototype.playPlaylistItem = function (direction, i) {
        if (direction === 'next') {
            if (i < this.playlistVideos.length) {
                i += 1;
            }
            if (i === this.playlistVideos.length) {
                i = 0;
            }
        }
        if (direction === 'prev') {
            if (i === 0 || i < 0) {
                i = this.playlistVideos.length - 1;
            }
            else {
                i -= 1;
            }
        }
        if (this.playlistVideos.length > 0) {
            this.getVideo(this.playlistVideos[i]);
        }
        else {
            this._shared.triggerNotify('Playlist is empty');
            this.updateNotify();
        }
    };
    AppComponent.prototype.removePlaylistItem = function (i) {
        var _this = this;
        this._shared.triggerNotify('Video removed');
        this.updateNotify();
        setTimeout(function () {
            if (i === _this.currentPlaylistItem) {
                _this.currentPlaylistItem = -1;
            }
            _this.playlistVideos.splice(i, 1);
            _this._shared.playlist.splice(i, 1);
            _this._shared.updatePlaylist();
            _this.findPlaylistItem();
        }, 200);
    };
    AppComponent.prototype.addPlaylistItem = function (i, list) {
        var listType;
        var playlistItem;
        if (list === 0) {
            listType = this.feedVideos[i];
        }
        if (list === 1) {
            listType = this._shared.lastSearchedVideos[i];
        }
        if (list === 2) {
            listType = this.relatedVideos[i];
        }
        if (list === 3) {
            listType = this.currentVideoObject[i];
        }
        if (list === 4) {
            listType = this._shared.historyVideos[i];
        }
        if (typeof listType.id.videoId !== 'undefined') {
            playlistItem = this.playlistVideos.find(function (item) { return item.id.videoId === listType.id.videoId; });
        }
        else {
            playlistItem = this.playlistVideos.find(function (item) { return item.id === listType.id; });
        }
        if (typeof playlistItem === 'undefined') {
            this.playlistVideos.push(listType);
            this._shared.playlist.push(listType);
            this._shared.updatePlaylist();
            this.findPlaylistItem();
            this._shared.triggerNotify('Added to playlist');
            this.updateNotify();
            this.scrollToBottom();
        }
        else {
            this._shared.triggerNotify('Video is already in playlist');
            this.updateNotify();
        }
    };
    AppComponent.prototype.clearPlaylist = function () {
        this.currentPlaylistItem = -1;
        this.playlistVideos = [];
        this._shared.playlist = [];
        this._shared.updatePlaylist();
    };
    AppComponent.prototype.exportPlaylist = function () {
        this.showExportPlaylistModal();
    };
    AppComponent.prototype.exportFilePlaylist = function () {
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.playlistVideos)], { type: 'data:text/json;charset=utf8' });
        a.href = URL.createObjectURL(file);
        a.download = 'playlist.json';
        a.click();
    };
    // ---------------- Init settings ----------------
    AppComponent.prototype.preventOldSettings = function () {
        if (localStorage.length === 1 || localStorage.getItem('version') === null) {
            console.log('Updating localstorage...');
            localStorage.removeItem('version');
            localStorage.removeItem('playlist');
            localStorage.removeItem('settings');
            this._shared.settings = null;
            this._shared.playlist = null;
            this.playlistVideos = [];
        }
    };
    AppComponent.prototype.setSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.regionCode = data.api_settings[1].value;
            _this.thumbnails = data.form_settings[0].value;
            _this.displayVideoPlayer = data.form_settings[2].value;
            _this.repeatMode = data.form_settings[3].value;
            _this.darkMode = data.form_settings[4].value;
        });
    };
    AppComponent.prototype.toggleHeadSettings = function (int) {
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
    // ---------------- Video fetching ----------------
    AppComponent.prototype.onClickRelated = function (event, i) {
        this.getVideo(this.relatedVideos[i]);
    };
    AppComponent.prototype.onClickPlaylist = function (event, i) {
        if (i === this.currentPlaylistItem) {
            this.playPauseVideo();
        }
        else {
            this.getVideo(this.playlistVideos[i]);
        }
    };
    AppComponent.prototype.getVideo = function (data) {
        this.setCurrentVideoObject(data);
        if (data.id.videoId) {
            this.getStatsVideos(data.id.videoId);
        }
        else if (data.id) {
            this.getStatsVideos(data.id);
        }
        this.playVideo(data);
    };
    AppComponent.prototype.playVideo = function (data) {
        if (data.id !== this.currentVideo.id || this.currentState === -1) {
            if (typeof data.id.videoId !== 'undefined') {
                this.currentVideo.id = data.id.videoId;
            }
            else {
                this.currentVideo.id = data.id;
            }
            this.currentVideo.title = data.snippet.title;
            this._shared.addHistoryVideo(data);
            this.player.loadVideoById(this.currentVideo.id);
            this.getRelatedVideos();
            this.findPlaylistItem();
        }
    };
    AppComponent.prototype.getStatsVideos = function (query) {
        var _this = this;
        this.youtube.statsVideos(query).subscribe(function (result) {
            _this.currentVideo.id = result.items[0].id;
            _this.currentVideo.title = result.items[0].snippet.title;
            _this.currentVideo.channelTitle = result.items[0].snippet.channelTitle;
            _this.currentVideo.stats.likes = result.items[0].statistics.likeCount;
            _this.currentVideo.stats.dislikes = result.items[0].statistics.dislikeCount;
            _this.currentVideo.stats.views = result.items[0].statistics.viewCount;
            _this.shareLink = 'https://youtu.be/' + _this.currentVideo.id;
        }, function (error) {
            console.log('error on related videos');
        });
    };
    AppComponent.prototype.getRelatedVideos = function () {
        var _this = this;
        this.youtube.relatedVideos(this.currentVideo.id).subscribe(function (result) {
            _this.relatedVideos = result.items;
            if (_this.playlistPrefill) {
                _this.playlistInit();
                _this.playlistPrefill = false;
            }
        }, function (error) {
            console.log('error on related videos');
        });
    };
    // ---------------- Player controls ----------------
    AppComponent.prototype.playPauseVideo = function () {
        if (this.currentState === 1) {
            this.player.pauseVideo();
        }
        else {
            this.player.playVideo();
        }
    };
    AppComponent.prototype.RangeNouseDown = function () {
        this.videoRangeMouseActive = true;
        this.stopRange();
    };
    AppComponent.prototype.RangeMouseMove = function (value) {
        if (this.videoRangeMouseActive) {
            this.videoCurRange = value;
            this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
            this.videoCurFull = this.timeFormat(this.videoCurRange);
        }
    };
    AppComponent.prototype.RangeMouseUp = function (value) {
        if (this.currentState !== -1 && this.currentState !== 1) {
            this.player.playVideo();
        }
        if (this.currentState === 1) {
            this.startRange();
        }
        else {
            this.stopRange();
        }
        this.videoCurRange = value;
        this.videoRangePercent = (this.videoCurRange / this.videoMaxRange) * 100;
        this.videoCurFull = this.timeFormat(this.videoCurRange);
        this.player.seekTo(this.videoCurRange, true);
        this.videoRangeMouseActive = false;
    };
    AppComponent.prototype.volumeRangeMouseMove = function (value) {
        if (this.volumeRangeMouseActive) {
            if (this.currentMuteState) {
                this.player.unMute();
                this.currentMuteState = false;
            }
        }
    };
    AppComponent.prototype.volumeRangeMouseUp = function (value) {
        if (this.currentMuteState) {
            this.player.unMute();
            this.currentMuteState = false;
        }
        this.player.setVolume(value);
    };
    AppComponent.prototype.checkVolumeRange = function () {
        if (this.currentState !== -1) {
            this.currentMuteState = this.player.isMuted();
            this.videoCurVolume = this.player.getVolume();
        }
    };
    // ---------------- Modal functions ----------------
    AppComponent.prototype.closeModal = function () {
        this.modal = false;
        this.modalPlaylist = false;
        this.modalExportPlaylist = false;
    };
    AppComponent.prototype.showPlaylistModal = function (i) {
        this.modal = true;
        this.modalPlaylist = true;
        this.modalPlaylistItem = i;
    };
    AppComponent.prototype.showExportPlaylistModal = function () {
        this.modal = true;
        this.modalExportPlaylist = true;
    };
    AppComponent.prototype.confirmModal = function () {
        this.removePlaylistItem(this.modalPlaylistItem);
        this.modal = false;
    };
    // ---------------- NwJS Init ----------------
    AppComponent.prototype.initNWJS = function () {
        var _this = this;
        var win = this.nw.Window.get();
        this.nw.Window.get().on('new-win-policy', function (frame, url, policy) {
            policy.ignore();
            _this.nw.Shell.openExternal(url);
        });
        this.nw.Window.get().on('restore', function () {
            console.log('e restored');
            _this.maximized = false;
        });
        this.nw.Window.get().on('maximize', function () {
            console.log('e max');
            _this.maximized = true;
        });
    };
    AppComponent.prototype.initShortcut = function () {
        var _this = this;
        var globalThis = this;
        var option = [
            {
                key: 'MediaNextTrack',
                active: function () {
                    globalThis.playPlaylistItem('next', globalThis.currentPlaylistItem);
                },
                failed: function (msg) {
                    console.log(msg);
                }
            },
            {
                key: 'MediaPrevTrack',
                active: function () {
                    globalThis.playPlaylistItem('prev', globalThis.currentPlaylistItem);
                },
                failed: function (msg) {
                    console.log(msg);
                }
            },
            {
                key: 'MediaPlayPause',
                active: function () {
                    globalThis.playPauseVideo();
                },
                failed: function (msg) {
                    console.log(msg);
                }
            }
        ];
        Object.keys(option).map(function (i) {
            var shortcut = _this.nw.Shortcut(option[i]);
            _this.nw.Shortcut.registerGlobalHotKey(shortcut);
        });
    };
    AppComponent.prototype.winMaximize = function () {
        var win = this.nw.Window.get();
        if (!this.maximized) {
            win.maximize();
            this.maximized = true;
        }
        else {
            win.unmaximize();
            this.maximized = false;
        }
    };
    AppComponent.prototype.winClose = function () {
        var win = this.nw.Window.get();
        win.close();
    };
    AppComponent.prototype.winMinimize = function () {
        var win = this.nw.Window.get();
        win.minimize();
    };
    // ---------------- Related functions ----------------
    AppComponent.prototype.openMobileMenu = function () {
        if (this.menuActive) {
            this.menuActive = false;
        }
        else {
            this.menuActive = true;
        }
    };
    AppComponent.prototype.onCopyVideoItemLink = function (i, list) {
        var listType;
        var youtubeLink = 'https://youtu.be/';
        if (list === 0) {
            listType = this.feedVideos[i];
        }
        if (list === 1) {
            listType = this._shared.lastSearchedVideos[i];
        }
        if (list === 2) {
            listType = this.relatedVideos[i];
        }
        if (list === 3) {
            listType = this.playlistVideos[i];
        }
        if (list === 4) {
            listType = this._shared.historyVideos[i];
        }
        if (typeof listType.id.videoId !== 'undefined') {
            this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id.videoId;
        }
        else {
            this.videoItemIDvalue.nativeElement.value = youtubeLink + listType.id;
        }
        this.videoItemIDvalue.nativeElement.select();
        this.videoItemIDvalue.nativeElement.focus();
        document.execCommand('copy');
        this.videoItemIDvalue.nativeElement.blur();
        this.copyShareLink();
    };
    AppComponent.prototype.scrollToBottom = function () {
        var _this = this;
        try {
            setTimeout(function () {
                _this.myScrollContainer.nativeElement.scrollTop = _this.myScrollContainer.nativeElement.scrollHeight;
            }, 200);
        }
        catch (err) {
            console.log(err);
            console.log('scroll issue');
        }
    };
    AppComponent.prototype.copyShareLink = function () {
        var _this = this;
        if (!this.notify.enabled) {
            document.execCommand('Copy');
            this._shared.triggerNotify('Copied');
            this.updateNotify();
        }
        else {
            setTimeout(function () {
                document.execCommand('Copy');
                _this._shared.triggerNotify('Copied');
                _this.updateNotify();
            }, 1000);
        }
    };
    AppComponent.prototype.updateNotify = function () {
        var _this = this;
        this.notify = this._shared.notify;
        setTimeout(function () { return _this.notify = _this._shared.notify; }, 1000);
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
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('playlistContainer'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "myScrollContainer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_16" /* ViewChild */])('videoItemIDvalue'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ElementRef */]) === "function" && _b || Object)
], AppComponent.prototype, "videoItemIDvalue", void 0);
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-yt',
        template: __webpack_require__("../../../../../src/app/app.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__["a" /* YoutubeGetVideo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__["a" /* YoutubeGetVideo */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__["a" /* SharedService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__shared_nwjs_service__["a" /* NwjsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_nwjs_service__["a" /* NwjsService */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_router__ = __webpack_require__("../../../../../src/app/app.router.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_lists_service__ = __webpack_require__("../../../../../src/app/shared/lists.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_nwjs_service__ = __webpack_require__("../../../../../src/app/shared/nwjs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_youtube_service__ = __webpack_require__("../../../../../src/app/shared/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_youtube_settings_component__ = __webpack_require__("../../../../../src/app/components/youtube-settings.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_youtube_search_component__ = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_youtube_about_component__ = __webpack_require__("../../../../../src/app/components/youtube-about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_youtube_history_component__ = __webpack_require__("../../../../../src/app/components/youtube-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_youtube_player__ = __webpack_require__("../../../../ngx-youtube-player/modules/ngx-youtube-player.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["d" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_13_ngx_youtube_player__["a" /* YoutubePlayerModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_router__["a" /* routes */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_youtube_settings_component__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_youtube_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_youtube_about_component__["a" /* AboutComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_youtube_history_component__["a" /* HistoryComponent */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]],
        providers: [__WEBPACK_IMPORTED_MODULE_8__shared_youtube_service__["a" /* YoutubeGetVideo */], __WEBPACK_IMPORTED_MODULE_6__shared_lists_service__["a" /* SharedService */], __WEBPACK_IMPORTED_MODULE_7__shared_nwjs_service__["a" /* NwjsService */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.router.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export router */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_youtube_search_component__ = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_youtube_history_component__ = __webpack_require__("../../../../../src/app/components/youtube-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_youtube_about_component__ = __webpack_require__("../../../../../src/app/components/youtube-about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_youtube_settings_component__ = __webpack_require__("../../../../../src/app/components/youtube-settings.component.ts");





var router = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_1__components_youtube_search_component__["a" /* SearchComponent */] },
    { path: 'history', component: __WEBPACK_IMPORTED_MODULE_2__components_youtube_history_component__["a" /* HistoryComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_3__components_youtube_about_component__["a" /* AboutComponent */] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_4__components_youtube_settings_component__["a" /* SettingsComponent */] }
];
var routes = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(router);
//# sourceMappingURL=app.router.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-about.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <h2>About</h2>\r\n</div>\r\n<div class=\"app-content\">\r\n    <p>This is a simple youtube web player and desktop player based on angular-cli 1.4, NWjs 0.25.2, ng2-youtube-player 0.0.3 (used for youtube iFrame API), SCSS (CSS3), HTML5 and webkit functions.</p>\r\n    <p>This player is compatible only with Chrome/webkit browsers.</p>\r\n    <p>The project status is beta.</p>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-about.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
        console.log('about');
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-about',
        template: __webpack_require__("../../../../../src/app/components/youtube-about.component.html")
    })
], AboutComponent);

//# sourceMappingURL=youtube-about.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-history.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <h2>History</h2>\r\n</div>\r\n<div class=\"app-content\">\r\n    <div class=\"history-video-content\">\r\n        <div *ngIf=\"historyVideos.length === 0\" class=\"video-list-info\">\r\n            No history\r\n        </div>\r\n        <div *ngFor=\"let historyVideo of historyVideos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\">\r\n            <div class=\"video-item-info\">\r\n                <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + historyVideo.snippet.thumbnails.default.url +')'}\"></div>\r\n                <div class=\"video-item-content\">\r\n                <p class=\"video-item-title\">{{ historyVideo.snippet.title }}</p>\r\n                <p class=\"video-item-autor\">by <span>{{ historyVideo.snippet.channelTitle }}</span></p>                      \r\n                </div>\r\n            </div>\r\n            <div class=\"video-item-settings\">\r\n                <button class=\"video-item-play\" (click)=\"onClickHistory($event, i)\">\r\n                <span class=\"fa fa-play\"></span>\r\n                </button>\r\n                <button class=\"video-item-share\" (click)=\"onCopyVideoItemLink(i, 4)\">\r\n                <span class=\"fa fa-share-alt\"></span>\r\n                </button>\r\n                <button class=\"video-item-add\" (click)=\"addPlaylistItem(i, 4)\">\r\n                <span class=\"fa fa-plus\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-history.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__ = __webpack_require__("../../../../../src/app/shared/lists.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HistoryComponent = (function () {
    function HistoryComponent(shared, app) {
        this.shared = shared;
        this.app = app;
        this.thumbnails = false;
        this._shared = shared;
        this._app = app;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        console.log('history');
        this.initHistory();
        this.getSettings();
    };
    HistoryComponent.prototype.initHistory = function () {
        this.historyVideos = this._shared.historyVideos;
    };
    HistoryComponent.prototype.getSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.thumbnails = data.form_settings[0].value;
        });
    };
    HistoryComponent.prototype.addPlaylistItem = function (i, list) {
        this._app.addPlaylistItem(i, list);
    };
    HistoryComponent.prototype.onCopyVideoItemLink = function (i, list) {
        this._app.onCopyVideoItemLink(i, list);
    };
    HistoryComponent.prototype.onClickHistory = function (event, i) {
        this._app.getVideo(this.historyVideos[i]);
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-history',
        template: __webpack_require__("../../../../../src/app/components/youtube-history.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_lists_service__["a" /* SharedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__app_component__["a" /* AppComponent */]) === "function" && _b || Object])
], HistoryComponent);

var _a, _b;
//# sourceMappingURL=youtube-history.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n  <form id=\"main-search\" role=\"search\" [formGroup]=\"searchForm\" (ngSubmit)=\"onSubmit($event)\" novalidate>\r\n      <div class=\"form-group\">\r\n        <div class=\"input-group\">\r\n          <input type=\"text\" id=\"input-search\" class=\"form-control\" placeholder=\"Search for Songs, Videos, Artists, Albums...\" formControlName=\"searchInput\">\r\n          <label for=\"input-search\" class=\"search-icon\"><span class=\"fa fa-search\"></span></label>\r\n          <button class=\"clear-button\" (click)=\"clearSearch()\"><span class=\"fa fa-times\"></span></button>\r\n        </div>\r\n      </div>\r\n      <ng-container *ngIf=\"searchForm.valid\">\r\n        <span class=\"search-list arrow-up\"></span>\r\n        <div id=\"search-video-list\" class=\"video-list\">\r\n          <div *ngFor=\"let video of videos; let i = index\" [attr.data-index]=\"i\" class=\"video-item\">\r\n            <div class=\"video-item-info\">\r\n              <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + video.snippet.thumbnails.default.url +')'}\"></div>\r\n              <div class=\"video-item-content\">\r\n                  <p class=\"video-item-title\">{{ video.snippet.title }}</p>\r\n                  <p class=\"video-item-autor\">by <span>{{ video.snippet.channelTitle }}</span></p>\r\n              </div>\r\n            </div>\r\n            <div class=\"video-item-settings\">\r\n              <button class=\"video-item-play\" (click)=\"onClickVideo($event, i, 1)\">\r\n                <span class=\"fa fa-play\"></span>\r\n              </button>\r\n              <button class=\"video-item-share\" (click)=\"onCopyVideoItemLink(i, 1)\">\r\n                <span class=\"fa fa-share-alt\"></span>\r\n              </button>\r\n              <button class=\"video-item-add\" (click)=\"addPlaylistItem(i, 1)\">\r\n                <span class=\"fa fa-plus\"></span>\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ng-container>\r\n  </form>\r\n</div>\r\n<div class=\"app-content\">\r\n  <ng-container *ngIf=\"feedVideos\">\r\n    <div [ngStyle]=\"{'background-image': 'url(' + trendingFirst.bannerURL + ')'}\" class=\"video-list-featured\">\r\n        <div class=\"video-item\" [attr.data-index]=\"0\">\r\n          <div class=\"video-item-info\">\r\n            <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + trendingFirst.video.img +')'}\"></div>\r\n            <div class=\"video-item-content\">\r\n              <p class=\"video-item-title\">{{ trendingFirst.video.title }}</p>\r\n              <p class=\"video-item-autor\">by <span>{{ trendingFirst.video.channelTitle }}</span></p>\r\n              <div *ngIf=\"trendingFirst.video.id?.length > 0\" class=\"video-item-details\">\r\n                  <p class=\"stats-views\"><span class=\"fa fa-eye\"></span> {{ trendingFirst.video.stats.views | number:'1.0' }}</p>\r\n                  <p class=\"stats-likes\"><span class=\"fa fa-thumbs-up\"></span> {{ trendingFirst.video.stats.likes | number:'1.0' }}</p>\r\n                  <p class=\"stats-dislikes\"><span class=\"fa fa-thumbs-down\"></span> {{ trendingFirst.video.stats.dislikes | number:'1.0' }}</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"video-item-settings-featured\">\r\n            <button class=\"btn btn-primary btn-round\" (click)=\"onClickVideo($event, 0, 3)\">\r\n              <span class=\"fa fa-play\"></span>Play video\r\n            </button>\r\n            <button class=\"btn btn-default btn-outline btn-round\" (click)=\"addPlaylistItem(0, 0)\">\r\n              <span class=\"fa fa-plus\"></span>Add to playlist\r\n            </button>\r\n            <button class=\"btn copy-link\" (click)=\"onCopyVideoItemLink(0, 0)\">\r\n              <span class=\"fa fa-share-alt\"></span>Copy link\r\n            </button>\r\n          </div>\r\n        </div>\r\n       <!--\r\n        <p>{{ trendingFirst.stats.subscribers | number:'1.0' }}</p>\r\n        <p>{{ trendingFirst.stats.views | number:'1.0' }}</p>\r\n        <p>{{ trendingFirst.stats.videoCount | number:'1.0' }}</p>-->\r\n    </div>\r\n    <div id=\"feed-video-list\" class=\"video-list\" [ngClass]=\"{'grid-list': !listGrid }\">\r\n      <div *ngFor=\"let feedVideo of feedVideos; let i = index\" [ngClass]=\"{'hidden-thumbnails': !thumbnails }\" [attr.data-index]=\"i\" class=\"video-item\">\r\n        <div class=\"video-item-info\">\r\n          <div *ngIf=\"thumbnails\" class=\"video-item-image\" [ngStyle]=\"{'background-image': 'url(' + feedVideo.snippet.thumbnails.medium.url +')'}\"></div>\r\n          <div class=\"video-item-content\">\r\n            <p class=\"video-item-title\">{{ feedVideo.snippet.title }}</p>\r\n            <p class=\"video-item-autor\">by <span>{{ feedVideo.snippet.channelTitle }}</span></p>\r\n            <div class=\"video-item-details\" *ngIf=\"feedVideo.id?.length > 0\">\r\n                <p class=\"stats-views\"><span class=\"fa fa-eye\"></span> {{ feedVideo.statistics.viewCount | number:'1.0' }}</p>\r\n                <p class=\"stats-likes\"><span class=\"fa fa-thumbs-up\"></span> {{ feedVideo.statistics.likeCount | number:'1.0' }}</p>\r\n                <p class=\"stats-dislikes\"><span class=\"fa fa-thumbs-down\"></span> {{ feedVideo.statistics.dislikeCount | number:'1.0' }}</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"video-item-settings\">\r\n            <button class=\"video-item-play\" (click)=\"onClickVideo($event, i, 3)\">\r\n              <span class=\"fa fa-play\"></span>\r\n            </button>\r\n            <button class=\"video-item-play\" (click)=\"onCopyVideoItemLink(i, 0)\">\r\n              <span class=\"fa fa-share-alt\"></span>\r\n            </button>\r\n            <button class=\"video-item-add\" (click)=\"addPlaylistItem(i, 0)\">\r\n              <span class=\"fa fa-plus\"></span>\r\n            </button>\r\n          </div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__ = __webpack_require__("../../../../../src/app/shared/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_lists_service__ = __webpack_require__("../../../../../src/app/shared/lists.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SearchComponent = (function () {
    function SearchComponent(youtube, shared, app) {
        this.youtube = youtube;
        this.shared = shared;
        this.app = app;
        this.thumbnails = false;
        this.trendingFirst = {
            bannerURL: '',
            video: {
                id: '',
                title: '',
                img: '',
                channelTitle: '',
                stats: {
                    views: '',
                    likes: '',
                    dislikes: ''
                }
            },
            stats: {
                subscribers: '',
                views: '',
                videoCount: ''
            }
        };
        this.listGrid = false;
        this._shared = shared;
        this._app = app;
    }
    SearchComponent.prototype.ngOnInit = function () {
        console.log('search');
        this.setSettings();
        this.searchFunction();
        this.getFeedVideos();
    };
    SearchComponent.prototype.searchFunction = function () {
        var _this = this;
        this.searchForm = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormGroup */]({
            searchInput: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["e" /* Validators */].minLength(2)])
        });
        this.searchForm.valueChanges.subscribe(function (form) {
            _this.youtube.searchVideo(form.searchInput).subscribe(function (result) {
                if (!_this.searchForm.invalid) {
                    _this.videos = result.items;
                    _this._shared.lastSearchedVideos = result.items;
                }
                else {
                    _this.videos = null;
                }
            }, function (error) {
                console.log('error on search');
            });
        });
    };
    SearchComponent.prototype.setSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.thumbnails = data.form_settings[0].value;
            _this.listGrid = data.form_settings[1].value;
        });
    };
    SearchComponent.prototype.getFeedVideos = function () {
        var _this = this;
        this._shared.getFeed().subscribe(function (data) {
            _this.feedVideos = data;
            _this.getChannelTrending(_this.feedVideos[0].snippet.channelId);
        });
    };
    SearchComponent.prototype.getChannelTrending = function (query) {
        var _this = this;
        this._shared.getChannel(query).subscribe(function (data) {
            _this.feedVideos = _this._shared.feedVideos;
            _this.channel = _this._shared.channel;
            _this.trendingFirst.video.id = _this.feedVideos[0].id;
            _this.trendingFirst.video.title = _this.feedVideos[0].snippet.title;
            _this.trendingFirst.video.img = _this.feedVideos[0].snippet.thumbnails.medium.url;
            _this.trendingFirst.video.stats.likes = _this.feedVideos[0].statistics.likeCount;
            _this.trendingFirst.video.stats.dislikes = _this.feedVideos[0].statistics.dislikeCount;
            _this.trendingFirst.video.stats.views = _this.feedVideos[0].statistics.viewCount;
            _this.trendingFirst.bannerURL = _this.channel.items[0].brandingSettings.image.bannerTabletHdImageUrl;
            _this.trendingFirst.video.channelTitle = _this.channel.items[0].snippet.title;
            if (!_this.channel.items[0].statistics.hiddenSubscriberCount) {
                _this.trendingFirst.stats.subscribers = _this.channel.items[0].statistics.subscriberCount;
            }
            else {
                _this.trendingFirst.stats.subscribers = '0';
            }
            _this.trendingFirst.stats.videoCount = _this.channel.items[0].statistics.videoCount;
            _this.trendingFirst.stats.views = _this.channel.items[0].statistics.viewCount;
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
    SearchComponent.prototype.onCopyVideoItemLink = function (i, list) {
        this._app.onCopyVideoItemLink(i, list);
    };
    SearchComponent.prototype.addPlaylistItem = function (i, list) {
        this._app.addPlaylistItem(i, list);
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/components/youtube-search.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__["a" /* YoutubeGetVideo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_youtube_service__["a" /* YoutubeGetVideo */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_lists_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_lists_service__["a" /* SharedService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]) === "function" && _c || Object])
], SearchComponent);

var _a, _b, _c;
//# sourceMappingURL=youtube-search.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/youtube-settings.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app-head\">\r\n    <h2>Settings</h2>\r\n</div>\r\n<div class=\"app-content\">\r\n    <form *ngIf=\"finished\" [formGroup]=\"internalSettings\" id=\"internalSettings\" class=\"settingsForm\" novalidate>\r\n        <h3>Internal Settings</h3>\r\n        <div *ngFor=\"let setting of initInternalForm.controls; let i=index\" [ngClass]=\"{'hide': !internal_settings[i].visible}\" class=\"form-group\">\r\n            <input type=\"checkbox\" [attr.id]=\"'setting-' + i\" [formControl]=\"setting\"/>\r\n            <label [attr.for]=\"'setting-' + i\">{{ internal_settings[i].name }}<span class=\"round-check\"></span></label>\r\n        </div>\r\n    </form>\r\n    <form [formGroup]=\"externalSettings\" id=\"externalSettings\" class=\"settingsForm\" (ngSubmit)=\"externalSave()\">\r\n        <h3>External Settings</h3>\r\n        <div class=\"form-group form-select\">\r\n            <label for=\"val-search-results\">Set trending country</label>\r\n            <select class=\"form-field\" formControlName=\"fcRegion\">\r\n                <option value=\"US\">United States</option>\r\n                <option value=\"GB\">United Kingdom</option>\r\n                <option value=\"RO\">Romania</option>\r\n            </select>\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-api-key\">Api Key</label>\r\n            <input type=\"text\" id=\"val-api-key\" class=\"form-field\" placeholder=\"Your key\" formControlName=\"fcApi\" spellcheck=\"false\">\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-search-results\">Results for search <span class=\"settings-hint\">(Max. 50)</span></label>\r\n            <input type=\"text\" id=\"val-search-results\" class=\"form-field\" placeholder=\"1 to 50\" formControlName=\"fcSearchresults\">\r\n        </div>\r\n        <div class=\"form-group form-text\">\r\n            <label for=\"val-related-results\">Results for related videos <span class=\"settings-hint\">(Max. 50)</span></label>\r\n            <input type=\"text\" id=\"val-related-results\" class=\"form-field\" placeholder=\"1 to 50\" formControlName=\"fcRelatedResults\">\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-primary btn-round\">Save settings</button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/components/youtube-settings.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__youtube_search_component__ = __webpack_require__("../../../../../src/app/components/youtube-search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_lists_service__ = __webpack_require__("../../../../../src/app/shared/lists.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__ = __webpack_require__("../../../../../src/app/shared/validators.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsComponent = (function () {
    function SettingsComponent(fb, http, shared, app, search) {
        this.fb = fb;
        this.http = http;
        this.shared = shared;
        this.app = app;
        this.search = search;
        this.finished = false;
        this._shared = shared;
        this._fb = fb;
        this._app = app;
        this._search = search;
        this.notify = this._shared.notify;
    }
    SettingsComponent.prototype.ngOnInit = function () {
        console.log('settings');
        this.getDefaultSettings();
    };
    SettingsComponent.prototype.setForm = function () {
        this.internalSettings = this._fb.group({
            settings: this.mapSettings()
        });
        this.checkInputs();
    };
    SettingsComponent.prototype.initExternalForm = function () {
        this.externalSettings = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormGroup */]({
            fcApi: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.external_settings[0].value),
            fcRegion: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.external_settings[1].value, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required),
            fcSearchresults: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.external_settings[2].value, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].max(50),
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].min(1),
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].isNumber(true)]),
            fcRelatedResults: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */](this.external_settings[3].value, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].max(50),
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].min(1),
                __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */].isNumber(true)])
        });
    };
    Object.defineProperty(SettingsComponent.prototype, "initInternalForm", {
        get: function () {
            return this.internalSettings.get('settings');
        },
        enumerable: true,
        configurable: true
    });
    SettingsComponent.prototype.checkInputs = function () {
        var _this = this;
        this.internalSettings.valueChanges.subscribe(function (data) {
            Object.keys(data.settings).map(function (i) {
                _this.internal_settings[i].value = data.settings[i];
            });
            _this._shared.form_settings = _this.internal_settings;
            _this._app.setSettings();
            _this._app.checkVolumeRange();
            _this._search.setSettings();
            _this._shared.updateSettings();
            _this._shared.triggerNotify('Changed');
            _this.updateNotify();
        });
    };
    SettingsComponent.prototype.mapSettings = function () {
        var _this = this;
        var arr = this.internal_settings.map(function (s) {
            return _this._fb.control(s.value);
        });
        return this.fb.array(arr);
    };
    SettingsComponent.prototype.getDefaultSettings = function () {
        var _this = this;
        this._shared.getSettings().subscribe(function (data) {
            _this.internal_settings = data.form_settings;
            _this.external_settings = data.api_settings;
            _this.initExternalForm();
            _this.finished = true;
            _this.setForm();
        });
    };
    SettingsComponent.prototype.updateNotify = function () {
        var _this = this;
        this.notify = this._shared.notify;
        setTimeout(function () { return _this.notify = _this._shared.notify; }, 1000);
    };
    SettingsComponent.prototype.externalSave = function () {
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
        }
        else {
            this._shared.triggerNotify('Please check external settings');
            this.updateNotify();
        }
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-settings',
        template: __webpack_require__("../../../../../src/app/components/youtube-settings.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_3__youtube_search_component__["a" /* SearchComponent */], __WEBPACK_IMPORTED_MODULE_5__shared_validators_service__["a" /* NumberVal */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_lists_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_lists_service__["a" /* SharedService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__youtube_search_component__["a" /* SearchComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__youtube_search_component__["a" /* SearchComponent */]) === "function" && _e || Object])
], SettingsComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=youtube-settings.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/lists.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__youtube_service__ = __webpack_require__("../../../../../src/app/shared/youtube.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SharedService = (function () {
    function SharedService(youtube, http) {
        this.youtube = youtube;
        this.http = http;
        this.historyVideos = [];
        this.notify = {
            enabled: false,
            message: 'No message'
        };
    }
    SharedService.prototype.getFeed = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            if (_this.feedVideos) {
                observer.next(_this.feedVideos);
                return observer.complete();
            }
            _this.getSettings().subscribe(function (data) {
                _this.setApiSettings();
                _this.settings = data;
                _this.youtube.feedVideos().subscribe(function (result) {
                    _this.feedVideos = result.items;
                    _this.youtube.getChannel(result.items[0].snippet.channelId).subscribe(function (resultChannel) {
                        _this.channel = resultChannel;
                        observer.next(_this.feedVideos);
                        observer.complete();
                    });
                }, function (error) {
                    console.log('error on feed videos' + error);
                });
            });
        });
    };
    SharedService.prototype.getChannel = function (query) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            if (_this.channel) {
                observer.next(_this.channel);
                return observer.complete();
            }
            else {
                _this.youtube.getChannel(query).subscribe(function (result) {
                    _this.channel = result;
                    observer.next(_this.channel);
                    observer.complete();
                }, function (error) {
                    console.log('error on get channel ' + error);
                });
            }
        });
    };
    SharedService.prototype.getSettings = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            if (_this.settings) {
                observer.next(_this.settings);
                return observer.complete();
            }
            else {
                if (localStorage.length <= 0) {
                    _this.http.get('assets/settings.json')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this.settings = data;
                        localStorage.setItem('settings', JSON.stringify(data));
                        observer.next(_this.settings);
                        observer.complete();
                    }, function (error) {
                        console.log('error on get settings ' + error);
                    });
                }
                else {
                    _this.settings = JSON.parse(localStorage.getItem('settings'));
                    observer.next(_this.settings);
                    observer.complete();
                }
            }
        });
    };
    SharedService.prototype.updateSettings = function () {
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.setLocalVersion();
    };
    SharedService.prototype.getPlaylist = function () {
        this.playlist = JSON.parse(localStorage.getItem('playlist'));
    };
    SharedService.prototype.updatePlaylist = function () {
        localStorage.setItem('playlist', JSON.stringify(this.playlist));
        this.setLocalVersion();
    };
    SharedService.prototype.setApiSettings = function () {
        this.youtube.defaultApiSet(this.settings);
    };
    SharedService.prototype.setLocalVersion = function () {
        if (localStorage.getItem('version') === null) {
            localStorage.setItem('version', '1');
        }
    };
    SharedService.prototype.triggerNotify = function (message) {
        var _this = this;
        this.notify.enabled = true;
        this.notify.message = message;
        setTimeout(function () { return _this.notify.enabled = false; }, 1000);
    };
    SharedService.prototype.addHistoryVideo = function (data) {
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
    return SharedService;
}());
SharedService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__youtube_service__["a" /* YoutubeGetVideo */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__youtube_service__["a" /* YoutubeGetVideo */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object])
], SharedService);

var _a, _b;
//# sourceMappingURL=lists.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/nwjs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NwjsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



function _window() {
    return window;
}
var NwjsService = (function () {
    function NwjsService() {
        this.mw = _window().mw;
        this.up = _window();
    }
    NwjsService.prototype.init = function () {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            if (_this.mw) {
                observer.next(_this.mw);
                return observer.complete();
            }
            else {
                if (typeof _this.mw === 'undefined') {
                    _this.mw = _window().nw;
                    observer.next(_this.mw);
                    observer.complete();
                }
            }
        });
    };
    return NwjsService;
}());
NwjsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], NwjsService);

//# sourceMappingURL=nwjs.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/validators.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberVal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NumberVal = (function () {
    function NumberVal() {
    }
    NumberVal.max = function (max) {
        return function (control) {
            var val = control.value;
            if (control.pristine || control.pristine) {
                return null;
            }
            if (val <= max) {
                return null;
            }
            return { 'max': true };
        };
    };
    NumberVal.min = function (min) {
        return function (control) {
            var val = control.value;
            if (control.pristine || control.pristine) {
                return null;
            }
            if (val >= min) {
                return null;
            }
            return { 'min': true };
        };
    };
    NumberVal.isNumber = function (value) {
        return function (control) {
            var valid = /\d{0,9}/.test(control.value);
            if (valid) {
                return null;
            }
            return { 'invalid': true };
        };
    };
    return NumberVal;
}());
NumberVal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], NumberVal);

//# sourceMappingURL=validators.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/youtube.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubeGetVideo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var YoutubeGetVideo = (function () {
    function YoutubeGetVideo(http) {
        this.http = http;
        this.url = 'https://www.googleapis.com/youtube/v3/';
        this.videoDetails = 'part=snippet,contentDetails,statistics,status';
        this.channelDetails = 'part=brandingSettings,snippet,contentDetails,statistics';
        this.feedDetails = '&chart=mostPopular';
    }
    YoutubeGetVideo.prototype.defaultApiSet = function (data) {
        this.settings = data.api_settings;
        this.apiKey = this.settings[0].value;
        this.regionCode = this.settings[1].value;
        this.numSearchRes = this.settings[2].value;
        this.numRelatedRes = this.settings[3].value;
    };
    YoutubeGetVideo.prototype.getChannel = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'channels?'
                + this.channelDetails + '&id='
                + query + '&key='
                + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.searchVideo = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&q='
                + query + '&maxResults='
                + this.numSearchRes + '&type=video&key='
                + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.relatedVideos = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&relatedToVideoId='
                + query + '&maxResults='
                + this.numRelatedRes + '&type=video&key='
                + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.statsVideos = function (query) {
        if (this.apiKey) {
            return this.http.get(this.url + 'videos?'
                + this.videoDetails + '&id='
                + query + '&key='
                + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    YoutubeGetVideo.prototype.feedVideos = function () {
        if (this.apiKey) {
            return this.http.get(this.url + 'videos?'
                + this.videoDetails + this.feedDetails + '&regionCode='
                + this.regionCode + '&maxResults=25&key='
                + this.apiKey)
                .map(function (response) { return response.json(); });
        }
    };
    return YoutubeGetVideo;
}());
YoutubeGetVideo = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object])
], YoutubeGetVideo);

var _a;
//# sourceMappingURL=youtube.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map