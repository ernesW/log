import React, { useEffect, useRef } from 'react'
import '../App.css'

export default function Formulario() {
    const btnIniciarSesion = useRef(null);
    const btnRegistrarse = useRef(null);
    const formularioLogin = useRef(null);
    const formularioRegister = useRef(null);
    const contenedorLoginRegister = useRef(null);
    const cajaTraseraLogin = useRef(null);
    const cajaTraseraRegister = useRef(null);

    useEffect(() => {
        btnIniciarSesion.current.addEventListener("click", iniciarSesion);
        btnRegistrarse.current.addEventListener("click", register);
        window.addEventListener("resize", anchoPage);
        anchoPage();
    }, []);

    function anchoPage() {
        if (window.innerWidth > 850) {
            cajaTraseraRegister.current.style.display = "block";
            cajaTraseraLogin.current.style.display = "block";
        } else {
            cajaTraseraRegister.current.style.display = "block";
            cajaTraseraRegister.current.style.opacity = "1";
            cajaTraseraLogin.current.style.display = "none";
            formularioLogin.current.style.display = "block";
            contenedorLoginRegister.current.style.left = "0px";
            formularioRegister.current.style.display = "none";
        }
    }

    function iniciarSesion() {
        if (window.innerWidth > 850) {
            formularioLogin.current.style.display = "block";
            contenedorLoginRegister.current.style.left = "10px";
            formularioRegister.current.style.display = "none";
            cajaTraseraRegister.current.style.opacity = "1";
            cajaTraseraLogin.current.style.opacity = "0";
        } else {
            formularioLogin.current.style.display = "block";
            contenedorLoginRegister.current.style.left = "0px";
            formularioRegister.current.style.display = "none";
            cajaTraseraRegister.current.style.display = "block";
            cajaTraseraLogin.current.style.display = "none";
        }
    }

    function register() {
        if (window.innerWidth > 850) {
            formularioRegister.current.style.display = "block";
            contenedorLoginRegister.current.style.left = "410px";
            formularioLogin.current.style.display = "none";
            cajaTraseraRegister.current.style.opacity = "0";
            cajaTraseraLogin.current.style.opacity = "1";
        } else {
            formularioRegister.current.style.display = "block";
            contenedorLoginRegister.current.style.left = "0px";
            formularioLogin.current.style.display = "none";
            cajaTraseraRegister.current.style.display = "none";
            cajaTraseraLogin.current.style.display = "block";
            cajaTraseraLogin.current.style.opacity = "1";
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nombre, email, username, pass }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            console.log(
              "Producto: " +
                producto +
                " Precio: " +
                precio +
                " Stock: " +
                stock +
                " añadido"
            );
            const newProduct = await response.json();
            console.log(newProduct); // Añade esta línea para ver la estructura de la respuesta
    
            Swal.fire({
              title: "Producto Creado",
              text: "",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#a5dc86",
              background: "#272727",
              customClass: {
                confirmButton: "sweet-alert-button",
                title: "sweet-alert-title",
                content: "sweet-alert-content",
              },
            }).then(() => {
              // Actualiza el estado de los datos añadiendo el producto que se acaba de crear
              window.location.reload();
            });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

    return (
        <>
            <div className="contenedor__todo">
                <div className="caja__trasera">
                    <div className="caja__trasera-login" ref={cajaTraseraLogin}>
                        <h3>¿Ya tienes una cuenta?</h3>
                        <p>Inicia sesión para entrar en la página</p>
                        <button id="btn__iniciar-sesion" ref={btnIniciarSesion}>Iniciar Sesión</button>
                    </div>
                    <div className="caja__trasera-register" ref={cajaTraseraRegister}>
                        <h3>¿Aún no tienes una cuenta?</h3>
                        <p>Regístrate para que puedas iniciar sesión</p>
                        <button id="btn__registrarse" ref={btnRegistrarse}>Regístrarse</button>
                    </div>
                </div>
                <div className="contenedor__login-register" ref={contenedorLoginRegister}>
                    <form className="formulario__login" ref={formularioLogin}>
                        <h2>Iniciar Sesión</h2>
                        <input type="text" placeholder="Correo Electronico" />
                        <input type="password" placeholder="Contraseña" />
                        <button>Entrar</button>
                    </form>
                    <form action={handleSubmit} className="formulario__register" ref={formularioRegister}>
                        <h2>Regístrarse</h2>
                        <input type="text" placeholder="Nombre completo" value={stock} />
                        <input type="text" placeholder="Correo Electronico" />
                        <input type="text" placeholder="Usuario" />
                        <input type="password" placeholder="Contraseña" />
                        <button type="submit">Regístrarse</button>
                    </form>
                </div>
            </div>
        </>
    )
}
