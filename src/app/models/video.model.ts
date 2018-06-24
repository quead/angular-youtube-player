export interface VideoModel {
    id: string;
    title: string;
    channelTitle: string;
    channelId: string;
    categoryId: string;
    stats: {
      likes: string;
      dislikes: string;
      views: string;
    };
    thumbnails: {
        default: string;
        high: string;
        medium: string;
    };
}
