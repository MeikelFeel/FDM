const firebaseConfig = {
  apiKey: "AIzaSyCg7jzGxnHjWFGQBqEgsWptM-ZAbIuUn8s",
  authDomain: "fin-de-mes.firebaseapp.com",
  databaseURL: "https://fin-de-mes-default-rtdb.firebaseio.com",
  projectId: "fin-de-mes",
  storageBucket: "fin-de-mes.appspot.com",
  messagingSenderId: "635375528177",
  appId: "1:635375528177:web:a0815f96303a547cefe150",
  measurementId: "G-F9E4MWP3W0",
};

firebase.initializeApp(firebaseConfig);

let monto = document.getElementById("monto");
let user = document.getElementById("user");
let mail;
let categoria = document.getElementById("categoria");
let usuario = {};
let pic = document.getElementById("pic");
let navLogin = document.getElementById("navLogin");
let navLogout = document.getElementById("navLogout");
let guardar = document.getElementById("guardar");
let loginCard = document.getElementById("loginCard");
let saldo = document.getElementById("saldo");

guardar.addEventListener("click", (e) => {
  e.preventDefault();
  guardaRegistro();
});

navLogin.addEventListener("click", (e) => {
  e.preventDefault();
  loguearConGoogle();
});

navLogout.addEventListener("click", (e) => {
  logout();
});

function guardaRegistro() {
  let valor = monto.value;
  let cat = categoria.value;
  mail = usuario.user.email;
  let diaHora = Date.now();

  console.log(diaHora, "desde guardar reg");

  const record = {
    cuanto: -valor,
    que: cat,
    quien: mail,
    cuando: diaHora,
  };

  const db = firebase.database();
  const dbRef = db.ref("registros");
  const newRegistro = dbRef.push();
  newRegistro.set(record);
}

let logGoogle = document.getElementById("login");
logGoogle.addEventListener("click", (e) => {
  e.preventDefault();
  loguearConGoogle();
});

function loguearConGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      usuario = result;
      infoUsuario();
    })
    .catch((error) => console.log(error.message));
}

function infoUsuario() {
  user.innerHTML = usuario.user.displayName;
  pic.src = usuario.user.photoURL;
  fila1.style.display = "flex";
  loginCard.style.display = "none";
  navLogin.style.display = "none";
  navLogout.style.display = "block";
}

function blanquearUser() {
  user.innerHTML = "Iniciá Sesión";
  pic.src = "./sources/descarga.png";
  fila1.style.display = "none";
  loginCard.style.display = "flex";
  navLogout.style.display = "none";
  navLogin.style.display = "block";
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      blanquearUser();
      console.log("Log Out ok");
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

document.addEventListener("DOMContentLoaded", (e) => {
  if (user) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usuario = { user: user };
        infoUsuario();
      }
    });
  }
});
let resumen = 0;
function calcularSaldo() {
  const db = firebase.database();
  const dbRef = db.ref("registros");
  dbRef.on("child_added", (snapshot) => {
    resumen = resumen + parseInt(snapshot.val().cuanto);
    saldo.innerHTML = resumen;
  });
}
calcularSaldo();

function mostrarMovimientos() {
  const db = firebase.database();
  const dbRef = db.ref("registros");
  dbRef.on("child_added", (snapshot) => {});
}

function obtenerFecha() {
  const milisecs = Date.now();
  ahora = new Date(milisecs);
  return ahora;
}
