import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalsService } from './globals.service';

@Injectable()
export class YoutubeGetVideo {
	private url = 'https://www.googleapis.com/youtube/v3/';
	private videoDetails = 'part=snippet,statistics';
	private feedDetails = '&chart=mostPopular';

	constructor(private http: HttpClient, private globals: GlobalsService) {}

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
				"items":[  
				   {  
					  "kind":"",
					  "etag":"",
					  "id":"",
					  "snippet":{  
						 "publishedAt":"",
						 "channelId":"",
						 "title":"Feed videos error",
						 "description":"",
						 "thumbnails":{  
							"default":{  
							   "url":"https://via.placeholder.com/120x90",
							   "width":120,
							   "height":90
							},
							"medium":{  
							   "url":"https://via.placeholder.com/320x180",
							   "width":320,
							   "height":180
							},
							"high":{  
							   "url":"https://via.placeholder.com/480x360",
							   "width":480,
							   "height":360
							},
							"standard":{  
							   "url":"https://via.placeholder.com/640x480",
							   "width":640,
							   "height":480
							},
							"maxres":{  
							   "url":"https://via.placeholder.com/1280x720",
							   "width":1280,
							   "height":720
							}
						 },
						 "channelTitle":"",
						 "categoryId":"",
						 "liveBroadcastContent":"",
						 "localized":{  
							"title":"",
							"description":""
						 },
						 "defaultAudioLanguage":""
					  },
					  "statistics":{  
						 "viewCount":"0",
						 "likeCount":"0",
						 "dislikeCount":"0",
						 "favoriteCount":"0",
						 "commentCount":"0"
					  }
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
				"items":[
				   {
					  "kind":"",
					  "etag":"",
					  "id":{
						 "kind":"",
						 "videoId":""
					  },
					  "snippet":{
						 "publishedAt":"",
						 "channelId":"",
						 "title":"Related video error",
						 "description":"",
						 "thumbnails":{
							"default":{  
								"url":"https://via.placeholder.com/120x90",
								"width":120,
								"height":90
							 },
							 "medium":{  
								"url":"https://via.placeholder.com/320x180",
								"width":320,
								"height":180
							 },
							 "high":{  
								"url":"https://via.placeholder.com/480x360",
								"width":480,
								"height":360
							 },
							 "standard":{  
								"url":"https://via.placeholder.com/640x480",
								"width":640,
								"height":480
							 },
							 "maxres":{  
								"url":"https://via.placeholder.com/1280x720",
								"width":1280,
								"height":720
							}
						 },
						 "channelTitle":"",
						 "liveBroadcastContent":""
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
				"items":[
				   {
					  "kind":"",
					  "etag":"",
					  "id":{
						 "kind":"",
						 "videoId":""
					  },
					  "snippet":{
						 "publishedAt":"",
						 "channelId":"",
						 "title":"Search video error",
						 "description":"",
						 "thumbnails":{
							"default":{  
								"url":"https://via.placeholder.com/120x90",
								"width":120,
								"height":90
							 },
							 "medium":{  
								"url":"https://via.placeholder.com/320x180",
								"width":320,
								"height":180
							 },
							 "high":{  
								"url":"https://via.placeholder.com/480x360",
								"width":480,
								"height":360
							 },
							 "standard":{  
								"url":"https://via.placeholder.com/640x480",
								"width":640,
								"height":480
							 },
							 "maxres":{  
								"url":"https://via.placeholder.com/1280x720",
								"width":1280,
								"height":720
							}
						 },
						 "channelTitle":"",
						 "liveBroadcastContent":""
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
				"items":[  
				   {  
					  "kind":"",
					  "etag":"",
					  "id":"",
					  "snippet":{  
						 "channelId":"",
						 "title":"Categorry error",
						 "assignable":true
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
				"items":[
				   {
					  "kind":"",
					  "etag":"",
					  "id":"",
					  "snippet":{
						 "publishedAt":"",
						 "channelId":"",
						 "title":"",
						 "description":"",
						 "thumbnails":{
							"default":{  
								"url":"https://via.placeholder.com/120x90",
								"width":120,
								"height":90
							 },
							 "medium":{  
								"url":"https://via.placeholder.com/320x180",
								"width":320,
								"height":180
							 },
							 "high":{  
								"url":"https://via.placeholder.com/480x360",
								"width":480,
								"height":360
							 },
							 "standard":{  
								"url":"https://via.placeholder.com/640x480",
								"width":640,
								"height":480
							 },
							 "maxres":{  
								"url":"https://via.placeholder.com/1280x720",
								"width":1280,
								"height":720
							}
						 },
						 "channelTitle":"",
						 "categoryId":"",
						 "liveBroadcastContent":"",
						 "defaultLanguage":"",
						 "localized":{
							"title":"",
							"description":""
						 },
						 "defaultAudioLanguage":""
					  },
					  "statistics":{
						 "viewCount":"0",
						 "likeCount":"0",
						 "dislikeCount":"0",
						 "favoriteCount":"0",
						 "commentCount":"0"
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
				"items":[
				   {
					  "kind":"",
					  "etag":"",
					  "id":"",
					  "snippet":{
						 "publishedAt":"",
						 "channelId":"",
						 "title":"Stats video error",
						 "description":"",
						 "thumbnails":{
							"default":{  
								"url":"https://via.placeholder.com/120x90",
								"width":120,
								"height":90
							 },
							 "medium":{  
								"url":"https://via.placeholder.com/320x180",
								"width":320,
								"height":180
							 },
							 "high":{  
								"url":"https://via.placeholder.com/480x360",
								"width":480,
								"height":360
							 },
							 "standard":{  
								"url":"https://via.placeholder.com/640x480",
								"width":640,
								"height":480
							 },
							 "maxres":{  
								"url":"https://via.placeholder.com/1280x720",
								"width":1280,
								"height":720
							}
						 },
						 "channelTitle":"",
						 "categoryId":"0",
						 "liveBroadcastContent":"",
						 "defaultLanguage":"",
						 "defaultAudioLanguage":""
					  },
					  "statistics":{
						 "viewCount":"0",
						 "likeCount":"0",
						 "dislikeCount":"0",
						 "favoriteCount":"0",
						 "commentCount":"0"
					  }
				   }
				]
			};
		}
	}
}
