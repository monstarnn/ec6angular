# ec6Angular
Demo app ES6 with AngularJS 1.x

#Environment setup
- `npm install -g gulp`
- `npm install -g bower`
- `npm install`
- `bower install`

##Build
- `gulp build` - just builds the UI app to the `./dist`
- `gulp build-watch` - builds the UI app to the `./dist` and listening for any changes in `./src`

##Run
- `gulp serve` - builds UI app to `./dist`, starts `express` server and serves to localhost with watching for changes in `./src`
- `local.build.sh` - builds UI app to `./dist` and starts `nginx` docker for `./dist` (w/o changes watching, for watching changes in `./src` run `gulp build-watch`)