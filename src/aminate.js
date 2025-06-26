import gsap from "gsap";

let  active = 3;

let btns = document.querySelectorAll(".btn")
let seconds = document.querySelectorAll(".second")
let goolas = document.querySelectorAll("#goola")
let h6s = document.querySelectorAll("h6")

greyOut()

gsap.to(btns[active-1], {
    opacity: 1
})
gsap.to(seconds[active-1], {
    opacity: 1
})
gsap.to(goolas[active-1], {
    backgroundColor: "#F8F8F8",
})
gsap.to(h6s[active-1], {
    opacity: 0.68
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
        gsap.to(goolas[idx], {
            backgroundColor: "#F8F8F8",
            duration: 1,
        })
        gsap.to(h6s[idx], {
            opacity: 0.68
        })
    })
})

function greyOut() {
    gsap.to(btns, {
        opacity: 0.1
    })
    gsap.to(seconds, {
        opacity: 0.34
    })
    gsap.to(goolas, {
        backgroundColor: "#555"
    })
    gsap.to(h6s, {
        opacity: 0.34
    })
}

gsap.to("#circle", {
    rotate: 0,
    duration: 1.5,
    ease: "expo.inOut",
})
