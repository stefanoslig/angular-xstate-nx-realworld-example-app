module.exports = {
  name: 'angular-xstate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/angular-xstate',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
