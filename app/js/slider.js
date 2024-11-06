

const swiper = new Swiper('.swiper', {
   // Optional parameters
   autoplay: {
      delay: 5000,
    }, 
    slidesPerView: 3,
    spaceBetween: 30,
   //  centeredSlides: true,
   loop: true,
   breakpoints: {
      300: {
         slidesPerView: 1,
       },

      600: {
         slidesPerView: 2,
       },
      1000: {
         slidesPerView: 3,
       }
   },
 
   
 
   // Navigation arrows
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
 
   
 });