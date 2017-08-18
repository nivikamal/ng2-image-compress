import { TestImageToolPage } from './app.po';

describe('test-image-tool App', () => {
  let page: TestImageToolPage;

  beforeEach(() => {
    page = new TestImageToolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
