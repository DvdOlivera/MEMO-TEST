const imagenesFrontales = ["src/img/joker.png","src/img/batman.png","src/img/alfred.png","src/img/batwoman.png","src/img/acertijo.png",
"src/img/dent.png","src/img/harley.png","src/img/robin.png","src/img/comodin.png"]

document.querySelector("#boton-iniciar").addEventListener("click",iniciarPartida)

function iniciarPartida (){
  document.querySelector("#area-de-juego").innerHTML="";
  contador = 0;
  movimientosUsuario = [];
  resetearCronometro();
  comenzarCronometro();
  crearCasilleros(imagenesFrontales);
  habilitarClick();
};

function crearCasilleros(imagenes){
   const listaParesAleatorios= generarParesAleatorios(imagenes.length);
    for (let i=0;i<(imagenes.length * 2);i++){
      const casillero = document.createElement("div");
      casillero.setAttribute("class","casilleros deshabilitar-click");
      casillero.setAttribute("data-imagen",`${listaParesAleatorios[i]}`); 
      casillero.onclick = manejarEleccionUsuario;
      document.querySelector("#area-de-juego").appendChild(casillero)
      const frontalCasillero =  document.createElement("img");
      frontalCasillero.setAttribute("class","frontales-casilleros");
      const dorsalCasillero =  document.createElement("img");
      dorsalCasillero.setAttribute("class","dorsales-casilleros");
      document.querySelectorAll(".casilleros")[i].appendChild(dorsalCasillero);
      document.querySelectorAll(".casilleros")[i].appendChild(frontalCasillero);
    }
    asignarImagenesAleatoriasEnCasilleros(listaParesAleatorios,imagenes);
  };

function habilitarClick(){
  document.querySelectorAll(".casilleros").forEach((casillero)=>{
    casillero.classList.remove("deshabilitar-click");
  })
};

function comenzarCronometro(){
  if(intervalo!==null){
    clearInterval(intervalo);
};
intervalo = setInterval(mostrarCronometro,10);
};
function resetearCronometro(){
  clearInterval(intervalo);
  [milisegundos,segundos,minutos] = [0,0,0];
  timerRef.innerHTML = ' 00 : 00 : 000 ';
};

function asignarImagenesAleatoriasEnCasilleros(listaParesAleatorios,imagenes){
  document.querySelectorAll(".frontales-casilleros").forEach((frontal,i)=>{
  frontal.src = imagenes[listaParesAleatorios[i]];
  })
};

let movimientosUsuario =[];
let contador = 0;

function manejarEleccionUsuario(event){
    let eleccionUsuario = event.target; 
    mostrarFrontalElegido(eleccionUsuario)
    compararEleccion(eleccionUsuario);
  };

 function mostrarFrontalElegido(eleccionUsuario){
    eleccionUsuario.classList.add("rotate");
  }
  
function compararEleccion(eleccionUsuario){
  movimientosUsuario.push(eleccionUsuario);
  const primeraEleccion = movimientosUsuario[0];
    if(movimientosUsuario.length === 2){
    const segundaEleccion = movimientosUsuario[1];
    primeraEleccion.dataset.imagen === segundaEleccion.dataset.imagen ?
    (segundaEleccion.classList.add("deshabilitar-click"), contador++) : rotarCasillerosSeleccionados(movimientosUsuario);
    movimientosUsuario = [];
    if (contador === imagenesFrontales.length){
      finalizarJuego();
    };
   } 
   else { 
      primeraEleccion.classList.add("deshabilitar-click");
    };
  }

  function generarParesAleatorios(cantidadImagenes) {
    let paresAleatorios = [];
    for (let i=0;i<cantidadImagenes;i++){
      paresAleatorios.push(i)
      paresAleatorios.push(i)
    };
    paresAleatorios.sort(function() {return Math.random() - 0.5});
    return paresAleatorios;
 }

function finalizarJuego(){
  clearInterval(intervalo);
  contador = 0;
  }
 
  function rotarCasillerosSeleccionados(casilleros){
    deshabilitarContenedorTemporalmente();
    setTimeout(function(){
      casilleros.forEach((casillero)=>{
        casillero.classList.remove("rotate","deshabilitar-click");
     })
   }, 700);
  }

function deshabilitarContenedorTemporalmente(){
    document.querySelector("#contenedor").classList.add("deshabilitar-click")
    setTimeout(function(){
      document.querySelector("#contenedor").classList.remove("deshabilitar-click")
    }, 700);
  };

let [milisegundos,segundos,minutos] = [0,0,0];
let timerRef = document.querySelector(".cronometro");
let intervalo = null;
function mostrarCronometro(){

    milisegundos+=10;
    if(milisegundos == 1000){
        milisegundos = 0;
        segundos++;
        if(segundos == 60){
            segundos = 0;
            minutos++;
      };
    }
    let m = minutos < 10 ? "0" + minutos : minutos;
    let s = segundos < 10 ? "0" + segundos : segundos;
    let ms = milisegundos < 10 ? "00" + milisegundos : milisegundos < 100 ? "0" + milisegundos : milisegundos;
    timerRef.innerHTML = `${m} : ${s} : ${ms}`;
}

