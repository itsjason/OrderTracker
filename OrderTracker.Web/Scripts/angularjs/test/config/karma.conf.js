basePath = '../../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'lib/angular.min.js',
  'lib/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
