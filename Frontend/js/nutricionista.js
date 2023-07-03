var btnAgregar = document.getElementById("btn-ir-agregar");
var btncrear = document.getElementById("btn-crear");
var vistaPlatos = document.getElementById("contenedor");
var vistaAgregar = document.getElementById("contenedor-agregar")

btnAgregar.addEventListener("click",()=>{
  vistaPlatos.style.display = "none";
  vistaAgregar.style.display = "flex";
})

btncrear.addEventListener("click",()=>{
  vistaPlatos.style.display = "flex";
  vistaAgregar.style.display = "none";
})