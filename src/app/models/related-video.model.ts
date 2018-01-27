import { IVideoTypeID, IVideoRelatedSnippet  } from './video-stereotypes.model';

export interface IRelatedVideo {
    etag: string;
    id: IVideoTypeID;
    snippet: IVideoRelatedSnippet;
}
