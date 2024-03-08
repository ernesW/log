import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Formulario.css";
import Swal from "sweetalert2";

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
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

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
        console.log();

        const newUser = await response.json();
        console.log(newUser); // Añade esta línea para ver la estructura de la respuesta

        Swal.fire({
          title: "Usuario anadido",
          text: "",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#46A2FD",
          background: "#FFFFF",
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

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate(); // Usa useNavigate para obtener la función navigate

  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/usuarios");
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const users = await response.json();
  
        const user = users.find(
          (user) => user.email === loginEmail && user.pass === loginPassword
        );
  
        if (user) {
          // Si el inicio de sesión es exitoso, redirige al usuario a la página de inicio
          navigate("/home");
        } else {
          // Si el inicio de sesión falla, muestra un mensaje de error
          Swal.fire({
            title: "Error",
            text: "Correo electrónico o contraseña incorrectos",
            icon: "error",
          });
        }
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
            <button id="btn__iniciar-sesion" ref={btnIniciarSesion}>
              Iniciar Sesión
            </button>
          </div>
          <div className="caja__trasera-register" ref={cajaTraseraRegister}>
            <h3>¿Aún no tienes una cuenta?</h3>
            <p>Regístrate para que puedas iniciar sesión</p>
            <button id="btn__registrarse" ref={btnRegistrarse}>
              Regístrarse
            </button>
          </div>
        </div>
        <div
          className="contenedor__login-register"
          ref={contenedorLoginRegister}
        >
          <form
            className="formulario__login"
            ref={formularioLogin}
            onSubmit={handleLogin}
          >
            <h2>Iniciar Sesión</h2>
            <input
              type="text"
              placeholder="Correo Electronico"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
          </form>
          <form
            onSubmit={handleSubmit}
            className="formulario__register"
            ref={formularioRegister}
          >
            <h2>Regístrarse</h2>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <input
              type="text"
              placeholder="Correo Electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit">Regístrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}
