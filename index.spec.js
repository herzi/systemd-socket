#!/usr/bin/env mocha

var chai = require('chai');
var expect = chai.expect;

describe('systemd-socket module', function () {
    beforeEach(function () {
        var modulePath = __dirname + '/index.js';
        if (require.cache.hasOwnProperty(modulePath)) {
            delete require.cache[modulePath];
        }

        // FIXME: copy process.env and restore in afterEach
    });

    it('can be required', function () {
        require('./');
    });

    it('is a function', function () {
        var sut = require('./');

        expect(sut).to.be.a.Function;
    });

    it('returns null by default', function () {
        var sut = require('./');

        expect(sut()).to.be.null;
    });

    it('returns an object for 1', function () {
        process.env.LISTEN_FDS = '1';

        var sut = require('./');

        expect(sut()).to.be.an.Object;
    });

    it('returns a handle for 1', function () {
        process.env.LISTEN_FDS = '1';

        var sut = require('./');

        expect(sut()).to.have.property('fd', 3);
    });

    it('returns null for 0', function () {
        process.env.LISTEN_FDS = '0';

        var sut = require('./');

        expect(sut()).to.be.null;
    });

    it('returns a value for 2', function () {
        process.env.LISTEN_FDS = '2';

        var sut = require('./');

        expect(sut()).to.be.an.Object;
    });

    it('returns two values for 2', function () {
        process.env.LISTEN_FDS = '2';

        var sut = require('./');
        sut();

        expect(sut()).to.be.an.Object;
    });

    it('returns a handle for 2', function () {
        process.env.LISTEN_FDS = '2';

        var sut = require('./');

        expect(sut()).to.have.property('fd', 3);
    });

    it('returns two handles for 2', function () {
        process.env.LISTEN_FDS = '2';

        var sut = require('./');
        sut();

        expect(sut()).to.have.property('fd', 4);
    });

    it('returns null for the third call for 2', function () {
        process.env.LISTEN_FDS = '2';

        var sut = require('./');
        sut();
        sut();

        expect(sut()).to.be.null;
    });

    it('returns the first handle multiple times', function () {
        process.env.LISTEN_FDS = '1';
        var sut = require('./');
        expect(sut()).to.deep.equal(sut(0));
    });
});

// vim:set sw=4 et:
