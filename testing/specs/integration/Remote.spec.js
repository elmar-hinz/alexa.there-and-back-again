const root = '../../..';
const Remote = require(`${ root }/lambda/lib/Remote.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const nock = require('nock');
const url = 'https://example.org';
const pathToState = '/api/states/input_text.there_and_back_again'
const stateUrl = `${ url }${ pathToState }`;
const text = 'hello world';
const message = { text: text };
const stringified = JSON.stringify(message);
const json = { state: stringified };

describe('the Remote class', function () {
    let remote;

    beforeEach(function() {
        remote = new Remote();
    });

    describe('the loadMessages function', function() {
        it('should load the messages', function() {
            nock(url).get(pathToState).reply(200, json );
            remote.stateUrl = stateUrl;
            return remote.loadState().should.eventually.deep.equal(message);
        });
    });

});
