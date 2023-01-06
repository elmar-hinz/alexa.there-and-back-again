const Alexa = require('ask-sdk-core');

module.exports.build = function(handlers) {
    return Alexa.SkillBuilders
    .custom()
    .addRequestHandlers(
        handlers.LaunchRequestHandler,
        handlers.HelloWorldIntentHandler,
        handlers.HelpIntentHandler,
        handlers.CancelAndStopIntentHandler,
        handlers.FallbackIntentHandler,
        handlers.SessionEndedRequestHandler,
        handlers.IntentReflectorHandler)
    .addErrorHandlers(
        handlers.ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
}