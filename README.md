# Selector.js

**Note: be sure to read this README.md thoroughly, as well as the comments in the test spec (when you run the tests, a page should open in your browser that displays the comments in a friendly, readable format)**

## Running

You should have Testem installed globally. *If not*: `npm install -g testem`.

1. Run `npm install` to install all the other software packages needed (called "dependencies")
2. Run `npm test` - this will cause the specs to run (you can view them at http://localhost:7357/), and will also open an html page with all of the test specs alongside their documentation.

## Playground

In addition to the test environment run by Jasmine, we've included a "playground" environment that you can use to test your `$` function/class manually (if you so choose - it is entirely optional).

To access this playground, execute `npm run playground` from the command line, and then open http://localhost:8080/ in your browser.
