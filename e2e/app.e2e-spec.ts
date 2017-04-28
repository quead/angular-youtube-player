import { YtAppPage } from './app.po';

describe('yt-app App', () => {
  let page: YtAppPage;

  beforeEach(() => {
    page = new YtAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
