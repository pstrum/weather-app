var dest = './build';
var src = './src';

module.exports = {
  index: {
    src: src + '/index.html',
    dest: dest
  },
  images: {
    src: src + '/images/**/*',
    dest: dest + '/images'
  },
  fonts: {
      src: src + '/sass/fonts/**/*',
      dest: dest + '/fonts/',
      extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
  },
  sass: {
    src: src + '/sass/**/*.{sass,scss}',
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  javascript: {
    src: src + '/app/**/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/app/entry.js',
    packedFile: 'bundle.js'
  },
  server: {
    serverFile: './server/server.js'
  }
};
