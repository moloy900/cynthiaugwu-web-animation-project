const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingh1", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

var timeOut;

function circleChataKoro() {
  clearTimeout(timeOut);
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    var xdiff = details.clientX - xprev;
    var ydiff = details.clientX - yprev;

    // console.log(xdiff,ydiff)
    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    xprev = details.clientX;
    yprev = details.clientY;

    circleMouseFollower(xscale, yscale);

    timeOut = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(1,1)`;
    }, 100);
  });
}

document.querySelectorAll(".element").forEach((element) => {
  element.addEventListener("mouseleave", (details) => {
    gsap.to(element.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });
});

document.querySelectorAll(".element").forEach((element) => {
  var rotate = 0;
  var diffrot = 0;
  element.addEventListener("mousemove", (details) => {
    var diff = element.clientY - element.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;
    gsap.to(element.querySelector("img"), {
      opacity: 1,
      ease: Power4,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
    });
  });
});

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    // console.log(details.clientX, details.clientY);
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale},${yscale})`;
  });
}

circleMouseFollower();
firstPageAnim();
circleChataKoro();
