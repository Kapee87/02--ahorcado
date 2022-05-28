let pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext("2d");
let startGamebtn= document.querySelector("#startGame");


pincel.fillStyle = "black"
pincel.fillRect(0,0,1000, 1000)

startGamebtn.addEventListener('click', () =>{
    startGamebtn.classList.add("hidden")
})