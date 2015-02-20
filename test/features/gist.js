describe('Each gist file', function() {
    beforeEach(function() {
        gists = getGists();
    });

    it('is loaded', function() {
        expect(gists.length).to.equal(3);
    });

    context('when language is supported', function() {
        beforeEach(function(done) {
            waitFor(function() {
                gist = getGists()[0];

                return getElement('controls');;
            }, function() {
                done();
            });
        });

        it('has grounds controls', function() {
            expect(getElement('controls')).not.to.be.undefined;
        });

        ['run', 'flush'].forEach(function(name) {
            expectToHaveButton(name);
        });

        it('has a link to grounds.io', function() {
            var link = getGroundsLink();

            expect(link.href).to.equal('http://beta.42grounds.io/');
        });

        expectToHaveEmptyConsole();

        context('after clicking run button', function() {
            beforeEach(function(done){
                getElement('run').click();

                waitFor(function() {
                    return getElement('status');
                }, function() {
                    done();
                });
            });

            it('has proper output on console', function() {
                var output = [
                    'hello javascript!',
                    '[Program exited with status: 0]',
                ].join('\n');

                expect(consoleHasOutput(output)).to.be.true;
            });

            context('after clicking flush button', function() {
                beforeEach(function(){
                    getElement('flush').click();
                });

                expectToHaveEmptyConsole();
            });
        });

        function expectToHaveButton(name) {
            it('has a '+name+' button', function() {
                expect(getElement(name)).not.to.be.undefined;
            });
        }

        function expectToHaveEmptyConsole() {
            it('has an empty console', function() {
                expect(consoleHasOutput('')).to.be.true;
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
                expect(getElement(name)).to.be.undefined;
            });
        }
    });

    function consoleHasOutput(output) {
        return getElement('console').textContent === output;
    }

    function getElement(name) {
        return gist.getElementsByClassName(name)[0];
    }

    function getGists() {
        return document.getElementsByClassName('gist-file');
    }

    function getGroundsLink() {
        return gist.getElementsByClassName('gist-meta')[1]
                   .getElementsByTagName('a')[0];
    }

    function waitFor(findElement, callback) {
        var element = findElement();

        if (!!element) return callback(element);
        setTimeout(function() {
            waitFor(findElement, callback);
        }, 10);
    }
});
