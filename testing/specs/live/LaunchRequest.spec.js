const base = '..';

// chai
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

// env
const dotenv = require('dotenv');
const path = require('path');
const envPath =  path.join(__dirname, '..', '..', '.env');
dotenv.config({path: envPath});

// imports
const VirtualAlexa = require('virtual-alexa').VirtualAlexa;

describe('the launch request', function () {
    let alexa;

    beforeEach(function() {
        alexa = VirtualAlexa.Builder()
            .handler(`${base}/lambda/index.handler`)
            .interactionModelFile(`${base}/skill-package/interactionModels/custom/en-US.json`)
            .create();
    });

    describe('the request', function () {
        it('should speak anything, that is not empty', function() {
            return alexa.launch().should.be.fulfilled.then((payload) => {
                const ssml = payload.response.outputSpeech.ssml;
                ssml.should.not.equal('<speak></speak>');
                ssml.should.contain('<speak>');
            });
        });
    });
});