// import
const Remote = require('./Remote');
const Dialogue = require('./Dialogue');
const dialogueHandlers = require('./dialogueHandlers');
const standardHandlers = require('./standardHandlers');
const mainHandlerBuilder = require('./mainHandlerBuilder');
const dotenv = require('dotenv');

// config
const envPath = '../.env';
dotenv.config({path: envPath});
const url = process.env.HOME_ASSISTANT_URL;
const stateUrl = `${ url }/api/states/input_text.there_and_back_again`;
const bearerToken = process.env.HOME_ASSISTANT_TOKEN;

// wire up
const remote = new Remote();
remote.bearerToken = bearerToken;
remote.stateUrl = stateUrl;
const dialogue = new Dialogue();
dialogue.remote = remote;
dialogueHandlers.setDialogue(dialogue);

// export
module.exports.handler = mainHandlerBuilder.build({...standardHandlers, ...dialogueHandlers});
