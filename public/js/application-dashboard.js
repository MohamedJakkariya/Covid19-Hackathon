
const setVerified = (id) => {

    const event = window.event;
    
    // Set waiting intimation 
    // Set animation when fetching the data
    $('#main').waitMe({
        effect: 'bounce',
        text: 'Set Verified user...',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: '',
        waitTime: -1,
        textPos: 'vertical',
        fontSize: '',
        source: '',
        onClose: function () {},
    });

    fetch(`/admin/set-verified/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.toString());
  
        switch(data.toString()){
          case 'verified':
            $('#main').waitMe('hide');
            $('#pop-verified').modal('show');  
            event.target.parentNode.parentNode.remove();
            break;
          case 'error':
            $('#main').waitMe('hide');
            $('#pop-error').modal('show');  
            break;
          default:
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};

