import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeGetVideo {

    private url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
    private apiKey = 'AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc';

    constructor(private http: Http) {}

    searchVideo(query: string) {
        return this.http.get(this.url + '&q=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(response => response.json());
    }

    relatedVideos(query: string) {
        return this.http.get(this.url + '&relatedToVideoId=' + query + '&maxResults=15&type=video&key=' + this.apiKey)
            .map(response => response.json());
    }
}
