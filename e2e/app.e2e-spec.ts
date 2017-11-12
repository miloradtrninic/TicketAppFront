import { TicketAppFrontPage } from './app.po';

describe('ticket-app-front App', () => {
  let page: TicketAppFrontPage;

  beforeEach(() => {
    page = new TicketAppFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
