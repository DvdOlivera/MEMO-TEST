
window.onload = iniciarPartida
document.querySelector("#boton-iniciar").addEventListener("click",iniciarPartida)

function iniciarPartida (){
  movimientosUsuario = [];
  rotarTodasLasCasillas(); 
  limpiarCasillero();

  const NuevoOrdenCasilleros= listaAleatoria();

  asignarImagenes(NuevoOrdenCasilleros);

  habilitarClick();

};

function rotarTodasLasCasillas(){
  document.querySelectorAll(".casillero").forEach((casilla)=>{
    casilla.classList.remove("rotate")

  })
};

function habilitarClick(){
  document.querySelectorAll(".casillero").forEach((casilla)=>{
    casilla.classList.remove("deshabilitar-click");

  })
};

//function deshabilitarClick(){
//  document.querySelectorAll(".casillero").forEach((casilla)=>{
//    casilla.classList.add("deshabilitar-click");

//  })
//};



function limpiarCasillero(){
  document.querySelectorAll(".atras").forEach((atras)=>{
    atras.classList.remove("robin","batman","joker","harley","batwoman","alfred","acertijo","dos-caras");
  })
};


function asignarImagenes(orden){
  i=0;
  document.querySelectorAll(".atras").forEach((atras)=>{
  
    if (orden[i] <= 1){
      atras.classList.add("robin")
    }
    else if(orden[i] <= 3){
      atras.classList.add("harley")
    }
    else if(orden[i] <= 5){
      atras.classList.add("joker")
    }
    else if(orden[i] <= 7){
      atras.classList.add("batman")
    }
    else if(orden[i] <= 9){
      atras.classList.add("dos-caras")
    }
    else if(orden[i] <= 11){
      atras.classList.add("alfred")
    }
    else if(orden[i] <= 13){
      atras.classList.add("batwoman")
    }
    else if(orden[i] <= 15){
      atras.classList.add("acertijo")
    }

    
    
    i=i+1;
  })
};

let movimientosUsuario =[]

document.querySelectorAll(".casillero").forEach((casilla)=>{
  
  casilla.addEventListener("click", obtenerEleccionUsuario);
});

  function obtenerEleccionUsuario(event){
    event.target.classList.add("rotate")
    movimientosUsuario.push(event.target)
    compararEleccion()
  };

  function compararEleccion(){
   if(movimientosUsuario.length === 2){
    
    movimientosUsuario[0].lastElementChild.classList.value === movimientosUsuario[1].lastElementChild.classList.value ?
    movimientosUsuario[1].classList.add("deshabilitar-click") : rotarCasillas(movimientosUsuario);
    
    movimientosUsuario = [];
    }
    else if (movimientosUsuario.length === 1){
      movimientosUsuario[0].classList.add("deshabilitar-click")
    }
  }
  function listaAleatoria() {
    let lista = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    lista = lista.sort(function() {return Math.random() - 0.5});
    return lista
 }


  function rotarCasillas(casillas){
    deshabilitarCasillasTemporalmente();
    
    setTimeout(function(){
      casillas.forEach((casilla)=>{
        casilla.classList.remove("rotate","deshabilitar-click");
  
     })
      
    }, 700);

    


  
  }

  function deshabilitarCasillasTemporalmente(){
    document.querySelector("#container").classList.add("deshabilitar-click")
    setTimeout(function(){

      document.querySelector("#container").classList.remove("deshabilitar-click")
      
    }, 700);
  }
  
    