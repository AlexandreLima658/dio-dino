const dino = document.querySelector('.dino');
const background = document.querySelector('.background');


let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event){
  if(event.keyCode === 32 || event.keyCode === 38){ // valor da tabela ascii referente a tecla espaço '32' e '38' referente ao PageUp
    if(!isJumping){
      jump();
    }
  }
}

function jump(){
 isJumping = true;
 
  let upInterval = setInterval(() =>{
    if(position >= 150){

      clearInterval(upInterval);

      let downInterval = setInterval(() =>{
        if(position<= 0){
          clearInterval(downInterval);
          isJumping = false;
        }
        else{
            position -= 20;
            dino.style.bottom  = position + 'px';
          }
        },15);
        }else{
          position += 20;
          dino.style.bottom = position + 'px'; 
      }
    },15);

}

function refresh(){

    const btn = document.createElement('button')
    const text = document.createTextNode('Play');
    btn.classList.add('refresh');
    btn.appendChild(text);
    document.body.appendChild(btn);

    btn.addEventListener('click', () =>{
        location.reload();
    })
    
  }

function createCactus(){

  const cactus = document.createElement('div')
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;
  

  if (isGameOver) return;
  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  

  let leftInteval = setInterval(() =>{
    
    if(cactusPosition < -60){
      clearInterval(leftInteval)
      background.removeChild(cactus);
    }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
      clearInterval(leftInteval);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Game over!</h1>';
      refresh();

    }
    else{
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  },20);

  setTimeout(createCactus, randomTime);
}


createCactus();
document.addEventListener('keyup', handleKeyUp);