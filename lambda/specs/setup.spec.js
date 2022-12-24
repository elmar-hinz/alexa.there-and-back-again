const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

chai.use(chaiAsPromised);

describe('styles of testing', function() {
    it('classic assert style should work', function() {
        assert.equal("hello", "hello");
    });
    it('BDD expect style should work', function() {
        expect("hello").to.equal("hello");
    });
    it('BDD should style should work', function() {
        "hello".should.equal("hello");
    });
});

describe('features of testing', function() {
    it('promises should be handled', function() {
        return Promise.resolve(2 + 2).should.eventually.equal(4);
    });
});