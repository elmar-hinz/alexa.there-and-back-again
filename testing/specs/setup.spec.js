const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = chai.assert;
const expect = chai.expect;

chai.should();
chai.use(chaiAsPromised);

describe('the framework', function () {

    describe('the fundamentals of truth', function () {
        it('true should be true', function () {
            true.should.be.true;
        });
        it('false should be false', function () {
            false.should.be.false;
        });
    });

    describe('the styles of testing', function () {
        it('classic assert style should work', function () {
            assert.equal("hello", "hello");
        });
        it('BDD expect style should work', function () {
            expect("hello").to.equal("hello");
        });
        it('BDD should style should work', function () {
            "hello".should.equal("hello");
        });
    });

    describe('some advanced features', function () {
        it('promises should be handled', function () {
            return Promise.resolve(2 + 2).should.eventually.equal(4);
        });
    });
});