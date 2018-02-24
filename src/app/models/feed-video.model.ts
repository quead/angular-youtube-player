import { IVideoID, IVideoFeedSnippet, IVideoStatistics, IVideoStatus } from './video-stereotypes.model';


export interface IFeedVideo {
    etag: string;
    id: string;
    kind: string;
    snippet: IVideoFeedSnippet;
    statistics: IVideoStatistics;
    status: IVideoStatus;
}
