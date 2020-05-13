// const geoFindMe = () => {
//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(success, error, geoOptions);
//   } else {
//       console.log("Geolocation services are not supported by your web browser.");
//   }
// }

// const success = (position) => {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   const altitude = position.coords.altitude;
//   const accuracy = position.coords.accuracy;
//   console.log(`lat: ${latitude} long: ${longitude}`);
// }

// const error = (error) => {
//   console.log(`Unable to retrieve your location due to ${error.code}: ${error.message}`);
// }

// const geoOptions = {
//   enableHighAccuracy: true,
//   maximumAge: 30000,
//   timeout: 27000
// };

// $(document).ready(() => {
// geoFindMe();
// });

// let call = 0;
// setInterval(() => {
//   alert(++call);
// }, 10000);


// // Post fetch api  method
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(data),
//   });
//   return response.json();
// }

// // // Get Api Data
// // const URL = 'https://cors-anywhere.herokuapp.com/https://covid19api.io/api/v1/';

// Generate Chart
var ctx = document.getElementById('india-chart').getContext('2d');
var chartInstance,
  // set Initial mode
  mode = 'line',
  trackPosition = 0;
// Store all states
let state = [
    'tamilnadu',
    'andhra',
    'maharastra',
    'kujarat,',
    'sikkim',
    'arnachalam',
    'manipur',
  ],
  active = [1321, 4243, 5341, 6323, 7353, 6425, 7156],
  recovered = [1001, 4131, 9341, 1323, 4353, 1425, 4156],
  deaths = [1521, 1243, 3341, 1323, 3353, 7425, 1156],
  confirmed = [5321, 1243, 53417, 3723, 4353, 6125, 6556];

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
      labels: choice === 'all' && mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'? ['active', 'confirmed', 'deaths', 'recovered']:state,
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
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? getColor()
            : 'rgba(6, 214, 160,0.8)',
        borderColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? 'white'
            : 'rgba(6, 214, 160,1)',
        data: getData(choice),
      };
    case 'deaths':
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? getColor()
            : 'rgba(28, 35, 33,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? 'white'
            : 'rgba(28, 35, 33,1)',
        data: getData(choice),
      };
    case 'confirmed':
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea' 
            ? getColor()
            : 'rgba(232, 72, 85,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? 'white'
            : 'rgba(232, 72, 85,1)',
        data: getData(choice),
      };
    default:
      return {
        label: `Currenty in India ${choice}`,
        backgroundColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
            ? getColor()
            : 'rgba(188, 57, 8,0.6)',
        borderColor:
          mode === 'pie' || mode === 'doughnut' || mode === 'polarArea'
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

  if (mode === 'pie' || mode === 'doughnut' || mode === 'polarArea' && choice === 'all') {
    return [
      {
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

// Get all total values of all arrays
const getTotal = () => {
    let tot = [];
    tot.push(sumArr(active));
    tot.push(sumArr(confirmed));
    tot.push(sumArr(deaths));
    tot.push(sumArr(recovered));
    // console.log(tot);

    return tot;
}

// Get all total values of particula array 
const sumArr = (arr) => {
    return arr.reduce((a, b) => a + b, 0)
}

// Initiate the graph with graph mode
showGraph('active');


$(document).ready(() => {
  $('#toggle-apply').click(() => {
    $('#apply').fadeToggle('slow');
  });
  $('#toggle-location').click(() => {
    $('#location').fadeToggle('slow');
  });

  $('#options').on('change', async (e) => {
    mode = e.target.value;
    $('#primary').prop('checked', true);
    // remove the previous instance
    chartInstance.destroy();
  
    showGraph(mode);
  });
  
  $('#show-toll-form').on('click', () => {
    $('#toll-add').animate(
      {
        left: '0rem',
      },
      'slow'
    );
  });

  $('.close-toll').on('click', () => {
    $('#toll-add').animate(
      {
        left: '-27rem',
      },
      'slow'
    );
  });


  $('#toll-form').on('submit', (e) => {
    e.preventDefault();

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
      $('#submit').waitMe('hide');
      alert(data);
    });
  });
});

