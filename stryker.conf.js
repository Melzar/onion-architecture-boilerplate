module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'yarn',
    reporters: ['progress'],
    testRunner: 'mocha',
    transpilers: [
      'typescript'
    ],
    files: [
      "ormconfig.js",
      "src/**/*.ts",
      "test/**/*.ts",
      ".env.test"
    ],
    fileLogLevel: 'debug',
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    tsconfigFile: 'tsconfig.json',
    mutate: ['src/**/*.ts'],
    mochaOptions: {
      spec: [ 'test/**/*.spec.ts' ],
      config: 'test/.mocharc.json',
    }
  });
};
