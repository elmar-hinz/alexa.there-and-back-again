const root = '../../..';
const MessageQueue = require(`${ root }/lambda/lib/MessageQueue.js`);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);

describe('request queue',  function() {
    const alpha = { id: "alpha", value: "1" };
    const alpha_dupe = { id: "alpha", value: "dupe" };
    const beta = { id: "beta", value: "2" };
    const gamma = { id: "gamma", value: "3" };
    let queue;

    beforeEach(function() {
        queue = new MessageQueue();
    });

    describe('the clear function', function () {
        it('should clear queue to length zero', function () {
            queue.length().should.equal(0);
            queue.add(alpha)
            queue.length().should.equal(1);
            queue.clear();
            queue.length().should.equal(0);
        });
    });
    describe('the add function', function () {
        it('should grow by one for distinct id', function () {
            queue.add(alpha)
            queue.length().should.equal(1);
            queue.add(beta)
            queue.length().should.equal(2);
        });
        it('should grow by zero for reused id', function () {
            queue.add(alpha)
            queue.length().should.equal(1);
            queue.add(alpha_dupe)
            queue.length().should.equal(1);
        });
        it('should NOT replace the entry of the same id', function () {
            queue.add(alpha)
            queue.add(alpha_dupe)
            queue.get('alpha').should.equal(alpha);
            queue.get('alpha').should.not.equal(alpha_dupe);
        });
    });
    describe('the length function', function () {
        it('should be zero for the empty queue', function () {
            queue.length().should.equal(0);
        });
        it('should count up while adding', function () {
            queue.add(alpha)
            queue.length().should.equal(1);
            queue.add(beta)
            queue.length().should.equal(2);
        });
    });
    describe('the get function', function () {
        it('should get by id', function () {
            queue.add(alpha);
            queue.add(beta);
            queue.add(gamma);
            queue.get('beta').should.equal(beta);
        });
        it('should return undefined for unknown id', function () {
            const result = queue.get('unknown id');
            expect(result).to.be.undefined;
        });
    });
    describe('the peek function', function () {
        it('should get the first entry', function () {
            queue.add(beta);
            queue.add(gamma);
            queue.add(alpha);
            queue.peek().should.equal(beta);
        });
        it('should not change the number of entries', function () {
            queue.add(alpha);
            queue.length().should.equal(1);
            queue.peek();
            queue.length().should.equal(1);
        });
        it('should return undefined for empty queue', function () {
            expect(queue.peek()).to.be.undefined;
        });
    });
    describe('the shift function', function () {
        it('should get the first entry', function () {
            queue.add(beta);
            queue.add(gamma);
            queue.add(alpha);
            queue.shift().should.equal(beta);
        });
        it('should reduce the number of entries by one', function () {
            queue.add(alpha);
            queue.length().should.equal(1);
            queue.shift();
            queue.length().should.equal(0);
        });
        it('should return undefined for empty queue', function () {
            expect(queue.shift()).to.be.undefined;
        });
        it('should get the entries one by one and terminate with undefined', function () {
            queue.add(alpha);
            queue.add(beta);
            queue.shift().should.equal(alpha);
            queue.shift().should.equal(beta);
            expect(queue.shift()).to.be.undefined;
        });
    });
    describe('the forEach function', function () {
        it('should be iterable', function() {
            let keys = [];
            let values = [];
            queue.add(alpha);
            queue.add(beta);
            queue.forEach((value, key) => {
                keys.push(key);
                values.push(value);
            })
            keys.should.deep.equal(['alpha', 'beta']);
            values.should.deep.equal([alpha, beta]);
        });
        it('should proceed if new values are appended on the fly', function() {
            let values = [];
            queue.add(alpha);
            queue.forEach((value) => {
                values.push(value);
                // no endless loop because each key is only added once
                queue.add(beta);
                queue.add(gamma)
            })
            values.should.deep.equal([alpha, beta, gamma]);
        });
    });
});
