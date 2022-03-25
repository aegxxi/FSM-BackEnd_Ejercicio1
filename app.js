var os = require("os");


const express = require('express');                 //Importo Express
const { jsonp } = require("express/lib/response");
const { version } = require("process");

// Creo el Servidor (app)
const app = express();

// Puerto del Servidor (app)
const port = 4000;                                   //declaro el puerto donde correra el servidor


// Declaro la ruta del index (Ruta raiz)
// [ app.METHOD(PATH, HANDLER) ]
app.get('/', (req, res) => {
  
  
  const saltoLinea =  '<Br/>';  //'\n' en Java, <Br/> en Html
  const estilos=`<style>
                  h1 {color:red;}
                  p {color:aquamarine;}
                  a {color:aliceblue}

                  .dark {
                  color:yellow;
                  background-color: black;
                  }
                  .tituloPrincipal{
                      align-content: center;
                      text-align: center;
                      margin: 1rem;
                  }

                  .fondo {
                  color:yellow;
                  background-color: black;
                  margin: 2rem;
                  }
                  .firma {
                    color:aquamarine;
                    height: 64rem;
                    text-align: right;
                    margin-right: 32rem;
                    }
                </style>
                `
                ;
  const contenido = `<head>
                      <title>Servidor Node-Express</title>
                      ${estilos}
                     </head>
                     <body  class="fondo">
                      <h1>
                        Mi primer servidor, Node.js - Express.js 
                      </h1>
                      ${saltoLinea}
                      <h2>
                        El servidor "${app.name.toLocaleUpperCase()}" esta Listo y escuchando en el puerto: ${port} 
                      </h2>
                      ${saltoLinea}
                      <span>
                        - Node.js version:   ${version} 
                        ${saltoLinea}
                        - Express.js version: ${obtenerExpressVersion()} 
                        ${saltoLinea}
                        - Iniciado: ${obtenerMomentoDeArranque()} 
                      </span>
                      ${saltoLinea} ${saltoLinea}
                      <h3>
                        Llamadas Get:
                      </h3>
                      <h4>
                        Ejemplos:
                      </h4>
                      <ul>
                        <li>
                          <p>Ejemplo 1 -> Procesando Parametros (params) en las rutas: <a href="http://localhost:4000/numen/Andrres" target="_blank">Ver Ejemplo</a></p>
                        </li>
                        <li>
                          <p>Ejemplo 2 -> Procesando Consultas (Querys) en las rutas: <a href="http://localhost:4000/prueba?nombre=Andres&apellido=Garcia" target="_blank">Ver Ejemplo</a></p>
                        </li>
                      </ul> 
                      <h4>
                        Ejercicios:
                      </h4>
                      <ul>
                        <li>
                          <p>Ejercicio 1 -> Sumar dos valores: <a href="http://localhost:4000/suma/9/2" target="_blank">Ver Ejercicio</a></p>
                        </li>
                        <li>
                          <p>Ejercicio 2 -> Restar dos valores, distintos de cero: <a href="http://localhost:4000/resta/9/2" target="_blank">Ver Ejercicio</a></p>
                        </li>
                        <li>
                          <p>Ejercicio 3 -> Nombre y Apellido (Por consulta): <a href="http://localhost:4000/ej3?nombre=Andres&apellido=Garcia" target="_blank">Ver Ejercicio</a></p>
                        </li>
                        <li>
                          <p>Ejercicio 3 -> Nombre y Apellido (Por parametros): <a href="http://localhost:4000/ej3op2/Andrres/Garcia" target="_blank">Ver Ejercicio</a></p>
                        </li>
                      </ul> 
                      ${saltoLinea} ${saltoLinea} ${saltoLinea} ${saltoLinea}
                      <p class="firma">
                        Ejercicio realizado por: <b>Andres Eduardo Garcia </b>
                      </p>
                    </body>

                    `
                    ;
  
  // envio respuesta al servidor                
  res.send(`${contenido}`);
})


// -------- 
// Ejemplos
// --------

// Procesando Parametros (params) en las Rutas
// -------------------------------------------
//  Ej: http://localhost:4000/numen/Andrres
app.get('/numen/:alumno', (req, res) => {
  let alumno = req.params.alumno;
  res.status(200).send(`Hola: ${alumno} `);
})

// Procesando Consultas (Querys) en las rutas
// ------------------------------------------
//  Ej: http://localhost:4000/prueba?nombre=Andres&apellido=Garcia
app.get('/prueba', (req, res) => {
  let nombre = req.query.nombre;
  let apellido = req.query.apellido;
  let resultado = `Mi nombre es: ${nombre}, ${apellido} `;
  
  res.status(200).send(resultado);
})

//-------------------------------------------------------------------



// ---------- 
// Ejercicios
// ----------


// Ejercicio 1 - Sumar dos valores
// -------------------------------

// Opcion 1 - Transformo el texto a numero con la funcion Number()
app.get('/sumaEjemploClase/:num1/:num2', (req, res) => {
  let num1 = Number(req.params.num1);
  let num2 = Number(req.params.num2);
  let resultado = num1 + num2;

  //res.send(`La suma es: ${resultado} `);
  res.status(200).json(resultado);
})



// Opcion 2 - 
// Transformo el texto a numero haciendo una operacion matematica
//  (por ejemplo multiplico por 1 que es un elemento neutro para la multiplicacion)
//  elijo esto porque asi verifico el estado de una sola variable "resultado" para validar las entradas
//  me permite usar un solo ternario para validar
// Ej: http://localhost:4000/suma/9/2
app.get('/suma/:num1/:num2', (req, res) => {
  let num1 = (req.params.num1) * 1;
  let num2 = (req.params.num2) *1;
  let resultado = num1 + num2;
  let msjPrmIncorrecto = `Ambos Parametros deben ser Numeros. ${num1}/${num2}`;
  
  let respuesta = (resultado !== null && !isNaN(resultado)) ? {resultado} : {msjPrmIncorrecto};
   
  // Muestra del ternario como If ... else
  // let respuesta
  // if (resultado !== null && !isNaN(resultado)) {
  //   respuesta = resultado
  // } else {
  //   respuesta = msjPrmIncorrecto
  // }  

  res.status(200).json(respuesta);
})




// Ejercicio 2 - Restar dos valores
// --------------------------------
// Transformo el texto a numero haciendo una operacion matematica para simplificar la validacion
//  (por ejemple multiplico por 1 que es un elemento neutro para la multiplicacion)
//  asi uso solo dos ternarios anidados para validar
//  Ej: http://localhost:4000/resta/9/2
app.get('/resta/:num1/:num2', (req, res) => {
  let num1 = (req.params.num1) * 1;
  let num2 = (req.params.num2) *1;
  let resultado = num1 - num2;
  let msjPrmIncorrecto = `Ambos Parametros deben ser Numeros. ${num1}/${num2}`;
  let msjNumIncorrecto = `El 0 (cero) no se admite como parametro. ${num1}/${num2}`;
  
  let respuesta = (resultado !== null && !isNaN(resultado)) 
    ?  (num1 !== 0 && num2 !== 0)
      ? {resultado} 
      :{msjNumIncorrecto}
    : {msjPrmIncorrecto}
  ;

  res.status(200).json(respuesta);
})


// Ejercicio 3 - Retornar Nombre y Apellido 
// ------------------------------------------

// Opcion 1, por consulta (qrys)
// http://localhost:4000/ej3?nombre=Andres&apellido=Garcia
app.get('/ej3', (req, res) => {
  let nombre = req.query.nombre
  let apellido = req.query.apellido
  
  let respuesta = ( nombre  && apellido ) 
    ?`Hola: ${nombre} ${apellido}`
    :`Se deben pasar las dos consultas con su valor (?nombre:Nombre&apellido:Apellido): valores consultados: "${nombre}" y "${apellido}"`
  ;
  
  res.status(200).send(respuesta);
})

// Opcion 2, por parametros (Prms)
//  Ej: http://localhost:4000/ej3op2/Andrres/Garcia
app.get('/ej3op2/:nombre/:apellido', (req, res) => {
  let nombre = req.params.nombre;
  let apellido = req.params.apellido;
  
  let respuesta = ( nombre && apellido ) 
    ?`Hola: ${nombre} ${apellido}`
    :`Se deben pasar los dos parametros (/:nombre/:apellido): ${nombre}/${apellido}`
  ;
  
  res.status(200).send(`${respuesta}`);   
})


//-----------------------------------------------------------------------


//Funciones auxiliares
//--------------------

// Obtengo la version de Express.js
//  uso el archivo package.json para obtener la versión Express.
function obtenerExpressVersion(){
  const fs = require('fs');
  const package = fs.readFileSync('package.json');
  const packageParse = JSON.parse(package);
  const expressVersion = `v${packageParse.dependencies.express.slice(1)}`;
  const info =`${expressVersion}`;  
  return(info);
}

// Obtener la fecha y hora de arranque
function obtenerMomentoDeArranque(){
  const momento = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`;
  return(`${momento}`);  
}




// Arranco el Servidor (app)
app.listen(port, () => {
  const info =` * Express.js version: ${obtenerExpressVersion()}` // Opcional: obtengo informacion adicional

  // Muestro informacion en la consola
  console.log(`El Servidor de ejemplo Escucha en el puerto: ${port}`); // Arranco el Servidor
  console.log(` * Node Version: ${version}`);
  console.log(`${info}`);
  console.log(` * Iniciado: ${obtenerMomentoDeArranque()}`);
  console.log(``);
  console.log(` * Ir a la pagina inicial del servidor: http://localhost:${port}`);
  
  //console.log(os.networkInterfaces());
})




