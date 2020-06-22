module.exports = {
  name: 'article-list',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/article-list',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
