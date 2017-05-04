import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeGetVideo {

  constructor(private http: Http) {}

  searchVideo(query: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + query + '&maxResults=15&type=video&key=AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc')
        .map(response => response.json())
    }

  relatedVideos(query: string) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=' + query + '&maxResults=15&type=video&key=AIzaSyDcMvWlqPTHg7rHm-CTVXJwpaVGXKu7cBc')
        .map(response => response.json())
    }
}