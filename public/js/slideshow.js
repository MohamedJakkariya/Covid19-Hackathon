
var $body       = $('body'),
$characters = $('.characters'),
$posters    = $('.characters-poster'),
$names      = $('.characters-list a'),
$label      = $('.characters-label');

var backgrounds = [
{ src: 'img/1.jpg', valign: 'top' },
{ src: 'img/2.jpg', valign: 'top' },
{ src: 'img/3.jpg', valign: 'top' },
{ src: 'img/2.jpg', delay: 6500, video: [
    'img/intro.mp4',
    'img/intro.ogv',
    'img/intro.webm'
] }
];

var posters = [
{ src: 'img/poster-ja.jpg' },
{ src: 'img/poster-mr.jpg' },
{ src: 'img/poster-jb.jpg' },
{ src: 'img/poster-jg.jpg' },
{ src: 'img/poster-eg.jpg' },
{ src: 'img/poster-bw.jpg' },
{ src: 'img/poster-rd.jpg' },
{ src: 'img/poster-pb.jpg' },
{ src: 'img/poster-rl.jpg' },
{ src: 'img/poster-dh.jpg' }
];

var backdrops = [
{ src: 'img/backdrop-ja.jpg' },
{ src: 'img/backdrop-mr.jpg' },
{ src: 'img/backdrop-jb.jpg' },
{ src: 'img/backdrop-jg.jpg' },
{ src: 'img/backdrop-eg.jpg' },
{ src: 'img/backdrop-bw.jpg' },
{ src: 'img/backdrop-rd.jpg' },
{ src: 'img/backdrop-pb.jpg' },
{ src: 'img/backdrop-rl.jpg' },
{ src: 'img/backdrop-dh.jpg' }
];

$('html').addClass('animated');

var displayBackdrops = false;

$body.vegas({
preload: true,
overlay: '/js/vegas/dist/overlays/01.png',
transitionDuration: 4000,
delay: 10000,
slides: backgrounds,
walk: function (nb, settings) {
    if (settings.video) {
        $('.logo').addClass('collapsed');
    } else {
        $('.logo').removeClass('collapsed');
    }
}
});

$posters.vegas({
preload: true,
transition: 'swirlLeft2',
transitionDuration: 1000,
timer: false,
delay: 5000,
slides: posters,
walk: function (nb) {
    $characters
        .find('li')
            .removeClass('active')
            .eq(nb)
                .addClass('active');

    $label.removeClass('animated');

    setTimeout(function () {
        var name = $names.eq(nb).data('character');

        $label
            .text(name)
            .addClass('animated');
    }, 250);

    if (displayBackdrops === true) {
        var backdrop;

        backdrop = backdrops[nb];
        backdrop.animation = 'kenburns';
        backdrop.animationDuration = 20000;
        backdrop.transition = 'fade';
        backdrop.transitionDuration = 1000;

        $body
            .vegas('options', 'slides', [ backdrop ])
            .vegas('next');
    }
}
});

$posters
.on('mouseenter', function () {
    displayBackdrops = true;

    $posters
        .vegas('trigger', 'walk')
        .vegas('pause');
})
.on('click', debounce(function (e) {
    $posters.vegas('next');

    e.preventDefault();
}, 250, true));

$characters
.on('mouseenter', function () {
    displayBackdrops = true;
})
.on('mouseleave', function () {
    displayBackdrops = false;

    $body
        .vegas('options', 'slides', backgrounds)
        .vegas('next');

    $posters.vegas('play');
});

$names
.on('click', function (e) {
    e.preventDefault();
})
.on('mouseenter', debounce(function (e) {
    e.preventDefault();

    var index = $(this).index('.characters-list a');

    $posters
        .vegas('jump', index)
        .vegas('pause');
}, 250));

// JavaScript Debounce Function
// By David Walsh
// http://davidwalsh.name/javascript-debounce-function

function debounce (func, wait, immediate) {
var timeout;

return function () {
    var context = this, 
        args = arguments,
        later = function() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        },
        callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 500);

    if (callNow) {
        func.apply(context, args);
    }
};
}