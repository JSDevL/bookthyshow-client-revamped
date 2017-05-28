import { BookthyshowClientRevampedPage } from './app.po';

describe('bookthyshow-client-revamped App', () => {
  let page: BookthyshowClientRevampedPage;

  beforeEach(() => {
    page = new BookthyshowClientRevampedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
