const base = '..';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const VirtualAlexa = require('virtual-alexa').VirtualAlexa;

describe('the launch request', function () {
    let alexa;

    beforeEach(function() {
        alexa = VirtualAlexa.Builder()
            .handler(`${base}/lambda/index.handler`)
            .interactionModelFile(`${base}/skill-package/interactionModels/custom/en-US.json`)
            .create();
    });

    it('should agree that true is true', function () {
        true.should.be.true;
    });

    it('should agree that true is eventually true', function(){
        return Promise.resolve(true).should.eventually.be.true;
    })

    describe('the request', function () {
        it('should respond', function() {
            return alexa.launch().should.be.fulfilled.then((payload) => {
                const ssml = payload.response.outputSpeech.ssml;
                ssml.should.contain('Hello, you can say Hello or Help.');
            });
        });
    });
});