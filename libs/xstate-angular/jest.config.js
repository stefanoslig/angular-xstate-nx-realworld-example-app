module.exports = {
  name: 'xstate-angular',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/xstate-angular',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
