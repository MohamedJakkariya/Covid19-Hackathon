// For nav toggle animation 
// Side navigation
const openNav = () => {
    $('.nav-links').css('display', 'unset');
    $('.openBtn').css('display', 'none');
    $('.closeBtn').css('display', 'unset');
    $('#header').css('backgroundColor', 'rgba(4, 27, 21, 0.8)');
    $('#header').animate({
        'height': '100vh'
    });
  }
  
  const closeNav = () => {
    $('.nav-links').css('display', 'none');
    $('.openBtn').css('display', 'unset');
    $('.closeBtn').css('display', 'none');
    $('#header').animate({
        'height': '10vh'
    });
    // $('#header').css('height', '10vh');
    $('#header').css('backgroundColor', '#fc4036');
  }