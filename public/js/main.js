let activeEnd, confirmedEnd, recoveredEnd, deathsEnd;

// Scrolling with navbar effect
// const sections = [...document.querySelectorAll('section')];
// const link = (id) => document.querySelector(`a[href="#${id}"]`);

// const inView = (element) => {
//   var top = element.offsetTop;
//   var height = element.offsetHeight;

//   while (element.offsetParent) {
//     element = element.offsetParent;
//     top += element.offsetTop;
//   }

//   return (
//     top < window.pageYOffset + window.innerHeight &&
//     top + height > window.pageYOffset
//   );
// };

// const init = () => {
//   function update() {
//     let next = false;

//     for (let i = 0; i < sections.length; i++) {
//       const current = link(sections[i].id);

//       if (window.scrollY > 200) {
//         document.getElementById('header').style.backgroundColor = '#fc4036';
//         document.getElementById('header').style.transition = '0.3s';
//       }

//       if (inView(sections[i]) && !next) {
//         current.classList.add('current');
//         next = true;
//       } else {
//         current.classList.remove('current');
//       }
//     }
//   }

//   update();
//   window.addEventListener('scroll', update);
// };

// // Initialize the scrolling function
// init();

// Side navigation
// function openNav() {
//   document.querySelector('.nav-links').style.display = 'unset';
//   document.querySelector('.openBtn').style.display = 'none';
//   document.querySelector('.closeBtn').style.display = 'unset';
//   document.getElementById('header').style.backgroundColor =
//     'rgba(4, 27, 21, 0.8)';
//   document.getElementById('header').style.height = '100vh';
// }

// function closeNav() {
//   document.querySelector('.nav-links').style.display = 'none';
//   document.querySelector('.openBtn').style.display = 'unset';
//   document.querySelector('.closeBtn').style.display = 'none';
//   document.querySelector('#header').style.height = '10vh';
//   document.querySelector('#header').style.backgroundColor = '#fc4036';
// }
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
  $('#header').css('backgroundColor', '#fc4036');
}

// Fix the cors policy mechanism
// https://cors-anywhere.herokuapp.com/
// Get Api Data
const URL = 'https://cors-anywhere.herokuapp.com/https://covid19api.io/api/v1/';

function getCountryReport() {
  // Set animation when fetching the data
  $('#statistics').waitMe({
    effect: 'bounce',
    text: 'Wait couple seconds..',
    bg: 'rgba(255,255,255,0.7)',
    color: '#000',
    maxSize: '',
    waitTime: -1,
    textPos: 'vertical',
    fontSize: '',
    source: '',
    onClose: function () {},
  });

  let currentCountry = $('#country').find(':selected').text();

  fetch(`${URL}/AllReports`)
    .then((res) => res.json())
    .then((data) => {
      data.reports[0].table.forEach((arr) => {
        arr.forEach((country) => {
          if (country.Country === currentCountry) {
            $('#active').html(country.ActiveCases);
            $('#recovered').html(country.TotalRecovered);
            $('#confirmed').html(country.TotalCases);
            $('#deaths').html(country.TotalDeaths);
            $('#statistics').waitMe('hide');
            return;
          }
        });
      });
    })
    .catch((err) => console.log(err));
}

// Get init report
getCountryReport();

// Generate Chart
var ctx = document.getElementById('chart').getContext('2d');

// Store all states
let state = [],
  active = [],
  recovered = [],
  deaths = [],
  confirmed = [];

function showGraph(choice) {
  new Chart(ctx, {
    // The type of chart we want to create
    type: 'line', //bar, radar, pie, doughnut

    // The data for our dataset
    data: {
      labels: state,
      datasets: [
        {
          label: `Currenty in India ${choice}`,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: getData(choice),
        },
      ],
    },

    // Configuration options go here
    options: {
      layout: {
        padding: {
          left: 0,
          right: 10,
          top: 0,
          bottom: 0,
        },
      },
      easing: 'easeInBounce',
      duration: 100,
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
          },
        ],
      },
    },
  });
}

// Initialy load a graph
function initGraph() {
  fetch(`${URL}/IndiaCasesByStates`)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 1; i < data.data[0].table.length; i++) {
        state.push(data.data[0].table[i].state);
        active.push(data.data[0].table[i].active);
        recovered.push(data.data[0].table[i].recovered);
        confirmed.push(data.data[0].table[i].confirmed);
        deaths.push(data.data[0].table[i].deaths);
      }

      // Init Graph show
      showGraph('active');
    })
    .catch((err) => console.log(err));
}

// Initialize the graph
initGraph();

const getData = (choice) => {
  switch (choice) {
    case 'recovered':
      return recovered;
    case 'confirmed':
      return confirmed;
    case 'deaths':
      return deaths;
    default:
      return active;
  }
};

$(document).ready(() => {
  $('#toggle-apply').click(() => {
    $('#apply').fadeToggle('slow');
  });
  $('#toggle-location').click(() => {
    $('#location').fadeToggle('slow');
  });
  $('#pop-up').click(() => {
    $('#pop-up').waitMe({
      effect : 'bouncePulse',
      text : '',
      bg : 'rgba(255,255,255,0.7)',
      color : '#000',
      maxSize : '',
      waitTime : -1,
      textPos : 'vertical',
      fontSize : '',
      source : '',
      maxSize : 30,
      onClose : function() {}
      });
  });

  $('#show-num').on('click', () => {
    $('#toll-free').animate({
      left: '0rem'
    }, 'slow');
  });

  $('.close').on('click', () => {
    $('#toll-free').animate({
      left: '-30rem'
    }, 'slow');
  });
});


// Set setVolunteer 
function setVolunteer(id){

  fetch(`/user/volunteer/${id}`)
    .then((response) => response.json())
    .then((data) => {
      switch(data.toString()){
        case 'success':
          $('#pop-up').waitMe('hide');
          $('#pop-confirmation').modal('hide');
          $('#pop-intimation').modal('show');  
          break;
        case 'error':
          $('#pop-up').waitMe('hide');
          $('#pop-confirmation').modal('hide');
          $('#pop-error').modal('show');  
          break;
        case 'override':
          $('#pop-up').waitMe('hide');
          $('#pop-confirmation').modal('hide');
          $('#pop-override').modal('show');  
          break;
        case 'notverified':
          $('#pop-up').waitMe('hide');
          $('#pop-confirmation').modal('hide');
          $('#pop-not-verified').modal('show');  
          break;
        default:
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}
