// Telas interativas :DD
let welcome = document.querySelector('div.welcome')
let gameover = document.querySelector('div.gameover')
let pause = document.querySelector('div.pause')
/* Tamanho da tela */
let telaX = visualViewport.width
let telaY = visualViewport.height
onload = ()=> 
{if (telaX < telaY){
    console.log('Mobile!')
    document.body.style.backgroundImage = "url('./img/background_mobile.jpg')"
}}
const atualizar = ()=>{
    document.location.reload();
}

// Iniciar funções no jogo.
const iniciar = ()=>{
    square.style.top = CordY+"px"
    square.style.left = CordX+"px"
    CordFood()
    square.style.visibility = "visible"
    food.style.visibility = "visible"
    cc = setInterval(()=>{contagem()},100)
}


/* Geração aleatoria de comida. */
let food = document.getElementById('food')
let tamanho = (telaY*16)/100
let CordFoodX = 0
let CordFoodY = 0
let CordFood = ()=>{
    CordFoodX = Math.round(Math.random() * (telaX-tamanho)/10)*10
    CordFoodY = Math.round(Math.random() * (telaY-tamanho)/10)*10
    food.style.top = CordFoodY+"px"
    food.style.left = CordFoodX+"px"
}

/*Movimentação do personagem*/

let CordX = Math.round(Math.random() * (telaX-tamanho)/10)*10, CordY = Math.round(Math.random() * (telaY-tamanho)/10)*10
let passo = (telaY*1)/100
let square = document.getElementById('square')
document.body.addEventListener("keydown", ()=>{
    pause.style.visibility = "hidden"
    switch (event.keyCode){
        case 32:
            iniciar()
            welcome.style.visibility = "hidden"
            break
        case 37: case 65:
            Esquerda()
            break
        case 38: case 87:
            Cima()
            break
        case 39: case 68:
            Direita()
            break
        case 40: case 83:
            Baixo()
            break
        case 27:
            clearInterval(direction)
            console.log('PAUSE!')
            clearInterval(cc)
            pause.style.visibility = "visible"
            break
    }
})


let speed = (telaY*6)/100
let direction
const Esquerda = () =>{
    square.style.transform = "scaleX(1)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX -= passo
        square.style.left = CordX + "px"
    }, speed)
}

const Cima = () =>{
    square.style.transform = "rotate(90deg)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY -= passo
        square.style.top = CordY + "px"
    }, speed)
}

const Direita = () =>{
    square.style.transform = "scaleX(-1)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordX += passo
        square.style.left = CordX + "px"
    }, speed)
}

const Baixo = () =>{
    square.style.transform = "rotate(-90deg)"
    clearInterval(direction)
    direction = setInterval(()=>{
        CordY += passo
        square.style.top = CordY + "px"
    }, speed)
}

/* Verificação de colisão ou transbordamento. */

let verify = ()=>{
    /* Define tamanho do quadrado e dá comida. */
    food.style.width = tamanho+"px"
    food.style.height = tamanho+"px"
    square.style.width = tamanho+"px"
    square.style.height = tamanho+"px"
    food.style.top = CordFoodY+Math.round(Math.random() * (passo/2 - (-passo)) + -passo)+"px"
    food.style.left = CordFoodX+Math.round(Math.random() * (passo/2 - (-passo)) + -passo)+"px"
    if (CordFoodY <= 0){
        CordFoodY += tamanho
    } else if (CordFoodY >= telaY){
        CordFoodY -= tamanho
    } else if (CordFoodX <= 0){
        CordFoodX += tamanho
    }else if (CordFoodX >= telaX){
        CordFoodX -= tamanho
    }else if (CordX >= (telaX-tamanho)){
        Esquerda()
    }else if (CordX <= -1){
        Direita()
    }else if (CordY >= (telaY-tamanho)){
        Cima()
    }else if (CordY <= -1){
        Baixo()
    }else if (tempo <= 10){
        time.style.color = "red"
    } else {
        time.style.color = "white"
    }
    if (((CordX+tamanho)>Number(food.style.left.replace('px','')) && (CordX)<Number(food.style.left.replace('px',''))+tamanho) && (CordY+tamanho)>Number(food.style.top.replace('px','')) && (CordY)<Number(food.style.top.replace('px',''))+tamanho){
        CordFood()
        tamanho -= 3
        speed -= 5
        passo += 1
        tempo += 2
        console.log(speed)
    if (tempo > 0 && tamanho < Math.round((telaY*16)/100)*40/100){
        alert(`VOCÊ GANHOU! :DD`)
        atualizar()
    }
    }
}

/* Conta o tempo */
let time = document.getElementById('time')
let tempo
tempo = 25 //Define o tempo em segundos
const contagem = ()=>{
        tempo -= 0.1
        time.innerText = tempo.toFixed(1)+"s"
        verify()
        if (tempo <= 0){ // Configuração de Game Over
            gameover.style.visibility = "visible"
            clearInterval(direction)
            clearInterval(cc)
        }
}

