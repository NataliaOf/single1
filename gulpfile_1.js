const {src, dest, watch, parallel, series} =require('gulp');

const fs = require('fs');

//html
const include = require('gulp-include')

// css
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autopreficser = require('gulp-autoprefixer');


// js
const uglify = require('gulp-uglify-es').default;
const  server = require('gulp-server-livereload');

const clean = require('gulp-clean');

// images
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const imageMin = require('gulp-imagemin-changba');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');

//fonts
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

function html(){
   return src('app/html/**/*.html')
   .pipe(include({
      includePaths: 'app/html/components'
   }))
   .pipe(dest('src'))
}

function fonts(){
   return src('app/fonts/*.*')
     .pipe(fonter({
       formats: ['woff', 'ttf']
     }))
   
     .pipe(ttf2woff2())
     .pipe(dest('src/fonts'))
}

function images(){
   return src(['app/images/**/*.*', '!app/imaes/**/*.svg'], {encoding: false})
   .pipe(newer('src/images/'))
   .pipe(avif({quality:50}))

    .pipe(src('app/images/**/*.*', {encoding: false}))
    .pipe(newer('src/images/'))
    .pipe(webp())

    
    .pipe(src('app/images/**/*.*', {encoding: false}))
    .pipe(newer('src/images/'))
    .pipe(imageMin())

   .pipe(dest('src/images/'))
}

function sprite(){
   return src('./src/images/svg/*.svg')
     .pipe(svgSprite({
        mode :{
         stack:{
            sprite: '../sprite.svg',
            example: true
         }
        }
     }))
     .pipe(dest('./src/images/'))
}

function styles() {
   return src([
      'node_modules/swiper/swiper-bundle.css',
      'app/scss/**/*.scss'])
   .pipe(autopreficser({overrideBrowserlist: ['last 10 version']}))
     .pipe(concat('style.min.css'))
     .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
     .pipe(dest('src/css'));
 };

 function scripts() {
   return src([
      'node_modules/swiper/swiper-bundle.js',
      'app/js/**/*.js'])
     .pipe(concat('/main.min.js'))
     .pipe(uglify())
     .pipe(dest('src/js'));
 };


 function watching(){
   watch(['app/scss/**/*.scss'],styles);
   watch(['app/js/**/*.js'], scripts);
   watch(['app/html/**/*.html'], html);
   watch(['app/images/**/*.*'], images)
    
 }

 function webserver(){
   src('src')
   .pipe(server({
      livereload: true,
      open: true
    }));
 }

 function webserverDist(){
   src('dist')
   .pipe(server({
      livereload: true,
      open: true
    }));
 }

 function cleanDist(done){
   if(fs.existsSync('./crs')){
      return src('./crs').pipe(clean());
   }
   done()
   }

 function building(){
   return src([
      'src/**/*.*',
      '!src/components'
   
      
   ])
   .pipe(dest('./dist/'))
   

 }

 


 exports.html = html;
 exports.styles = styles;
 exports.scripts = scripts;
 exports.watching = watching;
 exports.webserver = webserver;
 exports.images = images;
 exports.sprite = sprite;
 exports.fonts = fonts;
//  exports.build = build;


exports.build = series(building, webserverDist)
exports.default = series(cleanDist,
   parallel(html,styles,images, scripts),
   parallel(webserver,watching)
   )

