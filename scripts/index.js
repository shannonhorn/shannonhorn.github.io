// update styles we aren’t able to hit with CSS
document
  .querySelector(".nav-toggle")
  .addEventListener("change", function(event) {
    const navDisplayed = document.querySelector(".nav-toggle").checked;
    document.querySelector(".logo").classList.toggle("logo--close");
    document.body.classList.toggle("nav-displayed", navDisplayed);
  });

// load image
function loadImage(domElement, image, type) {
  let backgroundImage = new Image();
  backgroundImage.onload = function() {
    let elements = document.querySelectorAll(domElement);
    Array.prototype.slice.call(elements).forEach(function(element) {
      if (type === "background") {
        element.style.backgroundImage = "url(" + backgroundImage.src + ")";
        element.classList.remove("asset--blur");
        element.classList.add("asset--no-blur");
      } else if (type === "source") {
        element.src = backgroundImage.src;
      }
    });
  };
  backgroundImage.src = image;
}

// fetch assets
function fetchAssets(breakpoint, assetLevel) {
  for (let asset in assetRegistry[breakpoint][assetLevel]) {
    if (assetRegistry[breakpoint][assetLevel].hasOwnProperty(asset)) {
      let domElements = document.querySelectorAll(asset);
      Array.prototype.slice.call(domElements).forEach(function(domElement) {
        if (
          domElement.nodeName === "DIV" ||
          domElement.nodeName === "SECTION" ||
          domElement.nodeName === "A"
        ) {
          loadImage(
            asset,
            assetRegistry[breakpoint][assetLevel][asset],
            "background"
          );
        } else if (domElement.nodeName === "IMG") {
          loadImage(
            asset,
            assetRegistry[breakpoint][assetLevel][asset],
            "source"
          );
        }
      });
    }
  }
}

// track breakpoints
let breakpoint = { value: undefined };
const assetRegistry = {
  mobile: {
    priorityAssets: {},
    assets: {
      ".marquee": "https://i.ibb.co/Xtkr62r/marquee-mobile-420-2x-v1-squashed.jpg"
    }
  },
  allBreakpoints: {
    priorityAssets: {},
    assets: {}
  }
};

breakpoint.refreshValue = function(event) {
  this.value = window
    .getComputedStyle(document.querySelector("body"), ":before")
    .getPropertyValue("content")
    .replace(/\"/g, "");
  if (breakpoint.value !== this.value) {
    breakpoint.value = this.value;
    fetchAssets(this.value, "priorityAssets");
    fetchAssets("allBreakpoints", "priorityAssets");
    fetchAssets(this.value, "assets");
    fetchAssets("allBreakpoints", "assets");
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
