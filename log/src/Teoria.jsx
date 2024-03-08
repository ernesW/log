import React from 'react'
import {Link} from 'react-router-dom'
import './Teoria.css'

export default function Teoria() {
  return (
    <>
    <div className="teoria">
        <section>
            <h2>Introducción a JavaScript</h2>
            <p>
                JavaScript es un lenguaje de programación ampliamente utilizado para crear interactividad en páginas web. Es un lenguaje de scripting del lado del cliente que se ejecuta en el navegador del usuario, lo que permite manipular el contenido de una página y responder a eventos del usuario.
            </p>
            <img src="./public/teoria-imgs/javascript_logo.png" alt="Logo de JavaScript"/>
        </section>

        <section>
            <h2>Variables y Tipos de Datos</h2>
            <p>
                En JavaScript, puedes declarar variables utilizando var, let, o const. Los tipos de datos incluyen números, cadenas, booleanos, objetos y arreglos.
            </p>
            <img src="./public/teoria-imgs/variables_tipos_datos.png" alt="Variables y Tipos de Datos"/>
        </section>

        <section>
            <h2>Operadores</h2>
            <p>
                JavaScript incluye operadores aritméticos (+, -, *, /), de comparación (==, ===, !=, !==), lógicos (&&, ||, !), y otros.
            </p>
            <img src="./public/teoria-imgs/operadores.png" alt="Operadores"/>
        </section>

        <section>
            <h2>Estructuras de Control de Flujo</h2>
            <p>
                Puedes controlar el flujo de tu programa con estructuras como if, else, switch, for, while y do-while.
            </p>
            <img src="./public/teoria-imgs/estructuras_control.png" alt="Estructuras de Control de Flujo"/>
        </section>

        <section>
            <h2>Funciones</h2>
            <p>
                Las funciones en JavaScript son bloques de código reutilizables. Puedes declarar funciones con function y llamarlas según sea necesario.
            </p>
            <img src="./public/teoria-imgs/funciones.png" alt="Funciones"/>
        </section>

        <section>
            <h2>Objetos y Arrays</h2>
            <p>
                Los objetos y arreglos son fundamentales en JavaScript. Los objetos almacenan datos en pares clave-valor, mientras que los arreglos contienen una lista ordenada de elementos.
            </p>
            <img src="./public/teoria-imgs/objetos_arrays.png" alt="Objetos y Arrays"/>
        </section>

        <section>
            <h2>Eventos y DOM</h2>
            <p>
                JavaScript se utiliza comúnmente para manejar eventos del usuario y manipular el DOM (Document Object Model). Puedes responder a clics, cambios y otras interacciones del usuario.
            </p>
            <img src="./public/teoria-imgs/eventos_dom.png" alt="Eventos y DOM"/>
        </section>

        <section>
            <h2>AJAX y Promesas</h2>
            <p>
                JavaScript se utiliza para realizar solicitudes asíncronas al servidor mediante AJAX. Las promesas son una forma moderna de manejar operaciones asíncronas de manera más legible.
            </p>
            <img src="./public/teoria-imgs/ajax_promesas.png" alt="AJAX y Promesas"/>
        </section>
        
        <div class="contenedor-botones">
            <Link to="/home" class="enlace-juego">
            <button class="salto">
                <h2>VOLVER</h2>
            </button>
            </Link>
        </div>

    </div>
    </>
    
  )
}
