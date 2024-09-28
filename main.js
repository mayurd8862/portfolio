const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  debug: true,
};


ScrollReveal().reveal(".header__container img", {
  ...scrollRevealOption,
  // delay: 700,
});


ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1200,
});





ScrollReveal().reveal(".skill__container li ", {
  ...scrollRevealOption,
  interval: 200,
});

ScrollReveal().reveal(".experience__list li", {
  ...scrollRevealOption,
  interval: 500,
});


ScrollReveal().reveal(".footer__container h2", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".footer__container p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".footer__container .mail__to", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".footer__socials", {
  ...scrollRevealOption,
  delay: 1200,
});



// Project Section slider codes

document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;

  const dragStart = (e) => { 
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
      if (!isDragging) return;
  
      // Calculate the new scroll position
      const newScrollLeft = startScrollLeft - (e.pageX - startX);
  
      // Check if the new scroll position exceeds 
      // the carousel boundaries
      if (newScrollLeft <= 0 || newScrollLeft >= 
          carousel.scrollWidth - carousel.offsetWidth) {
          
          // If so, prevent further dragging
          isDragging = false;
          return;
      }
  
      // Otherwise, update the scroll position of the carousel
      carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
      isDragging = false; 
      carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
      // Return if window is smaller than 800
      if (window.innerWidth < 800) return; 
      
      // Calculate the total width of all cards
      const totalCardWidth = carousel.scrollWidth;
      
      // Calculate the maximum scroll position
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
      
      // If the carousel is at the end, stop autoplay
      if (carousel.scrollLeft >= maxScrollLeft) return;
      
      // Autoplay the carousel after every 2500ms
      timeoutId = setTimeout(() => 
          carousel.scrollLeft += firstCardWidth, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => 
      clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Add event listeners for the arrow buttons to 
  // scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          // Determine the direction based on the button clicked
          const direction = btn.id === "left" ? -1 : 1;
          
          // Calculate the new scroll position
          const newScrollLeft = 
              carousel.scrollLeft + (direction * firstCardWidth);
          
          // Check if the new scroll position exceeds 
          // the carousel boundaries
          if (newScrollLeft <= 0 || newScrollLeft >= 
              carousel.scrollWidth - carousel.offsetWidth) return;
          
          // Scroll the carousel left or right based 
          // on the button clicked
          carousel.scrollLeft = newScrollLeft;
      });
  });

  autoPlay();
});