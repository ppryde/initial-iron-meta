var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  "summary": "Render your initial pages SEO data for all bots and users",
  "version": "0.0.1",
  "git": "https://github.com/ppryde/initial-iron-meta.git",
  "name": "pip87:initial-iron-meta",
  "documentation": null
});

Npm.depends({
  "connect": "2.13.0"
});

Package.onUse(function(api) {
  configure(api);
  api.export('InitialIronMeta', ['client', 'server']);
});

function configure (api) {
  api.versionsFrom('METEOR@0.9.3');
  api.use('meteorhacks:inject-initial', ['client', 'server']);
  api.use('iron:router@0.9.0 || 1.0.0', ['client', 'server'], {weak: true});

  api.use('meteorhacks:picker@1.0.3', 'server');

  api.use(['minimongo', 'livedata', 'ejson', 'underscore', 'webapp', 'routepolicy'], ['server']);
  api.use(['minimongo', 'underscore', 'deps', 'ejson'], ['client']);

  api.addFiles([
    'lib/server/routes.js',
    'lib/server/iron_router_support.js',
  ], 'server');

}
