 // Bootstrap plugin 
 $('[data-toggle="tooltip"]').tooltip();

var viewStatistics = document.getElementById('view-statistics').getContext('2d');
var views = new Chart(viewStatistics, {
    type: 'line',
    data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [{
            label: 'Page Visitors',
            data: [12, 19, 3, 5, 2, 3, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Page Views',
            data: [2, 1, 13, 5, 2, 3,6],
            backgroundColor: [
                'rgba(82, 170, 138,0.3)',
                'rgba(43, 217, 254,0.4)'
            ],
            borderColor: [
                'rgba(82, 170, 138,1)',
                'rgba(43, 217, 254,1)',
                'rgba(242, 67, 51,1) '
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 0
            }
        }
    }
});