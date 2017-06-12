describe('App', function () {
    beforeEach(function () {
        browser.loadAndWaitForAureliaPage('http://localhost:9000');
    });
    it('should show the home page', function () {
        var title = browser.getTitle();
        expect(title).toEqual('Home | Aurelia');
    });
});
