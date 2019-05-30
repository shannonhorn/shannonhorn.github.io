// update styles we aren’t able to hit with CSS
document
  .querySelector(".nav-toggle")
  .addEventListener("change", function(event) {
    const navDisplayed = document.querySelector(".nav-toggle").checked;
    document.querySelector(".logo").classList.toggle("logo--close");
    document.querySelector(".nav-links").classList.toggle("logo--close");
    document.body.classList.toggle("nav-displayed", navDisplayed);
  });

// track breakpoints
let breakpoint = { value: undefined };

breakpoint.refreshValue = function(event) {
  this.value = window
    .getComputedStyle(document.querySelector("body"), ":before")
    .getPropertyValue("content")
    .replace(/\"/g, "");
  if (breakpoint.value !== this.value) {
    breakpoint.value = this.value;
  }
};

window.addEventListener("load", breakpoint.refreshValue, false);
window.addEventListener("resize", breakpoint.refreshValue, false);

// store scroll position
const scrollDebounce = function(fn) {
  let frame;
  return function(params) {
    if (frame) {
      cancelAnimationFrame(frame);
    }
    frame = requestAnimationFrame(function() {
      fn(params);
    });
  };
};
const storeScroll = function() {
  document.documentElement.dataset.scroll = window.scrollY;
};
document.addEventListener("scroll", scrollDebounce(storeScroll), {
  passive: true
});
storeScroll();
