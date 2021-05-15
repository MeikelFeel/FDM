let monto = document.getElementById("monto");
let gasto = document.getElementById("gasto");
gasto.addEventListener("click", guardaRegistro);

function guardaRegistro() {
  let valor = monto.value;
  console.log(valor);
}
