const standardHandlers = require('./standardHandlers');
const dialogueHandlers = require('./dialogueHandlers');
const build = require('./mainHandlerBuilder.js').build;

module.exports.handler = build({...standardHandlers, ...dialogueHandlers});
