import React, { useState, useEffect } from 'react';
import './Dragongame.css';
import {Link} from 'react-router-dom'

const Dragongame = () => {
  // Variables para el estado del jugador
  const [xp, setXp] = useState(0); // Experiencia del jugador
  const [health, setHealth] = useState(100); // Salud del jugador
  const [gold, setGold] = useState(50); // Oro del jugador
  const [currentWeapon, setCurrentWeapon] = useState(0); // Índice del arma actual en el array de armas
  const [fighting, setFighting] = useState(null); // Índice del monstruo con el que se está combatiendo
  const [monsterHealth, setMonsterHealth] = useState(null); // Salud del monstruo
  const [inventory, setInventory] = useState(["stick"]); // Inventario del jugador, comienza con un palo
  const [location, setLocation] = useState(0); // Ubicación actual
  const [message, setMessage] = useState("Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."); // Mensaje para el jugador

  // Funciones para cambiar de ubicación
  const goTown = () => {
    setLocation(0);
    setMessage("Has vuelto a la plaza del pueblo");
    
  }

  const goStore = () => {
    setLocation(1);
    setMessage("Has entrado en la tienda");
  }

  const goCave = () => {
    setLocation(2);
    setMessage("Has entrado en la cueva");
  }

  // Arrays de datos del juego
  const weapons = [ // Datos de las armas
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
  ];
  const monsters = [ // Datos de los monstruos
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
  ];

  const buyHealth = () => {
    setGold((prevGold) => {
      if (prevGold >= 10) { // Si hay suficiente oro
        setHealth((prevHealth) => prevHealth + 10); // Aumenta la salud
        return prevGold - 10; // Reduce el oro
      } else {
        setMessage("You do not have enough gold to buy health."); // Mensaje de falta de oro
        return prevGold; // Devuelve el oro sin cambios
      }
    });
  }

  const buyWeapon = () => {
    if (currentWeapon < weapons.length - 1) { // Si no se ha alcanzado el límite de armas
      if (gold >= 30) { // Si hay suficiente oro
        setGold(gold - 30); // Reduce el oro
        setCurrentWeapon(currentWeapon + 1); // Cambia al siguiente arma
        let newWeapon = weapons[currentWeapon + 1].name; // Nombre del nuevo arma
        setMessage("You now have a " + newWeapon + "."); // Mensaje de adquisición de arma
        setInventory([...inventory, newWeapon]); // Agrega el nuevo arma al inventario
      } else {
        setMessage("You do not have enough gold to buy a weapon."); // Mensaje de falta de oro
      }
    } else {
      setMessage("You already have the most powerful weapon!"); // Mensaje si ya se tiene la mejor arma
    }
  }

  const sellWeapon = () => {
    if (inventory.length > 1) { // Si hay más de un arma en el inventario
      setGold(gold + 15); // Aumenta el oro
      let soldWeapon = inventory.pop(); // Elimina el arma actual del inventario
      setMessage("You sold a " + soldWeapon + "."); // Mensaje de venta de arma
      setCurrentWeapon(currentWeapon - 1); // Reduce el índice del arma actual
    } else {
      setMessage("Don't sell your only weapon!"); // Mensaje si se intenta vender el único arma
    }
  }

  

  const goFight = () => {
    setLocation(3); // Actualiza la ubicación a la de combate
    setMonsterHealth(monsters[fighting].health); // Establece la salud del monstruo
    setLocation(locations.findIndex(location => location.name === "fight")); // Cambia a la ubicación de combate
  }

  const fightSlime = () => {
    setFighting(0); // Índice del slime
    setMonsterHealth(monsters[0].health); // Establece la salud del slime
    goFight(); // Inicia el combate
  }

  const fightBeast = () => {
    setFighting(1); // Índice del fanged beast
    setMonsterHealth(monsters[1].health); // Establece la salud del fanged beast
    goFight(); // Inicia el combate
  }

  const fightDragon = () => {
    setFighting(2); // Índice del dragon
    setMonsterHealth(monsters[2].health); // Establece la salud del dragon
    goFight(); // Inicia el combate
  }

  

  
  useEffect(() => {
    // Comprueba si 'fighting' no es null o undefined antes de intentar acceder a 'monsters[fighting].name'
    if (fighting !== null && fighting !== undefined) {
      // Actualiza el mensaje con la salud del monstruo cuando cambia
      setMessage(`You are fighting a ${monsters[fighting].name}. It has ${monsterHealth} health.`);
    }
  }, [monsterHealth, fighting]); // Añade 'fighting' a la lista de dependencias

  const attack = () => {
    setMessage("The " + monsters[fighting].name + " attacks. You attack it with your " + weapons[currentWeapon].name + "."); // Mensaje de ataque
    let monsterAttackValue = getMonsterAttackValue(monsters[fighting].level); // Calcula el daño recibido por el jugador
    let newHealth = health - monsterAttackValue;
    newHealth = newHealth < 0 ? 0 : newHealth; // Si la salud es negativa, la establece a 0
    setHealth(newHealth);
    let damageToMonster = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    if (isMonsterHit()) { // Comprueba si el jugador acierta al monstruo
      let newMonsterHealth = monsterHealth - damageToMonster;
      newMonsterHealth = newMonsterHealth < 0 ? 0 : newMonsterHealth; // Si la salud del monstruo es negativa, la establece a 0
      setMonsterHealth(newMonsterHealth); // Calcula el daño al monstruo
    } else {
      setMessage(message + " You miss."); // Mensaje si el jugador falla el ataque
    }
    if (newHealth === 0) { // Si la salud del jugador llega a cero
      lose(); // Llama a la función de perder
      setTimeout(restart, 3000); // Llama a la función de reiniciar después de 3 segundos
      return; // Termina la ejecución de la función
    } else if (monsterHealth - damageToMonster <= 0) { // Si la salud del monstruo llega a cero
      if (fighting === 2) { // Si el monstruo derrotado es el dragón
        winGame(); // Llama a la función de ganar el juego
      } else {
        defeatMonster(); // Llama a la función de derrotar al monstruo
      }
    }
    if (Math.random() <= .1 && inventory.length !== 1) { // Probabilidad de que el arma se rompa
      setMessage(message + " Your " + inventory.pop() + " breaks."); // Mensaje si el arma se rompe
      setCurrentWeapon(currentWeapon - 1); // Reduce el índice del arma actual
    }
  }

  const getMonsterAttackValue = (level) => {
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); // Calcula el poder de ataque del monstruo
    return hit > 0 ? hit : 0; // Retorna el daño del monstruo (mínimo 0)
  }

  const isMonsterHit = () => {
    const hit = (monsters[fighting].level * 5) - (Math.floor(Math.random() * xp)); // Calcula el poder de ataque del monstruo
    return hit > 0 ? true : false; // Retorna si el monstruo acierta o no
  }

  const dodge = () => {
    setMessage("You dodge the attack from the " + monsters[fighting].name); // Mensaje si el jugador esquiva el ataque del monstruo
  }

  const lose = () => {
    setLocation(5); // Cambia la ubicación a la pantalla de "perdido"
    setMessage("You have been defeated. Game over."); // Muestra un mensaje de derrota
  }

  const defeatMonster = () => {
    // Añade la cantidad de experiencia y oro que el jugador gana al derrotar al monstruo
    const xpGain = monsters[fighting].level * 10;
    const goldGain = monsters[fighting].level * 5;

    // Actualiza el mensaje, la experiencia y el oro del jugador
    setMessage(`You have defeated the ${monsters[fighting].name}. It screams "Arggg" as it dies. You gain ${xpGain} XP and ${goldGain} gold.`);
    setXp(xp + xpGain);
    setGold(gold + goldGain);

    // Restablece la salud del monstruo a su valor original y vuelve a la pantalla de selección de monstruos
    setMonsterHealth(monsters[fighting].health);
    setLocation(1);

    // Cambia a la ubicación después de la batalla
    setLocation(locations.findIndex(location => location.name === "kill monster"));
  }

  const winGame = () => {
    setLocation(6); // Actualiza la ubicación a la de "ganar el juego"
  }

  const restart = () => {
    // Reinicia todas las variables del juego
    setXp(0);
    setHealth(100);
    setGold(50);
    setCurrentWeapon(0);
    setInventory(["stick"]);
    setLocation(0); // Vuelve a la ubicación inicial del juego
  }

  const easterEgg = () => {
    setLocation(7); // Actualiza la ubicación al huevo de pascua
  }

  const pickTwo = () => {
    pick(2); // Función para elegir el número dos en el juego de huevo de pascua
  }

  const pickEight = () => {
    pick(8); // Función para elegir el número ocho en el juego de huevo de pascua
  }

  const pick = (guess) => {
    const numbers = []; // Array para almacenar los números aleatorios
    while (numbers.length < 10) { // Genera 10 números aleatorios
      numbers.push(Math.floor(Math.random() * 11)); // Números entre 0 y 10
    }
    setMessage("You picked " + guess + ". Here are the random numbers:\n" + numbers.join("\n")); // Mensaje con el número elegido y los números aleatorios
    if (numbers.includes(guess)) { // Comprueba si el número elegido coincide con algún número aleatorio
      setMessage("Right! You win 20 gold!"); // Mensaje si el jugador acierta
      setGold(gold + 20); // Aumenta el oro
    } else {
      setMessage("Wrong! You lose 10 health!"); // Mensaje si el jugador falla
      let newHealth = health - 10;
      newHealth = newHealth < 0 ? 0 : newHealth; // Si la salud es negativa, la establece a 0
      setHealth(newHealth);
      if (newHealth === 0) { // Si la salud llega a cero, el jugador pierde
        lose(); // Llama a la función de perder
      }
    }
  }

  const locations = [ // Datos de las ubicaciones
      {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
      },
      {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
      },
      {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
      },
      {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
      },
      {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
      },
      {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
      },
      { 
        name: "win", 
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
        "button functions": [restart, restart, restart], 
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
      },
      {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
      }
    ];



  return (
    <div className="dragon">
      <div>
        {location === 5 ? (
          <div>
            <h1>Game Over</h1>
            <p>{message}</p>
            <button onClick={restart}>Restart</button>
          </div>
        ) : (
          <>
            <div id="game">
              <div id="stats">
                <span className="stat">XP: <strong><span id="xpText">{xp}</span></strong></span>
                <span className="stat">Health: <strong><span id="healthText">{health}</span></strong></span>
                <span className="stat">Gold: <strong><span id="goldText">{gold}</span></strong></span>
              </div>
              <div id="controls">
                <button id="button1" onClick={locations[location]["button functions"][0]}>{locations[location]["button text"][0]}</button>
                <button id="button2" onClick={locations[location]["button functions"][1]}>{locations[location]["button text"][1]}</button>
                <button id="button3" onClick={locations[location]["button functions"][2]}>{locations[location]["button text"][2]}</button>
              </div>
              <div id="monsterStats" style={{display: location === 3 ? "block" : "none"}}>
                <span className="stat">Monster Name: <strong><span id="monsterName">{fighting !== null ? monsters[fighting].name : ""}</span></strong></span>
                <span className="stat">Health: <strong><span id="monsterHealth">{monsterHealth}</span></strong></span>
              </div>
              <div id="text">
                {message}
              </div>
            </div>
            <div class="contenedor-botones">
            <Link to="/home" class="enlace-juego">
            <button class="salto">
                <h2>VOLVER</h2>
            </button>
            </Link>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dragongame;