import { MyQuizPage } from './app.po';

describe('my-quiz App', () => {
  let page: MyQuizPage;

  beforeEach(() => {
    page = new MyQuizPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
