export interface IChannelHint {
    property: string;
    value: string;
}

export interface IChannelBrandImage {
    bannerImageUrl: string;
    bannerMobileExtraHdImageUrl: string;
    bannerMobileHdImageUrl: string;
    bannerMobileImageUrl: string;
    bannerMobileLowImageUrl: string;
    bannerMobileMediumHdImageUrl: string;
    bannerTabletExtraHdImageUrl: string;
    bannerTabletHdImageUrl: string;
    bannerTabletImageUrl: string;
    bannerTabletLowImageUrl: string;
    bannerTvHighImageUrl: string;
    bannerTvImageUrl: string;
    bannerTvLowImageUrl: string;
    bannerTvMediumImageUrl: string;
}

export interface IChannelSnippet {
    customUrl: string;
    description: string;
    localized: {
        description: string;
        title: string;
    };
    publishedAt: string;
    thumbnails: {
        default: {
            url: string;
        };
        high: {
            url: string;
        };
        medium: {
            url: string;
        };
    };
    title: string;
}

export interface IChannelStatistics {
    commentCount: string;
    hiddenSubscriberCount: boolean;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
}

export interface IChannel {
    brandingSettings: {
        channel: {
            defaultTab: string;
            description: string;
            featuredChannelsTitle: string;
            featuredChannelsUrls: Array<string>;
            keywords: string;
            profileColor: string;
            showBrowseView: boolean;
            showrelatedChannels: boolean;
            title: string;
            trackingAnalyticsAccountId: string;
            unsubscribedTrailer: string;
        };
        hints: Array<IChannelHint>;
        image: IChannelBrandImage;
    };
    contentDetails: {
        relatedPlaylists: {
            uploads: string;
            watchHistory: string;
            watchLater: string;
        };
    };
    etag: string;
    id: string;
    kind: string;
    snippet: IChannelSnippet;
    statistics: IChannelStatistics;
}

export interface IChannelList {
    etag: string;
    items: Array<IChannel>;
    kind: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
}
