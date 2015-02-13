describe('Gist', function() {
    before(function(done) {
        setTimeout(function() {
            done();
        }, 1000);
    });

    beforeEach(function() {
        gists = document.getElementsByClassName('gist-file');
    });

    it('are loaded', function() {
        expect(gists.length).to.equal(3);
    });

    context('when language is supported', function() {
        beforeEach(function() {
            gist = gists[0];
        });

        ['run', 'flush'].forEach(function(name) {
            expectToHaveButton(name);
        });

        it('has a link to grounds.io', function() {
            var link = getGroundsLink();

            expect(link.href).to.equal('http://beta.42grounds.io/');
        });

        function expectToHaveButton(name) {
            it('has a '+name+' button', function() {
                var buttons = gist.getElementsByClassName(name);

                expect(buttons.length).to.equal(1);
            });
        }
    });

    context('when language is not supported', function() {
        beforeEach(function() {
            gist = gists[2];
        });

        ['run', 'flush'].forEach(function(name) {
            expectNotToHaveButton(name);
        });

        it('has no link to grounds.io', function() {
            expect(getGroundsLink).to.throw(TypeError);
        });

        function expectNotToHaveButton(name) {
            it('has no '+name+' button', function() {
                var buttons = gist.getElementsByClassName(name);

                expect(buttons.length).to.equal(0);
            });
        }
    });

    function getGroundsLink() {
        return gist.getElementsByClassName('gist-meta')[1]
                   .getElementsByTagName('a')[0];
    }
});
