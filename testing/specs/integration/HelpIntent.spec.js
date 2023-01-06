const base = '..';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const VirtualAlexa = require('virtual-alexa').VirtualAlexa;

describe('the helper request', function () {
    let alexa;

    beforeEach(function() {
        alexa = VirtualAlexa.Builder()
            .handler(`${base}/lambda/index.handler`)
            .interactionModelFile(`${base}/skill-package/interactionModels/custom/en-US.json`)
            .create();
    });

    describe('the request', function () {
        it('should respond with expected informations', function() {
            return alexa.intend('AMAZON.HelpIntent').should.be.fulfilled.then((payload) => {
                const ssml = payload.response.outputSpeech.ssml;
                ssml.should.contain('can say hello to me');
                ssml.should.contain('can I help');
            });
        });
    });
});