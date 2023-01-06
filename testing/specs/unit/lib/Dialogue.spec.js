const root = '../../../..';
const Dialogue = require(`${ root }/lambda/lib/Dialogue.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const nock = require('nock');
const url = 'https://example.org';
const alpha = { id: 'alpha' };
const beta = { id: 'beta' };
const gamma = { id: 'gamma' };
const msgs = [alpha, beta, gamma];

function nockOnce(msgs) {
    nock(url)
    .get('/api/taba/msgs')
    .reply(200, { msgs });
}

describe('dialogue',  function() {
    let dialogue;

    beforeEach(function() {
        dialogue = new Dialogue();
    });

    it('should agree that true is true', function () {
        true.should.be.true;
    });

    describe('the initial setup', function () {
        it('should agree that url is initally empty', function() {
            dialogue.url.should.equal('');
        });
        it('should agree that verify is initally false', function() {
            dialogue.verify.should.be.false;
        });
        it('should agree that token is initally empty', function() {
            dialogue.token.should.equal('');
        });
    });

    describe('the load functions', function() {
        it('should load the msg queue', function() {
            nockOnce(msgs);
            dialogue.url = url;
            return dialogue.load().then(queue => {
                queue.shift().should.deep.equal(alpha);
                queue.shift().should.deep.equal(beta);
                queue.shift().should.deep.equal(gamma);
            });
        });
    });
});

