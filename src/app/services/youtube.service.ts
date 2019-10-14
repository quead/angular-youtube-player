import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable()
export class YoutubeGetVideo {
	private url = 'https://www.googleapis.com/youtube/v3/';
	private videoDetails = 'part=snippet,contentDetails,statistics';
	private feedDetails = '&chart=mostPopular';
	private defaultObject = {
		"items": [
			{
				"id": {
					"videoId": ""
				},
				"snippet": {
					"title": "Video error",
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
	private defaultFeedObject = {
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
	};

	constructor(private http: HttpClient, private globals: GlobalsService) { }

	async feedVideos(category?: string, token?: string) {
		const videoCategory = category ? `&videoCategoryId=${category}` : '';
		const pageToken = token ? `&pageToken=${token}` : '';
		try {
			const res = await this.http
				.get(
					`${this.url}videos?${this.videoDetails}${
					this.feedDetails
					}&regionCode=${this.globals.regionCode}${videoCategory}&maxResults=25${pageToken}&key=${
					this.globals.apiKey
					}`
				)
				.pipe(map(response => response))
				.toPromise();
			this.globals.nextPageToken = res["nextPageToken"];
			return res;
		} catch {
			return this.defaultFeedObject;
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
			return this.defaultObject;
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
			return this.defaultObject;
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
			return this.defaultFeedObject;
		}
	}
}
