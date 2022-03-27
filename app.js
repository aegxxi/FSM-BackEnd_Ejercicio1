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
                  h1 {color:aquamarine;}
                  h2 {color:lawngreen;}
                  p {color:aquamarine;}
                  a {color:aliceblue}
                  summary {color:aliceblue}
                  article {color:aliceblue}

                  .tituloPrincipal{
                      align-content: center;
                      text-align: center;
                      margin: 2rem;
                  }

                  .fondo {
                  color:aquamarine;
                  background-color: black;
                  margin: 2rem;
                  }

                  .textoComentario{
                    color:aliceblue
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
                      <h2>
                        El servidor "${app.name.toLocaleUpperCase()}" esta Listo y escuchando en el puerto: ${port} 
                      </h2>
                      ${saltoLinea}
                      <span>
                        - Node.js version   : <b>${version}</b>
                        ${saltoLinea}
                        - Express.js version: <b>${obtenerExpressVersion()} </b>
                        ${saltoLinea}
                        - Iniciado          : <b>${obtenerMomentoDeArranque()} </b>
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
                          <p>Ejemplo 1 -> Procesando Parametros (params) en las rutas: <a href="http://localhost:4000/numen/Andres" target="_blank">Ver Ejemplo</a></p>
                        </li>
                        <li>
                          <p>Ejemplo 2 -> Procesando Consultas (Querys) en las rutas: <a href="http://localhost:4000/prueba?nombre=Andres&apellido=Garcia" target="_blank">Ver Ejemplo</a></p>
                        </li>
                      </ul> 
                      ${saltoLinea}
                      <h4>
                        Ejercicios:
                      </h4>
                      <ul>
                        <li>
                          <p>Ejercicio 1 -> Sumar dos valores: <a href="http://localhost:4000/suma/9/2" target="_blank">Ver Ejercicio</a></p>
                          <details>
                          <summary>Comentarios</summary>
                          <article>
                              <p class="textoComentario">En este caso no se valido cada parametro, se valido el resultado</p>
                              <p class="textoComentario"> - Como los parametros son parte de la ruta, si alguno se omite, falla la ruta</p>
                              <p class="textoComentario"> - Para convertir el valor del parametro se eligio multiplicarlo por 1 (elemento neutro de la multiplicacio)</p>
                              <p class="textoComentario">   ya que en Js ("2" * 2 = 4), si el texto ("2") es un numero lo convierte en el mumero (2) y devuelve el resultado (4) como numero</p>
                              <p class="textoComentario">   ojo! en Js ("2" + 2 = "4"), si el texto ("2") es un numero lo convierte en el mumero (2) y devuelve el resultado ("4") como texto</p>
                              <p class="textoComentario">   ojo! en Js ("A" * 2)=NaN (no es un numero) pero Js lo considera de tipo numerico. NaN usado en cualquier operacion da como resultado NaN</p>
                              <p class="textoComentario">   aprovechando esto si multiplicamos el valor recibido en el parametro por 1 (Valor neutro) y lo almacenamos en una variable, esta sera de tipo numerico</p>
                              <p class="textoComentario">   si luego usamos las variables en una operacion matematica el resultado sera numerico, o se cualquier numero incluyendo NaN</p>
                              <p class="textoComentario">   por eso un simple ternario nos sirve para validar la variable que usamos para almacenar el resultado y no es necesario validar cada parametro </p>
                              <p class="textoComentario">   Ejemplo del ternario => (resultado !== null && !isNaN(resultado)) ? resultado : "Mesaje de parametros incorrectos"; </p>
                              <p class="textoComentario">___</p>
                          </article>
                        </details> 
                          </li>
                        <li>
                          <p>Ejercicio 2 -> Restar dos valores, distintos de cero: <a href="http://localhost:4000/resta/9/2" target="_blank">Ver Ejercicio</a></p>
                          <details>
                            <summary>Comentarios</summary>
                            <article>
                                <p class="textoComentario">En este caso hay validaciones de los datos pasados por parametros</p>
                                <p class="textoComentario"> - Como los parametros son parte de la ruta, si alguno se omite, falla la ruta</p>
                                <p class="textoComentario"> - Si se pasan todos los parametros, los datos recibidos pueden ser validados</p>
                                <p class="textoComentario">   - Se valido que los datos recibidos sean numericos</p>
                                <p class="textoComentario">   - Se valido que los datos recibidos no sean 0 (cero)</p>
                                <p class="textoComentario">___</p>
                            </article>
                          </details> 
                          </li>
                        <li>
                          <p>Ejercicio 3 -> Nombre y Apellido (Por Consulta, sin validaciones): <a href="http://localhost:4000/ej3op1?nombre=Andres&apellido=Garcia" target="_blank">Ver Ejercicio</a></p>
                          <details>
                            <summary>Comentarios</summary>
                            <article>
                                <p class="textoComentario">En este caso no hay validaciones de los datos pasados a la consulta</p>
                                <p class="textoComentario">___</p>
                            </article>
                          </details>   
                        </li>
                        <li>
                          <p>Ejercicio 3 -> Nombre y Apellido (Por Consulta, con validaciones): <a href="http://localhost:4000/ej3op2?nombre=Andres&apellido=Garcia" target="_blank">Ver Ejercicio</a></p>
                          <details>
                            <summary>Comentarios</summary>
                            <article>
                                <p class="textoComentario">En este caso si hay validaciones de los datos pasados a la consulta</p>
                                <p class="textoComentario"> - En este caso los datos pueden haber sido enviados o no</p>
                                <p class="textoComentario">   - Se valido que todos los datos se hayan recibido</p>
                                <p class="textoComentario">   - Se valido que los datos recibidos sean texto y no numeros</p>
                                <p class="textoComentario">___</p>
                            </article>
                          </details> 
                          </li>
                        <li>
                          <p>Ejercicio 3 -> Nombre y Apellido (Por Parametros, con validaciones): <a href="http://localhost:4000/ej3op3/Andrres/Garcia" target="_blank">Ver Ejercicio</a></p>
                          <details>
                            <summary>Comentarios</summary>
                            <article>
                                <p class="textoComentario">En este caso si hay validaciones de los datos pasados por parametros</p>
                                <p class="textoComentario"> - Como los parametros son parte de la ruta, si alguno se omite, falla la ruta</p>
                                <p class="textoComentario"> - Si se pasan todos los parametros, los datos recibidos pueden ser validados</p>
                                <p class="textoComentario">   - Se valido que los datos recibidos sean texto y no numeros</p>
                                <p class="textoComentario">___</p>
                            </article>
                          </details> 
                          </li>
                      </ul> 
                      ${saltoLinea} ${saltoLinea}
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
  const saltoLinea =  '<Br/>'; 
  const estilos=`<style>
                  h1 {color:blue;}
                  p {color:Black;}
                  a {color:aliceblue}

                  .tituloPrincipal{
                      align-content: center;
                      text-align: center;
                      margin: 1rem;
                  }

                  .cuerpo {
                  color:Black;
                  background-color: lightsteelblue;
                  margin: 2rem;
                  }
                </style>
                `
                ;
  let alumno = req.params.alumno;

  let respuesta =`
    <head>
    <title>Servidor Node-Express</title>
    ${estilos}
  </head>
  <body  class="cuerpo">
    <h1>
      Retorna: 'Hola: ${alumno}'
    </h1>
    ${saltoLinea}
    <h2>
      Codigo: 
    </h2>
    ${saltoLinea}
    <code>
      ${`app.get('/numen/:alumno', (req, res) => {`} ${saltoLinea}
      ${`   Let alumno = req.params.alumno;`} ${saltoLinea}
      ${`   res.status(200).send('Hola: ' + ${'${alumno}'});`} ${saltoLinea}
      ${`}) `} ${saltoLinea}
    </code>
  </body> 
    `
    ;

  res.status(200).send(respuesta);
})

// Procesando Consultas (Querys) en las rutas
// ------------------------------------------
//  Ej: http://localhost:4000/prueba?nombre=Andres&apellido=Garcia
app.get('/prueba', (req, res) => {
  const saltoLinea =  '<Br/>'; 
  const estilos=`<style>
                  h1 {color:blue;}
                  p {color:Black;}
                  a {color:aliceblue}

                  .tituloPrincipal{
                      align-content: center;
                      text-align: center;
                      margin: 1rem;
                  }

                  .cuerpo {
                  color:Black;
                  background-color: lightsteelblue;
                  margin: 2rem;
                  }
                </style>
                `
                ; 
  
  let nombre = req.query.nombre;
  let apellido = req.query.apellido;
  let resultado = `Mi nombre es: ${nombre}, ${apellido} `;

  let respuesta =`
    <head>
    <title>Servidor Node-Express</title>
    ${estilos}
  </head>
  <body  class="cuerpo">
    <h1>
      Retorna: ${resultado}
    </h1>
    ${saltoLinea}
    <h2>
      Codigo: 
    </h2>
    ${saltoLinea}
    <code>    
      ${`app.get('/prueba', (req, res) => {   `}${saltoLinea}
      ${'   let nombre = req.query.nombre;'}${saltoLinea}
      ${'   let apellido = req.query.apellido;'}${saltoLinea}
      ${'   let resultado = `Mi nombre es: ${nombre}, ${apellido} `;'}${saltoLinea}
      ${`   res.status(200).send(resultado);`} ${saltoLinea}
      ${`})   `} ${saltoLinea}
    </code>
  </body> 
  `
  ;
  
  res.status(200).send(respuesta);
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

  // Consologueo los valores a trabajar en este ejercicio
  console.log(``);
  console.log(`Log de valores del ejercicio 1 Opcion 2: ${obtenerMomentoDeArranque()}`);
  console.log(`. req.params.num1 => ${req.params.num1} -> Tipo: ${typeof req.params.num1}`);
  console.log(`. req.params.num2 => ${req.params.num2} -> Tipo: ${typeof req.params.num2}`);
  console.log(`. num1 => ${num1} -> Tipo: ${typeof num1}`);
  console.log(`. num2 => ${num2} -> Tipo: ${typeof num2}`);
  console.log(`. resultado => ${resultado} -> Tipo: ${typeof resultado}`);
  console.log(`. (resultado !== null && !isNaN(resultado)) => ${(resultado !== null && !isNaN(resultado))} -> Tipo: ${typeof (resultado !== null && !isNaN(resultado))}`);
  //---------------------------------------------------------------------------    
  
  // Asigno a variable el error a mostrar
  let msjPrmIncorrecto = `Ambos Parametros deben ser Numeros. ruta/${num1}/${num2}`;
  
  // Asigno a variable el resultado, luego de validarlo
  let respuesta = (resultado !== null && !isNaN(resultado)) ? resultado : msjPrmIncorrecto;
   
  // Muestra del ternario como If ... else
  // let respuesta
  // if (resultado !== null && !isNaN(resultado)) {
  //   respuesta = resultado
  // } else {
  //   respuesta = msjPrmIncorrecto
  // }  

  // informo el resultado ya validado
  res.status(200).json(respuesta);
  
  //Consologueo la repuesta
  console.log(`* Respuesta: ${respuesta}`);
})



// Ejercicio 2 - Restar dos valores
// --------------------------------
// Transformo el texto a numero haciendo una operacion matematica para simplificar la validacion
//  (por ejemple multiplico por 1 que es un elemento neutro para la multiplicacion)
//  asi uso solo dos ternarios anidados para validar
//  Ej: http://localhost:4000/resta/9/2
app.get('/resta/:num1/:num2', (req, res) => {
  // Cargo en variables los parametros, los transformo, y cargo el resultado en otra variable
  let num1 = (req.params.num1) * 1;
  let num2 = (req.params.num2) *1;
  let resultado = num1 - num2;
  
  // Consologueo los valores a trabajar en este ejercicio
  console.log(``);
  console.log(`Log de valores del ejercicio 2: ${obtenerMomentoDeArranque()}`);
  console.log(`. req.params.num1 => ${req.params.num1} -> Tipo: ${typeof req.params.num1}`);
  console.log(`. req.params.num2 => ${req.params.num2} -> Tipo: ${typeof req.params.num2}`);
  console.log(`. num1 => ${num1} -> Tipo: ${typeof num1}`);
  console.log(`. num2 => ${num2} -> Tipo: ${typeof num2}`);
  console.log(`. resultado => ${resultado} -> Tipo: ${typeof resultado}`);
  console.log(`. (resultado !== null && !isNaN(resultado)) => ${(resultado !== null && !isNaN(resultado))} -> Tipo: ${typeof (resultado !== null && !isNaN(resultado))}`);
  console.log(`. (num1 !== 0 && num2 !== 0) => ${(num1 !== 0 && num2 !== 0)} -> Tipo: ${typeof (num1 !== 0 && num2 !== 0)}`);
  //---------------------------------------------------------------------------

  // Asigno a variables los errores a informar
  let msjPrmIncorrecto = `Ambos Parametros deben ser Numeros: ruta/${num1}/${num2}`;
  let msjNumIncorrecto = `El 0 (cero) no se admite como parametro: ruta/${num1}/${num2}`;
  
  // Asigno a una variable el resultado luego de validarlo 
  let respuesta = (resultado !== null && !isNaN(resultado)) 
    ?  (num1 !== 0 && num2 !== 0)
      ? resultado 
      :msjNumIncorrecto
    : msjPrmIncorrecto
  ;

  // Respondo con el resultado validado
  res.status(200).json(respuesta);
  
  // Consologueo la repuesta
  console.log(`* Respuesta: ${respuesta}`);
})



// Ejercicio 3 - Retornar Nombre y Apellido 
// ------------------------------------------

// Opcion 1, por consulta (qrys) sin validacion
// http://localhost:4000/ej3op2?nombre=Andres&apellido=Garcia
app.get('/ej3op1', (req, res) => {
  // Asigno a variables el contenido de las consultas
  let nombre = req.query.nombre
  let apellido = req.query.apellido
  
  // Consologueo los valores a trabajar en este ejercicio
  console.log(``);
  console.log(`Log de valores del ejercicio 3 Opcion 1: ${obtenerMomentoDeArranque()}`);
  console.log(`. req.query.nombre => ${req.query.nombre} -> Tipo: ${typeof req.query.nombre}`);
  console.log(`. req.query.apellido => ${req.query.apellido} -> Tipo: ${typeof req.query.apellido}`);
  console.log(`. nombre => ${nombre} -> Tipo: ${typeof nombre}`);
  console.log(`. apellido => ${apellido} -> Tipo: ${typeof apellido}`);
  //---------------------------------------------------------------------------  
  
  // Asigno a una variable el valor resultante sin validaciones
  let respuesta = `Respuesta: Mi nombre es ${nombre} ${apellido}`;
  
  //Respondo con la variable ya validada
  res.status(200).json(respuesta);

  //Consologueo la repuesta
  console.log(`* Respuesta: ${respuesta}`);
})


// Opcion 2, por consulta (qrys) con validacion
// http://localhost:4000/ej3op2?nombre=Andres&apellido=Garcia
app.get('/ej3op2', (req, res) => {
  // Asigno a variables el contenido de las consultas
  let nombre = req.query.nombre
  let apellido = req.query.apellido
  
  // Consologueo los valores a trabajar en este ejercicio
  console.log(``);
  console.log(`Log de valores del ejercicio 3 Opcion 2: ${obtenerMomentoDeArranque()}`);
  console.log(`. req.query.nombre => ${req.query.nombre} -> Tipo: ${typeof req.query.nombre}`);
  console.log(`. req.query.apellido => ${req.query.apellido} -> Tipo: ${typeof req.query.apellido}`);
  console.log(`. nombre => ${nombre} -> Tipo: ${typeof nombre}`);
  console.log(`. apellido => ${apellido} -> Tipo: ${typeof apellido}`);
  console.log(`. nombre * 0 => ${(nombre * 0)} -> Tipo: ${typeof (nombre * 0)}`);
  console.log(`. apellido * 0 => ${(apellido * 0)} -> Tipo: ${typeof (apellido * 0)}`);
  console.log(`. ((nombre * 0) !==0 && (apellido * 0) !==0) => ${(nombre * 0) !==0 && (apellido * 0) !==0} -> Tipo: ${typeof ((nombre * 0) !==0 && (apellido * 0) !==0)}`);
  console.log(`. ( nombre && apellido ) => ${(nombre && apellido)} -> Tipo: ${typeof (nombre && apellido)}`)
  //---------------------------------------------------------------------------  
  
  // Asigno a una variable el valor resultante segun la validacion
  let respuesta = ( nombre && apellido ) 
    ?
      ((nombre * 0) !== 0 && (apellido * 0) !== 0)
        ? `Mi nombre es ${nombre} ${apellido}`
        :`Todos los argumentos de la consulta deben ser textos -> Valores consultados  [${nombre}] y [${apellido}]`
    :`Se deben pasar las dos consultas con su valor (?nombre:Nombre&apellido:Apellido) -> Valores consultados [${nombre}] y [${apellido}]`
  ;
  
  //Respondo con la variable ya validada
  res.status(200).json(respuesta);

  //Consologueo la repuesta
  console.log(`* Respuesta: ${respuesta}`);
})


// Opcion 3, por parametros (Prms)
//  Ej: http://localhost:4000/ej3op3/Andrres/Garcia
app.get('/ej3op3/:nombre/:apellido', (req, res) => {
  // Asign a variables los datos de los parametros
  let nombre = req.params.nombre;
  let apellido = req.params.apellido;
  
  // Consologueo los valores a trabajar en este ejercicio
  console.log(``);
  console.log(`Log de valores del ejercicio 3 Opcion 3: ${obtenerMomentoDeArranque()}`);
  console.log(`. req.params.nombre => ${req.params.nombre} -> Tipo: ${typeof req.params.nombre}`);
  console.log(`. req.params.apellido => ${req.params.apellido} -> Tipo: ${typeof req.params.apellido}`);
  console.log(`. nombre => ${nombre} -> Tipo: ${typeof nombre}`);
  console.log(`. apellido => ${apellido} -> Tipo: ${typeof apellido}`);
  console.log(`. ( nombre && apellido ) => ${( nombre && apellido )} -> Tipo: ${typeof ( nombre && apellido )}`);
  console.log(`. ((nombre * 0) !== 0 && (apellido * 0) !== 0) => ${((nombre * 0) !== 0 && (apellido * 0) !== 0)} -> Tipo: ${typeof (((nombre * 0) !== 0 && (apellido * 0) !== 0))}`);
  //---------------------------------------------------------------------------    
  
  // Asigno a una variable el resultado, segun la validacion de los datos obtenidos
  let respuesta = ( nombre && apellido ) 
    ?
    ((nombre * 0) !== 0 && (apellido * 0) !== 0)
      ? `Respuesta: Mi nombre es ${nombre} ${apellido}`
      : `Respuesta: Todos los argumentos de la consulta deben ser textos -> Valores pasados  [${nombre}] y [${apellido}]`
    :`Respuesta: Se deben pasar los dos parametros (ruta/:nombre/:apellido) -> Valores pasados  ruta/${nombre}/${apellido}`
  ;
  
  // Respondo con la variable con el resultado
  res.status(200).json(`${respuesta}`);  
  
  //Consologueo la repuesta
  console.log(`* Respuesta: ${respuesta}`);
  console.log(respuesta);
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
  
  //Pruebas para mostrar las ip del equipo
  //console.log(os.networkInterfaces());
})




