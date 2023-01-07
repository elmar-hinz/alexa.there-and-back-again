const root = '../../..';
const Remote = require(`${ root }/lambda/lib/Remote.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const nock = require('nock');
const url = 'https://example.org';
const pathToMessages = '/api/taba/msgs/'
const messagesUrl = `${ url }${ pathToMessages }`;
const alpha = { id: 'alpha' };
const beta = { id: 'beta' };
const gamma = { id: 'gamma' };
const messages = [alpha, beta, gamma];

describe('the Remote class', function () {
    let remote;

    beforeEach(function() {
        remote = new Remote();
    });

    describe('the loadMessages function', function() {
        it('should load the messages', function() {
            nock(url).get(pathToMessages).reply(200, { messages });
            remote.messagesUrl = messagesUrl;
            return remote.loadMessages().should.eventually.deep.equal(messages);
        });
    });

});
