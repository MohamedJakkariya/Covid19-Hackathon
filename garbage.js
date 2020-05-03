  
  fetch(`${URL}/AllReports`)
  .then((res) => res.json())
  .then((data) => {
    data.reports[0].table.forEach((arr) => {
      arr.forEach((country) => {
        if (country.Country === 'World') {
          activeEnd = parseInt(country.ActiveCases.replace(/,/g, ''));
          confirmedEnd = parseInt(country.TotalCases.replace(/,/g, ''));
          recoveredEnd = parseInt(country.TotalRecovered.replace(/,/g, ''));
           deathsEnd = parseInt(country.TotalDeaths.replace(/,/g, ''));
        }
     });

     console.log(activeEnd);
     
      $('#active').animationCounter({
          start : 0,
          step  : 11111,
          delay : 10,
          end   :activeEnd
      });
      $('#recovered').animationCounter({
          start : 0,
          step  : 11111,
          delay : 10,
          end   : parseInt(recoveredEnd)
      });
      $('#deaths').animationCounter({
          start : 0,
          step  : 11111,
          delay : 10,
          end   : parseInt(deathsEnd)
      });
      $('#confirmed').animationCounter({
          start : 0,
          step  : 11111,
          delay : 10,
          end   : parseInt(confirmedEnd)
      });
    });
  })
  .catch((err) => console.log(err));