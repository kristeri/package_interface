# package_interface

Link to live demo: https://package-interface.herokuapp.com/

Simple package interface for listing critical information about software packages on Linux Debian / Ubuntu systems. This project uses Node.js on server-side and both JavaScript and basic HTML on client-side.
The app uses a mock file although the file read path for reading the package data can be replaced with the absolute path to the status file.

This application contains minimalistic styling and no external dependencies focusing mainly on the basic functionality.

Development instructions:

Install Node.js from: https://nodejs.org/en/

Run command:

```console
node server.js
```
to start the server.

The app can be viewed with a browser in localhost:3000

For more information about the syntax of control files, see:
https://www.debian.org/doc/debian-policy/ch-controlfields.html
