// imports and chai
const path = require('path');
const dotenv = require('dotenv');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

// class under test
const root = '../../..';
const Remote = require(`${ root }/lambda/lib/Remote.js`);

// env
const envPath =  path.join(__dirname, '..', '..', '.env');
dotenv.config({path: envPath});
const url = process.env.HOME_ASSISTANT_URL;
const token = process.env.HOME_ASSISTANT_TOKEN;

// config
const pathToState = '/api/states/input_text.there_and_back_again'
                    '/api/states/input_text.there_and_back_again'
const stateUrl = `${ url }${ pathToState }`;

describe('the Remote class', function () {
    let remote;

    beforeEach(function() {
        remote = new Remote();
    });

    describe('the loadState function', function() {
        it('should load any text from HA', function() {
            remote.stateUrl = stateUrl;
            remote.bearerToken = token;
            return remote.loadState().then(res => {
                res.text.should.not.be.empty;
            });
        });
    });

});
