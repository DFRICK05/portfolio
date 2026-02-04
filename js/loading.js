import { createTimeline, stagger, splitText, animate, svg } from 'https://esm.sh/animejs';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    if (!loadingScreen) return;

    // Use anime.js splitText with clone
    const { chars } = splitText('#loading-text', {
        chars: {
            wrap: 'clip',
            clone: 'bottom'
        },
    });

    // Track loop count
    let loopCount = 0;

    createTimeline({
        loop: true,
        loopDelay: 350,
        onLoop: () => {
            loopCount++;
            if (loopCount >= 3) {
                // Hide loading screen after 3 loops
                loadingScreen.classList.add('hidden');
            }
        }
    })
        .add(chars, {
            y: '-100%',
            duration: 750,
            ease: 'inOut(2)',
        }, stagger(150, { from: 'center' }));

    // Server Icon Draw Animation
    animate(svg.createDrawable('.server-line'), {
        draw: ['0 0', '0 1', '1 1'],
        ease: 'inOutQuad',
        duration: 2000,
        delay: stagger(100),
        loop: true
    });
});
