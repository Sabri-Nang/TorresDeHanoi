//creo los objetos


function crearDiv(){
    var ndiv=document.createElement('div')
    return ndiv
}
var cantidadPiezas
function VentanaInicio(){

    this.div=crearDiv()
    this.div.className="contenedor"
    this.div.style.background="violet"
    this.div.id="ventanaInicio"

    this.div.innerHTML='<div><h1 display-4>Seleccione la cantidad de piezas</h1><input class="form-control" type="text" id="cantidadPiezas"><div><button class="btn btn-danger" onclick="iniciar()" keydown="enter()">ACEPTAR</button></div></div>'
    
    
    
    
}

function enter(e){
    if (e.key=="Enter"){
        iniciar()
    }
}

function gameOver(){
    this.div=crearDiv()
    this.div.className="contenedor"
    this.div.style.width="70%"
    this.div.style.height="90%"
    this.div.style.background="violet"

    this.div.style.alignItems="center"
    this.div.style.position="absolute"
    this.div.id="over"
    this.div.style.zIndex="1"
    this.div.innerHTML='<div><h1 class="display-4" >GANASTE</h1><div><button class="btn btn-danger" onclick="volver()" keydown="volver()">ACEPTAR</button></div></div>'
  
}


function Fondo(){
    
    this.div=crearDiv()
    this.div.className="contenedor"
    this.div.id="fondo"
   
    //this.div.innerHTML='<button class="btn-danger" onclick="volver()"></button>'

    this.div.addEventListener('mousemove', e=>mouseMove(e))
    this.div.addEventListener('touchmove', e=>mouseMove(e))
}

//var altura="80vh"
function BotonReiniciar(){
    this.button=document.createElement("button")
    this.button.className="btn btn-danger btn-lg"
    this.button.innerText="Reiniciar"
    this.button.style.flex="80%"
    this.button.style.marginTop="2vh"
    
    this.button.addEventListener('click', e=>volver(e))
}

function Contenedores(id){
    this.div=crearDiv()

    this.className="torre"
    this.div.style.width="30vw"
    this.div.style.height="60vh"

    this.div.style.margin="0.5vw"
    this.div.style.background='#E041DB'
    this.div.position="relative"
    this.div.style.display="flex"
    this.div.style.flexDirection="column-reverse"
    this.div.style.alignItems="center"
    this.div.style.justifyContent="flex-start"
    this.div.id=id

    this.div.addEventListener('mouseup', e=>mouseUp(e))
    this.div.addEventListener('touchend', e=>mouseUp(e))
    
}



function Pieza(size){
    this.div=crearDiv()
    this.div.className="piezas"
    //this.div.style.height=parseInt(altura)/(cantidadPiezas+1)+"px"
    this.div.style.height=60/(cantidadPiezas+1)+"vh"
    this.div.style.width=parseInt("30")*size/(cantidadPiezas+1)+"vw"

    this.div.style.background="#DBE041"
    this.div.style.border="solid black"
    //this.div.style.borderRadius="10px"
    this.div.id=size
    this.div.position="absolute"    
}

function iniciar(){
    cantidadPiezas=parseInt(document.getElementById('cantidadPiezas').value)
    console.log('presionar aceptar')
    window.document.body.innerHTML = '';
    
    var fondo=new Fondo()
    var contenedor1=new Contenedores("torre1")
    var contenedor2=new Contenedores("torre2")
    var contenedor3=new Contenedores("torre3")
    var botonReiniciar=new BotonReiniciar()
    
    document.body.appendChild(fondo.div)
    document.getElementById('fondo').appendChild(botonReiniciar.button)

    var torre1=contenedor1.div
    var torre2=contenedor2.div
    var torre3=contenedor3.div
    fondo.div.appendChild(torre1)
    fondo.div.appendChild(torre2)
    fondo.div.appendChild(torre3)
    var altura=document.getElementById('torre1').clientHeight
    var valorPiezas=[]
    
    for (var i=0; i<cantidadPiezas; i++){
        //altura=document.getElementById('torre1').clientHeight
        //console.log(altura)
        valorPiezas[i]=new Pieza(i+1)

    }
    valorPiezas=valorPiezas.reverse()


    torresId=['torre1', 'torre2', 'torre3']
    torre1Piezas=[]
    torre2Piezas=[]
    torre3Piezas=[]
    var torres=[torre1Piezas, torre2Piezas, torre3Piezas]

    for (piezas in valorPiezas){
        torre1.appendChild(valorPiezas[piezas].div)
        torre1Piezas.push(valorPiezas[piezas].div.id)
    }
document.getElementById('1').addEventListener('mousedown',mouseDown, false)
document.getElementById('1').addEventListener('touchstart', mouseDown, false)
}



isMouseDown=false
var moving=null
function mouseDown(e){
    //isMouseDown=true
    //moveUp=false

    moving=e.target
}

var isMoving
var mousePosition={x:0, y:0}
function mouseMove(e){
    
    //console.log('mouseMove')
    if (moving){
        moving.style.position="absolute"
        if (e.clientX){
            if (e.clientX<document.getElementById('fondo').clientWidth-moving.clientWidth & e.clientY<document.getElementById('fondo').clientHeight- moving.clientHeight){
               moving.style.left=e.clientX+'px'
                moving.style.top=e.clientY+'px'
            }
            //mousePosition={x:e.clientX, y:e.clientY}
            //console.log(mousePosition)
        } else {
            ///la parte touch
            moving.style.left=e.changedTouches[0].clientX+'px'
            moving.style.top=e.changedTouches[0].clientY+'px'
        }
    }
    
    
}

var destino
var origen



function mouseUp(e){
    //cuando suelto
    
    if (moving ){
        origen=moving.parentNode.id
        if (e.clientX){
            mousePosition={x:e.clientX, y:e.clientY}
            target = document.elementsFromPoint(e.clientX, e.clientY)[1];
            //console.log(target.id)
            
        } else {
            mousePosition={x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY}
            target=document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)[1]
        }
        moving.style.position=''
        if (torresId.indexOf(target.id)!=-1){
            
            origen=moving.parentNode.id+"Piezas"
            destino=target.id+"Piezas"
            if (Math.min(...eval(destino))>moving.id){
            target.appendChild(moving)
            
            eval(destino).push(eval(origen).pop()) 
            }


        }else {
            document.getElementById(origen).appendChild(moving)

        }
    
        
            
    }
    torres=[torre1Piezas, torre2Piezas, torre3Piezas]
            
    actualizar(torres)
    if (torre3Piezas.length==cantidadPiezas){
        
        overr=new gameOver()
        document.getElementById('fondo').appendChild(overr.div)
    }
    

    moving=null
    isMoving=false

}




function actualizar(torres){
    for (torre of torres){
        minimo=Math.min(...torre)
        for (id of torre){
            if(id==minimo){
                document.getElementById(id).addEventListener('mousedown', mouseDown, false)
                document.getElementById(id).addEventListener('touchstart', mouseDown, false)
            } else {
                document.getElementById(id).removeEventListener('mousedown', mouseDown, false)
                document.getElementById(id).removeEventListener('touchstart', mouseDown, false)
            }
        }
    }
}
function volver(){
    window.document.body.innerHTML = ''
    ventana=new VentanaInicio()
    document.body.appendChild(ventana.div)
}
ventana=new VentanaInicio()
document.body.appendChild(ventana.div)
//iniciar()





