#!/usr/bin/env node

/* See SD_LISTEN_FDS_START from
 * http://cgit.freedesktop.org/systemd/systemd/tree/src/systemd/sd-daemon.h */
var firstSystemdFD = 3;
var nextIndex = 0;

var systemd = module.exports = function (index) {
    if (arguments.length < 1) {
		index = nextIndex++;
	}

    if (!process.env.LISTEN_FDS) {
		return null;
	}

    var listenFDs = parseInt(process.env.LISTEN_FDS, 10);
    if (listenFDs < nextIndex) {
		return null;
	}

    return {
		fd: firstSystemdFD + index
	};
};

// vim:set sw=4 et:
