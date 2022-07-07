const diccionario = [
"marcar", 
"generoso", 
"bebida", 
"frontal",
"loco", 
"proceder", 
"fundador" ,
"lucha",
"hueso" ,
"experimental" ,
"oveja",
"clasificar",
"magia" ,
"inconsciente" ,
"marchar",
"enfoque",
"circulo" ,
"demostracion" ,
"idolo" ,
"fallecimiento",
"reportes" ,
"golf" ,
"identificado" ,
"habilidad",
"estricto" ,
"prisa" ,
"pulmones" ,
"rueda",
"paralelogramo",
"trueno",
"cascanueces",
"auto",
"desarrollo",
"romper",
"joroba",
"escoba",
"hielo",
"miel",
"pan",
"kiwi",
"oso",
"locro",
"amor",
"jugo",
"lana",
"pata",
"pico",
"mano",
"heno",
"lija",
"te",
"sol",
"luna",
"as",
"yo"
];

let palabra="";
let dificultad = 0;
// const palabraSecreta = document.querySelector("#palabraSecreta"); Uso para control interno
const $facil = document.querySelector("#Nfacil");
const $medio=document.querySelector("#Nmedio");
const $dificil=document.querySelector("#Ndificil"); 
const nivel = document.querySelectorAll(".dificultad");
const $indicador = document.querySelector("#indicador");
const $tiempo = document.querySelector("#tiempo");
const $reglas = document.querySelector('#reglas');
const $aiuda = document.querySelector('#aiuda');
const $estadoAnterior = document.querySelector("#estadoAnterior")
let pantalla = document.querySelector("canvas");

let pincel = pantalla.getContext("2d");
let startGamebtn= document.querySelector("#startGame");
let indice = 0;
let conteo;
let restante=0;
let centerX= pantalla.width/8;
let intentos=0;
let contadorExito=1;
let palabraTemp= [];
let chr;
let repetida=[];


// funciones
function crearTablero(){
    
// pincel.fillStyle = "#080908";
pincel.fillStyle = "white";
pincel.fillRect(0,0,1000, 1000);

}



function alternarVisibilidad(){
    startGamebtn.classList.toggle("hidden");
    $facil.classList.toggle('hidden');
    $medio.classList.toggle('hidden');
    $dificil.classList.toggle('hidden');
    $indicador.classList.toggle('hidden');
    $reglas.classList.toggle('hidden');
    $aiuda.classList.add('hidden');
    pantalla.classList.toggle('stand-by');
    pantalla.classList.toggle('jugar');
    
}

function palabraRandom(){
     let sw=0;
     let ref = 100;
     while (sw===0 && ref > 0){
                        indice = indiceAleatorio();
                        if (dificultad === 0 && diccionario[indice].length < 5){
                            imprimirValor();

                        }else if (dificultad === 1 && diccionario[indice].length > 4 && diccionario[indice].length < 8){
                            imprimirValor();
                        }if (dificultad === 2 && diccionario[indice].length > 7){
                            imprimirValor();
                        }
                        ref--;
                    }
                    
        return palabra;
 
}

function guiones(cantidad){

pincel.fillStyle= "black";
pincel.font = "2em Ruslan Display cursive";

for ( let i=0; i < cantidad; i++){
    pincel.fillText("-", centerX + i*20, 145, 800)
}

}

function imprimirValor(){
    sw = 1;
    ref = 0;
    palabra= diccionario[indice].toUpperCase();
    
    // palabraSecreta.innerHTML = palabra +' ' + palabra.length; Uso para control interno
    
}
function indiceAleatorio(){
    let largo= diccionario.length;
    
    indice = Math.round(Math.random() * (largo - 1));
    return indice;
}

function elegirDificultad(nivelInterno){
    dificultad = nivelInterno;
    restante = 80 - (dificultad * 30)

    // alert(dificultad);
    resetearEstiloNivel();
    nivel[nivelInterno].className =' dificultad dificultadSelect';
}
function resetearEstiloNivel(){
    for(let i=0; i < nivel.length; i++){
        nivel[i].className='dificultad';
    }
    // alert('litos')
}
function iniciarTiempo(){
    if ($tiempo.textContent > 0){
        $tiempo.textContent--;
    }else{
        juegoTerminado();
    }

}

function juegoTerminado(){ 
    clearInterval(conteo);
    resetearGeneral();
    alternarVisibilidad();
    $estadoAnterior.classList.remove('hidden');
    resetearEstiloNivel();
    elegirDificultad(0);
}

function resetearGeneral(){
    palabra= "";
    dificultad=0;
    indice=0;
    conteo=0;
    $tiempo.textContent=0;
    // palabraSecreta.innerHTML = palabra; Uso para control interno
    intentos=0;
    contadorExito=1;
    repetida=[];
    palabraTemp=[];
    

}

function dibujar(contador){
    switch (contador){
        case 0:
            pincel.fillStyle = "black";
            pincel.fillRect(20, 110, 150, 10);
            pincel.fillRect(50, 10, 10, 100);
            pincel.fillRect(50, 8, 100, 10);    
            pincel.fillRect(136.5, 12, 11, 15);
            pincel.fillRect(134, 22, 15, 2);
            pincel.fillRect(134, 19, 15, 2);        
            break;
        case 1:
            // cabeza
            pincel.beginPath();
            pincel.arc(142,35,10,0,Math.PI*2,true);
            pincel.moveTo(110,75);
            pincel.stroke();
            break;
        case 2:
            // Tronco
            pincel.fillRect(140, 45, 4, 35);
            break;
        case 3:
            // brazo izquierdo
            pincel.beginPath();
            pincel.moveTo(140, 50);
            pincel.lineTo(160, 75);
            pincel.stroke();
            break;
        case 4:
            // brazo derecho
            pincel.beginPath();
            pincel.moveTo(140, 55);
            pincel.lineTo(125, 73);
            pincel.stroke();
            break;
        case 5:
            // pierna derecha
            pincel.beginPath();
            pincel.moveTo(144, 77);
            pincel.lineTo(160, 95);
            pincel.stroke();
            break;
        case 6:
            // pierna izquierda
            pincel.beginPath();
            pincel.moveTo(140, 77);
            pincel.lineTo(120, 95);
            pincel.stroke();
            break;
            case 7:
                pincel.fillRect(128, 43, 40, 2)
                break;
    }
}

function verificarLetra(e){
    chr = String.fromCharCode(e.which).toUpperCase();
    
    let repetidAcertada=0;

        if ( intentos === 0){
           
       
         
        for (let i=0; i < palabra.length; i++){
            palabraTemp[i]= palabra[i].toUpperCase();    
        }
        }
        
    if (esValido(e.which) && !repetida.includes(chr)) {
        let pifiar = true;
        for (let i=0; i < palabra.length; i++){
            // alert(chr + "" + palabraTemp[i])
            if (chr === palabraTemp[i]){
                 letraCorrecta(palabraTemp[i], i);
                palabraTemp[i] = "-"
               
                
                // palabraSecreta.innerHTML= palabraTemp[i]; Uso para control interno
                pifiar=false; 
                repetidAcertada=repetidAcertada+1;
                          
            }
        }
        if (!repetida.includes(chr)){
            console.log(repetida.includes(chr))
            if (pifiar){
                dibujar(intentos);
                LetraIncorrecta(chr, repetida.length)
                    intentos++;
                    repetida.push(chr);
                    return verificarPerdedor(pifiar);
            }else{
                return verificarGanador(repetidAcertada, pifiar);
            }
    
        }
     
   }
   
    }

    function letraCorrecta(letra, indice){
        pincel.fillStyle= "black";
        pincel.font = "1em Ruslan Display cursive";
        for (let i=0; i< 8;i++){
            pincel.fillText(letra, centerX + indice*20, 135, 20)
        }
       
    }
    function LetraIncorrecta(letra, indice){
        pincel.fillStyle= 'red'
        pincel.font = ".7em Russlan Display cursive";
        
        pincel.fillText(letra, centerX+ indice*20 , 150, 15);
        console.log(letra + " es la letra")
    }

    function verificarGanador(repetidAcertada, pifiar){
     if (contadorExito === palabra.length || contadorExito > palabra.length){
         console.log("ha ganau desgraciau!");
         clearTablero();
         dibujarMensajeFinal("Ganaste guachi!");
         clearInterval(conteo);
         $estadoAnterior.innerHTML = ` ${dificultad < 2 ? 'La ultima vez Ganaste, Subi el nivel': 'Felicitaciones! Ganaste el máximo nivel!'}`;
         pincel.fillStyle="white";
         setTimeout(juegoTerminado, 1000);
         mostrarWinLooser();
     }else if(!pifiar) {
        contadorExito+= repetidAcertada;
        repetida.push(chr);
     }
        console.log(contadorExito, palabra.length + " control de cExito y length")
    }

    function verificarPerdedor(pifiar){
        
     if (intentos === 8){
        clearTablero();
        console.log("ha perdiu desgraciau!");
        dibujarMensajeFinal("Perdiste. LOOOOOOSER!")
        clearInterval(conteo);
        setTimeout(juegoTerminado, 1000);
        $estadoAnterior.innerHTML = 'La ultima vez Perdiste';
        mostrarWinLooser();
    }else if(!pifiar) {
       contadorExito++;
    }
       console.log(contadorExito, palabra.length + " control de cExito y length")
    }
    function dibujarMensajeFinal(msj){
        pincel.fillStyle= 'black'
        pincel.fillText(msj, 40, 50, 100);

        console.log(msj+' este es el mensaje')
    }
  
    function mostrarWinLooser(){
        
        const temporizadorWinLooser = setInterval($estadoAnterior.classList.add('colormation'), 500);
        setTimeout(()=>{
            clearInterval(temporizadorWinLooser)
            $estadoAnterior.classList.toggle('hidden');
            $estadoAnterior.classList.toggle('colormation')
        }, 5000 );
        
    }
  
    function clearTablero(){
        pincel.fillStyle = "white";
        pincel.fillRect(0,0,1000,1000);
    }



function esValido(c) {
    // c = c.charCodeAt(0);
    return (c >= 97 && c <= 122); // [a-z ][espacio][ñ]
}

// eventos


startGamebtn.addEventListener('click', () =>{
    crearTablero();
    palabraRandom();
    alternarVisibilidad();
    $tiempo.textContent = restante;
    conteo = setInterval(iniciarTiempo, 1000);
    guiones(palabra.length);
    // dibujar();
    $estadoAnterior.classList.add('hidden');
    window.addEventListener('keypress', (e)=>{verificarLetra(e)} );
});

nivel[0].addEventListener('click', ()=>{elegirDificultad(0)} );
nivel[1].addEventListener('click', ()=>{elegirDificultad(1)} );
nivel[2].addEventListener('click', ()=>{elegirDificultad(2)} );
$reglas.addEventListener('click', ()=> {$aiuda.classList.toggle('hidden')} );



palabraRandom();//quitar ya que está puesto para pruebas


crearTablero();
elegirDificultad(0);
// alternarVisibilidad();

