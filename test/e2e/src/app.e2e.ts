describe('App', () => {

  beforeEach(() => {

    browser.loadAndWaitForAureliaPage('http://localhost:9000');

  });

  it('should show the home page', () => {

    const title = browser.getTitle();
    
    expect(title).toEqual('Home | Aurelia');

  });

});
