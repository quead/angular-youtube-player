import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { GlobalsService } from './globals.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private url = 'https://www.googleapis.com/youtube/v3/';
  private videoDetails = 'part=snippet,contentDetails,statistics';
  private feedDetails = '&chart=mostPopular';
  private defaultObject = {
    items: [
      {
        id: {
          videoId: '',
        },
        snippet: {
          title: 'Video error',
          thumbnails: {
            high: {
              url: 'https://via.placeholder.com/480x360',
              width: 480,
              height: 360,
            },
          },
        },
      },
    ],
  };
  private defaultFeedObject = {
    items: [
      {
        id: '',
        snippet: {
          title: 'Feed videos error',
          thumbnails: {
            high: {
              url: 'https://via.placeholder.com/480x360',
              width: 480,
              height: 360,
            },
          },
        },
      },
    ],
  };

  constructor(private http: HttpClient, private globals: GlobalsService) {}

  async feedVideos(category?: string, token?: string) {
    const videoCategory = category ? `&videoCategoryId=${category}` : '';
    const pageToken = token ? `&pageToken=${token}` : '';
    console.log('>>>>>>>>>>>> FEED');
    try {
      // const res = await this.http
      //   .get(
      //     `${this.url}videos?${this.videoDetails}${this.feedDetails}&regionCode=${this.globals.regionCode}${videoCategory}&maxResults=25${pageToken}&key=${this.globals.apiKey}`
      //   )
      //   .pipe(map((response) => response));
      // // TODO
      // // this.globals.nextPageToken = res['nextPageToken'];
      // return res;
      return {
        kind: 'youtube#videoListResponse',
        etag: '47pSYlWn7rKnJGGmaufN1V9-nmM',
        items: [
          {
            kind: 'youtube#video',
            etag: 'oLSRR2pF5huutRHOxfLATpTMTAE',
            id: '1UVCuM6ynDM',
            snippet: {
              publishedAt: '2022-03-19T18:30:11Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu - Mama miliardara | Official Video',
              description:
                '♫ Muzica ✒️ Text : Dani Mocanu \n\nAbonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #MamaMiliardara #RegeleVizualziarilor',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/1UVCuM6ynDM/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/1UVCuM6ynDM/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/1UVCuM6ynDM/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/1UVCuM6ynDM/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/1UVCuM6ynDM/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              tags: ['Dani Mocanu', 'Daniel Mocanu', 'Manea', 'Manele', 'HiT'],
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Dani Mocanu - Mama miliardara | Official Video',
                description:
                  '♫ Muzica ✒️ Text : Dani Mocanu \n\nAbonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #MamaMiliardara #RegeleVizualziarilor',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M22S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '1120960',
              likeCount: '49241',
              favoriteCount: '0',
              commentCount: '1945',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'UHOoSPArgaAd2BNCzPMhT7vT0xE',
            id: '61LA4_5asoY',
            snippet: {
              publishedAt: '2022-03-19T10:00:12Z',
              channelId: 'UCN56P56ijqdLa5CcnJdgfuA',
              title: 'Nicolae Guta ❌ @Shondy ❌ @Bogdan DLP - As Renunta 2022',
              description:
                'Videoclip oficial cu Shondy, Bogdan DLP si Nicolae Guta. (C) 2022 Big UP Music\n\nSUBSCRIBE 🔝 Big UP Music Official YT: http://smarturl.it/BigUPMusicSubscribe\n\nManagement: Contact@bigupmusic.ro | 0720 066 666 (Razvan)\nPentru Concerte: Catalin Rotaru 📱  (0723) 591 595 📧 catalin.rotaru@rocamusic.ro \n\n🔥 Follow Shondy:\nINSTA: https://instagram.com/shondyyyyy\nTIKTOK: https://www.tiktok.com/@shondy\n\n🔥 Follow Bogdan DLP:\nTikTok: https://www.tiktok.com/@bogdandelaploiesti.haz\nInstagram: https://www.instagram.com/bogdandelaploiesti\nFacebook: https://www.facebook.com/bogdandelaploiestioficial\n\n🔥 Follow Nicolae Guta:\nINSTA: https://www.instagram.com/nicolaeguta.official\nFB: https://www.facebook.com/OfficialNicolaeGuta\n\n🔥 Big UP Music Online:\nINSTA: https://www.instagram.com/bigupmusic\nFB: https://www.facebook.com/bigupmusicproduction\nSITE: http://bigupmusic.ro\n\n🎵 Produced by Big Up Music\n🎥 Video by Next Level\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#Shondy #BogdanDLP #NicolaeGuta #BigUPFusion #BigUPMusic',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/61LA4_5asoY/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/61LA4_5asoY/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/61LA4_5asoY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Big UP Music',
              tags: [
                'shondy',
                'bogdan dlp',
                'nicolae guta',
                'as renunta',
                'shondy ce mi-ai facut',
                'shondy bogdan dlp',
                'shondy luis gabriel',
                'cum ma tu',
                'bogdan dlp theo rose',
                'amanta',
                'big up music',
                'big up fusion',
                'manele',
                'manele noi',
                'manele hits 2021',
                'manele 2021',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'Nicolae Guta ❌ @Shondy ❌ @Bogdan DLP - As Renunta 2022',
                description:
                  'Videoclip oficial cu Shondy, Bogdan DLP si Nicolae Guta. (C) 2022 Big UP Music\n\nSUBSCRIBE 🔝 Big UP Music Official YT: http://smarturl.it/BigUPMusicSubscribe\n\nManagement: Contact@bigupmusic.ro | 0720 066 666 (Razvan)\nPentru Concerte: Catalin Rotaru 📱  (0723) 591 595 📧 catalin.rotaru@rocamusic.ro \n\n🔥 Follow Shondy:\nINSTA: https://instagram.com/shondyyyyy\nTIKTOK: https://www.tiktok.com/@shondy\n\n🔥 Follow Bogdan DLP:\nTikTok: https://www.tiktok.com/@bogdandelaploiesti.haz\nInstagram: https://www.instagram.com/bogdandelaploiesti\nFacebook: https://www.facebook.com/bogdandelaploiestioficial\n\n🔥 Follow Nicolae Guta:\nINSTA: https://www.instagram.com/nicolaeguta.official\nFB: https://www.facebook.com/OfficialNicolaeGuta\n\n🔥 Big UP Music Online:\nINSTA: https://www.instagram.com/bigupmusic\nFB: https://www.facebook.com/bigupmusicproduction\nSITE: http://bigupmusic.ro\n\n🎵 Produced by Big Up Music\n🎥 Video by Next Level\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#Shondy #BogdanDLP #NicolaeGuta #BigUPFusion #BigUPMusic',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '795012',
              likeCount: '22744',
              favoriteCount: '0',
              commentCount: '1006',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'F6JyyjD9j2RV7v9b07t2SqiTzK4',
            id: 'QLEJOtVRCqw',
            snippet: {
              publishedAt: '2022-03-20T21:17:18Z',
              channelId: 'UCbyawH6yI56MxZid7m2yLiA',
              title:
                'Micutzu, luat la ROAST de Radu Pietreanu „Când ai plecat din Focșani a rămas un loc gol pe hartă” 🤣',
              description:
                'În episodul 6 al sezonului 12 iUmor, din 20 martie 2022, Radu Pietreanu a vorbit despre începuturile carierei lui Micutzu și despre cum era el ca elev la școală și apoi la Facultatea de Actorie. “Dacă juca atât cât mânca, își cerea scuze Shakespeare că a scris prea puține piese”, zice Radu Pietreanu. “Fără Bendeac nu ajungea pe televizor, vă spun”, a mai adăugat actorul.\n➠ Abonează-te la canalul nostru: https://goo.gl/ZUdUt3\nUrmăreşte-ne și pe:\n➠ Site Antena 1: https://a1.ro/\n➠ liveVIDEO pe AntenaPlay: https://antenaplay.ro/live/antena1\n\nYouTube network: Antena TV Group',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/QLEJOtVRCqw/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/QLEJOtVRCqw/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/QLEJOtVRCqw/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Antena 1',
              tags: ['Antena 1'],
              categoryId: '24',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  'Micutzu, luat la ROAST de Radu Pietreanu „Când ai plecat din Focșani a rămas un loc gol pe hartă” 🤣',
                description:
                  'În episodul 6 al sezonului 12 iUmor, din 20 martie 2022, Radu Pietreanu a vorbit despre începuturile carierei lui Micutzu și despre cum era el ca elev la școală și apoi la Facultatea de Actorie. “Dacă juca atât cât mânca, își cerea scuze Shakespeare că a scris prea puține piese”, zice Radu Pietreanu. “Fără Bendeac nu ajungea pe televizor, vă spun”, a mai adăugat actorul.\n➠ Abonează-te la canalul nostru: https://goo.gl/ZUdUt3\nUrmăreşte-ne și pe:\n➠ Site Antena 1: https://a1.ro/\n➠ liveVIDEO pe AntenaPlay: https://antenaplay.ro/live/antena1\n\nYouTube network: Antena TV Group',
              },
              defaultAudioLanguage: 'en',
            },
            contentDetails: {
              duration: 'PT9M43S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '531867',
              likeCount: '14310',
              favoriteCount: '0',
              commentCount: '331',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'UVysRVQJjKAeCnD5DIAcUu9h0_8',
            id: 'N31NcllC-9E',
            snippet: {
              publishedAt: '2022-03-18T11:00:21Z',
              channelId: 'UCQLCJBWOnfkqlT928FPoTjg',
              title: 'Haziran & Luis Gabriel - Haide spune | Official Video',
              description:
                'Abonați-vă la canalul nostru pentru mai multe noutăți\nToate drepturile rezervate © & ® Luis Gabriel\n𝐂𝐎𝐍𝐂𝐄𝐑𝐓𝐄 & 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓 📞 0724.501.790 \nCzeller Stefan ► stefanczeller@yahoo.com\n\nOrchestrație: DeSanto Music\n\nFacebook page ► https://m.facebook.com/LuisGabrielMusic\nInstagram ► https://www.instagram.com/luisgabriel.music\nTikTok ►https://www.tiktok.com/@luissgabriel\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#LuisGabriel #Haziran #TopManele',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/N31NcllC-9E/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/N31NcllC-9E/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/N31NcllC-9E/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/N31NcllC-9E/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/N31NcllC-9E/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Luis Gabriel',
              tags: ['luis gabriel', 'toate diamantele', 'haziran'],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'Haziran & Luis Gabriel - Haide spune | Official Video',
                description:
                  'Abonați-vă la canalul nostru pentru mai multe noutăți\nToate drepturile rezervate © & ® Luis Gabriel\n𝐂𝐎𝐍𝐂𝐄𝐑𝐓𝐄 & 𝐌𝐀𝐍𝐀𝐆𝐄𝐌𝐄𝐍𝐓 📞 0724.501.790 \nCzeller Stefan ► stefanczeller@yahoo.com\n\nOrchestrație: DeSanto Music\n\nFacebook page ► https://m.facebook.com/LuisGabrielMusic\nInstagram ► https://www.instagram.com/luisgabriel.music\nTikTok ►https://www.tiktok.com/@luissgabriel\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#LuisGabriel #Haziran #TopManele',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M31S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '576153',
              likeCount: '23253',
              favoriteCount: '0',
              commentCount: '504',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'dtQOeaNUOCp7WKt2FEBOPPRlJG0',
            id: 'zNBjHiqHspE',
            snippet: {
              publishedAt: '2022-03-08T10:00:10Z',
              channelId: 'UCm8wnlLQgmzgMtnYfWqx2xw',
              title:
                'Theo Rose ✘ @Andrei Banuta - Spune-i Mama | Official Video',
              description:
                '🌹 Aboneaza-te la canalul meu aici: https://smarturl.it/TheoRoseYTsubscribe\n\nManagement: Contact@bigupmusic.ro | 0726 081 765 (Razvan)\nPentru Concerte: Catalin Rotaru 📱  (0723) 591 595 📧 catalin.rotaru@rocamusic.ro\n\nPentru concerte si management Andrei Banuta:\nElena Neagu: +40722 179 782 | office@dotbooking.ro\n\nFollow Theo Rose:\n📷 INSTA: https://www.instagram.com/theorose.official\n👍 FB: https://www.tiktok.com/@hereistheorose\n🎥 TIKTOK: https://www.tiktok.com/@hereistheorose\n\nAsculta Theo Rose:\n▶️ Spotify: https://smarturl.it/SpotifyTheoRose\n▶️ iTunes: https://smarturl.it/iTunesTheoRose \n\nFollow Andrei Banuta:\n📷 Instagram: https://instagram.com/andrei_banuta\n👍 Facebook: https://www.facebook.com/AndreiBanutaOfficial\n🎥 TikTok: https://vm.tiktok.com/gyU41a\n\nFollow Big Up Music:\n📷 INSTA:https://www.instagram.com/bigupmusic\n👍 FB: https://www.facebook.com/bigupmusicproduction\n🌐 https://bigupmusic.ro\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#TheoRose #AndreiBanuta #BigUpMusic',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/zNBjHiqHspE/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/zNBjHiqHspE/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/zNBjHiqHspE/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/zNBjHiqHspE/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/zNBjHiqHspE/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Theo Rose',
              tags: [
                'theo rose',
                'andrei banuta',
                'spune-i mama',
                'toata romania',
                'theo rose videoclip oficial',
                'theo rose cabron',
                'theo rose og eastbull',
                'theo rose pindu',
                'theo rose jador',
                'theo rose fara tine',
                'theo rose florin salam',
                'lacrimi si suspine',
                'as renunta',
                'theo rose official video',
                'theo rose bogdan de la ploiesti',
                'theo rose de ce ma minti',
                'theo rose poarta-ma in suflet vara',
                'manele noi',
                'manele 2021',
                'muzica pop',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'Theo Rose ✘ @Andrei Banuta - Spune-i Mama | Official Video',
                description:
                  '🌹 Aboneaza-te la canalul meu aici: https://smarturl.it/TheoRoseYTsubscribe\n\nManagement: Contact@bigupmusic.ro | 0726 081 765 (Razvan)\nPentru Concerte: Catalin Rotaru 📱  (0723) 591 595 📧 catalin.rotaru@rocamusic.ro\n\nPentru concerte si management Andrei Banuta:\nElena Neagu: +40722 179 782 | office@dotbooking.ro\n\nFollow Theo Rose:\n📷 INSTA: https://www.instagram.com/theorose.official\n👍 FB: https://www.tiktok.com/@hereistheorose\n🎥 TIKTOK: https://www.tiktok.com/@hereistheorose\n\nAsculta Theo Rose:\n▶️ Spotify: https://smarturl.it/SpotifyTheoRose\n▶️ iTunes: https://smarturl.it/iTunesTheoRose \n\nFollow Andrei Banuta:\n📷 Instagram: https://instagram.com/andrei_banuta\n👍 Facebook: https://www.facebook.com/AndreiBanutaOfficial\n🎥 TikTok: https://vm.tiktok.com/gyU41a\n\nFollow Big Up Music:\n📷 INSTA:https://www.instagram.com/bigupmusic\n👍 FB: https://www.facebook.com/bigupmusicproduction\n🌐 https://bigupmusic.ro\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#TheoRose #AndreiBanuta #BigUpMusic',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M33S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '3378371',
              likeCount: '98377',
              favoriteCount: '0',
              commentCount: '1630',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'YG-7VMUGCLj8Ty3Xd-B07BDedjo',
            id: 'afu0iTyNoAo',
            snippet: {
              publishedAt: '2022-03-21T16:01:04Z',
              channelId: 'UCkAr8bunhQhvDv5krJJlYrg',
              title:
                "LA PROMOȚIE: Vijai Și Apartamentu' Gratis (+CONCURS @ASUSRomania)",
              description:
                "✦Bă, când e vorba de mocangeală, nimeni nu-l întrece pe Vijai, e primu' la coadă, ej nebun!😅\n✦Concursul de desene / animații cu @Nicu Mihai: Animatii și @ASUSRomania : https://bit.ly/3L6WeQx\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Nu da banii pe prostii, ia-ți tricou' cu Jimmy!: https://jimmyshop.ro/\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦E-MAIL: jimmyhex@yahoo.com\n✦INSTAGRAM: https://www.instagram.com/jimmy.hex/\n✦FACEBOOK: https://www.facebook.com/YT.jimmy.hex\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦INSTAGRAM (Vasilica): https://www.instagram.com/giulia.vasilica/\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Parteneri (adică firme cu care mă am bine și mă mai ajută c-una cu-alta):\n  - Elgato: https://e.lga.to/JimmyHex\n  - ASUS Romania: https://bit.ly/3q9sUAO\n  - XP-Pen: https://bit.ly/2XVZFTe (5% reducere cu codul: ”JIMMYXPPEN”)\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Donează un leu că berea-i scumpă😏🍺: https://www.tipeeestream.com/jimmyhex/donation\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Abonează-te pentru mai multe povești: https://goo.gl/vPuUTk\n✦Abonează-te la canalul Jimmy Hex: https://goo.gl/2Gogsb\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Melodia din video: Hidden Agenda - Kevin MacLeod (incompetech.com)\n✦Melodia de la final: TheFatRat - Jackpot",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/afu0iTyNoAo/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/afu0iTyNoAo/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/afu0iTyNoAo/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'La povesti cu Jimmy',
              tags: [
                'vijai si apartamentu',
                'vijai si',
                'vijai si cersetorul',
                'vijai si japoneza',
                'vijai si cei 7 bitcoin',
                'la promotie jimmy',
                'vijai si pliantele',
                'mos craciun in mall',
                'mos jimmy si vijai',
                'jimmy si vijay',
                'jimmy hex si vijai',
                'la promotie',
                'viata la camin',
                'barba jimmy si vijai',
                'jimmy si barba',
                'columb si geaca',
                'la facultate',
                'la povesti cu jimmy',
                'la povesti',
                'jimmy hex',
                'viata la facultate',
                'la povesti cu jimi',
                'la povesti jimmy',
                'viata in dubai',
                'jimmy hex povesti',
                'la povesti cu vijay',
              ],
              categoryId: '1',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  "LA PROMOȚIE: Vijai Și Apartamentu' Gratis (+CONCURS @ASUSRomania)",
                description:
                  "✦Bă, când e vorba de mocangeală, nimeni nu-l întrece pe Vijai, e primu' la coadă, ej nebun!😅\n✦Concursul de desene / animații cu @Nicu Mihai: Animatii și @ASUSRomania : https://bit.ly/3L6WeQx\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Nu da banii pe prostii, ia-ți tricou' cu Jimmy!: https://jimmyshop.ro/\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦E-MAIL: jimmyhex@yahoo.com\n✦INSTAGRAM: https://www.instagram.com/jimmy.hex/\n✦FACEBOOK: https://www.facebook.com/YT.jimmy.hex\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦INSTAGRAM (Vasilica): https://www.instagram.com/giulia.vasilica/\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Parteneri (adică firme cu care mă am bine și mă mai ajută c-una cu-alta):\n  - Elgato: https://e.lga.to/JimmyHex\n  - ASUS Romania: https://bit.ly/3q9sUAO\n  - XP-Pen: https://bit.ly/2XVZFTe (5% reducere cu codul: ”JIMMYXPPEN”)\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Donează un leu că berea-i scumpă😏🍺: https://www.tipeeestream.com/jimmyhex/donation\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Abonează-te pentru mai multe povești: https://goo.gl/vPuUTk\n✦Abonează-te la canalul Jimmy Hex: https://goo.gl/2Gogsb\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n✦Melodia din video: Hidden Agenda - Kevin MacLeod (incompetech.com)\n✦Melodia de la final: TheFatRat - Jackpot",
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT16M5S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '406039',
              likeCount: '48635',
              favoriteCount: '0',
              commentCount: '1066',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'eq7aJ0-8PX0ciYKZj_EGlVzzLh0',
            id: '1qHLpz8Z8ZU',
            snippet: {
              publishedAt: '2022-03-18T10:00:00Z',
              channelId: 'UCvln8cRqhs1w59CIFcg5Vrg',
              title:
                'Costel Biju CBX ❌ Mariano 〽️🌍 - Iar te suna fraierul 2022',
              description:
                "Abonează-te pentru noutăți apasând Clopoțelul 🛎\n\n@Costel Biju  CBX ❌ Mariano 〽️🌍 - Iar te suna fraierul 2022 | Videoclip Official | 4k\n\n#Mariano #CBX  #CostelBiju\n\n🎥 Camera : Catalin Rusu & Madalin Lungu'\n🎞️ Video Edit: Mariano\n🎵 Muzica : Mariano\n✏️ Text : Sorin GS\n🎚️ Mix & Mastering : Mariano\n🎹Orchestratie : Marius Talent\n🎹Returnela : Embby Turkish Music\n\n🎶 Best of Mariano : https://bit.ly/2X2xP8v\n\n〽️ariano Online : \n👍 https://www.facebook.com/marianot01\n📸 https://www.instagram.com/mariano.t01 \n🗣 https://www.facebook.com/gadinceanu.mariano\n\nCBX Online :\n📷 INSTA: https://www.instagram.com/costelbiju/\n👍 FB: https://www.facebook.com/costel.biju.5\n\n\n☎️ Contact Mariano ☎️\nTel. / Whatsapp\n+40760898416\nEvenimente / Melodii Personalizate / Dedicații \n\nVersuri: \nAlo alo Fetele, faceti-va vietile\nViata merge inainte, nu va mai lasati prostite\n\nDaca te suna iar, spune-i ca esti cu mine\nZi ca te-a pierdut, sa nu se mai afirme\nCu bani masini si ce mai detine\nCumparate de tine\nSpune-i ca si tu meriti sa fii fericita\nTe-ai lasat de el prea mult folosita\nLasa-l pe seen dar nu-i da block iubire\nSa te vada cu mine\n\nN-are valoare sa iti fie mila, mila de un gunoi\nDa-i unde il doare, da-i in orgoliu, arata-i pozele cu noi\n\nIar te suna fraierul ca regreta\nTe-a tinut secreta si nu te respecta\nRaspunde-i viata mea si zii in sila\nSa pastreze tot ca i le-ai dat din mila\n\nEl nu te-a pretuit atunci cand te avea\nAcum te cauta, cand esti a altuia\nSpune-i si tu ca numai are sanse\nSa te tina in brate\nCat de fals e si cat teatru poate sa joace\nUite-l ca il cunosti, stii ca se preface\nAcum tu stii ca pentru el ai fost doar\nUn suport financiar\n\nToate drepturile sunt rezervate. Orice Upload neautorizat al acestui videoclip este ilegal și poate fi oricând raportat la YouTube .",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/1qHLpz8Z8ZU/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/1qHLpz8Z8ZU/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/1qHLpz8Z8ZU/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/1qHLpz8Z8ZU/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/1qHLpz8Z8ZU/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Mariano',
              tags: [
                'costel biju',
                'mariano',
                'cbx',
                'costel biju si mariano',
                'costel biju 2022',
                'iar te suna fraierul',
                'costel biju alo alo fetele',
                'auzi asculta-ma pe mine',
                'daca te suna iar spunei ca esti cu mine',
                'cum arde tigara',
                'mariano 2022',
                'biju si mariano 2022 hit',
                'el nu te-a pretuit atunci cand te avea',
                'spune-i ca meriti sa fii fericita',
                'te-a tinut secreta si nu te respecta',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'Costel Biju CBX ❌ Mariano 〽️🌍 - Iar te suna fraierul 2022',
                description:
                  "Abonează-te pentru noutăți apasând Clopoțelul 🛎\n\n@Costel Biju  CBX ❌ Mariano 〽️🌍 - Iar te suna fraierul 2022 | Videoclip Official | 4k\n\n#Mariano #CBX  #CostelBiju\n\n🎥 Camera : Catalin Rusu & Madalin Lungu'\n🎞️ Video Edit: Mariano\n🎵 Muzica : Mariano\n✏️ Text : Sorin GS\n🎚️ Mix & Mastering : Mariano\n🎹Orchestratie : Marius Talent\n🎹Returnela : Embby Turkish Music\n\n🎶 Best of Mariano : https://bit.ly/2X2xP8v\n\n〽️ariano Online : \n👍 https://www.facebook.com/marianot01\n📸 https://www.instagram.com/mariano.t01 \n🗣 https://www.facebook.com/gadinceanu.mariano\n\nCBX Online :\n📷 INSTA: https://www.instagram.com/costelbiju/\n👍 FB: https://www.facebook.com/costel.biju.5\n\n\n☎️ Contact Mariano ☎️\nTel. / Whatsapp\n+40760898416\nEvenimente / Melodii Personalizate / Dedicații \n\nVersuri: \nAlo alo Fetele, faceti-va vietile\nViata merge inainte, nu va mai lasati prostite\n\nDaca te suna iar, spune-i ca esti cu mine\nZi ca te-a pierdut, sa nu se mai afirme\nCu bani masini si ce mai detine\nCumparate de tine\nSpune-i ca si tu meriti sa fii fericita\nTe-ai lasat de el prea mult folosita\nLasa-l pe seen dar nu-i da block iubire\nSa te vada cu mine\n\nN-are valoare sa iti fie mila, mila de un gunoi\nDa-i unde il doare, da-i in orgoliu, arata-i pozele cu noi\n\nIar te suna fraierul ca regreta\nTe-a tinut secreta si nu te respecta\nRaspunde-i viata mea si zii in sila\nSa pastreze tot ca i le-ai dat din mila\n\nEl nu te-a pretuit atunci cand te avea\nAcum te cauta, cand esti a altuia\nSpune-i si tu ca numai are sanse\nSa te tina in brate\nCat de fals e si cat teatru poate sa joace\nUite-l ca il cunosti, stii ca se preface\nAcum tu stii ca pentru el ai fost doar\nUn suport financiar\n\nToate drepturile sunt rezervate. Orice Upload neautorizat al acestui videoclip este ilegal și poate fi oricând raportat la YouTube .",
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M12S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '454206',
              likeCount: '11106',
              favoriteCount: '0',
              commentCount: '120',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'U-UKgjU0pp8BumAfenAUf6bFGig',
            id: '2bzfNCfkR3Y',
            snippet: {
              publishedAt: '2022-03-12T10:00:13Z',
              channelId: 'UCOSuXx0kB-vHNsVY222B3lQ',
              title: 'Bogdan DLP - Milioanele de View-uri 💔 Official Video',
              description:
                'Videoclip oficial cu Bogdan DLP. (C) 2022 @Big UP Music / @Balkanika TV \n\n📱 Licentieri & Management: +40 720 066 666 (Razvan)\n🎤 Concerte & Management: +40.723.591.595 | Catalin Rotaru | catalin.rotaru@rocamusic.ro\n\n⭐ Aboneaza-te la canalul meu oficial sa primesti notificari cand postez:\nhttps://smarturl.it/BogdanDeLaPloiestiYT\n\n🔥 Follow Bogdan DLP:\nTikTok: https://www.tiktok.com/@bogdandelaploiesti.haz\nInstagram: http://www.instagram.com/bogdandelaploiesti\nFacebook: https://www.facebook.com/bogdandelaploiestioficial\n\nFollow Big Up Music:\n📷 INSTA:https://www.instagram.com/bigupmusic​\n👍 FB: https://www.facebook.com/bigupmusicproduction\n🌐 https://bigupmusic.ro\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#BogdanDLP #BigUPFusion #BDLPvideo',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/2bzfNCfkR3Y/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/2bzfNCfkR3Y/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/2bzfNCfkR3Y/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/2bzfNCfkR3Y/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/2bzfNCfkR3Y/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Bogdan DLP',
              tags: [
                'bogdan dlp',
                'milioanele',
                'milioanele de view-uri',
                'bogdan dlp official video',
                'sarutul tau',
                'sarutul tau de ramas bun',
                'cand doare inima',
                'bogdan dlp videoclip oficial',
                'bogdan dlp carmen de la salciua',
                'ochii tai',
                'tu ma suni noaptea manele',
                'bogdan de la ploiesti',
                'bogdan dlp jador',
                'bogdan dlp theo rose',
                'manele',
                'manele 2022',
                'manele hits',
                'cele mai noi manele',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'Bogdan DLP - Milioanele de View-uri 💔 Official Video',
                description:
                  'Videoclip oficial cu Bogdan DLP. (C) 2022 @Big UP Music / @Balkanika TV \n\n📱 Licentieri & Management: +40 720 066 666 (Razvan)\n🎤 Concerte & Management: +40.723.591.595 | Catalin Rotaru | catalin.rotaru@rocamusic.ro\n\n⭐ Aboneaza-te la canalul meu oficial sa primesti notificari cand postez:\nhttps://smarturl.it/BogdanDeLaPloiestiYT\n\n🔥 Follow Bogdan DLP:\nTikTok: https://www.tiktok.com/@bogdandelaploiesti.haz\nInstagram: http://www.instagram.com/bogdandelaploiesti\nFacebook: https://www.facebook.com/bogdandelaploiestioficial\n\nFollow Big Up Music:\n📷 INSTA:https://www.instagram.com/bigupmusic​\n👍 FB: https://www.facebook.com/bigupmusicproduction\n🌐 https://bigupmusic.ro\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#BogdanDLP #BigUPFusion #BDLPvideo',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M3S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '1424890',
              likeCount: '22448',
              favoriteCount: '0',
              commentCount: '344',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'ruAX3zZFiZmOVht5nfp3IUa1ThI',
            id: '6OCR3jqPGQk',
            snippet: {
              publishedAt: '2022-03-17T10:00:03Z',
              channelId: 'UC__X_iXX_aLcfNnFEZs1AZg',
              title: 'Irina Rimes - Ba ba ba (Inima mea bate)',
              description:
                'Stream x Download: https://irina-rimes.lnk.to/ba-ba-ba\nSubscribe @IrinaRimes: http://bit.ly/SubscribeIrinaRimes\n\nFollow Irina Rimes:\nSite Oficial: http://irinarimes.com\nFacebook: http://fb.com/IrinaRimesOficial\nInstagram: https://www.instagram.com/irinarimes\nSpotify: https://open.spotify.com/artist/1OQa8VMULlbmbFmDcdfBZj?si=ImL4rQj_QqaB0rt6rYKIMQ\nApple Music: https://music.apple.com/ro/artist/irina-rimes/1186736614\n\nGlobal Records Online: \nFacebook: https://www.facebook.com/GlobalRecordsCom\nInstagram: https://www.instagram.com/GlobalRecords\nOfficial Site: http://globalrecords.com\nTwitter: https://twitter.com/GlobalRecordsRO\n\nConcerte / Booking Irina Rimes:\nvaleria@forward.ro\n- Valeria Vdovii: 0757 104 166\n- Cristi Ochiu: 0746 224 499\n\nMuzică: Irina Rimes, Alexandru Turcu, Sorin Alexandru Crețu, Rareș Asavoaie \nText: Irina Rimes, Sorin Alexandru Crețu, Rareș Asavoaie \nProductie: Alexandru Turcu\nMix & master: Alexandru Turcu\n\nRegie: Bogdan Păun, Andra Marta, Chris Poszet \nDOP: Paul Tatcu \nStyling: Olivia Stoica\nMakeup/hair: Alex Ifimov \n\nManagement: Mara Ciama | mara@maraciama.ro\n\n#IrinaRimes #BaBaBa\n(C) & (P) 2022 #GlobalRecords \n\nToate drepturile rezervate. Orice reupload este ilegal si va fi raportat catre Youtube, fara exceptie.\n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/6OCR3jqPGQk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/6OCR3jqPGQk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/6OCR3jqPGQk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/6OCR3jqPGQk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/6OCR3jqPGQk/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Irina Rimes',
              tags: [
                'irina rimes',
                'ba ba ba',
                'inima mea bate',
                'global records',
                'best music',
                'best hits',
                'dance 2022',
                'pop 2022',
                'navsegda',
                'pentru totdeauna',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Irina Rimes - Ba ba ba (Inima mea bate)',
                description:
                  'Stream x Download: https://irina-rimes.lnk.to/ba-ba-ba\nSubscribe @IrinaRimes: http://bit.ly/SubscribeIrinaRimes\n\nFollow Irina Rimes:\nSite Oficial: http://irinarimes.com\nFacebook: http://fb.com/IrinaRimesOficial\nInstagram: https://www.instagram.com/irinarimes\nSpotify: https://open.spotify.com/artist/1OQa8VMULlbmbFmDcdfBZj?si=ImL4rQj_QqaB0rt6rYKIMQ\nApple Music: https://music.apple.com/ro/artist/irina-rimes/1186736614\n\nGlobal Records Online: \nFacebook: https://www.facebook.com/GlobalRecordsCom\nInstagram: https://www.instagram.com/GlobalRecords\nOfficial Site: http://globalrecords.com\nTwitter: https://twitter.com/GlobalRecordsRO\n\nConcerte / Booking Irina Rimes:\nvaleria@forward.ro\n- Valeria Vdovii: 0757 104 166\n- Cristi Ochiu: 0746 224 499\n\nMuzică: Irina Rimes, Alexandru Turcu, Sorin Alexandru Crețu, Rareș Asavoaie \nText: Irina Rimes, Sorin Alexandru Crețu, Rareș Asavoaie \nProductie: Alexandru Turcu\nMix & master: Alexandru Turcu\n\nRegie: Bogdan Păun, Andra Marta, Chris Poszet \nDOP: Paul Tatcu \nStyling: Olivia Stoica\nMakeup/hair: Alex Ifimov \n\nManagement: Mara Ciama | mara@maraciama.ro\n\n#IrinaRimes #BaBaBa\n(C) & (P) 2022 #GlobalRecords \n\nToate drepturile rezervate. Orice reupload este ilegal si va fi raportat catre Youtube, fara exceptie.\n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M36S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '887015',
              likeCount: '20389',
              favoriteCount: '0',
              commentCount: '731',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'DH_es8TD21czDafhZJ8d9_DVVjo',
            id: 'FIFWOyq420Q',
            snippet: {
              publishedAt: '2022-03-18T17:00:09Z',
              channelId: 'UCtke4StIE5z2EiF85Zeqb-A',
              title:
                'LA UN PAS DE MOARTE cu DORIAN POPA (La Munca: Episodul 1)',
              description:
                'LA MUNCA: Sezonul 1, Episodul 1 — In acest episod, eu și @Dorian Popa  am facut cel mai nebun challenge: am spalat geamuri la inaltime.\nACADEMIA DE VLOGGING | De la 0 la #1 | https://selly.ro/\nTRICOURI, HANORACE, ACCESORII: https://shop.5gang.ro\nInstagram: https://instagram.com/selly\nTikTok: https://www.tiktok.com/@selly\n\nBusiness: business@selly.ro\nBooking Selly & 5GANG: booking@5gang.ro\n\nWebsite: https://selly.ro/\n\n5GANG:\nhttps://5gang.ro\nhttps://youtube.com/5gang\nhttps://instagram.com/5gang\n\nMultumesc de vizionare, s-aveti o zi faina!\n© Selly® Media Network. All rights reserved.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/FIFWOyq420Q/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/FIFWOyq420Q/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/FIFWOyq420Q/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/FIFWOyq420Q/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/FIFWOyq420Q/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Selly',
              tags: ['selly', 'vlog', 'vlogger', '5gang', 'andrei selaru'],
              categoryId: '24',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'LA UN PAS DE MOARTE cu DORIAN POPA (La Munca: Episodul 1)',
                description:
                  'LA MUNCA: Sezonul 1, Episodul 1 — In acest episod, eu și @Dorian Popa  am facut cel mai nebun challenge: am spalat geamuri la inaltime.\nACADEMIA DE VLOGGING | De la 0 la #1 | https://selly.ro/\nTRICOURI, HANORACE, ACCESORII: https://shop.5gang.ro\nInstagram: https://instagram.com/selly\nTikTok: https://www.tiktok.com/@selly\n\nBusiness: business@selly.ro\nBooking Selly & 5GANG: booking@5gang.ro\n\nWebsite: https://selly.ro/\n\n5GANG:\nhttps://5gang.ro\nhttps://youtube.com/5gang\nhttps://instagram.com/5gang\n\nMultumesc de vizionare, s-aveti o zi faina!\n© Selly® Media Network. All rights reserved.',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT14M40S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '590140',
              likeCount: '61879',
              favoriteCount: '0',
              commentCount: '806',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'EtfhJBqKBjuzcCDjdLWNQBWgi4g',
            id: '9kIw45jrCZU',
            snippet: {
              publishedAt: '2022-03-20T21:27:28Z',
              channelId: 'UCbyawH6yI56MxZid7m2yLiA',
              title:
                'Doina Teodoru a spus glume USTURĂTOARE despre Micutzu! 🤭',
              description:
                'În episodul 6 al sezonului 12 iUmor, din 20 martie 2022, Doina Teodoru a intrat în scenă, transformată în Renata, personajul care a fost soția lui Micutzu în serialul Băieți de Oraș. “Sper că aici a venit Micutzu de pe scenă, nu Micutzu invitat la podcast-uri. Ești așa de amuzant fără text că ai mărit rata sinuciderilor”, a zis Renata. Acesta nu s-a temut să vorbească și despre ceilalți jurați, luându-l la roast și pe Cheloo.\n➠ Abonează-te la canalul nostru: https://goo.gl/ZUdUt3\nUrmăreşte-ne și pe:\n➠ Site Antena 1: https://a1.ro/\n➠ liveVIDEO pe AntenaPlay: https://antenaplay.ro/live/antena1\n\nYouTube network: Antena TV Group',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/9kIw45jrCZU/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/9kIw45jrCZU/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/9kIw45jrCZU/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Antena 1',
              tags: ['Antena 1'],
              categoryId: '24',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  'Doina Teodoru a spus glume USTURĂTOARE despre Micutzu! 🤭',
                description:
                  'În episodul 6 al sezonului 12 iUmor, din 20 martie 2022, Doina Teodoru a intrat în scenă, transformată în Renata, personajul care a fost soția lui Micutzu în serialul Băieți de Oraș. “Sper că aici a venit Micutzu de pe scenă, nu Micutzu invitat la podcast-uri. Ești așa de amuzant fără text că ai mărit rata sinuciderilor”, a zis Renata. Acesta nu s-a temut să vorbească și despre ceilalți jurați, luându-l la roast și pe Cheloo.\n➠ Abonează-te la canalul nostru: https://goo.gl/ZUdUt3\nUrmăreşte-ne și pe:\n➠ Site Antena 1: https://a1.ro/\n➠ liveVIDEO pe AntenaPlay: https://antenaplay.ro/live/antena1\n\nYouTube network: Antena TV Group',
              },
              defaultAudioLanguage: 'en',
            },
            contentDetails: {
              duration: 'PT11M11S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '307136',
              likeCount: '5478',
              favoriteCount: '0',
              commentCount: '164',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'DU2AE8vGKeYZXrEXqG5gml3HT_s',
            id: 'Vx26cY_3mYs',
            snippet: {
              publishedAt: '2022-03-09T18:00:01Z',
              channelId: 'UCQGg3WPrQ0bmcktpIdWoT5g',
              title: 'ABI - E ABI FAAA (Official Music Video)',
              description:
                "ABI - ''E ABI FAAA'' (Official Music Video)\n\nBooking & Marketing ► contact.babyabi@yahoo.com \nINSTAGRAM ► https://www.instagram.com/1babyabi1\n\nStream ♫ Download :\n♫  Spotify ► https://open.spotify.com/artist/6H1YO0K9D0kNWvLoib4CRL\n♫  Apple Music ► https://music.apple.com/us/artist/abi/88450107\n\nRec/Mix/Master - FXNE Studios\nDOP - @nepvlito, @cipiraw (breakdalaw)\nMusic Video - @cosmin.mtn\n\nExtra - @stefan_vacaroiu, @robert_severin, @razvan_stc23\n\n(C) & (P) ABI\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please, do not upload this song on your channel.",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Vx26cY_3mYs/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Vx26cY_3mYs/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Vx26cY_3mYs/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'abi talent',
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'ABI - E ABI FAAA (Official Music Video)',
                description:
                  "ABI - ''E ABI FAAA'' (Official Music Video)\n\nBooking & Marketing ► contact.babyabi@yahoo.com \nINSTAGRAM ► https://www.instagram.com/1babyabi1\n\nStream ♫ Download :\n♫  Spotify ► https://open.spotify.com/artist/6H1YO0K9D0kNWvLoib4CRL\n♫  Apple Music ► https://music.apple.com/us/artist/abi/88450107\n\nRec/Mix/Master - FXNE Studios\nDOP - @nepvlito, @cipiraw (breakdalaw)\nMusic Video - @cosmin.mtn\n\nExtra - @stefan_vacaroiu, @robert_severin, @razvan_stc23\n\n(C) & (P) ABI\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please, do not upload this song on your channel.",
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT2M34S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '2125470',
              likeCount: '110207',
              favoriteCount: '0',
              commentCount: '8481',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'CNl6gF4E0ME260xBLXCT9J_raTg',
            id: 'Qa4s-asp5gg',
            snippet: {
              publishedAt: '2022-03-12T11:03:23Z',
              channelId: 'UCiebKrTZGBhBqWQRNtQqwoA',
              title:
                'Tzanca Uraganu si Miraj Tzunami - Tancuri blindate [videoclip oficial] 2022',
              description:
                '📞 Pentru contactarea solistului sunati la ☎️+ 40720226511\nAbonați-vă la canalul meu pentru mai multe noutăți\nToate drepturile rezervate © & ® Tzanca Uraganu\n\nMuzica si text Marius de la Focsani\nOrchstratie Marius Talent,Nek Music ,Edvin\nVideo Kamarad\n\n#TzancaUraganu  #MirajTzunami\n►Facebook :  https://www.facebook.com/tzanca.printzu\n►Instagram : https://www.instagram.com/andrei_velcu_1',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Qa4s-asp5gg/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Qa4s-asp5gg/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Qa4s-asp5gg/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/Qa4s-asp5gg/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/Qa4s-asp5gg/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Tzanca Uraganu',
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  'Tzanca Uraganu si Miraj Tzunami - Tancuri blindate [videoclip oficial] 2022',
                description:
                  '📞 Pentru contactarea solistului sunati la ☎️+ 40720226511\nAbonați-vă la canalul meu pentru mai multe noutăți\nToate drepturile rezervate © & ® Tzanca Uraganu\n\nMuzica si text Marius de la Focsani\nOrchstratie Marius Talent,Nek Music ,Edvin\nVideo Kamarad\n\n#TzancaUraganu  #MirajTzunami\n►Facebook :  https://www.facebook.com/tzanca.printzu\n►Instagram : https://www.instagram.com/andrei_velcu_1',
              },
            },
            contentDetails: {
              duration: 'PT3M5S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '1580263',
              likeCount: '32092',
              favoriteCount: '0',
              commentCount: '704',
            },
          },
          {
            kind: 'youtube#video',
            etag: '679Y2KSYwNYdfRiwpRX3P3OUjMY',
            id: 'ofJBEyoPxfk',
            snippet: {
              publishedAt: '2022-03-19T08:00:13Z',
              channelId: 'UC4gWiVzFRhNcz8G5jY3F-LQ',
              title: 'Samsarul tepar 3 (camera ascunsa)',
              description:
                'Verifica masina pe Car Vertical : https://tinyurl.com/VerificareCarVertical\nFolositi codul "SAMSAR" pe Car Vertical pentru a primi reducere\n----------------------------\nDaca v-a placut acest vlog ma puteti ajuta cu un LIKE (sau DISLIKE) precum si cu un comentariu mai jos (pe care il voi citi) sau cu un share catre un prieten (nu catre toata lista).\n\nhttps://www.AndyPopescu.ro\nInstagram: AndyPopescuVlogs\nFacebook: Andy Popescu (follow ca am deja 5000 friends)\nEmail: socinmotor@gmail.com',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/ofJBEyoPxfk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/ofJBEyoPxfk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/ofJBEyoPxfk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/ofJBEyoPxfk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/ofJBEyoPxfk/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Andy Popescu',
              tags: [
                'ferrari',
                'lamborghini',
                'bmw',
                'audi',
                'mercedes',
                'm3',
                'm4',
                'm5',
                'm6',
                'i8',
                'andy',
                'x7',
                'x6',
                'seria',
                'popescu',
                'rs',
                'drag',
                'drift',
                'burnout',
                'golf',
                'mustang',
                'tesla',
                'car vertical',
                'carvertical',
                'vin info',
                'vininfo',
                'verificare serie',
                'verificare masina',
                'samsar',
                'andy samsar',
                'samsar lica',
                'andy lica',
                'samsar 3',
                'samsar prins',
                'andi samsar',
                'andy popescu samsar',
              ],
              categoryId: '2',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'Samsarul tepar 3 (camera ascunsa)',
                description:
                  'Verifica masina pe Car Vertical : https://tinyurl.com/VerificareCarVertical\nFolositi codul "SAMSAR" pe Car Vertical pentru a primi reducere\n----------------------------\nDaca v-a placut acest vlog ma puteti ajuta cu un LIKE (sau DISLIKE) precum si cu un comentariu mai jos (pe care il voi citi) sau cu un share catre un prieten (nu catre toata lista).\n\nhttps://www.AndyPopescu.ro\nInstagram: AndyPopescuVlogs\nFacebook: Andy Popescu (follow ca am deja 5000 friends)\nEmail: socinmotor@gmail.com',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT18M12S',
              dimension: '2d',
              definition: 'hd',
              caption: 'true',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '325404',
              likeCount: '27590',
              favoriteCount: '0',
              commentCount: '2274',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'k7t0oOtQ7FUDIhMT192d2h8a6is',
            id: 'FEI1pvhov1o',
            snippet: {
              publishedAt: '2022-03-11T10:00:10Z',
              channelId: 'UC_iJRimysEIAv1KidVQJQ-A',
              title: 'Andia x Guess Who - Pietre pretioase | Official Video',
              description:
                "Subscribe 💋 Andia Official YT channel: http://hyperurl.co/AndiaYT\n\nStream x Download: https://bfan.link/pietre-pretioase-gu... \n\nBooking Andia - livia@atom.ro\n\nMusic: Alex Pelin, Vlad Lucan, Guess Who\nText: Alex Pelin, Guess Who\nProduced by Vlad Lucan\n\nVideo by San\nDOP: Paul Tatcu\nEdit & Color: David Mogan\nVideo Production by Loops Production\n\nFollow Andia: \nSpotify, Apple Music, YouTube Music, Deezer - https://lnkfi.re/Andia\nFacebook: https://www.facebook.com/AndiaOficial/\nInstagram: https://www.instagram.com/andia.oficial/\nTik Tok: https://www.tiktok.com/@andia.oficial... \n\nFollow Guess Who:\nInstagram: https://www.instagram.com/guesswhorom...\nFacebook: https://ro-ro.facebook.com/GuessWhoRo...\n\n\nFollow ATOM:\nInstagram: https://www.instagram.com/ATOM/\nFollow 'Hot Hits Romania' playlist on Spotify - https://lnkfi.re/HotHitsRomania\n\n(C) & (P) 2022 ATOM / Okapi Sound\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#ANDIA #GUESSWHO #ATOM",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/FEI1pvhov1o/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/FEI1pvhov1o/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/FEI1pvhov1o/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/FEI1pvhov1o/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/FEI1pvhov1o/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'ANDIA',
              tags: [
                'andia',
                'guesswho',
                'pietrepretioase',
                '#muzica',
                '#muzicanoua',
                '#muzicanoua2022',
                'newmusic',
                'romania',
                'sfarsitullumii',
                'videoclip',
                'album',
                'hit',
                'hiturinoi',
                'newhits',
                'single',
                'newsingle',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Andia x Guess Who - Pietre pretioase | Official Video',
                description:
                  "Subscribe 💋 Andia Official YT channel: http://hyperurl.co/AndiaYT\n\nStream x Download: https://bfan.link/pietre-pretioase-gu... \n\nBooking Andia - livia@atom.ro\n\nMusic: Alex Pelin, Vlad Lucan, Guess Who\nText: Alex Pelin, Guess Who\nProduced by Vlad Lucan\n\nVideo by San\nDOP: Paul Tatcu\nEdit & Color: David Mogan\nVideo Production by Loops Production\n\nFollow Andia: \nSpotify, Apple Music, YouTube Music, Deezer - https://lnkfi.re/Andia\nFacebook: https://www.facebook.com/AndiaOficial/\nInstagram: https://www.instagram.com/andia.oficial/\nTik Tok: https://www.tiktok.com/@andia.oficial... \n\nFollow Guess Who:\nInstagram: https://www.instagram.com/guesswhorom...\nFacebook: https://ro-ro.facebook.com/GuessWhoRo...\n\n\nFollow ATOM:\nInstagram: https://www.instagram.com/ATOM/\nFollow 'Hot Hits Romania' playlist on Spotify - https://lnkfi.re/HotHitsRomania\n\n(C) & (P) 2022 ATOM / Okapi Sound\n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#ANDIA #GUESSWHO #ATOM",
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M2S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '1153208',
              likeCount: '25053',
              favoriteCount: '0',
              commentCount: '479',
            },
          },
          {
            kind: 'youtube#video',
            etag: '2pIXeubXxqxLA6CwtIAZh3XXW3o',
            id: 'nvNBF7P5LSA',
            snippet: {
              publishedAt: '2022-03-22T21:51:04Z',
              channelId: 'UC_p7fxL67Zkq11NK0VD5qiw',
              title:
                'SURVIVOR 2022 - Eliminare neașteptată la Survivor România. Ce concurent părăsește tabăra Faimoșilor',
              description:
                'Aventura Survivor continuă pe VOYO! → https://bit.ly/3FxRSyv\nNu uita să te abonezi la canalul nostru de YouTube → https://bit.ly/3sm7HFu\n\nRămâi la curent cu ultimele știri ale momentului pe rețelele de socializare:\n➥ Facebook: https://www.facebook.com/survivorromania.oficial/\n➥ Instagram: https://www.instagram.com/survivorromania.oficial/\n\nUrmărește VOYO pe paginile de Social Media:\n➥ Facebook: https://www.facebook.com/voyo.ro/ \n➥ Instagram: https://www.instagram.com/voyo.ro \n➥ TikTok: https://www.tiktok.com/@voyo.ro\n\nUrmărește PRO TV Plus pe paginile de Social Media:\n➥ Facebook: https://www.facebook.com/ProTVPlusRomania/ \n➥ Instagram: https://www.instagram.com/protvplus.ro/ \n➥ TikTok: https://www.tiktok.com/@protvplus.ro \n\nAi interviuri și informații exclusive și pe:\n➥ Site: https://survivor.protv.ro/\n➥ Facebook: https://www.facebook.com/ProTVRomania/\n➥ Instagram: https://www.instagram.com/protv_romania/\n\nDespre "Survivor Romania"\n\nAbandonați in mijlocul naturii exotice, in Republica Dominicana, departe de confortul civilizatiei, concurentii vor trece prin foarte multe incercari, vor fi nevoiti sa isi construiasca adapost, sa isi procure hrana, sa isi gaseasca aliati in mijlocul grupului din care vor face parte. La finele unor incercari limita se va afla un singur castigator.\n\nTelespectatorii vor avea un rol extrem de important in evolutia concurentilor, acestia putand sa-si voteze favoritii si, astfel, sa ii mentina in joc.  Modalitatea de votare va fi comunicata in timpul difuzarii reality-ului de prezentatorul acestuia, Daniel Pavel .\n\nConcurentii vor fi nevoiti sa isi dezvolte adevarate strategii de supravietuire, sa se integreze in echipa din care fac parte si sa faca fata provocarilor dificile aparute in viata de zi cu zi din jungla Dominicana. Abilitatile de adaptare, echilibrul psihic, indemanarea si rezistenta fizica le vor fi cei mai buni aliati in parcursul lor.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/nvNBF7P5LSA/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/nvNBF7P5LSA/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/nvNBF7P5LSA/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/nvNBF7P5LSA/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/nvNBF7P5LSA/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Survivor Romania',
              tags: [
                'Show de realitate',
                'Realitate',
                'Reality',
                'Reality Show',
                'Faimosii',
                'Razboinicii',
                'Celebritati',
                'Dominicană',
                'Republica Dominicana',
                'Insulă',
                'Rezistență',
                'Ambiţie',
                'Pasiune',
                'Sport',
                'Competiție',
                'Luptă',
                'Provocare',
                'Parkour',
                'Kanal D România',
                'Kanal D',
                'Survivor România',
                'Survivor',
                'lino golden',
                'ruby',
                'cristina siscanu',
                'ioana filimon',
                'bogdan vladau',
                'augustin viziru',
                'gratiela duban',
                'mihai onicas',
                'cezar juratoni',
                'asiana peng',
              ],
              categoryId: '24',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'SURVIVOR 2022 - Eliminare neașteptată la Survivor România. Ce concurent părăsește tabăra Faimoșilor',
                description:
                  'Aventura Survivor continuă pe VOYO! → https://bit.ly/3FxRSyv\nNu uita să te abonezi la canalul nostru de YouTube → https://bit.ly/3sm7HFu\n\nRămâi la curent cu ultimele știri ale momentului pe rețelele de socializare:\n➥ Facebook: https://www.facebook.com/survivorromania.oficial/\n➥ Instagram: https://www.instagram.com/survivorromania.oficial/\n\nUrmărește VOYO pe paginile de Social Media:\n➥ Facebook: https://www.facebook.com/voyo.ro/ \n➥ Instagram: https://www.instagram.com/voyo.ro \n➥ TikTok: https://www.tiktok.com/@voyo.ro\n\nUrmărește PRO TV Plus pe paginile de Social Media:\n➥ Facebook: https://www.facebook.com/ProTVPlusRomania/ \n➥ Instagram: https://www.instagram.com/protvplus.ro/ \n➥ TikTok: https://www.tiktok.com/@protvplus.ro \n\nAi interviuri și informații exclusive și pe:\n➥ Site: https://survivor.protv.ro/\n➥ Facebook: https://www.facebook.com/ProTVRomania/\n➥ Instagram: https://www.instagram.com/protv_romania/\n\nDespre "Survivor Romania"\n\nAbandonați in mijlocul naturii exotice, in Republica Dominicana, departe de confortul civilizatiei, concurentii vor trece prin foarte multe incercari, vor fi nevoiti sa isi construiasca adapost, sa isi procure hrana, sa isi gaseasca aliati in mijlocul grupului din care vor face parte. La finele unor incercari limita se va afla un singur castigator.\n\nTelespectatorii vor avea un rol extrem de important in evolutia concurentilor, acestia putand sa-si voteze favoritii si, astfel, sa ii mentina in joc.  Modalitatea de votare va fi comunicata in timpul difuzarii reality-ului de prezentatorul acestuia, Daniel Pavel .\n\nConcurentii vor fi nevoiti sa isi dezvolte adevarate strategii de supravietuire, sa se integreze in echipa din care fac parte si sa faca fata provocarilor dificile aparute in viata de zi cu zi din jungla Dominicana. Abilitatile de adaptare, echilibrul psihic, indemanarea si rezistenta fizica le vor fi cei mai buni aliati in parcursul lor.',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT2M50S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              regionRestriction: {
                allowed: ['RO'],
              },
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '92628',
              likeCount: '1380',
              favoriteCount: '0',
              commentCount: '416',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'niRwP6tNfNQcZIlu3l_aHqiCoSk',
            id: 'fcEBN3aHEOg',
            snippet: {
              publishedAt: '2022-03-18T18:00:12Z',
              channelId: 'UCzdJryaKfOpxiH3kYLNmAQQ',
              title: 'Holy Molly x Tata Vlad - Plouă | Official Music Video',
              description:
                'Stream x Download: https://holy-molly.lnk.to/ploua\nSUBSCRIBE @ HOLY MOLLY: https://www.youtube.com/channel/UCzdJryaKfOpxiH3kYLNmAQQ?sub_confirmation=1\n\nFollow me on Instagram: https://www.instagram.com/holymolly.guacamolly/\nTikTok: https://www.tiktok.com/@holymollyguacamolly?lang=en\n\nFollow Tata Vlad:\nInstagram: https://instagram.com/iamtatavlad\nFacebook: https://www.facebook.com/IAmTataVlad\n\nMusic: Florian Rus, Alexandru Radu (Chopin), Alex Cotoi, Holy Molly\nText: Florian Rus, Tata Vlad\nProduction:  Alexandru Radu (Chopin), Alex Cotoi\n\nDirector:  Isabella Szanto\nDoP : Roberto Stan\nStory: Bogdan Zamonea\nSecond unit: Ferran Mullor\nProduction: Loops Production\nProducer : Roxana Vaduva\n\nLyric:\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nAfară-i soare , da’ pereții se inundă\nDin fotoliu nu mai văd nimic de nori\nMi s-a schimbat tot ceru’ parcă într-o secundă\nCând oglinda iar m-a întrebat de noi\nO să aflu unde e, după furtună\nIți promit că vine înapoi \n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nPeste 7 mări și 7 țări\nS-aduc bani cât pentr-o casă cu 7 intrări…\nNu fi tristă, sunt eu supărat pentru amândoi,\nVin înapoi să-ți fac din nou ceru’ senin din ploi…\nE dimineață și scrumiera dă pe-afară,\nÎncerc de-aseară s-omor doru’ cu fum de țigară…\nHotelu’ 5 stele, starea mea de una,\nCa lovit de fulger, mă gândesc la tine-ntruna…\nGândurile-n cap boom-boom-boom ca tunete,\nIdei negre, ca o ploaie, vin rafale…\nTe simt aproape, nu le las să mă agațe,\nMă-ntorc în curând cu soarele în brațe…\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nZi după zi cerul meu gri\nMă întreabă când o să vii\nGânduri cu tine în nor după nor\nSe-anunță furtună de dor\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\n\n\n#HolyMolly #TataVlad #Plouă #GlobalRecords\n\n(C) & (P) 2022  Global Records & Casa Production\n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/fcEBN3aHEOg/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/fcEBN3aHEOg/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/fcEBN3aHEOg/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/fcEBN3aHEOg/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/fcEBN3aHEOg/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'HOLY MOLLY',
              tags: [
                'holy molly',
                'best music',
                'best hits',
                'tata vlad',
                'ploua',
                'bang bang',
                'maria',
                'c est la vie',
                'global records',
                'creator records',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Holy Molly x Tata Vlad - Plouă | Official Music Video',
                description:
                  'Stream x Download: https://holy-molly.lnk.to/ploua\nSUBSCRIBE @ HOLY MOLLY: https://www.youtube.com/channel/UCzdJryaKfOpxiH3kYLNmAQQ?sub_confirmation=1\n\nFollow me on Instagram: https://www.instagram.com/holymolly.guacamolly/\nTikTok: https://www.tiktok.com/@holymollyguacamolly?lang=en\n\nFollow Tata Vlad:\nInstagram: https://instagram.com/iamtatavlad\nFacebook: https://www.facebook.com/IAmTataVlad\n\nMusic: Florian Rus, Alexandru Radu (Chopin), Alex Cotoi, Holy Molly\nText: Florian Rus, Tata Vlad\nProduction:  Alexandru Radu (Chopin), Alex Cotoi\n\nDirector:  Isabella Szanto\nDoP : Roberto Stan\nStory: Bogdan Zamonea\nSecond unit: Ferran Mullor\nProduction: Loops Production\nProducer : Roxana Vaduva\n\nLyric:\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nAfară-i soare , da’ pereții se inundă\nDin fotoliu nu mai văd nimic de nori\nMi s-a schimbat tot ceru’ parcă într-o secundă\nCând oglinda iar m-a întrebat de noi\nO să aflu unde e, după furtună\nIți promit că vine înapoi \n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nPeste 7 mări și 7 țări\nS-aduc bani cât pentr-o casă cu 7 intrări…\nNu fi tristă, sunt eu supărat pentru amândoi,\nVin înapoi să-ți fac din nou ceru’ senin din ploi…\nE dimineață și scrumiera dă pe-afară,\nÎncerc de-aseară s-omor doru’ cu fum de țigară…\nHotelu’ 5 stele, starea mea de una,\nCa lovit de fulger, mă gândesc la tine-ntruna…\nGândurile-n cap boom-boom-boom ca tunete,\nIdei negre, ca o ploaie, vin rafale…\nTe simt aproape, nu le las să mă agațe,\nMă-ntorc în curând cu soarele în brațe…\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\nZi după zi cerul meu gri\nMă întreabă când o să vii\nGânduri cu tine în nor după nor\nSe-anunță furtună de dor\n\nȘi iar plouă\nOoo \nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa\nȘi de umbra ta\nIar plouă\nOoo\nAzi în mintea mea\nE doar vreme rea\nIar plouă\nOoo\nCând mi-e dor așa de noi\n\n\n\n#HolyMolly #TataVlad #Plouă #GlobalRecords\n\n(C) & (P) 2022  Global Records & Casa Production\n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.',
              },
            },
            contentDetails: {
              duration: 'PT2M58S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '534918',
              likeCount: '12121',
              favoriteCount: '0',
              commentCount: '736',
            },
          },
          {
            kind: 'youtube#video',
            etag: '8WvEuTMsc1WeEjFENVzbcqYseso',
            id: 'Bb7pphWltLI',
            snippet: {
              publishedAt: '2022-03-20T23:38:56Z',
              channelId: 'UCTv-XvfzLX3i4IGWAm4sbmA',
              title: 'Resumen de Real Madrid vs FC Barcelona (0-4)',
              description:
                'El FC Barcelona se impuso por 0-4 en el Santiago Bernabéu con un doblete de Aubameyang y los goles de Araújo y Ferran Torres #RealMadridBarça #ElClásico J29 LaLiga Santander 2021/2022\n\nSuscríbete al canal oficial de LaLiga Santander en HD http://goo.gl/Cp0tC\nSubscribe to the Official Channel of LaLiga in High Definition http://goo.gl/Cp0tC\n\nTwitter ESP: https://twitter.com/LaLiga\nTwitter EN: https://twitter.com/LaLigaEN\nTwitter Arab: https://twitter.com/LaLigaArab\nInstagram: Instagram.com/laliga\nFacebook: https://www.facebook.com/LaLiga\nTikTok:  https://www.tiktok.com/@laliga?lang=es\n \nTwitter Brazil: https://twitter.com/LaLigaBRA\nTwitter France: https://twitter.com/LaLigaFRA\nTwitter Japan: https://twitter.com/LaLigaJP\nTwitter Indonesia: https://twitter.com/LaLigaID\nTwitter Thailand: https://twitter.com/LaLigaTH\n \nLine Indonesia:  https://manager.line.biz/account/@682pblvb\nLine Thailand:   https://page.line.me/147rxpbe\nLine Japan: https://manager.line.biz/account/@149hbdkj\nHelo:  https://s.helo-app.com/al/rxbmprxbvR\nBabe ID:   https://www.babe.news/user/6769885406836048898/publish\nWeibo:  https://weibo.com/u/2481951041\nDouyin: https://v.douyin.com/evV8Epv/\nToutiao: https://profile.zjurl.cn/rogue/ugc/profile/?version_code=8.3.3&version_name=80303&user_id=99229017134&media_id=1608860869706759&request_source=1&active_tab=dongtai&device_id=65&app_name=news_article&share_token=B41BCE77-0936-4CBE-A69F-8260E329C5A5&tt_from=copy_link&utm_source=copy_link&utm_medium=toutiao_ios&utm_campaign=client_share',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Bb7pphWltLI/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Bb7pphWltLI/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Bb7pphWltLI/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/Bb7pphWltLI/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/Bb7pphWltLI/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'LaLiga Santander',
              tags: [
                'liga',
                'laliga',
                'laliga santander',
                'football',
                'resumen',
                'goles',
                'highlights',
                'goal',
                'gol',
                'Aubameyang',
                'Araújo',
                'Ferran Torres',
                'Vini Jr',
                'Vinícius Jr',
                'Vinicius',
                'Modric',
                'Casemiro',
                'Kroos',
                'Rodrygo',
                'Fede Valverde',
                'Nacho',
                'Militao',
                'Alaba',
                'Carvajal',
                'Courtois',
                'Mariano',
                'Asensio',
                'Lucas Vázquez',
                'Camavinga',
                'Dembélé',
                'Frenkie de Jong',
                'Busquets',
                'Pedri',
                'Jordi Alba',
                'Piqué',
                'Eric García',
                'ter Stegen',
                'Gavi',
                'Dani Alves',
                'Adama Traoré',
                'Nico González',
                'Memphis',
                'ElClásico',
                'El Clásico',
                '#ElClásico',
                'Real Madrid vs Barcelona',
                'ElClasico',
                'El Clasico',
              ],
              categoryId: '17',
              liveBroadcastContent: 'none',
              defaultLanguage: 'es',
              localized: {
                title: 'Resumen de Real Madrid vs FC Barcelona (0-4)',
                description:
                  'El FC Barcelona se impuso por 0-4 en el Santiago Bernabéu con un doblete de Aubameyang y los goles de Araújo y Ferran Torres #RealMadridBarça #ElClásico J29 LaLiga Santander 2021/2022\n\nSuscríbete al canal oficial de LaLiga Santander en HD http://goo.gl/Cp0tC\nSubscribe to the Official Channel of LaLiga in High Definition http://goo.gl/Cp0tC\n\nTwitter ESP: https://twitter.com/LaLiga\nTwitter EN: https://twitter.com/LaLigaEN\nTwitter Arab: https://twitter.com/LaLigaArab\nInstagram: Instagram.com/laliga\nFacebook: https://www.facebook.com/LaLiga\nTikTok:  https://www.tiktok.com/@laliga?lang=es\n \nTwitter Brazil: https://twitter.com/LaLigaBRA\nTwitter France: https://twitter.com/LaLigaFRA\nTwitter Japan: https://twitter.com/LaLigaJP\nTwitter Indonesia: https://twitter.com/LaLigaID\nTwitter Thailand: https://twitter.com/LaLigaTH\n \nLine Indonesia:  https://manager.line.biz/account/@682pblvb\nLine Thailand:   https://page.line.me/147rxpbe\nLine Japan: https://manager.line.biz/account/@149hbdkj\nHelo:  https://s.helo-app.com/al/rxbmprxbvR\nBabe ID:   https://www.babe.news/user/6769885406836048898/publish\nWeibo:  https://weibo.com/u/2481951041\nDouyin: https://v.douyin.com/evV8Epv/\nToutiao: https://profile.zjurl.cn/rogue/ugc/profile/?version_code=8.3.3&version_name=80303&user_id=99229017134&media_id=1608860869706759&request_source=1&active_tab=dongtai&device_id=65&app_name=news_article&share_token=B41BCE77-0936-4CBE-A69F-8260E329C5A5&tt_from=copy_link&utm_source=copy_link&utm_medium=toutiao_ios&utm_campaign=client_share',
              },
              defaultAudioLanguage: 'es',
            },
            contentDetails: {
              duration: 'PT3M28S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '9768889',
              likeCount: '212151',
              favoriteCount: '0',
              commentCount: '6981',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'HT5tqRlnunQeev8xwG9baz-3_SM',
            id: 'dvmA9OZOQfs',
            snippet: {
              publishedAt: '2022-03-18T16:00:13Z',
              channelId: 'UCF0WTIjRThqdekNZxPFSS6A',
              title: 'DA BRAVO! Podcast #38 cu Anca Dumitra',
              description:
                'Devino membru al canalului Da Bravo by Mihai Bobonete:\nhttps://www.youtube.com/channel/UCF0WTIjRThqdekNZxPFSS6A/join\n\n💥 🔥  DA BRAVO! #Podcast #38 cu Anca Dumitra (Gianina Las Fierbinti)\n👉 Join Membership: https://bit.ly/3yAFmMR\n👉 Subscribe sau aboneaza-te pentru mai mult: https://goo.gl/9gN6Yd\n....\nSumar:\n0:00 Intro\n2:01 Anca Dumitra, Dakota Johnson de România\n3:18 Despre viața amoroasă. Cum este viața cu o actriță\n4:57 Între Anca Dumitra și Gianina\n6:49 JOC inspirat de filmul „Complet necunoscuți”\n8:31 Tată în cadru militar. Cum se ferea Anca atunci când ieșea la întâlniri\n12:40 Primul sărut pe ecran și opțiunile de măritiș ale Gianinei\n14:21 Momente amuzante cu Bobitza și Gianina\n17:11 Las Fierbinți, o experiență unică pentru Anca Dumitra\n18:14 Povestea lui Bobonete cu Moș Crăciun\n19:40 Despre asigurări cu mama Ancăi Dumitra\n24:00 Doamna Dumitra dă din casă! Poveste din copilăria Ancăi\n28:53 Palma lui Bobonete. Povestea de la păcănele\n29:48 Declarații de la admiratorii Ancăi\n32:31 Preziceri despre Anca Dumitra și Alex Bogdan\n35:36 TPU cu Anca Dumitra. Mame vitrege, soți îngrijorați și....altele😂\n42:22 Cum o să fie Anca Dumitra peste 10 ani? „O să fiu sexy”\n44:13 Povestea cu Stela Popescu\n50:11 Cât mai ține Las Fierbinți? Care e cheia succesului?\n53:20 Ce ar trebui să facă bărbații pentru a face femeile fericite?\n58:05 Cum conduce Anca Dumitra? Povești din trafic\n1:03:15 Întrebări stupide de la interviuri\n1:05:09 „Ți-a pus cineva mâna pe fund?”😂 și bancul cu Scufița Roșie\n1:06:49 Întrebări rapide\n1:08:25 Întrebări de la membri canalului\n1:10:38 Jocul cu belciuge\n1:12:56 Final\n-----\nUrmareste-ma si pe:\n👉Facebook: https://www.facebook.com/bobonetevirt...\n👉Instagram: https://www.instagram.com/mihai.bobon...\n👉Site: http://www.mihaibobonete.ro\n👉Twitter: https://twitter.com/bobonete\nPagini oficiale Da Bravo!\n👉Instagram: https://www.instagram.com/dabravo.off...\n👉Facebook:  https://www.facebook.com/da.bravo.bob...\n....\nContact management & booking:\n👉  Madalina Lazar: 0722329263 \n....\nScenarist: Alex Pomana\nhttps://www.instagram.com/alexpomana/\nRegizor: Adrian Bobonete\nhttps://www.instagram.com/adrianbobonete/\n.....\nA/V:  WorkHorse \nhttps://www.instagram.com/workhorse.ro\nDP: Dan Petru\nhttps://www.instagram.com/danpetru/\nSecond Camera: Bogdan Trestianu\nhttps://www.instagram.com/missedaspot/\nDirector: Florin Ivan\nhttps://www.instagram.com/cahlutz/\n\nMCN YouTube: BrandTube - office@brandtube.ro\n____________________________________\n(C) & (P) DA BRAVO! 2021\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws\nIn order to avoid copyright infringement, please, do not upload this content on your channel.\n-----------------\n(C) & (P) DA BRAVO! 2021\n Toate drepturile sunt rezervate.  Reproducerea neautorizată reprezintă o încălcare a legilor aplicabile. Pentru a evita încălcarea drepturilor de autor, vă rugăm să nu încărcați/repostați acest conținut pe canalul dvs.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/dvmA9OZOQfs/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/dvmA9OZOQfs/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/dvmA9OZOQfs/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'DA BRAVO! by Mihai Bobonete',
              tags: [
                'mihai bobonete',
                'bobo stand up',
                'bobonete standup',
                'stand up',
                'stand up comedy',
                'mihai bobonete stand up comedy',
                'bobita stand up comedy',
                'da bravo',
                'Gianina Las Fierbinti',
                'gianina',
                'da bravo podcast',
                'bobonete podcast',
                'anca dumitra',
                'interviu gianina las fierbinti',
                'podcast las fierbinti',
                'podcast anca dumitra',
                'las fierbinti',
              ],
              categoryId: '24',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'DA BRAVO! Podcast #38 cu Anca Dumitra',
                description:
                  'Devino membru al canalului Da Bravo by Mihai Bobonete:\nhttps://www.youtube.com/channel/UCF0WTIjRThqdekNZxPFSS6A/join\n\n💥 🔥  DA BRAVO! #Podcast #38 cu Anca Dumitra (Gianina Las Fierbinti)\n👉 Join Membership: https://bit.ly/3yAFmMR\n👉 Subscribe sau aboneaza-te pentru mai mult: https://goo.gl/9gN6Yd\n....\nSumar:\n0:00 Intro\n2:01 Anca Dumitra, Dakota Johnson de România\n3:18 Despre viața amoroasă. Cum este viața cu o actriță\n4:57 Între Anca Dumitra și Gianina\n6:49 JOC inspirat de filmul „Complet necunoscuți”\n8:31 Tată în cadru militar. Cum se ferea Anca atunci când ieșea la întâlniri\n12:40 Primul sărut pe ecran și opțiunile de măritiș ale Gianinei\n14:21 Momente amuzante cu Bobitza și Gianina\n17:11 Las Fierbinți, o experiență unică pentru Anca Dumitra\n18:14 Povestea lui Bobonete cu Moș Crăciun\n19:40 Despre asigurări cu mama Ancăi Dumitra\n24:00 Doamna Dumitra dă din casă! Poveste din copilăria Ancăi\n28:53 Palma lui Bobonete. Povestea de la păcănele\n29:48 Declarații de la admiratorii Ancăi\n32:31 Preziceri despre Anca Dumitra și Alex Bogdan\n35:36 TPU cu Anca Dumitra. Mame vitrege, soți îngrijorați și....altele😂\n42:22 Cum o să fie Anca Dumitra peste 10 ani? „O să fiu sexy”\n44:13 Povestea cu Stela Popescu\n50:11 Cât mai ține Las Fierbinți? Care e cheia succesului?\n53:20 Ce ar trebui să facă bărbații pentru a face femeile fericite?\n58:05 Cum conduce Anca Dumitra? Povești din trafic\n1:03:15 Întrebări stupide de la interviuri\n1:05:09 „Ți-a pus cineva mâna pe fund?”😂 și bancul cu Scufița Roșie\n1:06:49 Întrebări rapide\n1:08:25 Întrebări de la membri canalului\n1:10:38 Jocul cu belciuge\n1:12:56 Final\n-----\nUrmareste-ma si pe:\n👉Facebook: https://www.facebook.com/bobonetevirt...\n👉Instagram: https://www.instagram.com/mihai.bobon...\n👉Site: http://www.mihaibobonete.ro\n👉Twitter: https://twitter.com/bobonete\nPagini oficiale Da Bravo!\n👉Instagram: https://www.instagram.com/dabravo.off...\n👉Facebook:  https://www.facebook.com/da.bravo.bob...\n....\nContact management & booking:\n👉  Madalina Lazar: 0722329263 \n....\nScenarist: Alex Pomana\nhttps://www.instagram.com/alexpomana/\nRegizor: Adrian Bobonete\nhttps://www.instagram.com/adrianbobonete/\n.....\nA/V:  WorkHorse \nhttps://www.instagram.com/workhorse.ro\nDP: Dan Petru\nhttps://www.instagram.com/danpetru/\nSecond Camera: Bogdan Trestianu\nhttps://www.instagram.com/missedaspot/\nDirector: Florin Ivan\nhttps://www.instagram.com/cahlutz/\n\nMCN YouTube: BrandTube - office@brandtube.ro\n____________________________________\n(C) & (P) DA BRAVO! 2021\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws\nIn order to avoid copyright infringement, please, do not upload this content on your channel.\n-----------------\n(C) & (P) DA BRAVO! 2021\n Toate drepturile sunt rezervate.  Reproducerea neautorizată reprezintă o încălcare a legilor aplicabile. Pentru a evita încălcarea drepturilor de autor, vă rugăm să nu încărcați/repostați acest conținut pe canalul dvs.',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT1H13M50S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '298964',
              likeCount: '9455',
              favoriteCount: '0',
              commentCount: '323',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'ltJEXm_GOXPNGopVNv1-L0PklOU',
            id: 'xFDpYe4RS_s',
            snippet: {
              publishedAt: '2022-03-10T08:00:11Z',
              channelId: 'UC9q02x_vtrnmFikcRodI2eQ',
              title: 'Vladuta Lupau - Cum e omul e si-o floare',
              description:
                'Încep primăvara prin acest cadou muzical pe care vi-l dăruiesc din toată inima! \nAceastă melodie ilustrează realitatea vieții omului și sper să vă placă atât melodia cât și videoclipul iar voi să-mi lăsați ca amintire…comentarii frumoase! \n\nMuzica si text📄: Marius de la Focșani\nVideo🎞: Andrei Vrășmaș \nStudio și orchestrație🔊: Paul Morar\nVioară🎻: Darius Stoica\n\nMai mereu cu zâmbetul pe buze, artista Vlăduța Maria Lupău este dovada incontestabilă că folclorul românesc este respectat, promovat şi dus mai departe de generaţia tânără a României. La doar 25 de ani, Vlăduța a ajuns să fie cunoscută atât pe plan naţional, cât şi pe plan internaţional.De-a lungul carierei sale, tânăra a câştigat numeroase premii dintre care amintim: Premiul I – Festivalul Național „Rapsodia Românească”; Premiul I – Festivalul Național „Maria Lătărețu”; Premiul III – „Strugurele de Aur”; Marele Premiu „Festivalul Național de Cătănie”; Marele Premiu „Maria Tănase” sau Premiul de Popularitate „Mamaia Folclor”.\n\nVladuta Lupau\nPentru concerte , evenimente private/Booking\nMail: contact.vladutalupau@gmail.com ; Telefon: 0736 762 722 \nFacebook: https://www.facebook.com/vladutalupau/\nTwiter: https://twitter.com/VladutaLupau/\nInstagram: https://www.instagram.com/vladutalupau/\nAboneaza-te pentru noutati: https://bit.ly/2TYaZhn\n\nVladuta Lupau - Cum e omul e si-o floare (versuri):\nFloricică, floare albă\nStai o clipă și te-ntreabă\nCe te faci că vara trece\nȘi-o să vină vreme rece \nȘi vântul o să te aplece\n\nViață, viață, ești frumoasă\nCând ești tânăr nu îți pasă\nDar când treci de jumatate\nParca-uzi ceasu’ cum bate \nDe nimica nu-ți mai arde\n\nRef:\nCum e omul e și-o floare\nAstăzi e mâine dispare\nDe aia mă-ntreb mereu \nCine sunt și ce sunt eu\nViața omului o clipă\nCât o fărâmă de mică\nDe aia mă-ntreb mereu\nCine sunt și ce sunt eu \n\nFloricică, floare albă\nStai o clipă și te-ntreabă\nCe te faci că vara trece\nȘi-o să vină vreme rece \nȘi vântul o să te aplece\n\n\nRef:\nCum e omul e și-o floare\nAstăzi e mâine dispare\nDe aia mă-ntreb mereu \nCine sunt și ce sunt eu\nViața omului o clipă\nCât o fărâmă de mică\nDe aia mă-ntreb mereu\nCine sunt și ce sunt eu',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/xFDpYe4RS_s/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/xFDpYe4RS_s/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/xFDpYe4RS_s/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/xFDpYe4RS_s/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/xFDpYe4RS_s/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Vladuta Lupau',
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title: 'Vladuta Lupau - Cum e omul e si-o floare',
                description:
                  'Încep primăvara prin acest cadou muzical pe care vi-l dăruiesc din toată inima! \nAceastă melodie ilustrează realitatea vieții omului și sper să vă placă atât melodia cât și videoclipul iar voi să-mi lăsați ca amintire…comentarii frumoase! \n\nMuzica si text📄: Marius de la Focșani\nVideo🎞: Andrei Vrășmaș \nStudio și orchestrație🔊: Paul Morar\nVioară🎻: Darius Stoica\n\nMai mereu cu zâmbetul pe buze, artista Vlăduța Maria Lupău este dovada incontestabilă că folclorul românesc este respectat, promovat şi dus mai departe de generaţia tânără a României. La doar 25 de ani, Vlăduța a ajuns să fie cunoscută atât pe plan naţional, cât şi pe plan internaţional.De-a lungul carierei sale, tânăra a câştigat numeroase premii dintre care amintim: Premiul I – Festivalul Național „Rapsodia Românească”; Premiul I – Festivalul Național „Maria Lătărețu”; Premiul III – „Strugurele de Aur”; Marele Premiu „Festivalul Național de Cătănie”; Marele Premiu „Maria Tănase” sau Premiul de Popularitate „Mamaia Folclor”.\n\nVladuta Lupau\nPentru concerte , evenimente private/Booking\nMail: contact.vladutalupau@gmail.com ; Telefon: 0736 762 722 \nFacebook: https://www.facebook.com/vladutalupau/\nTwiter: https://twitter.com/VladutaLupau/\nInstagram: https://www.instagram.com/vladutalupau/\nAboneaza-te pentru noutati: https://bit.ly/2TYaZhn\n\nVladuta Lupau - Cum e omul e si-o floare (versuri):\nFloricică, floare albă\nStai o clipă și te-ntreabă\nCe te faci că vara trece\nȘi-o să vină vreme rece \nȘi vântul o să te aplece\n\nViață, viață, ești frumoasă\nCând ești tânăr nu îți pasă\nDar când treci de jumatate\nParca-uzi ceasu’ cum bate \nDe nimica nu-ți mai arde\n\nRef:\nCum e omul e și-o floare\nAstăzi e mâine dispare\nDe aia mă-ntreb mereu \nCine sunt și ce sunt eu\nViața omului o clipă\nCât o fărâmă de mică\nDe aia mă-ntreb mereu\nCine sunt și ce sunt eu \n\nFloricică, floare albă\nStai o clipă și te-ntreabă\nCe te faci că vara trece\nȘi-o să vină vreme rece \nȘi vântul o să te aplece\n\n\nRef:\nCum e omul e și-o floare\nAstăzi e mâine dispare\nDe aia mă-ntreb mereu \nCine sunt și ce sunt eu\nViața omului o clipă\nCât o fărâmă de mică\nDe aia mă-ntreb mereu\nCine sunt și ce sunt eu',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M34S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '1491649',
              likeCount: '29032',
              favoriteCount: '0',
              commentCount: '1455',
            },
          },
          {
            kind: 'youtube#video',
            etag: '95fESHGJaB2xrpGB5BukUfOKf2I',
            id: 'ig7hYV9Jyjc',
            snippet: {
              publishedAt: '2022-03-21T11:00:16Z',
              channelId: 'UCE_NNArrZmhYCwuoc9-GTrQ',
              title:
                'RASPUNDE CORECT SAU CAZI IN PISCINA !! cu Andreea Bostanica',
              description:
                '@Andreea Bostanica https://youtu.be/DVWKnhIzASU\n\n✅ Urmareste-ma pe Instagram:\nhttps://www.instagram.com/eugen_anghel\n\n❗Business: officeorangeblue@gmail.com\n\n✅ Va multumim pentru sustinere✌️😊',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/ig7hYV9Jyjc/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/ig7hYV9Jyjc/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/ig7hYV9Jyjc/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/ig7hYV9Jyjc/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/ig7hYV9Jyjc/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Orange Blue',
              tags: [
                'orange blue experimente',
                'trucuri',
                'orange blue',
                'eugen',
                'experimente',
              ],
              categoryId: '24',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  'RASPUNDE CORECT SAU CAZI IN PISCINA !! cu Andreea Bostanica',
                description:
                  '@Andreea Bostanica https://youtu.be/DVWKnhIzASU\n\n✅ Urmareste-ma pe Instagram:\nhttps://www.instagram.com/eugen_anghel\n\n❗Business: officeorangeblue@gmail.com\n\n✅ Va multumim pentru sustinere✌️😊',
              },
            },
            contentDetails: {
              duration: 'PT31M6S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '301372',
              likeCount: '27535',
              favoriteCount: '0',
              commentCount: '1369',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'mGmSA8i8xcu6enh21k1gjzw017E',
            id: 'UKbukZIicDk',
            snippet: {
              publishedAt: '2022-03-19T10:00:12Z',
              channelId: 'UCY7eOLk0wEDgfK_yGG7zAgg',
              title: 'Sală de Fitness în Sat #3Chestii',
              description:
                '🌟 Aplicația ESX o găsiți pe Apple Store și Magazin Play\n🌟 Dacă vrei să mergi la sală, cu abonamentul de pe https://www.esx.ro poți merge la 370+ de săli din România.\n📀 Pentru colaborări și promovări, așteptăm mesajele voastre aici: marketing@3chestii.ro\n► Ne găsești pe Instagram - @3Chestii: https://bit.ly/insta3chestii\n\n🌟 Echipă tehnic:\nRegia și editare-montare video: Gongeanu Petronel\nScenariul: Echipa 3Chestii\nCameraman : Edy Eduard https://www.facebook.com/napsteredy \n\n► Alătură-te acestui canal pentru a primi acces la beneficii: https://www.youtube.com/channel/UCY7eOLk0wEDgfK_yGG7zAgg\n\n🌟 PERSONAJELE DIN VIDEO/CONTURI INSTAGRAM:\n* Păduraru Mitică ( Gongeanu Petronel ) :  @ gongeanupetronel\n* Cornel ( Iulian Mehedinț ) : @ iulian3chestii\n* Aurica ( Andreea Lodbă ) : @ andreealodba\n* Maria ( Aida Ioana ) : @ cojocariu.aida\n* Popa Vasile ( Vasile Panțiru ) : @ parintele3chestii\n* Dascălul ( Claudiu Dobriță ) : @ iasispala_ch3stii\n* Ion ( Burțilă Bogdan ) : @ bogdan.burtila\n* Viorel ( Marius Grăunte ) : @ mariusabby.3chestii\n\n✅ Grupul Moldovenii CLICK : http://bit.ly/2Yvv8eM​​​\n✅ Shop 3Chestii → https://www.3chestii.ro\n✅ Facebook 3Chestii → http://bit.ly/2pSbUyj​​​\n* Grupul Familia3Chestii : https://bit.ly/2PjhAht​​​\n* Canal de Gaming → http://bit.ly/2pTOn2I​​​\n\nClipuri similare:\nFEMEIA MEA ARE AMANT\nMitică feat. Aurica - FERRARI | Official Video\nAurica la Survivor 🏆\nConcediu În Sat \nVACCIN ÎN SAT \nMITICĂ MAI ARE 3 ZILE DE TRĂIT \nMitică (3Chestii) - LAILA feat. Alexander Maxim | Official Video\nMitică și Afacerea cu Struguri \nFAST AND FURIOUS ÎN SAT \nSchimb De Roluri În Sat \nTikTok În Sat \nMĂR CU 100 DE LEI \nMitică și Afacerea cu Vin \n\n\n* Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/UKbukZIicDk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/UKbukZIicDk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/UKbukZIicDk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/UKbukZIicDk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/UKbukZIicDk/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: '3 Chestii',
              tags: [
                'Mitica si Aurica',
                'Mitica si Cornel',
                '3chestii',
                '3 chestiik',
                'Mitica hata hata cu Aurica',
                'FEMEIA MEA ARE AMANT',
                'Mitica hata hata',
                'Mitica si afacerea cu vin',
                'Mar cu 100 de lei bautura in stare de alerta',
                'afacere cu net la galeata',
                'mitica si cornel mitica mitica si cornel',
                '3 chestii trei chestii 3chestii',
                '3chestii nea mitica milionar',
                'am caruta am căruță 3chestii am caruta',
                'aplicatia esx',
                'ESX',
                'sală de fitnnes',
                'sală de fitness in sat',
                'muschi',
                'forta',
              ],
              categoryId: '23',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Sală de Fitness în Sat #3Chestii',
                description:
                  '🌟 Aplicația ESX o găsiți pe Apple Store și Magazin Play\n🌟 Dacă vrei să mergi la sală, cu abonamentul de pe https://www.esx.ro poți merge la 370+ de săli din România.\n📀 Pentru colaborări și promovări, așteptăm mesajele voastre aici: marketing@3chestii.ro\n► Ne găsești pe Instagram - @3Chestii: https://bit.ly/insta3chestii\n\n🌟 Echipă tehnic:\nRegia și editare-montare video: Gongeanu Petronel\nScenariul: Echipa 3Chestii\nCameraman : Edy Eduard https://www.facebook.com/napsteredy \n\n► Alătură-te acestui canal pentru a primi acces la beneficii: https://www.youtube.com/channel/UCY7eOLk0wEDgfK_yGG7zAgg\n\n🌟 PERSONAJELE DIN VIDEO/CONTURI INSTAGRAM:\n* Păduraru Mitică ( Gongeanu Petronel ) :  @ gongeanupetronel\n* Cornel ( Iulian Mehedinț ) : @ iulian3chestii\n* Aurica ( Andreea Lodbă ) : @ andreealodba\n* Maria ( Aida Ioana ) : @ cojocariu.aida\n* Popa Vasile ( Vasile Panțiru ) : @ parintele3chestii\n* Dascălul ( Claudiu Dobriță ) : @ iasispala_ch3stii\n* Ion ( Burțilă Bogdan ) : @ bogdan.burtila\n* Viorel ( Marius Grăunte ) : @ mariusabby.3chestii\n\n✅ Grupul Moldovenii CLICK : http://bit.ly/2Yvv8eM​​​\n✅ Shop 3Chestii → https://www.3chestii.ro\n✅ Facebook 3Chestii → http://bit.ly/2pSbUyj​​​\n* Grupul Familia3Chestii : https://bit.ly/2PjhAht​​​\n* Canal de Gaming → http://bit.ly/2pTOn2I​​​\n\nClipuri similare:\nFEMEIA MEA ARE AMANT\nMitică feat. Aurica - FERRARI | Official Video\nAurica la Survivor 🏆\nConcediu În Sat \nVACCIN ÎN SAT \nMITICĂ MAI ARE 3 ZILE DE TRĂIT \nMitică (3Chestii) - LAILA feat. Alexander Maxim | Official Video\nMitică și Afacerea cu Struguri \nFAST AND FURIOUS ÎN SAT \nSchimb De Roluri În Sat \nTikTok În Sat \nMĂR CU 100 DE LEI \nMitică și Afacerea cu Vin \n\n\n* Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand.',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT8M19S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '313574',
              likeCount: '20626',
              favoriteCount: '0',
              commentCount: '865',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'w8pzendP1llF8cVX2LSIBq1K1nE',
            id: 'l66QOgRYYyU',
            snippet: {
              publishedAt: '2022-03-18T10:00:33Z',
              channelId: 'UC_iJRimysEIAv1KidVQJQ-A',
              title: 'Andia - Aer | Official Audio',
              description:
                "Subscribe 💋 Andia Official YT channel: http://hyperurl.co/AndiaYT\n\nStream & Download: https://bfan.link/aer \n\nBooking Andia - livia@atom.ro\n\nMusic: Alex Pelin, Vlad Lucan\nText: Alex Pelin\nProduced by Vlad Lucan\n\nFollow Andia: \nSpotify, Apple Music, YouTube Music, Deezer - https://lnkfi.re/Andia\nFacebook: https://www.facebook.com/AndiaOficial/\nInstagram: https://www.instagram.com/andia.oficial/\nTik Tok: https://www.tiktok.com/@andia.oficial... \n\nFollow ATOM:\nInstagram: https://www.instagram.com/ATOM/\nFollow 'Hot Hits Romania' playlist on Spotify - https://lnkfi.re/HotHitsRomania\n\n(C) & (P) 2022 ATOM \n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#ANDIA #ATOM",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/l66QOgRYYyU/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/l66QOgRYYyU/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/l66QOgRYYyU/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'ANDIA',
              tags: [
                'andia',
                'aer',
                'album',
                'newalbum',
                'album2022',
                'muzica',
                'muzicanoua',
                'muzica2022',
                'hit',
                'hit2022',
                'single',
                'newsingle',
                'hotmusic',
                'hothit',
                'music',
                'love',
                'pietrepretioase',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Andia - Aer | Official Audio',
                description:
                  "Subscribe 💋 Andia Official YT channel: http://hyperurl.co/AndiaYT\n\nStream & Download: https://bfan.link/aer \n\nBooking Andia - livia@atom.ro\n\nMusic: Alex Pelin, Vlad Lucan\nText: Alex Pelin\nProduced by Vlad Lucan\n\nFollow Andia: \nSpotify, Apple Music, YouTube Music, Deezer - https://lnkfi.re/Andia\nFacebook: https://www.facebook.com/AndiaOficial/\nInstagram: https://www.instagram.com/andia.oficial/\nTik Tok: https://www.tiktok.com/@andia.oficial... \n\nFollow ATOM:\nInstagram: https://www.instagram.com/ATOM/\nFollow 'Hot Hits Romania' playlist on Spotify - https://lnkfi.re/HotHitsRomania\n\n(C) & (P) 2022 ATOM \n\nToate drepturile sunt rezervate. Orice upload neautorizat al acestui videoclip este ilegal si poate fi raportat oricand la Youtube. \n\nAll rights reserved. Unauthorized reproduction is a violation of applicable laws. In order to avoid copyright infringement, please do not upload this video on your channel.\n\n#ANDIA #ATOM",
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M35S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '267817',
              likeCount: '6381',
              favoriteCount: '0',
              commentCount: '171',
            },
          },
          {
            kind: 'youtube#video',
            etag: '9qBygoiDl1s1yOHTSOfSEf2f3As',
            id: 'm6qBXMOsY8o',
            snippet: {
              publishedAt: '2022-03-20T20:39:25Z',
              channelId: 'UCNz5n8PoSGYSwkOH_SMnl2A',
              title:
                'RĂZBOIUL DIN UCRAINA. CÂND ȘI CUM SE TERMINĂ? - Mircea Geoană - #IGDLCC E0133',
              description:
                '#RUSIA #NATO #UCRAINA\n\nVezi aici interviul din decembrie 2021 - NATO, RUSIA ȘI VIITORUL ROMÂNIEI? - MIRCEA GEOANĂ - #PODCAST #IGDLCC #SPECIAL E126 - https://youtu.be/-QXsB9AWevM\n\nHai pe Canalul Nostru de Telegram: https://t.me/s/buhnici\nÎnscrie-te aici ca să afli când lansăm Gadget Boutique! #tothemoon: https://gb.ro/\nStochează-ți crypto pe un portofel sigur (Cold Wallet): https://shop.ledger.com?r=6efa215e28aa\n\nFolosește acest link când te înscrii pe Crypto.com și primești 50 dolari bonus. La fel și eu! : https://crypto.com/app/gbuhnici\n\nVrei cel mai rapid website? Aruncă o privire pe https://kemo.ro/\n\nTrimite SMS la 8864 cu textul SPERANTA. O tabletă pentru fiecare copil. Donează 4 euro pe lună și oferă-le o șansă la educație. Donează aici - https://worldvision.ro/\n\nDevino membru în comunitatea noastră și susține-ne - https://www.youtube.com/channel/UCNz5n8PoSGYSwkOH_SMnl2A/join\n\nUrmărește-mă cu @gbuhnici pe Instagram, Facebook, Twitter, TikTok\n\nProducție: Radu Neagu - @radu.neagu pe Instagram\nMontaj: Daniel Ivan - @danielivanm1 pe Instagram\nIlustrație: Laurențiu Dumitrescu - @laur3ntiud pe Instagram',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/m6qBXMOsY8o/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/m6qBXMOsY8o/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/m6qBXMOsY8o/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'George Buhnici',
              tags: [
                'buhnici',
                'vlog',
                'test',
                'unboxing',
                'review',
                'video',
                'gadget',
                'smartphone',
                'podcast',
                'igdlcc',
                'mircea geoana',
                'razboi rusia',
                'rusia ucraina',
                'ukraine',
                'razboi',
                'nuclear',
                'nato',
                'micrea goeana',
                'presedinte',
                'putin',
                'vladimir putin',
                'realitate',
                'razboi podcast',
                'igdlcc razboi',
              ],
              categoryId: '28',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'RĂZBOIUL DIN UCRAINA. CÂND ȘI CUM SE TERMINĂ? - Mircea Geoană - #IGDLCC E0133',
                description:
                  '#RUSIA #NATO #UCRAINA\n\nVezi aici interviul din decembrie 2021 - NATO, RUSIA ȘI VIITORUL ROMÂNIEI? - MIRCEA GEOANĂ - #PODCAST #IGDLCC #SPECIAL E126 - https://youtu.be/-QXsB9AWevM\n\nHai pe Canalul Nostru de Telegram: https://t.me/s/buhnici\nÎnscrie-te aici ca să afli când lansăm Gadget Boutique! #tothemoon: https://gb.ro/\nStochează-ți crypto pe un portofel sigur (Cold Wallet): https://shop.ledger.com?r=6efa215e28aa\n\nFolosește acest link când te înscrii pe Crypto.com și primești 50 dolari bonus. La fel și eu! : https://crypto.com/app/gbuhnici\n\nVrei cel mai rapid website? Aruncă o privire pe https://kemo.ro/\n\nTrimite SMS la 8864 cu textul SPERANTA. O tabletă pentru fiecare copil. Donează 4 euro pe lună și oferă-le o șansă la educație. Donează aici - https://worldvision.ro/\n\nDevino membru în comunitatea noastră și susține-ne - https://www.youtube.com/channel/UCNz5n8PoSGYSwkOH_SMnl2A/join\n\nUrmărește-mă cu @gbuhnici pe Instagram, Facebook, Twitter, TikTok\n\nProducție: Radu Neagu - @radu.neagu pe Instagram\nMontaj: Daniel Ivan - @danielivanm1 pe Instagram\nIlustrație: Laurențiu Dumitrescu - @laur3ntiud pe Instagram',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT2H12M45S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '169825',
              likeCount: '8276',
              favoriteCount: '0',
              commentCount: '544',
            },
          },
          {
            kind: 'youtube#video',
            etag: 'oLDQ8u7SCcRevC6MoE7_A5hbDG4',
            id: '3V-vtQgioBw',
            snippet: {
              publishedAt: '2022-03-11T11:00:13Z',
              channelId: 'UCee2SkhsAu_HDGbZ4NFQ_jA',
              title: 'Florin Cercel - Cel mai mare necaz | Official Video',
              description:
                'Abonați-vă la canalul meu pentru mai multe noutăți\nPentru contactarea solistului sunati la +40735537444\nToate drepturile rezervate © & ® Florin Cercel\n\n►Facebook : https://www.facebook.com/OficialFlorinCercel\n►Instagram : https://www.instagram.com/florincercelmusic\n\n♫ iTunes ► https://apple.co/2YUsVf8\n♫ Spotify ► https://spoti.fi/2YUsDVA\n♫ Deezer ► https://bit.ly/3fGsLO7\n♫ Amazon ►https://amzn.to/2Wkt7T3 \n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#FlorinCercel',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/3V-vtQgioBw/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/3V-vtQgioBw/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/3V-vtQgioBw/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'FLORIN CERCEL',
              categoryId: '10',
              liveBroadcastContent: 'none',
              localized: {
                title: 'Florin Cercel - Cel mai mare necaz | Official Video',
                description:
                  'Abonați-vă la canalul meu pentru mai multe noutăți\nPentru contactarea solistului sunati la +40735537444\nToate drepturile rezervate © & ® Florin Cercel\n\n►Facebook : https://www.facebook.com/OficialFlorinCercel\n►Instagram : https://www.instagram.com/florincercelmusic\n\n♫ iTunes ► https://apple.co/2YUsVf8\n♫ Spotify ► https://spoti.fi/2YUsDVA\n♫ Deezer ► https://bit.ly/3fGsLO7\n♫ Amazon ►https://amzn.to/2Wkt7T3 \n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#FlorinCercel',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT7M28S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '915101',
              likeCount: '21527',
              favoriteCount: '0',
              commentCount: '1042',
            },
          },
        ],
        nextPageToken: 'CBkQAA',
        pageInfo: {
          totalResults: 200,
          resultsPerPage: 25,
        },
      };
    } catch {
      return this.defaultFeedObject;
    }
  }

  async relatedVideos(query: string) {
    console.log('>>>>>>>>>>>> RELATED');
    try {
      // const res = await this.http
      //   .get(
      //     `${this.url}search?part=snippet&relatedToVideoId=${query}&maxResults=${this.globals.numRelatedRes}&type=video&key=${this.globals.apiKey}`
      //   )
      //   .pipe(map((response) => response))
      //   .toPromise();
      // return res;
      return {
        kind: 'youtube#searchListResponse',
        etag: 'IEW8OD64nsnwUvt5QkhLhl_RdFw',
        nextPageToken: 'CA8QAA',
        regionCode: 'RO',
        pageInfo: {
          totalResults: 164,
          resultsPerPage: 15,
        },
        items: [
          {
            kind: 'youtube#searchResult',
            etag: 'qc28UeDpweXveRp3kpJM8G33-dU',
            id: {
              kind: 'youtube#video',
              videoId: 'oT0iFLeSdxE',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'uIqWi2bOgHhpXLXfeKS4qjz1KGg',
            id: {
              kind: 'youtube#video',
              videoId: '1qN0sK2Vwk0',
            },
            snippet: {
              publishedAt: '2022-02-14T18:09:18Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu 🤮 Cerșetorie | Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica & Text : Dani Mocanu\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #Cersetorie #TikTok',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/1qN0sK2Vwk0/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/1qN0sK2Vwk0/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/1qN0sK2Vwk0/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/1qN0sK2Vwk0/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/1qN0sK2Vwk0/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2022-02-14T18:09:18Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'P1oUROMGUzhb1EB9iGUBMFzijo4',
            id: {
              kind: 'youtube#video',
              videoId: 'NJPpkKpTH0c',
            },
            snippet: {
              publishedAt: '2021-10-15T09:41:32Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu - Stop la regine | Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica & Text : Dani Mocanu\nStudio : Yaya Production \nVideo : Gaby Jianu \nStyle : Adrian Pescariu\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/NJPpkKpTH0c/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/NJPpkKpTH0c/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/NJPpkKpTH0c/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/NJPpkKpTH0c/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/NJPpkKpTH0c/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-10-15T09:41:32Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'IZuQ2ADbEvndf_bptb4JWilj11Q',
            id: {
              kind: 'youtube#video',
              videoId: '090yxyz3ZOs',
            },
            snippet: {
              publishedAt: '2022-03-22T20:04:35Z',
              channelId: 'UC11rDOK7__082YPZt0wftoA',
              title:
                '🇷🇴Costi❎Vladuta Lupau❎Vali Vijelie❎Baboiash❎Nicu Paleru❎Liviu Pustiu❎Paul Stanga❎Jador-RomaniaMare',
              description:
                '🔥🔥🔥 #ROMANIAMARE 🇷🇴 by Costi ❎ Vladuta Lupau ❎ Vali Vijelie ❎ Baboiash ❎ Nicu Paleru ❎ Liviu Pustiu ❎ Paul Stanga ❎ Jador\n\n\nFacebook: https://www.facebook.com/DrCosti.TheProducer\nInstagram: https://www.instagram.com/costiofficial/\nWebsite: http://www.costi.ro\n\nFollow  @Vladuta Lupau  \nFacebook: https://www.facebook.com/vladutalupau/\nInstagram: https://www.instagram.com/vladutalupau/\nYouTube: https://bit.ly/2TYaZhn\nTikTok: https://www.tiktok.com/@vladutal\nTwiter: https://twitter.com/VladutaLupau/\n\nFollow  @Vali Vijelie  \nFacebook: https://www.facebook.com/ValiVijelieOfficial\n\nFollow  @Florin Baboi  #Baboiash\nFacebook: https://www.facebook.com/FlorinBaboiOficial/\nInstagram: https://www.instagram.com/baboiash/\n\nFollow #NicuPaleru\nFacebook: https://www.facebook.com/NicuPaleruOfficial\nhttps://www.facebook.com/paleru.nicu\nSite: http://www.nicupaleru.ro/\n\nFollow  @Liviu Pustiu  \nFacebook: https://www.facebook.com/LiviuPustiuOficial\n\nFollow  @Paul Stângă Oficial  \nFacebook: https://ro-ro.facebook.com/paulstanga10/\nInstagram: https://www.instagram.com/paulstanga/\n\nFollow  @Jador  \nFacebook: https://www.facebook.com/JADORadevarat\nInstagram: https://www.instagram.com/jador_adevarat\n\n\nMuzica : Costi\nVersuri : Baboiash\n\n(P)&(C) Cat Music / Doctor Music',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/090yxyz3ZOs/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/090yxyz3ZOs/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/090yxyz3ZOs/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Fortza Generation',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-22T20:04:35Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '_Q532FVWe25GGP89fLWRksTsrKg',
            id: {
              kind: 'youtube#video',
              videoId: 'X1W6UtdkzHA',
            },
            snippet: {
              publishedAt: '2022-03-23T08:52:29Z',
              channelId: 'UCzoOZ5uZAkyJHfP4TqdmN5w',
              title:
                'Miraj Tzunami - Sa vina banii gramada [Videoclip Oficial] 2022',
              description:
                '#ManeleFaraEgal #MirajTzunami\n---\nManele Fara Egal este locul in care gasesti cele mai noi manele si videoclipuri muzicale ale artistilor tai preferati.\n\nVa prezentam cea mai noua muzica de la artisti precum Nicolae Guta, Narcisa, Blondu de la Timisoara, Florin Salam, Babi Minune, Sorina Ceugea, Tzanca Uraganu, Cristi Dules, Liviu Pustiu, Laura, Culita Sterp, Carmen de la Salciua, Vali Vijelie, Ticy, Petruta, Adrian Minune, Alessio, Edy Talent, Liviu Guta si multi altii!',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/X1W6UtdkzHA/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/X1W6UtdkzHA/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/X1W6UtdkzHA/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Manele Fara Egal',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-23T08:52:29Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'tkQyxkNneIFN12-_b7CAGGKPEh8',
            id: {
              kind: 'youtube#video',
              videoId: 'mJ6AFWhhZkY',
            },
            snippet: {
              publishedAt: '2021-11-30T17:31:18Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu - Nani nani puiul meu | Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica & Text : Dani Mocanu\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #RegeleVizualizarilor #VoceaInterlopilor',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/mJ6AFWhhZkY/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/mJ6AFWhhZkY/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/mJ6AFWhhZkY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/mJ6AFWhhZkY/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/mJ6AFWhhZkY/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-11-30T17:31:18Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'xm9bIlUENOCMsqGnpAKUrYEN60U',
            id: {
              kind: 'youtube#video',
              videoId: 'ow4BWOvBVEM',
            },
            snippet: {
              publishedAt: '2021-11-26T16:17:12Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title:
                'Dani Mocanu  - Vulturul si Porumbeii  | special guest @Marius Csampar | Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica & Text : Dani Mocanu\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nMuzica & Text : Dani Mocanu\nOrchestratie : Yaya Production\nVideo : Gaby Jianu\nStyling : Adrian Pescariu\n\nMarius Champar :\nhttps://www.youtube.com/channel/UCZylFPnErVKnfP5Gn_14sqg\n\nStyling :\nhttps://www.instagram.com/adrian.pescariu.official/\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #RegeleVizualizarilor #VoceaInterlopilor',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/ow4BWOvBVEM/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/ow4BWOvBVEM/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/ow4BWOvBVEM/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/ow4BWOvBVEM/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/ow4BWOvBVEM/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-11-26T16:17:12Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'paSaOEVRf0vB29uRlAFusOXbsEQ',
            id: {
              kind: 'youtube#video',
              videoId: 'iKkjlmhCrbU',
            },
            snippet: {
              publishedAt: '2021-12-27T17:35:50Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu - Nimeni Domnul Meu | Official Audio',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica & Text : Dani Mocanu\nImagine :  @KLU Video Studio \nOrchestratie : Claudiu Toma \nVersuri :\n\nStrofa 1\nDinainte sa ma nasc tu aveai un plan cu mine\nDinainte sa ma nasc ma strigai deja pe nume\nM-ai tinut la adapost de probleme m-ai ferit\nSi cu aripile tale m-ai acoperit\n\nRefren\nNimeni Domnul Meu nu e ca tine\nPe calea ta ma simt atat de bine\nSi sfarsitul lumii de-ar veni\nBratul tau puternic ma va ocroti\n\nStrofa 2 :\nIn toate ziele mele m-ai ferit de vreme rea\nTu ai poruncit furtunii sa plece din calea mea\nValurile uriase care m-au amenintat\nIntr-un rau pana la  glezne tu l-ai transformat\n\nRefren\nNimeni Domnul Meu nu e ca tine\nPe calea ta ma simt atat de bine\nSi sfarsitul lumii de-ar veni\nBratul tau puternic ma va ocroti\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #NimeniDomnulMeu',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/iKkjlmhCrbU/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/iKkjlmhCrbU/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/iKkjlmhCrbU/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/iKkjlmhCrbU/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/iKkjlmhCrbU/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-12-27T17:35:50Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'aTiTQlCD8P00Hcq8h_YWTO4YCrM',
            id: {
              kind: 'youtube#video',
              videoId: 'Aze5y4S2wFM',
            },
            snippet: {
              publishedAt: '2022-03-23T09:07:26Z',
              channelId: 'UCuMj5RiqBhThj8R5XqFILwg',
              title: 'Leo de la Kuweit - Hai sa vedem [Official Video] 2022',
              description:
                "Videoclipul oficial al piesei ''Ce iubire'' interpretata de  #LeoDeLaKuweit (C) & (P) 2022 Big Man Romania\n\n▶️ Abonați-vă aici: https://www.youtube.com/c/BigManAudioSRL?sub_confirmation=1\n✅ Apăsați clopoțelul (🔔) pentru a afla primii când apar piese noi!\n© & (P) BIG MAN Romania https://www.bigmanromania.ro\n\n🔥 Big Man Online:\n➜ Facebook: http://www.facebook.com/bigman.ro\n➜ Instagram: https://www.instagram.com/bigmanromania/\n➜ TikTok: https://www.tiktok.com/@bigmanromania\n➜ YouTube: https://www.youtube.com/channel/UCuMj5RiqBhThj8R5XqFILwg/ \n\nCanal oficial al casei de discuri BIG MAN Romania - dedicat materialelor din categoria manele, folclor, etno, petrecere.\nToate drepturile asupra materialelor incarcate revin SC BIG MAN IMPEX SRL si/sau a partenerilor sai.\n\nAI O FILMARE SI VREI SA O FACI CUNOSCUTA? VREI SA O FACI O PIESA CUNOSCUTA? CONTACTEAZA-NE!\n\n Licensing/Contact/Booking/Marketing:\n- audio @ big-man.ro\n- (+40) 0729.918.359\n\nLyrics:\n---",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Aze5y4S2wFM/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Aze5y4S2wFM/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Aze5y4S2wFM/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Big Man Romania',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-23T09:07:26Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '-VhJHdQfeujPfVLOaeeMFSA1e_8',
            id: {
              kind: 'youtube#video',
              videoId: 'TqqO0R6DCSA',
            },
            snippet: {
              publishedAt: '2021-12-25T12:22:15Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu - Latura | Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nMuzica și text / Dani Mocanu \nOrchestrație / Claudiu Toma \nVideo / Gaby Jianu \nStyling / Adrian Pescariu \n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #RegeleVizualizarilor #Latura',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/TqqO0R6DCSA/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/TqqO0R6DCSA/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/TqqO0R6DCSA/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/TqqO0R6DCSA/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/TqqO0R6DCSA/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-12-25T12:22:15Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'A2VrIUftgDQEwionVHRLlKYd8Lc',
            id: {
              kind: 'youtube#video',
              videoId: '_lsHd6_ZrT8',
            },
            snippet: {
              publishedAt: '2021-12-15T17:37:54Z',
              channelId: 'UCGc991mofGxjO3-haaRENDg',
              title: 'Dani Mocanu 🚁 Ronaldo ⚽️ Official Video',
              description:
                'Abonați-vă http://www.youtube.com/danimocanuoficial\nToate drepturile rezervate artistului © & ® Dani Mocanu\nBooking & Licensing ► contact@danimocanu.net\n\nDani Mocanu Online :\nFB personal ► https://www.facebook.com/danielmocanuofficial\nFB page ► https://www.facebook.com/DanielMocanuOficial\nInstagram ► https://www.instagram.com/danimocanu.oficial\nTiktok ► https://vm.tiktok.com/p7uatJ/ @danimocanu10\n\nStream ♫ Download :\n♫ Spotify ► https://spoti.fi/3kG2hy7\n♫ iTunes ►https://apple.co/32WDWhp\n♫ Deezer ► https://bit.ly/32XEJia\n\nMuzica & Text - Dani Mocanu\nVideo - Gaby Jianu \nOrchestrație - Andreias Mihai\nStyling - Adrian Pescariu \nStudio - Yaya Production \n \nCanal secundar Youtube :\nDani Mocanu VLOG ► https://goo.gl/AjmB7q\n\n📞+40744.998.355 ☎️ Atentie ! La acest numar raspunde numai managerul\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\n\n#DaniMocanu #Ronaldo #RegeleVizualizarilor',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/_lsHd6_ZrT8/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/_lsHd6_ZrT8/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/_lsHd6_ZrT8/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/_lsHd6_ZrT8/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/_lsHd6_ZrT8/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Dani Mocanu © Oficial',
              liveBroadcastContent: 'none',
              publishTime: '2021-12-15T17:37:54Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '09DHaMqqcjIfcYsWeo9oHaiOEmg',
            id: {
              kind: 'youtube#video',
              videoId: 'Vh1hLv-V7qk',
            },
            snippet: {
              publishedAt: '2022-03-12T23:29:25Z',
              channelId: 'UCw9eimfO0OBj2K2NVU69bUA',
              title:
                'Tzanca Uraganu - Cand intru eu in Ucraina [HIT 2022]💣 Manele noi',
              description:
                '00:00 Tzanca Uraganu - Cand intru eu in Ucraina\n02:51 Tzanca Uraganu - Banii\n06:10 Iuly Neamtu - Formula 1\n08:18 Costel Biju - Amantul tau fidel\n11:27 Nikolas - Prin Bucuresti\n14:25 Georgiana Lobont - Asa sunt femeile\n🖤 Like / Subscribe Pentru Mai Multe Melodii Noi 🖤',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Vh1hLv-V7qk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Vh1hLv-V7qk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Vh1hLv-V7qk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/Vh1hLv-V7qk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/Vh1hLv-V7qk/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Infinit Media',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-12T23:29:25Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'N4N4XjCAgSz2hqy655fmTs8pze4',
            id: {
              kind: 'youtube#video',
              videoId: 'jhlVZZxEx7w',
            },
            snippet: {
              publishedAt: '2022-03-11T10:04:05Z',
              channelId: 'UCuMj5RiqBhThj8R5XqFILwg',
              title:
                'Costel Biju - Te pot iubi mai mult decât se iubesc bogatii 💕 [Official Video] 2022',
              description:
                "Videoclipul oficial al piesei ''e pot iubi mai mult decât se iubesc bogatii'' interpretata de @Costel Biju  (C) & (P) 2022 Big Man Romania\n\nMuzica si Text: Florin Purice - La Fabrika\nOrhestratie: Mihai Mimi Jr.\n\n▶️ Abonați-vă aici: https://www.youtube.com/c/BigManAudioSRL?sub_confirmation=1\n✅ Apăsați clopoțelul (🔔) pentru a afla primii când apar piese noi!\n© & (P) BIG MAN Romania https://www.bigmanromania.ro\n\n🔥 Big Man Online:\n➜ Facebook: http://www.facebook.com/bigman.ro\n➜ Instagram: https://www.instagram.com/bigmanromania/\n➜ TikTok: https://www.tiktok.com/@bigmanromania\n➜ YouTube: https://www.youtube.com/channel/UCuMj5RiqBhThj8R5XqFILwg/ \n\n🔥 Follow Costel Biju:\n➜ Facebook: https://www.facebook.com/costel.biju.5\n➜ TikTok: https://www.tiktok.com/@costelbijuoficial?\n➜ YouTube: https://www.youtube.com/channel/UCFtdzqCfErQgwe25aW3gFMQ\n\nCanal oficial al casei de discuri BIG MAN Romania - dedicat materialelor din categoria manele, folclor, etno, petrecere.\nToate drepturile asupra materialelor incarcate revin SC BIG MAN IMPEX SRL si/sau a partenerilor sai.\n\nAI O FILMARE SI VREI SA O FACI CUNOSCUTA? VREI SA O FACI O PIESA CUNOSCUTA? CONTACTEAZA-NE!\n\n Licensing/Contact/Booking/Marketing:\n- audio @ big-man.ro\n- (+40) 0729.918.359\n\nLyrics:\n---",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/jhlVZZxEx7w/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/jhlVZZxEx7w/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/jhlVZZxEx7w/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/jhlVZZxEx7w/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/jhlVZZxEx7w/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Big Man Romania',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-11T10:04:05Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'rKH3Rb4PZ06SEyx-Yu4uYHjpSpU',
            id: {
              kind: 'youtube#video',
              videoId: 'EOwxqb0662k',
            },
            snippet: {
              publishedAt: '2022-03-22T18:57:40Z',
              channelId: 'UCnntwTsLBqiDhvBP3VO4hNw',
              title: 'LeLe x Ork Regalii - Mana stanga sus (Live 2022)',
              description:
                'Pentru dedicatii&evenimente apelati: 0748 572 124\nLeLe x Ork Regalii - Mana stanga sus\n\nHashtags: #LeLe #CopiluSound #manastangasus\n\nToate drepturile rezervate: © Copilu Sound\nOrice repostare va fi raportata si eliminata de pe YouTube.',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/EOwxqb0662k/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/EOwxqb0662k/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/EOwxqb0662k/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/EOwxqb0662k/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/EOwxqb0662k/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Copilu Sound',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-22T18:57:40Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '0Tw3UkUsQJZN2rEzuCv5gF72GRY',
            id: {
              kind: 'youtube#video',
              videoId: 'mev5LTgOJLs',
            },
            snippet: {
              publishedAt: '2022-03-10T17:41:40Z',
              channelId: 'UCCRnbmMXoieYBq0ZgDz2JOA',
              title: 'Narcisa - Crize de gelozie | Official Video',
              description:
                "Videoclipul oficial al piesei ''Doar o proasta ca mine'' interpretata de @Narcisa Oficial Music \nToate drepturile rezervate  © & ® Klu Music Video SRL 2022 \nApăsați clopoțelul 🔔 Abonați-vă ► http://www.youtube.com/c/KLUMusicTv\n\n🎹 Orchestratie : PepsyPerfektMusic\n✒️ Text : Alex Nacu\n🎥 Imagine : Madalin Lungu\n\nFollow 🔥 Klu Music Video\nFacebook ► https://www.facebook.com/KluMusicVideo.net\nInstagram ►https://www.instagram.com/klumusicvideo.ro\nTiktok ► https://vm.tiktok.com/G3gnXg\n\nFollow 🔥 Narcisa\nFacebook ► https://www.facebook.com/narcisaraluca.moisa\nInstagram ► https://www.instagram.com/narcisaoficialmusic/\nTiktok ► https://www.tiktok.com/@narcisaoficialmusic\n\nNu copia sau reposta pe alte canale , adaugă la favorite !\nToate drepturile rezervate  © & ® Klu Music Video ™\nBooking & Licensing ► contact@klumusicvideo.ro \n\n #Narcisa #KluMusicVideo #ManeleKLU",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/mev5LTgOJLs/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/mev5LTgOJLs/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/mev5LTgOJLs/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/mev5LTgOJLs/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/mev5LTgOJLs/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'KLU Music Tv',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-10T17:41:40Z',
            },
          },
        ],
      };
    } catch {
      return this.defaultObject;
    }
  }

  async searchVideo(query: string) {
    try {
      // const res = await this.http
      //   .get(
      //     `${this.url}search?part=snippet&q=${query}&maxResults=${this.globals.numRelatedRes}&type=video&regionCode=${this.globals.regionCode}&key=${this.globals.apiKey}`
      //   )
      //   .pipe(map((response) => response))
      //   .toPromise();
      console.log('>>>>>>>>>>> SEARCH');
      return {
        kind: 'youtube#searchListResponse',
        etag: '_aqDqnsuajNDd9pwL4vN_64AK54',
        nextPageToken: 'CA8QAA',
        regionCode: 'RO',
        pageInfo: {
          totalResults: 130,
          resultsPerPage: 15,
        },
        items: [
          {
            kind: 'youtube#searchResult',
            etag: '4L3TBTvrXAmKmZED_S0OnkSR1cU',
            id: {
              kind: 'youtube#video',
              videoId: '1K-8kwKhOF4',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'jZUU7RskeDQbwZ4XnIzrwLLn-OE',
            id: {
              kind: 'youtube#video',
              videoId: 'jrVmGew1ztk',
            },
            snippet: {
              publishedAt: '2020-09-14T23:08:35Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: "What's In My Bag",
              description:
                'It’s been almost two years since I did my last “What’s In My Bag” video and I’ve seen you guys requesting this video for a while, so I wanted to take you guys inside my closet to show you the must haves I take everywhere with me!',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/jrVmGew1ztk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/jrVmGew1ztk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/jrVmGew1ztk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/jrVmGew1ztk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-09-14T23:08:35Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'P7hlxXY1x29n_hMU7oUXet_P8-8',
            id: {
              kind: 'youtube#video',
              videoId: 'bEfPr4kDUak',
            },
            snippet: {
              publishedAt: '2021-03-17T18:08:26Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'DRUNK GET READY WITH ME: KYLIE AND KENDALL',
              description:
                'Kendall and I decided to film a drunk get ready with me!  Watch as we take shots of 818 and create these beautiful looks using all Kylie Cosmetics 😉',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/bEfPr4kDUak/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/bEfPr4kDUak/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/bEfPr4kDUak/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/bEfPr4kDUak/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/bEfPr4kDUak/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2021-03-17T18:08:26Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '_0TyaKR7GLqA8SRwGD88HJSOJfE',
            id: {
              kind: 'youtube#video',
              videoId: 'tmJe-ty_jpk',
            },
            snippet: {
              publishedAt: '2020-10-05T18:33:31Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Kylie Jenner: Halloween Cookies with Stormi',
              description:
                'Stormi and I are making cookies for Halloween, one of my favorite holidays of the year! Wishing everyone a Happy Halloween!',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/tmJe-ty_jpk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/tmJe-ty_jpk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/tmJe-ty_jpk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/tmJe-ty_jpk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-10-05T18:33:31Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'WAZzqqBtEkhjVkLOooM1w12pqys',
            id: {
              kind: 'youtube#video',
              videoId: 'l_IZbsnstZY',
            },
            snippet: {
              publishedAt: '2021-07-09T04:23:44Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'INSIDE KYLIE COSMETICS PART ONE: THE BEGINNING',
              description:
                "I'm taking you inside the world of Kylie Cosmetics to celebrate the relaunch of my brand. In Part One of my three-part series we're taking it back to where it all started... from Lip Kits to Kylie Cosmetics! \n\nPart 2 coming soon... \n\nThe new Kylie Cosmetics launches July 15 at 9am PST on http://KylieCosmetics.com...\n\nDIRECTOR & EXECUTIVE PRODUCER\nMichael D. Ratner\n\nPRODUCTION COMPANY:\nOBB Pictures\n\nEXECUTIVE PRODUCERS:\nKylie Jenner\nKris Jenner\n\nScott Ratner\nKfir Goldberg\nRaquel Dominguez\n\nArlen Konopaki\nAndy Mininger\n\nTEAM:\nKylie Jenner\nKris Jenner\nJen Cohan - Chief Brand Officer\nMegan Mildrew - Chief Commercial Officer \n\nCODE: SIUXMUA96EMS8SH5",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/l_IZbsnstZY/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/l_IZbsnstZY/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/l_IZbsnstZY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/l_IZbsnstZY/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2021-07-09T04:23:44Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '7cmM7tIYuIKgnofmWtWavfv72BA',
            id: {
              kind: 'youtube#video',
              videoId: 'YgowuBnkIf8',
            },
            snippet: {
              publishedAt: '2022-03-20T18:18:16Z',
              channelId: 'UC-O9o5coq8iFSVthivq__tw',
              title: 'I BOUGHT THE HOUSE NEXT DOOR TO HIS! not clickbait',
              description:
                'Bought the house a few doors down from Brents...heres how he feels about it. \n\nFRIENDS IN THE VIDEO\n@Brent Rivera \n@Logan Wodzynski \n@Alexa Rivera',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/YgowuBnkIf8/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/YgowuBnkIf8/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/YgowuBnkIf8/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Lexi Hensler',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-20T18:18:16Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'W-pTq7b2YH2rdPF-_MoFF0kC4Ek',
            id: {
              kind: 'youtube#video',
              videoId: 'YDJ66vodqPQ',
            },
            snippet: {
              publishedAt: '2020-10-22T19:24:18Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Rating My Halloween Costumes',
              description:
                "I'm going through my favorite Halloween costumes from previous years and rating them out of 10, and giving you guys a little background behind each one. I love looking back at these looks. Happy Halloween, everyone!",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/YDJ66vodqPQ/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/YDJ66vodqPQ/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/YDJ66vodqPQ/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/YDJ66vodqPQ/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-10-22T19:24:18Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'Zt4Yj3VqgiD9YRTMECgE_oMIVjo',
            id: {
              kind: 'youtube#video',
              videoId: 'k5XukvUA1Nk',
            },
            snippet: {
              publishedAt: '2020-12-26T03:58:06Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Kylie Jenner: Christmas Decorations 2020',
              description:
                'Stormi and I take you on a tour of my Christmas decorations this year. Merry Christmas everyone!',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/k5XukvUA1Nk/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/k5XukvUA1Nk/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/k5XukvUA1Nk/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/k5XukvUA1Nk/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-12-26T03:58:06Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'g-OlHJzfdQQBdy8uHL0rtsHdcxU',
            id: {
              kind: 'youtube#video',
              videoId: 'FEr2s_9jl4M',
            },
            snippet: {
              publishedAt: '2022-03-17T19:03:39Z',
              channelId: 'UCylyoo597NuFFyJS_HwHubQ',
              title:
                "Scott Disick Reacts To Kourtney Kardashian's Pregnancy With Travis Barker",
              description:
                "Scott Disick Reacts To Kourtney Kardashian's Pregnancy With Travis Barker\n\nIt’s official - Kourtney Kardashian and Travis Barker are expanding their family!\n\nKourt and Travis got engaged in October 2021 and the wedding will take place this spring or summer.\n\nThe lovebirds started their wedding preparations months ago - but that’s not the only thing that’s been keeping them busy.\n\nKourtney just revealed she and Travis are actively trying for a baby and of course, all fans want to know is - how did Scott Disick react to the news?\n\nsubscribe for celeb drama: http://youtube.com/channel/UCylyoo597NuFFyJS_HwHubQ?sub_confirmation=1\n\n#scottdisick #kourtneykardashian #travisbarker",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/FEr2s_9jl4M/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/FEr2s_9jl4M/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/FEr2s_9jl4M/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/FEr2s_9jl4M/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'This Happened',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-17T19:03:39Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'deYay4pdRIEL_qKO6Ji-mzOAgsk',
            id: {
              kind: 'youtube#video',
              videoId: 'tOD4fkQiulg',
            },
            snippet: {
              publishedAt: '2020-11-19T15:55:04Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Kylie Jenner: Grinch Cupcakes with Stormi',
              description:
                'In celebration of my KYLIE X GRINCH collection launching today, Stormi and I made Grinch cupcakes! \n\nShop my limited edition Grinch holiday collection at http://kyliecosmetics.com today at 3pm PST',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/tOD4fkQiulg/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/tOD4fkQiulg/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/tOD4fkQiulg/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/tOD4fkQiulg/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/tOD4fkQiulg/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-11-19T15:55:04Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'Fm94wwMThDbTINysOJM5iM-ivIQ',
            id: {
              kind: 'youtube#video',
              videoId: 'uQcd7bqzYAA',
            },
            snippet: {
              publishedAt: '2022-03-23T08:41:46Z',
              channelId: 'UC0rE2qq81of4fojo-KhO5rg',
              title: 'MOST GUTSY ONLINE STUDENT',
              description:
                'Check out Relevel today at: https://relvl.co/q0do\nAb to qualification criteria bhi 700 se 500 ho gaya hai!\n\n\nFOLLOW:\n• Name 1: Insta/Twitter/YT Link\nRohan Joshi: https://www.youtube.com/channel/UCW24Wt4EgHpuktSW6XAnt2g\nNishant Tanwar - https://www.instagram.com/nishanttanwar/\nVishal Dayama - https://www.instagram.com/dayamaged/\nReleveler OP:  https://relvl.co/q0do\n\nCHECK OUT MY OTHER CHANNELS\n• Honestly by Tanmay Bhat: https://www.youtube.com/channel/UCneQdPbDLwZ__ZXP0YVwiag\n• Bot Army Clips: https://www.youtube.com/channel/UCZTA61g-fKb_UeFkkmQD7Dg\n• SuperTeam Podcast: https://www.youtube.com/channel/UCi-pkXLbm7sqXFhV1NBLUfQ\n\n------------------\n\nFOLLOW ME\n• Instagram: https://www.instagram.com/tanmaybhat/\n• Twitter: https://twitter.com/thetanmay\n• LinkedIn: https://in.linkedin.com/in/thetanmay\n\n------------------\n\nAPPS I USE TO INVEST:\n₹ Open your Demat Account at: https://zerodha.com/open-account?c=ZMPTHF\n₹ Buy your favourite stocks at Smallcase: https://link.smallcase.com/discover-smallcases\n₹ Learn and Research stocks on Tickertape: https://ttape.in/getTickertape\u200b\n₹ Get 100 Rs. Free Bitcoin by using Tanmay100 Here:  https://bit.ly/3sGoxeJ\n\n------------------\n\nVideo edited by Varun Prajapati: https://www.youtube.com/c/SkrAch69\nVideo edited by Hitanshu “rAge” Soneji: https://www.youtube.com/channel/UCz9DSRVX1rzS8a5Y3DJVZ_g\nVideo edited by Revant Talekar: https://www.youtube.com/c/RevantTalekar\n\n------------------\n\n#reaction #new #tanmay',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/uQcd7bqzYAA/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/uQcd7bqzYAA/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/uQcd7bqzYAA/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Tanmay Bhat',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-23T08:41:46Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'RGyPvWaGsQEpNOg_-Cqub_1sE3M',
            id: {
              kind: 'youtube#video',
              videoId: '60n0q3HTtHo',
            },
            snippet: {
              publishedAt: '2021-07-12T04:51:30Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title:
                'INSIDE KYLIE COSMETICS PART TWO: DISRUPTING THE BEAUTY INDUSTRY',
              description:
                'In the second part of Inside Kylie Cosmetics, we take a look at how Kylie Cosmetics expanded beyond just Lip Kits and grew into something I always dreamed of.  I also want to give you all a peek into what it’s like working with my mom and how she inspires me and my team every day. Stay tuned for part three, coming soon. \n\nThe new Kylie Cosmetics launches July 15 at 9am PST on kyliecosmetics.com...\n\nDIRECTOR & EXECUTIVE PRODUCER\nMichael D. Ratner\n\nPRODUCTION COMPANY:\nOBB Pictures\n\nEXECUTIVE PRODUCERS\nKylie Jenner\nKris Jenner\n\nScott Ratner\nKfir Goldberg\nRaquel Dominguez\n\nArlen Konopaki\nAndy Mininger\n\nTEAM:\nKylie Jenner\nKris Jenner\nJen Cohan - Chief Brand Officer\nMegan Mildrew - Chief Commercial Officer \n\nCODE: SIUXMUA96EMS8SH5',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/60n0q3HTtHo/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/60n0q3HTtHo/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/60n0q3HTtHo/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/60n0q3HTtHo/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2021-07-12T04:51:30Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'BG8uoMxVD4JEfXYc2OFfLpp9ULU',
            id: {
              kind: 'youtube#video',
              videoId: 'Z_XeyQyheYw',
            },
            snippet: {
              publishedAt: '2020-11-18T20:37:07Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Behind the Scenes of my Kylie X Grinch Shoot',
              description:
                'Come behind the scenes with me at the shoot of my Kylie x Grinch collection for Kylie Cosmetics. Launching this Thursday, November 19 at 3pm PST only on http://KylieCosmetics.com',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/Z_XeyQyheYw/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/Z_XeyQyheYw/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/Z_XeyQyheYw/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/Z_XeyQyheYw/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-11-18T20:37:07Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: 'KtlMSp9-Ence1mpRp1xU2WBhxXA',
            id: {
              kind: 'youtube#video',
              videoId: 'jDOIVbUT0hU',
            },
            snippet: {
              publishedAt: '2022-03-22T23:50:54Z',
              channelId: 'UCJjSDX-jUChzOEyok9XYRJQ',
              title: '8 Women Choose Who He Dates | Versus 1',
              description:
                "Shop Jubilee merch! http://shop.jubileemedia.com Every purchase helps us create your favorite shows - thanks for your support!\n\nFollow us on INSTAGRAM: 👉https://www.instagram.com/jubileemedia/ 👈\nNow you can watch our videos in Spanish! https://bit.ly/Suscribirse_Jubilee_ES\n\nSUBSCRIBE for more! http://bit.ly/SUBSCRIBEjubilee \nBe in a Jubilee video: http://bit.ly/JubileeCasting\n\nEveryone in this video was tested for COVID-19. We will continue to adhere to local guidelines and safety precautions for the health and safety of our cast and crew.\n\n👉 We started a second channel! Behind the scenes, director commentaries, reaction videos, and more! Check it out & subscribe to Twobilee: https://www.youtube.com/channel/UChaokX58PemxqTI3KjscjPw\n\nAre you a loyal Jubilee fan? Join our Facebook group: https://www.facebook.com/groups/407942859721012/\n\nSupport Jubilee: http://www.jubileemedia.com/support\n\nHave an idea or a personal story you'd like to share? Submit here: https://airtable.com/shrFDrsc4DzgBV3lV\n\n| ABOUT |\nWe believe in the power of empathy for human good. Ultimately, we aim to inspire people to EMBRACE EMPATHY.\n\n| SOCIAL |\nJubilee Facebook: https://www.facebook.com/jubileemedia\nJubilee Instagram: https://www.instagram.com/jubileemedia/\nJubilee Twitter: https://www.twitter.com/jubileemedia\nJubilee Website: https://www.jubileemedia.com\n\nFEATURING\nTrey - https://instagram.com/realtreymars\nAzonde - https://www.instagram.com/azonde\nKirsten - https://www.instagram.com/kirstenloedel/\nPaola - https://instagram.com/paosza\nAlondra - https://www.instagram.com/maly.derp/\nJasmine - https://instagram.com/jasyour\nCassidy - https://instagram.com/cassidymcho\n\n00:00 Intro\n00:23 Round 1: Swiping\n00:45 Round 2: Cocktail Hour\n03:55 Round 2: Deliberation\n04:38 Round 2: Eliminations\n05:12 Round 3: One-On-Ones\n07:51 Round 3: Deliberation\n08:23 Final Reveal\n\nFor brands interested in partnering with Jubilee, email us:\nhello@jubileemedia.com",
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/jDOIVbUT0hU/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/jDOIVbUT0hU/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/jDOIVbUT0hU/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              channelTitle: 'Jubilee',
              liveBroadcastContent: 'none',
              publishTime: '2022-03-22T23:50:54Z',
            },
          },
          {
            kind: 'youtube#searchResult',
            etag: '1ArAJkrgkD0gG9QfiZLrVzjYYgo',
            id: {
              kind: 'youtube#video',
              videoId: '4K_94XFaEgY',
            },
            snippet: {
              publishedAt: '2020-10-09T20:10:00Z',
              channelId: 'UCWkYXtnAuu7VTLPwUcRSB6A',
              title: 'Kylie Jenner: My Mom Does My Makeup',
              description:
                'Watch my mom do my makeup.\n\nKylie Cosmetics Birch Skin Concealer https://www.kyliecosmetics.com/products/concealer \nKylie Cosmetics Better Half Blush Stick https://www.kyliecosmetics.com/collections/bbh-sticks/products/better-half-blush-stick \nKylie Cosmetics Bronze Light Medium Bronzer Stick https://www.kyliecosmetics.com/collections/bbh-sticks/products/bronze-light-medium-bronzer-stick \nKylie Cosmetics Translucent Loose Setting Powder  https://www.kyliecosmetics.com/collections/loose-setting-powders/products/translucent-loose-setting-powder\nKylie Cosmetics Soft Pink Loose Setting Powder https://www.kyliecosmetics.com/collections/loose-setting-powders/products/soft-pink-loose-setting-powder  \nKylie Cosmetics Kendall Pressed Powder Palette https://www.kyliecosmetics.com/products/kendall-pressed-powder-palette?_pos=2&_sid=7c96b3358&_ss=r \nKylie Cosmetics Sailor Pressed Powder Palette https://www.kyliecosmetics.com/collections/sailor-collection/products/sailor-summer-ppp \nKylie Cosmetics Medium Brown Brow Pencil https://www.kyliecosmetics.com/collections/kybrow-pencil/products/medium-brown-brow-pencil \nKylie Cosmetics Winter Kissed Blush https://www.kyliecosmetics.com/collections/blushes/products/winter-kissed-blush-1  \nKylie Cosmetics Pink Dreams Blush https://www.kyliecosmetics.com/collections/blushes/products/pink-dreams-blush \nKylie Cosmetics Almond Bronzer https://www.kyliecosmetics.com/collections/bronzers/products/almond-bronzer \nKylie Cosmetics Toasty Bronzer https://www.kyliecosmetics.com/collections/bronzers/products/toasty-bronzer \nKylie Cosmetics Boss Matte Lip Kit https://www.kyliecosmetics.com/products/boss-matte-lip-kit?_pos=2&_sid=3d1d5303a&_ss=r \nKylie Skin Hand Mirror https://kylieskin.com/products/kylie-skin-hand-mirror?_pos=1&_sid=a8b4e5a47&_ss=r',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/4K_94XFaEgY/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/4K_94XFaEgY/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/4K_94XFaEgY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/4K_94XFaEgY/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
              },
              channelTitle: 'Kylie Jenner',
              liveBroadcastContent: 'none',
              publishTime: '2020-10-09T20:10:00Z',
            },
          },
        ],
      };
    } catch {
      return this.defaultObject;
    }
  }

  async categories() {
    try {
      // const res = await this.http
      //   .get(
      //     `${this.url}videoCategories?part=snippet&regionCode=${this.globals.regionCode}&key=${this.globals.apiKey}`
      //   )
      //   .pipe(map((response) => response))
      //   .get();
      // return res;
      return {
        kind: 'youtube#videoCategoryListResponse',
        etag: 'QteLrrS_X7rM7rlcU_e7qa0embQ',
        items: [
          {
            kind: 'youtube#videoCategory',
            etag: 'grPOPYEUUZN3ltuDUGEWlrTR90U',
            id: '1',
            snippet: {
              title: 'Film & Animation',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Q0xgUf8BFM8rW3W0R9wNq809xyA',
            id: '2',
            snippet: {
              title: 'Autos & Vehicles',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'qnpwjh5QlWM5hrnZCvHisquztC4',
            id: '10',
            snippet: {
              title: 'Music',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'HyFIixS5BZaoBdkQdLzPdoXWipg',
            id: '15',
            snippet: {
              title: 'Pets & Animals',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'PNU8SwXhjsF90fmkilVohofOi4I',
            id: '17',
            snippet: {
              title: 'Sports',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '5kFljz9YJ4lEgSfVwHWi5kTAwAs',
            id: '18',
            snippet: {
              title: 'Short Movies',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'ANnLQyzEA_9m3bMyJXMhKTCOiyg',
            id: '19',
            snippet: {
              title: 'Travel & Events',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '0Hh6gbZ9zWjnV3sfdZjKB5LQr6E',
            id: '20',
            snippet: {
              title: 'Gaming',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'q8Cp4pUfCD8Fuh8VJ_yl5cBCVNw',
            id: '21',
            snippet: {
              title: 'Videoblogging',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'cHDaaqPDZsJT1FPr1-MwtyIhR28',
            id: '22',
            snippet: {
              title: 'People & Blogs',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '3Uz364xBbKY50a2s0XQlv-gXJds',
            id: '23',
            snippet: {
              title: 'Comedy',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '0srcLUqQzO7-NGLF7QnhdVzJQmY',
            id: '24',
            snippet: {
              title: 'Entertainment',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'bQlQMjmYX7DyFkX4w3kT0osJyIc',
            id: '25',
            snippet: {
              title: 'News & Politics',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Y06N41HP_WlZmeREZvkGF0HW5pg',
            id: '26',
            snippet: {
              title: 'Howto & Style',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'yBaNkLx4sX9NcDmFgAmxQcV4Y30',
            id: '27',
            snippet: {
              title: 'Education',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Mxy3A-SkmnR7MhJDZRS4DuAIbQA',
            id: '28',
            snippet: {
              title: 'Science & Technology',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'p3lEirEJApyEkuWpaGEHoF-m-aA',
            id: '29',
            snippet: {
              title: 'Nonprofits & Activism',
              assignable: true,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '4pIHL_AdN2kO7btAGAP1TvPucNk',
            id: '30',
            snippet: {
              title: 'Movies',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Iqol1myDwh2AuOnxjtn2AfYwJTU',
            id: '31',
            snippet: {
              title: 'Anime/Animation',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'tzhBKCBcYWZLPai5INY4id91ss8',
            id: '32',
            snippet: {
              title: 'Action/Adventure',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'ii8nBGYpKyl6FyzP3cmBCevdrbs',
            id: '33',
            snippet: {
              title: 'Classics',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Y0u9UAQCCGp60G11Arac5Mp46z4',
            id: '34',
            snippet: {
              title: 'Comedy',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: '_YDnyT205AMuX8etu8loOiQjbD4',
            id: '35',
            snippet: {
              title: 'Documentary',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'eAl2b-uqIGRDgnlMa0EsGZjXmWg',
            id: '36',
            snippet: {
              title: 'Drama',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'HDAW2HFOt3SqeDI00X-eL7OELfY',
            id: '37',
            snippet: {
              title: 'Family',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'QHiWh3niw5hjDrim85M8IGF45eE',
            id: '38',
            snippet: {
              title: 'Foreign',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'ztKcSS7GpH9uEyZk9nQCdNujvGg',
            id: '39',
            snippet: {
              title: 'Horror',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'Ids1sm8QFeSo_cDlpcUNrnEBYWA',
            id: '40',
            snippet: {
              title: 'Sci-Fi/Fantasy',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'qhfgS7MzzZHIy_UZ1dlawl1GbnY',
            id: '41',
            snippet: {
              title: 'Thriller',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'TxVSfGoUyT7CJ7h7ebjg4vhIt6g',
            id: '42',
            snippet: {
              title: 'Shorts',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'o9w6eNqzjHPnNbKDujnQd8pklXM',
            id: '43',
            snippet: {
              title: 'Shows',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
          {
            kind: 'youtube#videoCategory',
            etag: 'mLdyKd0VgXKDI6GevTLBAcvRlIU',
            id: '44',
            snippet: {
              title: 'Trailers',
              assignable: false,
              channelId: 'UCBR8-60-B28hp2BmDPdntcQ',
            },
          },
        ],
      };
    } catch {
      return {
        items: [
          {
            id: '',
            snippet: {
              channelId: '',
              title: 'Categorry error',
              assignable: true,
            },
          },
        ],
      };
    }
  }

  async statsVideos(id: string) {
    console.log('>>>>>>>>>>>> STATS');
    try {
      // const res = await this.http
      //   .get(
      //     `${this.url}videos?${this.videoDetails}&id=${id}&key=${this.globals.apiKey}`
      //   )
      //   .pipe(map((response) => response))
      //   .toPromise();
      // return res;
      return {
        kind: 'youtube#videoListResponse',
        etag: 'wtZnfkuDvtDk6qJShByeS_Ec39I',
        items: [
          {
            kind: 'youtube#video',
            etag: 'iv3uJGATbq4GMPzwaWCCeR--Gsk',
            id: 'z1fOgUKAszY',
            snippet: {
              publishedAt: '2022-02-02T19:59:38Z',
              channelId: 'UCuQaJimQD2dpolMVssCmZ9w',
              title:
                'Tussin - Sensibil La Lumina feat. Azteca & Amuly | Official Visual',
              description:
                '🔴 Aboneaza-te pentru a primi notificari cand postam\nhttps://smarturl.it/YoungGsubscribe\n\nOfficial Merch powered by Xplicit\nCapitanu & Young G - http://www.capitanuyg.ro/\nCagula Tussin 💯powered by Krckbrnd dm @tussin_capetanos\n\n📱 Booking: Christi Anghel / tups@krack.ro \n\n📸 INSTA FOLLOW:\nTussin | https://www.instagram.com/robii_tussin\nAzteca | https://www.instagram.com/aztegramu\nAmuly | https://www.instagram.com/amulyblind\nKoma | https://www.instagram.com/komasinistro\nRobiiiii | https://instagram.com/rooobbiiiiii\nLu-K | https://www.instagram.com/lukbeats\nYoung G | https://www.instagram.com/youn.g.g.g\nKrack House Studio | https://www.instagram.com/krackhousestudio\n\n Text: Tussin, Azteca, Amuly\n Artwork/Visual: Komasinistro\n Instrumental: Robi\n Mixatã si Masterizatã @ Seek Music, inginer de sunet: Lu-K Beats\n Inregistrata @ Krack House Studio\n\nProduced by Tomescu Robert\n\n--------------------------------------\n\nTussin -  Sensibil La Lumina feat. Azteca & Amuly | Versuri\n\nRefren:\nya ya\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\nTussin: \nDevin demon dinou\nCosmaruri in  somn\nZici ca ma iubesti \nDar ai sufletu gol\nMai toarna alcool\nSa uit de dor\nSamanta familiei de combinator\nMa ia cu fiori\nAripi negre ma mentin in zbor\nLa mintea lor\nNu ma cobor\n(ya ya ya)\nSunt sensibil la lumina…\n\n\nAzteca:\nAm o sensibilitate la lumina\nSunt cu amuly și robi sub luna plina\nMă simt de neatins de la cocaina\nO să fim bogați eu beau doar codeina\n\nSuntem antreprenori\nCu sunet superior\nSuntem combinatori\nFacem banii de zori\nDe-mi vezi în interior\nO să ți dai seama bro\nCo dau referitor\nLa faptu cas un creator\n\nLph lean lean lean uh\nO combin cu prometazina\nNu dormim de la cocaina\nNu dorm că nam melatonina\n\nLph lean lean lean uh\nO combin cu prometazina\nNu dormim de la cocaina\nNu dorm că n-am melatonina\n\nRefren:\nya ya\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\n\nAmuly:\nNoaptea nu dorm, sunt sensibil la lumina\nNoaptea io torn, mă omor fără vreo vina\nNu mă masor cu alții nu m alina\nEu și frații mei în top altfel nu se termina \n\n\nSuntem monștrii, o știi, pe piesa lu roby\nSuntem puși pe soții, lowky, ha!\nM-alin, fac plinu’,agil, iubesc stilu’\nAlt film e copilu, scopu i să fac milu’\n\nN am vrut să fiu primu, decât să o rup\nN am vrut decât muzica pe oriunde mă duc\nNoaptea funcționez, nu nu nu pot să mă culc\nNu pot să cobor tarfo io pot doar să urc \nÎmi plânge sufletu, îmi auzi urletu\nTe mișcă sunetu, clipa momentu\nÎmi plânge cântecul, mă scurg pe sute cu\nFrații mei cu care am rupt pe bune nu? \nÎmi joaca feste capu \nGânduri negre nu pot să mă adun\nDau cu sete și așa mă consum\nAm pornit și s pe viața pe drum \nÎmi Joaca feste capu \nGânduri negre nu pot să mă adun\nDau cu sete și așa mă consum\nAm pornit și s pe viața pe drum\n\n\nRefren(Tussin & Amuly):\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\n--------------------------------------\n\n(C) 2022 Young G & Krack House Studio\n⚠️ Toate drepturile rezervate. Orice reupload poate fi raportat la YT. \n⚠️ All rights reserved. Copyrighted material may not be copied, reproduced or otherwise used for commercial purposes without the written permission of the copyright holder.\n\n#Tussin #Azteca #Amuly #YoungG',
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/z1fOgUKAszY/default.jpg',
                  width: 120,
                  height: 90,
                },
                medium: {
                  url: 'https://i.ytimg.com/vi/z1fOgUKAszY/mqdefault.jpg',
                  width: 320,
                  height: 180,
                },
                high: {
                  url: 'https://i.ytimg.com/vi/z1fOgUKAszY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
                standard: {
                  url: 'https://i.ytimg.com/vi/z1fOgUKAszY/sddefault.jpg',
                  width: 640,
                  height: 480,
                },
                maxres: {
                  url: 'https://i.ytimg.com/vi/z1fOgUKAszY/maxresdefault.jpg',
                  width: 1280,
                  height: 720,
                },
              },
              channelTitle: 'Young G',
              tags: [
                'tussin',
                'azteca',
                'amuly',
                'sensibil la lumina',
                "album capitanu'",
                "capitanu' LP",
                'tussin amuly',
                'tussin ora 6',
                'tussin gangster',
                'muzica rap',
                'muzica trap',
                'muzica hip hop',
                'ora 6',
                'amuly connectr',
                'young g',
                'rap romanesc',
                'muzica',
                'trap romanesc',
              ],
              categoryId: '10',
              liveBroadcastContent: 'none',
              defaultLanguage: 'ro',
              localized: {
                title:
                  'Tussin - Sensibil La Lumina feat. Azteca & Amuly | Official Visual',
                description:
                  '🔴 Aboneaza-te pentru a primi notificari cand postam\nhttps://smarturl.it/YoungGsubscribe\n\nOfficial Merch powered by Xplicit\nCapitanu & Young G - http://www.capitanuyg.ro/\nCagula Tussin 💯powered by Krckbrnd dm @tussin_capetanos\n\n📱 Booking: Christi Anghel / tups@krack.ro \n\n📸 INSTA FOLLOW:\nTussin | https://www.instagram.com/robii_tussin\nAzteca | https://www.instagram.com/aztegramu\nAmuly | https://www.instagram.com/amulyblind\nKoma | https://www.instagram.com/komasinistro\nRobiiiii | https://instagram.com/rooobbiiiiii\nLu-K | https://www.instagram.com/lukbeats\nYoung G | https://www.instagram.com/youn.g.g.g\nKrack House Studio | https://www.instagram.com/krackhousestudio\n\n Text: Tussin, Azteca, Amuly\n Artwork/Visual: Komasinistro\n Instrumental: Robi\n Mixatã si Masterizatã @ Seek Music, inginer de sunet: Lu-K Beats\n Inregistrata @ Krack House Studio\n\nProduced by Tomescu Robert\n\n--------------------------------------\n\nTussin -  Sensibil La Lumina feat. Azteca & Amuly | Versuri\n\nRefren:\nya ya\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\nTussin: \nDevin demon dinou\nCosmaruri in  somn\nZici ca ma iubesti \nDar ai sufletu gol\nMai toarna alcool\nSa uit de dor\nSamanta familiei de combinator\nMa ia cu fiori\nAripi negre ma mentin in zbor\nLa mintea lor\nNu ma cobor\n(ya ya ya)\nSunt sensibil la lumina…\n\n\nAzteca:\nAm o sensibilitate la lumina\nSunt cu amuly și robi sub luna plina\nMă simt de neatins de la cocaina\nO să fim bogați eu beau doar codeina\n\nSuntem antreprenori\nCu sunet superior\nSuntem combinatori\nFacem banii de zori\nDe-mi vezi în interior\nO să ți dai seama bro\nCo dau referitor\nLa faptu cas un creator\n\nLph lean lean lean uh\nO combin cu prometazina\nNu dormim de la cocaina\nNu dorm că nam melatonina\n\nLph lean lean lean uh\nO combin cu prometazina\nNu dormim de la cocaina\nNu dorm că n-am melatonina\n\nRefren:\nya ya\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\n\nAmuly:\nNoaptea nu dorm, sunt sensibil la lumina\nNoaptea io torn, mă omor fără vreo vina\nNu mă masor cu alții nu m alina\nEu și frații mei în top altfel nu se termina \n\n\nSuntem monștrii, o știi, pe piesa lu roby\nSuntem puși pe soții, lowky, ha!\nM-alin, fac plinu’,agil, iubesc stilu’\nAlt film e copilu, scopu i să fac milu’\n\nN am vrut să fiu primu, decât să o rup\nN am vrut decât muzica pe oriunde mă duc\nNoaptea funcționez, nu nu nu pot să mă culc\nNu pot să cobor tarfo io pot doar să urc \nÎmi plânge sufletu, îmi auzi urletu\nTe mișcă sunetu, clipa momentu\nÎmi plânge cântecul, mă scurg pe sute cu\nFrații mei cu care am rupt pe bune nu? \nÎmi joaca feste capu \nGânduri negre nu pot să mă adun\nDau cu sete și așa mă consum\nAm pornit și s pe viața pe drum \nÎmi Joaca feste capu \nGânduri negre nu pot să mă adun\nDau cu sete și așa mă consum\nAm pornit și s pe viața pe drum\n\n\nRefren(Tussin & Amuly):\nNoaptea nu dorm \nSunt sensibil la lumina\nOchii sângerați\nȘi sufletu la fel\nDe ce încerci să mă schimbi?\nȘtii că rămân la fel \nDe ce vrei să mă miniti?\nȘtii și tu cine-i de vina\n\n--------------------------------------\n\n(C) 2022 Young G & Krack House Studio\n⚠️ Toate drepturile rezervate. Orice reupload poate fi raportat la YT. \n⚠️ All rights reserved. Copyrighted material may not be copied, reproduced or otherwise used for commercial purposes without the written permission of the copyright holder.\n\n#Tussin #Azteca #Amuly #YoungG',
              },
              defaultAudioLanguage: 'ro',
            },
            contentDetails: {
              duration: 'PT3M21S',
              dimension: '2d',
              definition: 'hd',
              caption: 'false',
              licensedContent: true,
              contentRating: {},
              projection: 'rectangular',
            },
            statistics: {
              viewCount: '528133',
              likeCount: '13031',
              favoriteCount: '0',
              commentCount: '594',
            },
          },
        ],
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 1,
        },
      };
    } catch {
      return this.defaultFeedObject;
    }
  }
}
