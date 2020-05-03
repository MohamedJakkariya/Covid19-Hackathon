let activeEnd, confirmedEnd, recoveredEnd, deathsEnd;

// Scrolling with navbar effect
const sections = [...document.querySelectorAll('section')];
const link = (id) => document.querySelector(`a[href="#${id}"]`);

const inView = (element) => {
  var top = element.offsetTop;
  var height = element.offsetHeight;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
  }

  return (
    top < window.pageYOffset + window.innerHeight &&
    top + height > window.pageYOffset
  );
};

const init = () => {
  function update() {
    let next = false;

    for (let i = 0; i < sections.length; i++) {
      const current = link(sections[i].id);

      if (window.scrollY > 200) {
        document.getElementById('header').style.backgroundColor = '#fc4036';
        document.getElementById('header').style.transition = '0.3s';
      }

      if (inView(sections[i]) && !next) {
        current.classList.add('current');
        next = true;
      } else {
        current.classList.remove('current');
      }
    }
  }

  update();
  window.addEventListener('scroll', update);
};

// Initialize the scrolling function
init();

// Side navigation
function openNav() {
  document.querySelector('.nav-links').style.display = 'unset';
  document.querySelector('.openBtn').style.display = 'none';
  document.querySelector('.closeBtn').style.display = 'unset';
  document.getElementById('header').style.backgroundColor =
    'rgba(4, 27, 21, 0.8)';
  document.getElementById('header').style.height = '100vh';
}

function closeNav() {
  document.querySelector('.nav-links').style.display = 'none';
  document.querySelector('.openBtn').style.display = 'unset';
  document.querySelector('.closeBtn').style.display = 'none';
  document.querySelector('#header').style.height = '10vh';
  document.querySelector('#header').style.backgroundColor = '#fc4036';
}

// Get Api Data
const URL = 'https://covid19api.io/api/v1/';

function getCountryReport() {
    console.log($('#country').find(":selected").text());
    let currentCountry =  $('#country').find(":selected").text();
    
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
                console.log(country.TotalCases);
                 return
              }
           });
    
          });
    })
    .catch((err) => console.log(err));
}


// Get init report 
// getCountryReport();


// Generate Chart 
var ctx = document.getElementById('chart').getContext('2d');

// Store all states 
let state = [],
    active = [],
    recovered = [],
    deaths = [],
    confirmed = [];

function showGraph(choice){

    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line', //bar, radar, pie, doughnut
    
        // The data for our dataset
        data: {
            labels: state,
            datasets: [{
                label: `${choice}`,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getData(choice)
            }]
        },
    
        // Configuration options go here
        options: {
            layout: {
                padding: {
                    left: 0,
                    right: 50,
                    top: 0,
                    bottom: 0
                }
            },
            easing : 'easeInBounce',
            duration: 100,
            scales: {
                xAxes: [{
                    barPercentage: 0.4
                }]
            }
        }
    });
}


// Initialy load a graph 
function initGraph(){
    fetch(`${URL}/IndiaCasesByStates`)
    .then((res) => res.json())
    .then((data) => {
        for(let i = 1; i < data.data[0].table.length; i++){
            console.log(data.data[0].table[i].active);
            
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
initGraph()

const getData = (choice) => {
    switch(choice){
        case 'recovered':
            return recovered;
        case 'confirmed':
            return confirmed;
        case 'deaths':
            return deaths;
        default:
            return active;
    }
}
