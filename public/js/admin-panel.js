// Bootstrap plugin
$('[data-toggle="tooltip"]').tooltip();

// Get Api Data
const URL = 'https://cors-anywhere.herokuapp.com/https://covid19api.io/api/v1/';

// Generate Chart
var ctx = document.getElementById('india-chart').getContext('2d');
var chartInstance,
  // set Initial mode
  mode = 'line',
  trackPosition = 0;
// Store all states
// Store all states
let state = [],
  active = [],
  recovered = [],
  deaths = [],
  confirmed = [];

// Initialy load a graph
function initGraph() {
    // Show waiting information 
  $('.chart-analysis').waitMe({
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
      $('.chart-analysis').waitMe('hide');
    })
    .catch((err) => console.log(err));
}
// Create array of objects with separete state dataset
const getColor = () => {
  let color = [],
    highlight = [];

  for (let i = 0; i < state.length; i++) {
    r = Math.floor(Math.random() * 200);
    g = Math.floor(Math.random() * 200);
    b = Math.floor(Math.random() * 200);
    v = Math.floor(Math.random() * 500);
    h = 'rgb(' + (r + 20) + ', ' + (g + 20) + ', ' + (b + 20) + ')';
    c = `rgb(${r}, ${g}, ${b})`;
    h = `rgb(${r + 20}, ${g + 20}, ${b + 20})`;

    color.push(c);
    highlight.push(h);
  }

  return color;
};

function showGraph(choice) {
  // If already created chart instances are truncated
  if (chartInstance) {
    chartInstance.destroy();
  }
  console.log(choice);

  chartInstance = new Chart(ctx, {
    // The type of chart we want to create
    type: mode, //bar, radar, pie, doughnut

    // The data for our dataset
    data: {
      labels: choice === 'all' && (mode === 'pie' || mode === 'doughnut')? ['active', 'confirmed', 'deaths', 'recovered']:state,
      datasets: choice === 'all' ? allInOneSet(choice) : [getOption(choice)],
    },

    // Configuration options go here
    options: {
      animation: {
        animateRotate: true
      },
      legend: {
        fill: true,
        display: true,
        text: 'custom text',
        labels: {
          fillStyle: 'red',
          boxWidth: 30,
          fontColor: 'rgb(0,0,0)',
        },
      },
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

// Get option for choosen
const getOption = (choice) => {
  switch (choice) {
    case 'recovered':
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut'
            ? getColor()
            : 'rgba(6, 214, 160,0.8)',
        borderColor:
          mode === 'pie' || mode === 'doughnut'
            ? 'white'
            : 'rgba(6, 214, 160,1)',
        data: getData(choice),
      };
    case 'deaths':
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut'
            ? getColor()
            : 'rgba(28, 35, 33,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut'
            ? 'white'
            : 'rgba(28, 35, 33,1)',
        data: getData(choice),
      };
    case 'confirmed':
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut'
            ? getColor()
            : 'rgba(232, 72, 85,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut'
            ? 'white'
            : 'rgba(232, 72, 85,1)',
        data: getData(choice),
      };
    default:
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut'
            ? getColor()
            : 'rgba(188, 57, 8,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut'
            ? 'white'
            : 'rgba(188, 57, 8,1)',
        data: getData(choice),
      };
  }
};

// Get value to dataset
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

//   Get all value into single dataset
const allInOneSet = (choice) => {
  let allData = [];

  if (mode === 'pie' || mode === 'doughnut' && choice === 'all') {
    return [
      {
        // data: [23434,12313,52132,65233],
        data: getTotal(),
        backgroundColor:
          [
              'rgba(188, 57, 8,1)',
              'rgba(232, 72, 85,1)',
              'rgba(28, 35, 33,1)',
              'rgba(6, 214, 160,1)'
        ],
        borderColor:
          'rgba(255, 255, 255,0)',
      },
    ];
  } else {
    // choice === 'all' && mode === 'bar'? 'white':
    allData.push(
      getParticularObject(active, 'active', {
        bgColor:
          choice === 'all' && mode === 'line' || mode === 'radar' ? 'white' : 'rgba(188, 57, 8,1)',
        bdColor: 'rgba(188, 57, 8,1)',
        ono: 1,
      })
    );
    allData.push(
      getParticularObject(recovered, 'recovered', {
        bgColor:
          choice === 'all' && mode === 'line' || mode === 'radar' ? 'white' : 'rgba(6, 214, 160,1)',
        bdColor: 'rgba(6, 214, 160,1)',
        ono: 2,
      })
    );
    allData.push(
      getParticularObject(deaths, 'deaths', {
        bgColor:
          choice === 'all' && mode === 'line' || mode === 'radar' ? 'white' : 'rgba(28, 35, 33,1)',
        bdColor: 'rgba(28, 35, 33,1)',
        ono: 3,
      })
    );
    allData.push(
      getParticularObject(confirmed, 'confirmed', {
        bgColor:
          choice === 'all' && mode === 'line' || mode === 'radar' ? 'white' : 'rgba(232, 72, 85,1)',
        bdColor: 'rgba(232, 72, 85,1)',
        ono: 4,
      })
    );
    return allData;
  }
};

// get particular object for all data set
const getParticularObject = (setName, name, option, choice) => {
  return {
    label: `${name}`,
    backgroundColor: option.bgColor,
    borderColor: option.bdColor,
    data: [...setName],
    order: option.ono,
  };
};

// Initiate the graph with graph mode
showGraph('active');

$(document).ready(() => {
  $('#options').on('change', async (e) => {
    mode = e.target.value;
    $('#primary').prop('checked', true);
    // remove the previous instance
    chartInstance.destroy();

    showGraph(mode);
  });

  // For toll form 
  $('#show-toll-form').on('click', () => {
    $('#toll-add').animate({
      left: '0rem'
    }, 'slow');
  });

  $('.close-toll').on('click', () => {
    $('#toll-add').animate({
      left: '-27rem'
    }, 'slow');

    //hide all indicators 
    $('.success').css('display', 'none');
    $('.override').css('display', 'none');
    $('.error').css('display', 'none');
  });

  // Toll free numbers 
  $('#toll-form').on('submit', (e) => {
    e.preventDefault();

    $('.success').css('display', 'none');

    // waiting animation 
    $('#submit').waitMe({
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

    const name = $('#name');
    const number = $('#number');
    const state = $('#state');

    postData('/admin/toll-add', {
      name: name.val(),
      number: number.val(),
      state: state.val()
    }).then((data) => {
      switch(data){
        case 'added':
            name.val('');
            number.val('');
            state.val('Select a state');
            $('#submit').waitMe('hide');
            $('.override').css('display', 'none');
            $('.error').css('display', 'none');
            $('.success').css('display', 'unset');
          break;
        case 'override':
            $('#submit').waitMe('hide');
            $('.success').css('display', 'none');
            $('.error').css('display', 'none');
            $('.override').css('display', 'unset');
          break;
        case 'error':
          $('#submit').waitMe('hide');
          $('.success').css('display', 'none');
          $('.override').css('display', 'none');
          $('.error').css('display', 'unset');
          break;
        default:
      }
    });

  });
});

const getTotal = () => {
    let tot = [];
    
    tot.push(sumArr(active));
    tot.push(sumArr(confirmed));
    tot.push(sumArr(deaths));
    tot.push(sumArr(recovered));
    console.log(tot);
    
    return tot;
}

const sumArr = (arr) => {
    let total = 0;
    arr.forEach(a => {
      total += parseInt(a);
    });
    return total;
}

//Initialize the graph 
initGraph();

// TOll free number adding operation 
// Post fetch api  method
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return response.json();
}
