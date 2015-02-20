describe('Each gist file', function() {
    beforeEach(function() {
        gists = getGists();
    });

    it('is loaded', function() {
        expect(gists.length).to.equal(2);
    });

    context('when language is supported', function() {
        beforeEach(function(done) {
            gist = new Gist(RUNNABLE);

            gist.isReady(function() {
                done();
            });
        });

        ['run', 'flush'].forEach(function(name) {
            expectToHaveButton(name);
        });

        it('has a link to grounds website', function() {
            var link = gist.getGroundsLink();

            expect(link.href).to.equal('http://beta.42grounds.io/');
        });

        expectToHaveEmptyConsole();

        context('after clicking run button', function() {
            // We can't use a beforeEach here, grounds has
            // a spam prevention of 0.5 seconds.
            before(function(done){
                gist.run(function() {
                    done();
                });
            });

            it('has proper output on console', function() {
                var output = [
                    'hello javascript!',
                    '[Program exited with status: 0]',
                ].join('\n');

                expect(gist.hasOutput(output)).to.be.true;
            });



            context('after clicking flush button', function() {
                before(function(done){
                    gist.flush(function() {
                        done();
                    });
                });

                expectToHaveEmptyConsole();
            });
        });

        function expectToHaveButton(name) {
            it('has a '+name+' button', function() {
                expect(gist.getChildren(name)).not.to.be.undefined;
            });
        }

        function expectToHaveEmptyConsole() {
            it('has an empty console', function() {
                expect(gist.hasOutput('')).to.be.true;
            });
        }
    });

    context('when language is not supported', function() {
        beforeEach(function() {
            gist = new Gist(NOT_SUPPORTED);
        });

        ['run', 'flush'].forEach(function(name) {
            expectNotToHaveButton(name);
        });

        it('has no link to grounds website', function() {
            expect(function() {
                gist.getGroundsLink();
            }).to.throw(TypeError);
        });

        function expectNotToHaveButton(name) {
            it('has no '+name+' button', function() {
                expect(gist.getChildren(name)).to.be.undefined;
            });
        }
    });


});
