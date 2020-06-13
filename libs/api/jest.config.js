module.exports = {
  name: 'api',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/api',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
