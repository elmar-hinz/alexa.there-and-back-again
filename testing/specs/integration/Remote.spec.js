const root = '../../..';
const Remote = require(`${ root }/lambda/lib/Remote.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const fetch = require('node-fetch');
const nock = require('nock');
const url = 'https://example.org';
const token = '123';
const pathToState = '/api/states/input_text.there_and_back_again'
const stateUrl = `${ url }${ pathToState }`;
const text = 'some text';
const event = 'some event';
const state = { text, event };
const stringified = JSON.stringify(state);
const json = { state: stringified };

describe('the Remote class', function () {
    let remote;

    beforeEach(function() {
        remote = new Remote();
    });

    describe('authorization', function() {
        it('should get a response, if no authentication is required', function() {
            nock(url).get('/').reply(200, {} );
            return fetch(url);
        });
        it('should get a response with bearer token, if authorization is required', function () {
            nock(url, { reqheaders: { 'Authorization': `Bearer ${token}` } })
                .get('/').reply(200, {});
            return fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        });
    })

    describe('the loadState function', function() {
        it('should load the state (message)', function() {
            nock(url).get(pathToState).reply(200, json );
            remote.stateUrl = stateUrl;
            return remote.loadState().then(state => {
                state.should.deep.equal(state);
                state.text.should.equal(text);
                state.event.should.equal(event);
            })
        });
        it('should load the state (message) with token if a token is required', function() {
            nock(url, { reqheaders: { 'Authorization': `Bearer ${token}` } })
                .get(pathToState).reply(200, json);
            remote.stateUrl = stateUrl;
            remote.bearerToken = token;
            return remote.loadState().should.eventually.deep.equal(state);
        });
    });

});
