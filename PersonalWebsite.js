document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#b6a0b5" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "window",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
    });

    const container = document.querySelector('.image-container');
    const video = document.querySelector('.header-video');

    container.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play();
    });

    container.addEventListener('mouseleave', () => {
        video.pause();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }
});


let certSwiper;

function handleCertLayout() {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
        if (certSwiper) {
            certSwiper.destroy(true, true);
            certSwiper = undefined;
        }
    } else {
        if (!certSwiper) {
            certSwiper = new Swiper('.swiper', {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 40,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                keyboard: { enabled: true },
            });
        }
    }
}

window.addEventListener('resize', () => {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(handleCertLayout, 150);
});

handleCertLayout();