import { browser, element, by } from 'protractor';

export class BookthyshowClientRevampedPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
