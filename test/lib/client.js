// Use sinon spy and stub to fake gist prototyp
var sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chai = require('chai'),
    expect = chai.expect,
    constants = require('../../lib/constants'),
    Client = require('../../lib/client');

chai.use(sinonChai);

describe('Client', function() {
    beforeEach(function() {
        client = new Client(constants.runnerURL);
        gist = new FakeGist();
        client.gists = [gist];
    });

    describe('#connect()', function() {
        context('with no runnable gist', function() {
            beforeEach(function() {
                client.gists = [];
            });

            it("doesn't open a connection with code runner", function() {
                expect(client.shouldConnect()).to.be.false;
            });

            expectNoToBeConnected();
        });

        context('with invalid endpoint and runnable gists', function() {
            beforeEach(function(done) {
                client.endpoint = '';
                client.connect();
                client.socket.on('connect_error', function(err) {
                    done();
                });
            });

            afterEach(function() {
                client.socket.removeAllListeners('connect_error');
            });

            expectNoToBeConnected();

            it("doesn't add controls to these gists", function() {
                expect(gist.addControls).not.to.have.been.called;
            });
        });

        context('with valid endpoint and runnable gists', function() {
            beforeEach(function(done) {
                client.connect();
                client.socket.on('connect', function() {
                    done();
                });
            });

            afterEach(function() {
                client.disconnect();
            });

            it("opens a connection with code runner", function() {
                expect(client.connected()).to.be.true;
            });

            it('adds controls to these gists', function() {
                expect(gist.addControls).to.have.been.calledOnce;
            });
        });
    });

    describe('#run()', function() {
        context('when client is connected', function() {
            beforeEach(function(done) {
                client.connect();
                client.socket.on('connect', function() {
                    client.run(gist);
                    done();
                });
            });

            afterEach(function() {
                client.disconnect();
            });

            it('set current gist to this gist', function() {
                expect(client.currentGist).to.equal(gist);
            });

            it('adds output to this gist', function(done) {
                expect(gist.addOuput(function() {
                    done();
                }));
            });

            context('when running another gist', function() {
                beforeEach(function() {
                    anotherGist = new FakeGist();
                    client.run(anotherGist);
                });

                it('set current gist to this another gist', function() {
                    expect(client.currentGist).to.equal(anotherGist);
                });

                it('flushes previous gist', function() {
                    expect(gist.flush).to.have.been.calledOnce;
                });
            });
        });
    });

    function FakeGist() {
        this.addControls = sinon.stub();
        this.addOuput = function(cb) { cb(); };
        this.flush = sinon.stub();
        this.language = 'ruby';
        this.code = 'puts "hello world!';
    }

    function expectNoToBeConnected() {
        it('is not connected to code runner', function() {
            expect(client.connected()).to.be.false;
        });
    }
});
