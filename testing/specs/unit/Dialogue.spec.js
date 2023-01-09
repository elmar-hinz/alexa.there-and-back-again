const root = '../../..';
const Dialogue = require(`${ root }/lambda/lib/Dialogue.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const text = 'some text';
const event = 'some event';
const state = { text, event };

describe('dialogue',  function() {
    let dialogue;

    beforeEach(function() {
        dialogue = new Dialogue();
        dialogue.remote = {
            loadState: function () {
                return Promise.resolve(state);
            }
        }
    });

    describe('the load functions', function() {
        it('should load the text', function() {
            return dialogue.load().should.eventually.equal(text);
        });
    });
});

