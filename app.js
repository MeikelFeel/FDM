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

let guardar = document.getElementById("guardar");
guardar.addEventListener("click", (e) => {
  e.preventDefault();
  guardaRegistro();
});

function guardaRegistro() {
  let valor = monto.value;
  let cat = categoria.value;
  mail = usuario.user.email;

  const record = {
    cuanto: valor,
    que: cat,
    quien: mail,
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
      user.innerHTML = usuario.user.displayName;
      pic.src = usuario.user.photoURL;
    })
    .catch((error) => console.log(error.message));
}
