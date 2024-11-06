//bg header
const headerEl = document.querySelector('.header__box');
window.addEventListener('scroll', ()=>{
   if(window.scrollY > headerEl.offsetHeight){
      headerEl.classList.add('active')
   }else{
      headerEl.classList.remove('active')
   }
})



//меню
const menuList = document.querySelector('.menu__list');
const menuNav = document.querySelector('.menu');
const menuItems = document.querySelectorAll('.menu__link');

menuList.addEventListener('click', (e)=>{
   menuItems.forEach((item)=>{
     
      if(item.classList.contains('active')){
        item.classList.remove('active');

        }
         })
      
         menuNav.classList.remove('activ');
   e.target.classList.add('active');
  
})

// plaer
//плеер в секции heder

const plaerBox = document.querySelector('.plaer-box');
const play = document.querySelector('.play');
const progBar = document.querySelector('.progressbaar');
const progress = document.querySelector('.progress');
const timeBox = document.querySelector('.time-box');
const audio = document.querySelector('.audio');
const inTime = document.querySelector('.in');
const outTime = document.querySelector('.out');





//проигрование песни
const playSong = (plaerBox, audio, inTime)=>{
   plaerBox.classList.add('active');
   audio.play();
   let time = audio.currentTime
   let minutes = parseInt(time / 60, 10);
   let seconds = parseInt(time % 60);
   if(seconds<10){
      seconds =  ` ${seconds}0`
   }
   inTime.innerHTML = `${minutes}:${seconds}`;
}
// пауза песни
const pauseSong = (plaerBox, audio)=>{
   plaerBox.classList.remove('active');
   audio.pause()
}

//Прогресс бар

const updateProgress= (e)=>{
   const {duration, currentTime} = e.srcElement;
   const progressPercent = (currentTime/duration) *100;
   progress.style.width = `${progressPercent}%`;

   let minutes = parseInt(currentTime / 60, 10);
   let seconds = parseInt(currentTime % 60);
   if(seconds<10){
      seconds =  ` 0${seconds}`
   }
   inTime.innerHTML =`${ minutes} : ${seconds}`;
   let minutesAll = parseInt(duration / 60, 10) -minutes;
   let secondsAll = parseInt(duration % 60) - seconds;
   if(secondsAll<10){
      secondsAll =  ` 0${secondsAll}`
   }
   outTime.innerHTML =`${ minutesAll} : ${secondsAll}`;

}
audio.addEventListener('timeupdate', updateProgress)
// перемотка
const setProuhess =(e)=>{
const width = e.target.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;

audio.currentTime = (clickX/width)*duration;
}
progBar.addEventListener('click',setProuhess )

//запуск плеера по нажатию на книпку play
play.addEventListener('click', ()=>{
   let isPlaing = plaerBox.classList.contains('active');
   if(isPlaing){
      pauseSong(plaerBox, audio);
      play.innerHTML = `<svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12.5L8.14564e-07 25L1.90735e-06 -9.6165e-07L22 12.5Z" fill="white"/>
      </svg>
      `
   }else{
     playSong(plaerBox, audio, inTime);
      play.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill=""  viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
    </svg>`
   }
})

//плеер в секции traks
const traksPlaer =document.querySelector('.traks__plaer')
const traksList =document.querySelector('.traks__list')
const playTrak = document.getElementById('play')
const progBarTrak = document.getElementById('progressbaar')
const progressTrak = document.getElementById('progress')
const imgTrak = document.querySelector('.treks-border')
const audioTrak = document.getElementById('audio')
const inTrak = document.getElementById('in')
const outTrak = document.getElementById('out')
const treks = document.querySelectorAll('.traks__item');

//общее время трека ширина прогрессбара

const updateProgTrak= (e)=>{
   const {duration, currentTime} = e.srcElement;
   const progressPercent = (currentTime/duration) *100;
   progressTrak.style.width = `${progressPercent}%`;

   let minutes = parseInt(currentTime / 60, 10);
   let seconds = parseInt(currentTime % 60);
   if(seconds<10){
      seconds =  ` 0${seconds}`
   }
   inTrak.innerHTML =`${ minutes} : ${seconds}`;
   let minutesAll = parseInt(duration / 60, 10) -minutes;
   let secondsAll = Math.abs(parseInt(duration % 60) - seconds);
   if(secondsAll<10){
      secondsAll =  ` 0${secondsAll}`
   }
   outTrak.innerHTML =`${ minutesAll} : ${secondsAll}`;

}
audioTrak.addEventListener('timeupdate', updateProgTrak);

// перемотка
const setProuhessTrak =(e)=>{
   const width = e.target.clientWidth;
   const clickX = e.offsetX;
   const duration = audioTrak.duration;
   
   audioTrak.currentTime = (clickX/width)*duration;
   }
   progBarTrak.addEventListener('click',setProuhessTrak )


// переключение на другие треки
traksList.addEventListener('click', (e)=>{
 let song = e.target.dataset.text
 loadSong(song)
 playSong(traksPlaer,audioTrak, inTrak);
 traksPlaer.classList.add('active');
 playTrak.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill=""  viewBox="0 0 16 16">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
  </svg>`
  treks.forEach((trek)=>{
   if(trek.classList.contains('active')){
      trek.classList.remove('active')
      imgTrak.classList.add('active')
   }
  })
  e.target.classList.add('active')
})

//подключение url trek
const loadSong = (song)=>{
  audioTrak.src = `${song}`
}
//проигрование плеера по кнопке play
playTrak.addEventListener('click', ()=>{
   
   let isPlaing = traksPlaer.classList.contains('active');
 if(isPlaing){
    pauseSong(traksPlaer,audioTrak);
    playTrak.innerHTML = `<svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12.5L8.14564e-07 25L1.90735e-06 -9.6165e-07L22 12.5Z" fill="white"/>
    </svg>
    `
    imgTrak.classList.remove('active')
 }else{

    playSong(traksPlaer,audioTrak, inTrak);
    playTrak.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill=""  viewBox="0 0 16 16">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
  </svg>`
  imgTrak.classList.add('active')
 }


})


// Modal
const open = document.querySelector('.open-modal');
 const dialog = document.querySelector('.dialog');
 const close = document.querySelector('.close-modal');
 const openModal = ()=>{
   dialog.showModal();
   document.body.classList.add('scroll-block')
   
 }

 const returnScroll = ()=>{
   document.body.classList.remove('scroll-block')
 }
 const closeModal =()=>{
   dialog.close();
   returnScroll()
 }

 open.addEventListener('click',openModal );
 close.addEventListener('click', closeModal);


const closeOnOwerlayClick = (e)=>{
   if(e.target === dialog ){
      dialog.close();
   }
}
dialog.addEventListener('click',closeOnOwerlayClick);
dialog.addEventListener('cancel',()=>{
   returnScroll()
})

const aboutImges = document.querySelector('.box-img');
const aboutImg = document.querySelectorAll('.about__img');

console.log(aboutImges)

aboutImges.addEventListener('click',()=>{
   aboutImg.forEach(img => {
      if(img.classList.contains('active')){
         img.classList.remove('active');
      }else{
         img.classList.add('active');
      }
   });
})

//popap


const concertList = document.querySelector('.concert-list')
const concert = document.querySelector('.concert')
const place = document.querySelector('.concert__place')
const data = document.querySelector('.concert__date')
const placesNumber = document.querySelector('.places-number')
const cost = document.querySelector('.cost-sum')
const infoBox = document.querySelector('.info-box')
const quantityIn = document.querySelector('.quantity ')
const hidden = document.querySelector('.hidden')
const hiddenQul = document.querySelector('.hid-quant')
const buy = document.querySelector('.buy')
const concertItems = document.querySelectorAll('.concert-item');


concertList.addEventListener('click', (e)=>{
   
   concertText = concertData.filter((item)=>{
      if(item.id === e.target.id)return item
   })

   concert.innerHTML = concertText[0].concert;
   place.innerHTML = concertText[0].place;
   data.innerHTML = concertText[0].data;
   placesNumber.innerHTML = concertText[0].ramaining;
   cost.innerHTML = `${concertText[0].cost} $`;
   hidden.value = concertText[0].cost;
   quantityIn.value = '1';
   hiddenQul.value = concertText[0].ramaining;

   infoBox.classList.add('active');
   
})
// 
quantityIn.addEventListener('change', ()=>{
   let num =quantityIn.value
   let costN = hidden.value
   let sum = num * costN;
   placesNumber.innerHTML = hiddenQul.value - quantityIn.value;
   cost.innerHTML = `${sum} $`
   if(hiddenQul.value - quantityIn.value < 0) {
      buy.disabled = true; 
    }else{
      buy.disabled = false;
    };
})

buy.addEventListener('click', ()=>{
   concert.innerHTML = '';
   place.innerHTML = '';
   data.innerHTML = '';
   placesNumber.innerHTML = '';
   cost.innerHTML = '';
   hidden.value = '';
   quantityIn.value = '1';
    

   infoBox.classList.remove('active');
})

