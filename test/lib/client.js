// Use sinon spy and stub to fake gist prototyp
var sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chai = require('chai'),
    expect = chai.expect,
    constants = require('../../lib/constants'),
    Client = require('../../lib/client');

chai.use(sinonChai);

function FakeGist() {
    this.addControls = sinon.stub();
    this.addOuput = function(cb) { cb(); };
    this.flush = sinon.stub();
    this.language = 'ruby';
    this.code = 'puts "hello world!';
}

describe('Client', function() {
    beforeEach(function() {
        client = new Client(constants.runnerURL);
    });

    it("can't connect to runner", function() {
        expect(client.shouldConnect()).to.be.false;
    });

    expectNoToBeConnected();

    context('with runnable gists', function() {
        beforeEach(function() {
            gist = new FakeGist();
            client.gists = [gist];
        });

        it('is able to connect to the runner', function() {
            expect(client.shouldConnect()).to.be.true;
        });

        context('with invalid runner endpoint', function() {
            beforeEach(function() {
                client.endpoint = '';
                client.connect();
            });

            expectNoToBeConnected();

            it("doesn't add controls to these gists", function() {
                expect(gist.addControls).not.to.have.been.called;
            });
        });

        context('with valid runner endpoint', function() {
            beforeEach(function(done) {
                client.connect();
                client.socket.on('connect', function() {
                    done();
                });
            });

            afterEach(function() {
                client.disconnect();
            });

            it("opens a connection with runner", function() {
                expect(client.connected()).to.be.true;
            });

            it('adds controls to these gists', function() {
                expect(gist.addControls).to.have.been.calledOnce;
            });

            context('#run()', function() {
                beforeEach(function() {
                    client.run(gist);
                });

                it('set current gist', function() {
                    expect(client.currentGist).to.equal(gist);
                });

                it('adds output to gist', function(done) {
                    expect(gist.addOuput(function() {
                        done();
                    }));
                });

                context('with another gist', function() {
                    beforeEach(function() {
                        anotherGist = new FakeGist();
                        client.run(anotherGist);
                    });

                    it('re set current gist', function() {
                        expect(client.currentGist).to.equal(anotherGist);
                    });

                    it('flushes previous gist', function() {
                        expect(gist.flush).to.have.been.calledOnce;
                    });
                });
            });
        });
    });

    function expectNoToBeConnected() {
        it('is not connected to runner', function() {
            expect(client.connected()).to.be.false;
        });
    }
});
