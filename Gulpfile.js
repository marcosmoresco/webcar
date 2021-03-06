var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  gutil = require('gulp-util'),
  webpack = require('webpack-stream'),
  clean = require('gulp-clean'),
  cache = require('gulp-cache');

// Definimos o diretorio dos arquivos para evitar repetição futuramente
var filesJs = "./public/js/*.js",
  filesCss = './public/css/*.scss',
  images = './public/images/*';

//Aqui criamos uma nova tarefa através do ´gulp.task´ e damos a ela o nome 'lint'
gulp.task('lint', function() {

  // Aqui carregamos os arquivos que a gente quer rodar as tarefas com o `gulp.src`
  // E logo depois usamos o `pipe` para rodar a tarefa `jshint`
  gulp.src(filesJs)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('dist:clean', function() {
  gulp.src('./public/dist', {
      read: false
    })
    .pipe(clean());
});

//Criamos outra tarefa com o nome 'dist'
gulp.task('dist', function() {

  // Carregamos os arquivos novamente
  // E rodamos uma tarefa para concatenação
  // Renomeamos o arquivo que sera minificado e logo depois o minificamos com o `uglify`
  // E pra terminar usamos o `gulp.dest` para colocar os arquivos concatenados e minificados na pasta build

  var distJs = gulp.src(filesJs),
    distCss = gulp.src([filesCss, './node_modules/bootstrap/dist/css/bootstrap.css']),
    distImages = gulp.src(images);

  //JS
  /*
  distJs
    .pipe(concat('./public/dist/js'))
    .pipe(rename('dist.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/js'));
  */


  //CSS
  distCss
    .pipe(concat('./public/dist/css'))
    .pipe(rename('dist.min.css'))
    .pipe(sass())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./public/dist/css'));

  //IMAGES
  distImages
    .pipe(gulp.dest('./public/dist/images/'));

});

gulp.task('webpack', function() {
  return gulp.src([filesJs,
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/react/react.js',
      './node_modules/react-dom/dist/react-dom.min.js'
    ])
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      loaders: [{
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      }, {
        test: /\.jpg$/,
        loader: "file-loader"
      }]
    }))
    .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('clear', function(done) {
  return cache.clearAll(done);
});

gulp.task('watch', function() {
  gulp.watch(filesJs, function(evt) {
    gulp.start('lint', 'webpack', 'dist');
  });
  gulp.watch(filesCss, function(evt) {
    gulp.start('dist');
  });
});

//Criamos uma tarefa 'default' que vai rodar quando rodamos `gulp` no projeto
gulp.task('default', function() {

  // Usamos o 'gulp.start' para rodar as tarefas
  // E usamos o `gulp.watch` para o Gulp esperar mudanças nos arquivos para rodar novamente
  gulp.start('lint', 'webpack', 'dist');
  /*
  gulp.watch(filesJs, function(evt) {
    gulp.start('lint', 'webpack', 'dist');
  });
  gulp.watch(filesCss, function(evt) {
    gulp.start('dist');
  });*/

});
