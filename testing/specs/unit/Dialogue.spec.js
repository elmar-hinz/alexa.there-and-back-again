const root = '../../..';
const Dialogue = require(`${ root }/lambda/lib/Dialogue.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

const alpha = { id: 'alpha' };
const beta = { id: 'beta' };
const gamma = { id: 'gamma' };
const messages = [alpha, beta, gamma];

describe('dialogue',  function() {
    let dialogue;

    beforeEach(function() {
        dialogue = new Dialogue();
        dialogue.remote = {
            loadMessages: function () {
                return Promise.resolve(messages);
            }
        }
    });

    describe('the load functions', function() {
        it('should load the message queue', function() {
            return dialogue.load().then(queue => {
                queue.shift().should.deep.equal(alpha);
                queue.shift().should.deep.equal(beta);
                queue.shift().should.deep.equal(gamma);
            });
        });
    });
});

