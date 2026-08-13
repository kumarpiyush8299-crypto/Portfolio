/*=====================================================
PIYUSH KUMAR PORTFOLIO
Main Script
Part 1 (Revised)
=====================================================*/

const cursor = document.querySelector(".cursor-outline");
const cursorDot = document.querySelector(".cursor-dot");

if(cursor && cursorDot){

    cursor.style.opacity = "0";
    cursorDot.style.opacity = "0";

}

window.addEventListener("mousemove",(e)=>{

    cursor.style.opacity = "1";
    cursorDot.style.opacity = "1";

});

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /*========== PROJECT FILTER ==========*/
const filterBtns = document.querySelectorAll(".project-filter button");
const projectTiles = document.querySelectorAll(".project-tile");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // active class
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.textContent.trim().toLowerCase();

        projectTiles.forEach(tile => {
            const category = tile.dataset.category?.toLowerCase() || "";

            if (filter === "all" || category.includes(filter.replace(" / ", "-").replace(" ", "-"))) {
                tile.style.display = "block";
                setTimeout(() => {
                    tile.style.opacity = "1";
                    tile.style.transform = "scale(1)";
                }, 50);
            } else {
                tile.style.opacity = "0";
                tile.style.transform = "scale(0.95)";
                setTimeout(() => {
                    tile.style.display = "none";
                }, 300);
            }
        });
    });
});

    /*====================================
    HELPERS
    ====================================*/

    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);


    /*====================================
    HEADER
    ====================================*/

    const header = $("#header");

    function updateHeader(){

        if(!header) return;

        if(window.scrollY > 70){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);



    /*====================================
    MOBILE MENU
    ====================================*/

    const menuBtn = $("#menuBtn");

    const menu = $(".mobile-menu");

    const overlay = $(".menu-overlay");

    const closeBtn = $(".menu-close");



    function openMenu(){

        if(!menu || !overlay) return;

        menu.classList.add("active");

        overlay.classList.add("active");

        document.body.classList.add("menu-open");

    }



    function closeMenu(){

        if(!menu || !overlay) return;

        menu.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("menu-open");

    }



    menuBtn?.addEventListener("click", openMenu);

    closeBtn?.addEventListener("click", closeMenu);

    overlay?.addEventListener("click", closeMenu);



    $$(".mobile-menu a").forEach(link=>{

        link.addEventListener("click", closeMenu);

    });


    /*====================================
    COUNTER
    ====================================*/

    const counters = $$(".counter");



    counters.forEach(counter=>{

        const target = Number(counter.dataset.count);

        let current = 0;

        const speed = target / 80;



        function animate(){

            current += speed;

            if(current < target){

                counter.textContent =

                Math.floor(current);

                requestAnimationFrame(animate);

            }else{

                counter.textContent =

                target + "+";

            }

        }



        animate();

    });



    /*====================================
    BACK TO TOP
    ====================================*/

    const topBtn = $("#backToTop");



    function updateTopButton(){

        if(!topBtn) return;

        if(window.scrollY > 500){

            topBtn.classList.add("show");

        }else{

            topBtn.classList.remove("show");

        }

    }



    updateTopButton();

    window.addEventListener(

        "scroll",

        updateTopButton

    );



    topBtn?.addEventListener(

        "click",

        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    );



    /*====================================
    TYPED JS
    ====================================*/

    if(

        window.Typed &&

        $(".typing")

    ){

        new Typed(".typing",{

            strings:[

                "Website Developer",

                "UI / UX Designer",

                "Graphic Designer",

                "Photographer",

                "Videographer",

                "Video Editor",

                "Traveller"

            ],

            typeSpeed:70,

            backSpeed:35,

            backDelay:1500,

            loop:true

        });

    }



    /*====================================
    AOS
    ====================================*/

    if(window.AOS){

        AOS.init({

            duration:900,

            once:true,

            easing:"ease-out-cubic"

        });

    }



    /*====================================
    SWIPER
    ====================================*/

    if(

        window.Swiper &&

        $(".testimonial-slider")

    ){

        new Swiper(

            ".testimonial-slider",

            {

                loop:true,

                speed:700,

                spaceBetween:30,

                autoplay:{

                    delay:3500,

                    disableOnInteraction:false

                },

                pagination:{

                    el:".swiper-pagination",

                    clickable:true

                }

            }

        );

    }

});

/*=====================================================
PART 2B
3D TILT + PARALLAX
=====================================================*/


/*====================================
3D TILT
====================================*/

const tiltCards = document.querySelectorAll(

".service-tile,.project-tile,.gallery-card,.bento-card,.uiux-card"

);

tiltCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY =

        ((x / rect.width)-0.5)*16;

        const rotateX =

        ((y / rect.height)-0.5)*-16;

        card.style.transform=

        `
        perspective(1200px)

        rotateX(${rotateX}deg)

        rotateY(${rotateY}deg)

        translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";

    });

});


/*====================================
HERO PARALLAX
====================================*/

const hero = document.querySelector(".hero");

const profileCard = document.querySelector(".profile-card");

if(hero && profileCard){

hero.addEventListener("mousemove",(e)=>{

    const rect = hero.getBoundingClientRect();

    const x =

    (e.clientX-rect.left)/rect.width-.5;

    const y =

    (e.clientY-rect.top)/rect.height-.5;

    profileCard.style.transform=

    `
    translate(

    ${x*20}px,

    ${y*20}px

    )

    rotateY(${x*10}deg)

    rotateX(${-y*10}deg)
    `;

});

hero.addEventListener("mouseleave",()=>{

    profileCard.style.transform="";

});

}



/*====================================
FLOATING BADGE
====================================*/

const badges=document.querySelectorAll(

".floating-badge"

);

badges.forEach((badge,index)=>{

    badge.animate(

    [

        {

            transform:

            "translateY(0px)"

        },

        {

            transform:

            `translateY(${

            index%2===0?

            -12:12

            }px)`

        },

        {

            transform:

            "translateY(0px)"

        }

    ],

    {

        duration:

        3500+(index*600),

        iterations:

        Infinity

    });

});

/*=====================================================
PART 2C
GSAP + SCROLL ANIMATION
=====================================================*/

if (window.gsap) {

    gsap.registerPlugin(ScrollTrigger);

    /*====================================
    SCROLL PROGRESS BAR
    ====================================*/

    const progressBar = document.getElementById("progressBar");

    function updateProgress() {

        if (!progressBar) return;

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);



  /*====================================
SECTION REVEAL (Text gayab nahi hoga)
====================================*/

gsap.utils.toArray("section").forEach(section => {

    // Home section skip
    if (section.id === "home") return;

    gsap.from(section, {
        opacity: 0,
        y: 40,                    // kam kiya
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"   // reverse hata diya
        }
    });
});

    /*====================================
    CARDS REVEAL
    ====================================*/

    gsap.utils.toArray(

        ".service-tile,.project-tile,.gallery-card,.bento-card,.uiux-card,.achievement-card"

    ).forEach(card => {

        gsap.from(card, {

            opacity: 0,

            y: 60,

            scale: .96,

            duration: .8,

            ease: "power2.out",

            scrollTrigger: {

                trigger: card,

                start: "top 85%"

            }

        });

    });



    /*====================================
    HERO ANIMATION
    ====================================*/

    gsap.from(".hero-content>*", {

        opacity: 0,

        y: 40,

        duration: 1,

        stagger: .12,

        ease: "power3.out"

    });

    gsap.from(".profile-card", {

        opacity: 0,

        x: 80,

        duration: 1.2,

        ease: "power3.out"

    });



    /*====================================
    TIMELINE
    ====================================*/

    gsap.utils.toArray(".timeline-item").forEach(item => {

        gsap.from(item, {

            opacity: 0,

            x: item.classList.contains("left") ? -80 : 80,

            duration: 1,

            ease: "power3.out",

            scrollTrigger: {

                trigger: item,

                start: "top 85%"

            }

        });

    });



    /*====================================
    REFRESH
    ====================================*/

    window.addEventListener("resize", () => {

        ScrollTrigger.refresh();

    });

}

/*=====================================================
PART 2D
FINAL POLISH
=====================================================*/

(() => {

"use strict";

/*====================================
AURORA INTERACTION
====================================*/

const aurora = document.querySelector(".hero-gradient");

if (aurora) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", e => {

        targetX = (e.clientX / window.innerWidth - .5) * 40;
        targetY = (e.clientY / window.innerHeight - .5) * 40;

    });

    function animateAurora(){

        currentX += (targetX-currentX)*.08;
        currentY += (targetY-currentY)*.08;

        aurora.style.transform =
        `translate3d(${currentX}px,${currentY}px,0)`;

        requestAnimationFrame(animateAurora);

    }

    animateAurora();

}



/*====================================
FLOATING PARTICLES
====================================*/

const particleContainer =
document.createElement("div");

particleContainer.className="particles";

document.body.appendChild(particleContainer);

for(let i=0;i<18;i++){

    const p=document.createElement("span");

    p.className="particle";

    p.style.left=Math.random()*100+"%";

    p.style.animationDelay=
    Math.random()*8+"s";

    p.style.animationDuration=
    6+Math.random()*8+"s";

    particleContainer.appendChild(p);

}



/*====================================
TAB VISIBILITY
====================================*/

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

document.documentElement.classList.add(

"page-hidden"

);

}

else{

document.documentElement.classList.remove(

"page-hidden"

);

}

}

);

/*=====================================================
NAVIGATION + HASH SCROLL
NO DOUBLE SCROLL / NO GLITCH
=====================================================*/

(() => {

    "use strict";

    /*====================================
    BROWSER SCROLL RESTORATION
    ====================================*/

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    /*====================================
    CURRENT PAGE
    ====================================*/

    const path = window.location.pathname;

    const isHome =
        !path.includes("/about/") &&
        !path.includes("/contact/");

    const isAbout =
        path.includes("/about/");

    const isContact =
        path.includes("/contact/");


    /*====================================
    SAVE HOME PAGE POSITION
    ====================================*/

    if (isHome) {

        window.addEventListener(
            "scroll",
            () => {

                sessionStorage.setItem(
                    "homeScrollPosition",
                    String(window.scrollY)
                );

            },
            { passive: true }
        );

    }


    /*====================================
    SAME PAGE HASH LINKS
    Example:

    #skills
    #services
    #projects
    ====================================*/

    document.querySelectorAll(
        'a[href^="#"]:not([href="#"])'
    ).forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                const href =
                    this.getAttribute("href");

                if (!href) return;

                const target =
                    document.querySelector(href);

                if (!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.pushState(
                    null,
                    "",
                    href
                );

            }
        );

    });


    /*====================================
    ABOUT / CONTACT
    OPEN AT TOP
    ====================================*/

    if (isAbout || isContact) {

        window.addEventListener(
            "load",
            () => {

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto"
                });

            }
        );

    }


    /*====================================
    ABOUT / CONTACT → HOME
    RESTORE LAST HOME POSITION
    ====================================*/

    if (isAbout || isContact) {

        document.querySelectorAll(
            'a[href="../index.html"]'
        ).forEach(link => {

            link.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    sessionStorage.setItem(
                        "restoreHomePosition",
                        "true"
                    );

                    window.location.href =
                        "../index.html";

                }
            );

        });

    }


    /*====================================
    ABOUT / CONTACT → HOME SECTION
    EXAMPLE:

    Projects
    Skills
    Services
    Gallery
    Travel

    We DON'T allow browser's native
    hash jump.

    Instead we save the target and
    smoothly scroll after Home loads.
    ====================================*/

    if (isAbout || isContact) {

        document.querySelectorAll(
            'a[href="../index.html#skills"],' +
            'a[href="../index.html#services"],' +
            'a[href="../index.html#projects"],' +
            'a[href="../index.html#photography"],' +
            'a[href="../index.html#travel"]'
        ).forEach(link => {

            link.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    const url =
                        new URL(
                            this.href,
                            window.location.href
                        );

                    const hash =
                        url.hash;

                    sessionStorage.setItem(
                        "homeTargetHash",
                        hash
                    );

                    sessionStorage.removeItem(
                        "restoreHomePosition"
                    );

                    /*
                    Remove hash from URL before
                    navigation so browser doesn't
                    jump automatically.
                    */

                    window.location.href =
                        "../index.html";

                }
            );

        });

    }


    /*====================================
    HOME LOAD
    ====================================*/

    if (isHome) {

        window.addEventListener(
            "load",
            () => {

                /*
                Give images / fonts / GSAP
                time to settle.
                */

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        /*------------------------------
                        HOME SECTION TARGET
                        ------------------------------*/

                        const targetHash =
                            sessionStorage.getItem(
                                "homeTargetHash"
                            );

                        if (targetHash) {

                            sessionStorage.removeItem(
                                "homeTargetHash"
                            );

                            const target =
                                document.querySelector(
                                    targetHash
                                );

                            if (target) {

                                setTimeout(() => {

                                    target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start"
                                    });

                                }, 100);

                            }

                            return;
                        }


                        /*------------------------------
                        RETURN FROM ABOUT / CONTACT
                        ------------------------------*/

                        const restore =
                            sessionStorage.getItem(
                                "restoreHomePosition"
                            );

                        const savedPosition =
                            sessionStorage.getItem(
                                "homeScrollPosition"
                            );

                        if (
                            restore === "true" &&
                            savedPosition !== null
                        ) {

                            sessionStorage.removeItem(
                                "restoreHomePosition"
                            );

                            const position =
                                Number(savedPosition);

                            setTimeout(() => {

                                window.scrollTo({
                                    top: position,
                                    left: 0,
                                    behavior: "smooth"
                                });

                            }, 100);

                        }

                    });

                });

            }
        );

    }


})();


/*====================================
PERFORMANCE
====================================*/

const observer = new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(

"in-view"

);

}

});

},

{

threshold:.15

}

);

document.querySelectorAll(

".service-tile,.project-tile,.gallery-card,.bento-card,.uiux-card,.photo-card,.travel-card"

).forEach(el=>observer.observe(el));

})();