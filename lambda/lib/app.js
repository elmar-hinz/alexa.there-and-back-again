// import
const Remote = require('./Remote');
const Dialogue = require('./Dialogue');
const dialogueHandlers = require('./dialogueHandlers');
const standardHandlers = require('./standardHandlers');
const mainHandlerBuilder = require('./mainHandlerBuilder');

// wire up
const remote = new Remote();
const dialogue = new Dialogue();
dialogue.remote = remote;
dialogueHandlers.setDialogue(dialogue);

// export
module.exports.handler = mainHandlerBuilder.build({...standardHandlers, ...dialogueHandlers});
