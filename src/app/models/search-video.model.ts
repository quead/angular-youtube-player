import { IVideoTypeID, IVideoRelatedSnippet  } from './video-stereotypes.model';

export interface ISearchVideo {
    etag: string;
    id: IVideoTypeID;
    kind: string;
    snippet: IVideoRelatedSnippet;
}
