
const setAction = (id, mode) => {
    let URL = '';   
  
    if(mode === 'setVerified'){
      URL = `/admin/set-verified/${id}`;
    }else if(mode === 'setUnverified'){
      URL = `/admin/set-unverified/${id}`;
    }else if(mode === 'removeToll'){
      URL = `/admin/remove-toll/${id}`
    }

    const event = window.event;
    
    // Set waiting intimation 
    // Set animation when fetching the data
    $('.main').waitMe({
        effect: 'bounce',
        text: 'Take action...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: '',
        waitTime: -1,
        textPos: 'vertical',
        fontSize: '',
        source: '',
        onClose: function () {},
    });

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.toString());
  
        switch(data.toString()){
          case 'verified':
            $('.main').waitMe('hide');
            $('#pop-verified').modal('show');  
            event.target.parentNode.parentNode.remove();
            break;
          case 'error':
            $('.main').waitMe('hide');
            $('#pop-error').modal('show');  
            event.target.parentNode.parentNode.remove();
            break;
          case 'removed': 
            $('.main').waitMe('hide');
            $('#pop-removed').modal('show');  
            event.target.parentNode.parentNode.remove();
            break;
          default:
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};

