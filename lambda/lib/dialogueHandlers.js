const Alexa = require('ask-sdk-core');

let dialogue;

module.exports.setDialogue = function(value) {
    dialogue = value;
}

module.exports.LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return dialogue.load().then((speakOutput) => {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        });
    }
};