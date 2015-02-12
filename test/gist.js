describe('Gist', function() {
    beforeEach(function() {
        gists = document.getElementsByClassName('gist-file');
    });

    it('page has a few gists', function() {
        expect(gists.length).to.equal(3);
    });

    context('when language is supported', function() {
        beforeEach(function() {
            gist = gists[0];
        });

        ['run', 'flush'].forEach(function(name) {
            expectToHaveButton(name);
        });

        function expectToHaveButton(name) {
            it('has a '+name+' button', function(done) {
                setTimeout(function() {
                    var buttons = gist.getElementsByClassName(name);

                    expect(buttons.length).to.equal(1);
                    done();
                }, 1000);
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

        function expectNotToHaveButton(name) {
            it('has no '+name+' button', function(done) {
                setTimeout(function() {
                    var buttons = gist.getElementsByClassName(name);

                    expect(buttons.length).to.equal(0);
                    done();
                }, 1000);
            });
        }
    });
});
