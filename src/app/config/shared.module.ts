import { Component, Injectable, OnInit } from '@angular/core';
import { YoutubeGetVideo } from './youtube.config';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export interface Todo {
    id: number | string;
    createdAt: number;
    value: string;
}

@Injectable()
export class SharedService implements OnInit{

    todos: Observable<Todo[]>
    private _todos: BehaviorSubject<Todo[]>;
    private baseUrl: string;
    private dataStore: {
        todos: Todo[]
    };


    constructor(private youtube: YoutubeGetVideo) {
        this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
        this._todos.asObservable();
    }

    ngOnInit(){
        this.player();
    }

    player() {
        this.youtube.feedVideos().subscribe(
            result => {
                this.dataStore.todos = result.items;
                this._todos.next(Object.assign({}, this.dataStore).todos);
            },
            error => {
            console.log('error on feed videos');
            }
        );
    }
}
