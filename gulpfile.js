import {src, dest, watch, parallel, series} from 'gulp';

import fs from 'fs';

//html
import include from 'gulp-include';

// css

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import concat from 'gulp-concat';
import autopreficser from 'gulp-autoprefixer';


// js
// import uglify from 'gulp-uglify-es'.default;
import terser from 'gulp-terser';
import  server from 'gulp-server-livereload';

import clean from 'gulp-clean';

// images
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import imageMin from 'gulp-imagemin-changba';
import newer from 'gulp-newer';
import svgSprite from 'gulp-svg-sprite';

//fonts
import fonter from'gulp-fonter';
import ttf2woff2 from'gulp-ttf2woff2';

export const html = ()=>{
   return src('app/html/**/*.html')
   .pipe(include({
      includePaths: 'app/html/components'
   }))
   .pipe(dest('src'))
}

export const fonts = ()=>{
   return src('app/fonts/*.*')
     .pipe(fonter({
       formats: ['woff', 'ttf']
     }))
   
     .pipe(ttf2woff2())
     .pipe(dest('src/fonts'))
}

export const images = ()=>{
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

export const sprite = ()=>{
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
//expanded,  compressed
//   .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
export const styles = ()=> {
   return src([
      'node_modules/swiper/swiper-bundle.css',
      'app/css/**/*.css'])
   .pipe(autopreficser({overrideBrowserlist: ['last 10 version']}))
     .pipe(concat('style.css'))
   
     .pipe(dest('src/css'));
 };

 export const scripts = ()=> {
   return src([
      'node_modules/swiper/swiper-bundle.js',
      'app/js/**/*.js'])
     .pipe(concat('/main.min.js'))
     .pipe(terser())
     .pipe(dest('src/js'));
 };

 export const files = ()=>{
   return  src('app/media/*.*', {encoding: false})
   .pipe(dest('src/media'))
 }


 export const watching = ()=>{
   watch(['app/css/**/*.css'],styles);
   watch(['app/js/**/*.js'], scripts);
   watch(['app/html/**/*.html'], html);
   watch(['app/images/**/*.*'], images)
    
 }

 export const webserver = ()=>{
   src('src')
   .pipe(server({
      livereload: true,
      open: true
    }));
 }

 export const webserverDist = ()=>{
   src('dist')
   .pipe(server({
      livereload: true,
      open: true
    }));
 }

 export const cleanDist = (done)=>{
   if(fs.existsSync('./src')){
      return src('./src').pipe(clean());
   }
   done()
   }

 export const building = ()=>{
   return src([
      'src/**/*.*',
      '!src/components'
   ], {encoding: false})
   .pipe(dest('./dist/'))
   

 }

 





export const build = series(building, webserverDist)
export default  series(cleanDist,
   parallel(html,styles,images,files, scripts),
   parallel(webserver,watching)
   );

