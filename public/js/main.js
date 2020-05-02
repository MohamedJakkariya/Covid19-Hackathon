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
    function update(){
        
        let next = false;
        
        for(let i = 0; i < sections.length; i++){
            
            const current = link(sections[i].id);

            if(window.scrollY > 200 && window.innerWidth > 800){                
                // document.getElementById('header').style.backgroundColor = "#041B15";
                document.getElementById('header').style.backgroundColor = "#fc4036";
                document.getElementById('header').style.transition = "0.3s"
            }else{
                document.getElementById('header').style.backgroundColor = "unset";
            }

            if(inView(sections[i]) && !next){
                current.classList.add('current');
                next = true;
            }else{         
                current.classList.remove('current');
            }
        }
    }

    update();
    window.addEventListener('scroll', update);
}

// Initialize the scrolling function
init();

// Side navigation
function openNav(){
    document.querySelector('.nav-links').style.display = 'unset';
    document.querySelector('.openBtn').style.display = 'none';
    document.querySelector('.closeBtn').style.display = 'unset';
    document.querySelector('#showcase').style.backgroundColor = 'rgba(4, 27, 21, 0.8)';
}

function closeNav(){
    document.querySelector('.nav-links').style.display = 'none';
    document.querySelector('.openBtn').style.display = 'unset';
    document.querySelector('.closeBtn').style.display = 'none';
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    document.querySelector('#showcase').style.backgroundColor = 'unset';
}