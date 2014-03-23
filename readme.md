# Systemd Socket Activation

## Introduction

A minimalistic NodeJS module to provide access to systemd based socket activation.
It is similar to [node-systemd](https://github.com/rubenv/node-systemd), but it
differs in two points:

### 1. No Monkey-Patching of http.Server

Monkey-Patching violates [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns).
This module does not need to modify interna of NodeJS.

### 2. More explicit API

The API is more explicit about the way the socket is chosen. There is no manual
way of finding out whether or not the application is running with
`NODE_ENV=production`. You just tell your app “use a systemd socket or my default”. 

## Example

    var http = require('http');
    var systemdSocket = require('systemd-socket');

	var server = http.createServer();
	// set up handlers for error and request events
	server.listen(systemdSocket() || 8080);

## API Reference

### systemdSocket([index])

Create a handle for a server to listen at. Returns a structure like
`{fd: <fd>}` to be passed to calls like [http.Server.listen()](http://nodejs.org/api/http.html#http_server_listen_handle_callback).

The function will return `null` if there is no socket to listen to. This way
you can easily use `||` to provide a default value (i.e. just as in the
aforementioned example).

You can use the `index` argument to select the file descriptor passed to your
application. If you expect more than one, you can call `systemdSocket()`
many times to return the handles. Just stop iterating when it returns `null`
(create your own loop and use an index counter starting at `0` and couting up
until `systemSocket(index)` returns `null`).

## License

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
