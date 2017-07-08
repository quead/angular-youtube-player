import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeGetVideo {

    public api_settings: Array<any>;
    private url = 'https://www.googleapis.com/youtube/v3/';
    private regionCode = 'RO';
    private videoDetails = 'part=snippet,contentDetails,statistics,status';
    private feedDetails = '&chart=mostPopular&regionCode=' + this.regionCode;
    private apiKey = 'AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc';

    constructor(
        private http: Http,
    ) {}

    searchVideo(query: string) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&q=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
                .map(response => response.json());
        }
    }

    relatedVideos(query: string) {
        if (this.apiKey) {
            return this.http.get(this.url + 'search?part=snippet&relatedToVideoId=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
                .map(response => response.json());
        }
    }

    feedVideos() {
        if (this.apiKey) {
            return this.http.get(this.url + 'videos?' + this.videoDetails + this.feedDetails + '&maxResults=25&key=' + this.apiKey)
                .map(response => response.json());
        }
    }

    getFeed(): Observable<any> {
        return new Observable(observer => {
            if (this.feedVideos) {
                observer.next(this.feedVideos);
                return observer.complete();
            } else {
                this.feedVideos().subscribe(
                    result => {
                        this.feedVideos = result.items;
                        observer.next(this.feedVideos);
                        observer.complete();
                    },
                    error => {
                        console.log('error on feed videos' + error);
                    }
                );
            }
        });
    }
    
}
