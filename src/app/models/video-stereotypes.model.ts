export interface IVideoID {
    id: string;
}

export interface IVideoTypeID {
    kind: string;
    videoId: string;
}

export interface IVideoThumbnailsVal {
    height: number;
    url: string;
    width: number;
}

export interface IVideoThumbnails {
    default: IVideoThumbnailsVal;
    high: IVideoThumbnailsVal;
    medium: IVideoThumbnailsVal;
}

export interface IVideoRelatedSnippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: IVideoThumbnails;
    title: string;
}

export interface IVideoFeedSnippet {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
        description: string;
        title: string;
    };
    publishedAt: string;
    tags: Array<string>;
    thumbnails: IVideoThumbnails;
    title: string;
}

export interface IVideoStatistics {
    commentCount: string;
    dislikeCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
}

export interface IVideoStatus {
    embeddable: boolean;
    license: string;
    privacyStatus: string;
    publicStatsViewable: boolean;
    uploadStatus: string;
}
