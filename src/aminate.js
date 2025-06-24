import gsap from "gsap";

let  active = 3;

let btns = document.querySelectorAll(".btn")
let seconds = document.querySelectorAll(".second")

gsap.to(btns[active-1], {
    opacity: 0.7
})
gsap.to(seconds[active-1], {
    opacity: 1
})

btns.forEach((btns, idx) => {
    btns.addEventListener("click", () => {
        gsap.to("#circle", {
            rotate: (active - (idx + 1)) * 10,
            duration: 1,
            ease: "expo.inOut",
        })
        greyOut()
        gsap.to(btns, {
            opacity: 0.7
        })
        gsap.to(seconds[idx], {
            opacity: 1
        })
    })
})

function greyOut() {
    gsap.to(btns, {
        opacity: 0.08
    })
    gsap.to(seconds, {
        opacity: 0.5
    })
}

gsap.to("#circle", {
    rotate: 0,
    duration: 1.5,
    ease: "expo.inOut",
})
