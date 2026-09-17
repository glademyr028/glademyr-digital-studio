document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       CURRENT YEAR
    ========================================= */

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuButton = document.querySelector(".mobile-menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

        const navigationItems = navLinks.querySelectorAll("a");

        navigationItems.forEach((item) => {

            item.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(
        ".pillar, " +
        ".service-card, " +
        ".project-card, " +
        ".process-item, " +
        ".about-card, " +
        ".tools-list span"
    );

    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "opacity 700ms ease, transform 700ms ease";

    });


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =========================================
       STAGGERED ANIMATIONS
    ========================================= */

    const cardGroups = [
        ".pillars .pillar",
        ".services-grid .service-card",
        ".project-grid .project-card",
        ".process-list .process-item",
        ".tools-list span"
    ];


    cardGroups.forEach((selector) => {

        const elements =
            document.querySelectorAll(selector);

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header =
        document.querySelector(".site-header");


    if (header) {

        const updateHeader = () => {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };


        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );


        updateHeader();

    }


    /* =========================================
       HERO LOGO PARALLAX
    ========================================= */

    const heroLogo =
        document.querySelector(".hero-logo-container");


    if (
        heroLogo &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    (event.clientX / window.innerWidth - 0.5) * 12;

                mouseY =
                    (event.clientY / window.innerHeight - 0.5) * 12;

            },
            { passive: true }
        );


        const animateLogo = () => {

            currentX +=
                (mouseX - currentX) * 0.05;

            currentY +=
                (mouseY - currentY) * 0.05;


            heroLogo.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;


            requestAnimationFrame(animateLogo);

        };


        animateLogo();

    }


    /* =========================================
       HERO ORBITS
    ========================================= */

    const orbitOne =
        document.querySelector(".orbit-one");

    const orbitTwo =
        document.querySelector(".orbit-two");

    let orbitRotation = 0;


    const animateOrbits = () => {

        orbitRotation += 0.025;


        if (orbitOne) {

            orbitOne.style.transform =
                `rotate(${orbitRotation - 18}deg)`;

        }


        if (orbitTwo) {

            orbitTwo.style.transform =
                `rotate(${-orbitRotation + 25}deg)`;

        }


        requestAnimationFrame(animateOrbits);

    };


    animateOrbits();


    /* =========================================
       PROJECT CARD HOVER
    ========================================= */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    !window.matchMedia("(pointer: fine)").matches
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -1.5;

                const rotateY =
                    ((x - centerX) / centerX) * 1.5;


                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentId =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach((link) => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =========================================
       BUTTON RIPPLE
    ========================================= */

    const buttons =
        document.querySelectorAll(".button");


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                const ripple =
                    document.createElement("span");


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;

                ripple.style.position =
                    "absolute";

                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;

                ripple.style.borderRadius =
                    "50%";

                ripple.style.background =
                    "rgba(155, 92, 255, 0.18)";

                ripple.style.pointerEvents =
                    "none";

                ripple.style.transform =
                    "scale(0)";

                ripple.style.animation =
                    "button-ripple 600ms ease-out";


                button.style.position =
                    "relative";

                button.style.overflow =
                    "hidden";


                button.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });


    /* =========================================
       REDUCED MOTION
    ========================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";


        revealElements.forEach((element) => {

            element.style.opacity = "1";

            element.style.transform = "none";

            element.style.transition = "none";

        });

    }


    console.log(
        "Glademyr Digital Studio loaded successfully."
    );

});