// Use sinon spy and stub to fake gist prototyp
var sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    chai = require('chai'),
    expect = chai.expect,
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
        client = new Client('wss://beta.42grounds.io');
    });

    it("can't connect to runner", function() {
        expect(client.shouldConnect()).to.be.false;
    });

    it("is not connected to runner", function() {
        expect(client.connected()).to.be.false;
    });

    context('with runnable gists', function() {
        beforeEach(function() {
            gist = new FakeGist();
            client.gists = [gist];
        });

        it('is able to connect to the runner', function() {
            expect(client.shouldConnect()).to.be.true;
        });

        context('#connect()', function() {
            beforeEach(function(done) {
                client.connect();
                client.socket.on('connect', function() {
                    done();
                });
            });

            afterEach(function() {
                client.disconnect();
            });

            it("open a connection with runner", function() {
                expect(client.connected()).to.be.true;
            });

            it('add controls to these gists', function() {
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

                    it('flush previous gist', function() {
                        expect(gist.flush).to.have.been.calledOnce;
                    });
                });
            });
        });
    });
});
