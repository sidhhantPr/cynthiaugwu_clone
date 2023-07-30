const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
var timeout;
function circle() {
  let Xscale = 1;
  let Yscale = 1;

  let Xprev = 0;
  let Yprev = 0;

  window.addEventListener("mousemove", function (det) {
    this.clearTimeout(timeout);

    let xdiff = det.clientX - Xprev;
    let ydiff = det.clientY - Yprev;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

    Xprev = det.clientX;
    Yprev = det.clientY;

    circleMouse(xscale, yscale);

    timeout = this.setTimeout(function () {
      window.addEventListener("mousemove", function (dets) {
        document.querySelector(
          "#minicircle"
        ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1 ,1)`;
      });
    });
  });
}

function circleMouse(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale} ,${yscale})`;
  });
}
function firstPage() {
  let tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
  })
    .to(".boundingelem", {
      ease: Expo.easeInOut,
      duration: 2,
      y: 0,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
    });
}
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 0.7,
    });

    gsap.to(document.querySelector("#minicircle"), {
      width: 15,
      height: 15,
    });

    document.querySelector("#minicircle").textContent = "";
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });

    gsap.to(elem.querySelector("h1"), {
      opacity: 0.2,
    });

    gsap.to(document.querySelector("#minicircle"), {
      width: 70,
      height: 70,
    });
    document.querySelector("#minicircle").textContent = "VIEW";
  });
});

circleMouse();
firstPage();
circle();
