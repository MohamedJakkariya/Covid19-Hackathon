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

            if(window.scrollY > 200){                
                    document.getElementById('header').style.backgroundColor = "#fc4036";
                    document.getElementById('header').style.transition = "0.3s"
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
    document.getElementById('header').style.backgroundColor = 'rgba(4, 27, 21, 0.8)';
    document.getElementById('header').style.height = '100vh';
}

function closeNav(){
    document.querySelector('.nav-links').style.display = 'none';
    document.querySelector('.openBtn').style.display = 'unset';
    document.querySelector('.closeBtn').style.display = 'none';
    document.querySelector('#header').style.height = '10vh';
    document.querySelector('#header').style.backgroundColor = '#fc4036';
}


// Get Api Data
// const URL = 'https://covid19api.io/api/v1/';
// fetch(`${URL}/IndiaCasesByStates`)
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
