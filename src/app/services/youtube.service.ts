import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable()
export class YoutubeGetVideo {
	private url = 'https://www.googleapis.com/youtube/v3/';
	private videoDetails = 'part=snippet,statistics';
	private feedDetails = '&chart=mostPopular';

	constructor(private http: HttpClient, private globals: GlobalsService) { }

	async feedVideos() {
		try {
			const res = await this.http
				.get(
					`${this.url}videos?${this.videoDetails}${
					this.feedDetails
					}&regionCode=${this.globals.regionCode}&maxResults=25&key=${
					this.globals.apiKey
					}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": "",
						"snippet": {
							"title": "Feed videos error",
							"thumbnails": {
								"high": {
									"url": "https://via.placeholder.com/480x360",
									"width": 480,
									"height": 360
								},
							},
						},
					}
				]
			}
		}
	}

	async relatedVideos(query: string) {
		try {
			const res = await this.http
				.get(
					`${
					this.url
					}search?part=snippet&relatedToVideoId=${query}&maxResults=${
					this.globals.numRelatedRes
					}&type=video&key=${this.globals.apiKey}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": {
							"videoId": ""
						},
						"snippet": {
							"title": "Related video error",
							"thumbnails": {
								"high": {
									"url": "https://via.placeholder.com/480x360",
									"width": 480,
									"height": 360
								},
							},
						}
					}
				]
			};
		}
	}

	async searchVideo(query: string) {
		try {
			const res = await this.http
				.get(
					`${this.url}search?part=snippet&q=${query}&maxResults=${
					this.globals.numRelatedRes
					}&type=video&regionCode=${this.globals.regionCode}&key=${
					this.globals.apiKey
					}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": {
							"kind": "",
							"videoId": ""
						},
						"snippet": {
							"title": "Search video error",
							"thumbnails": {
								"default": {
									"url": "https://via.placeholder.com/120x90",
									"width": 120,
									"height": 90
								}
							},
						}
					}
				]
			};
		}
	}

	async categories() {
		try {
			const res = await this.http
				.get(
					`${this.url}videoCategories?part=snippet&regionCode=${
					this.globals.regionCode
					}&key=${this.globals.apiKey}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": "",
						"snippet": {
							"channelId": "",
							"title": "Categorry error",
							"assignable": true
						}
					}
				]
			};
		}
	}

	async videoCategories(category: string) {
		try {
			const res = await this.http
				.get(
					`${
					this.url
					}videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=25&videoCategoryId=${category}&regionCode=${
					this.globals.regionCode
					}&key=${this.globals.apiKey}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": "",
						"snippet": {
							"title": "Video Categories",
							"thumbnails": {
								"high": {
									"url": "https://via.placeholder.com/480x360",
									"width": 480,
									"height": 360
								},
							},
						}
					}
				]
			}
		}
	}

	async statsVideos(query: string) {
		try {
			const res = await this.http
				.get(
					`${this.url}videos?${this.videoDetails}&id=${query}&key=${
					this.globals.apiKey
					}`
				)
				.pipe(map(response => response))
				.toPromise();
			return res;
		} catch {
			return {
				"items": [
					{
						"id": "",
						"snippet": {
							"title": "Stats video error",
							"thumbnails": {
								"high": {
									"url": "https://via.placeholder.com/480x360",
									"width": 480,
									"height": 360
								}
							},
						},
					}
				]
			};
		}
	}
}
