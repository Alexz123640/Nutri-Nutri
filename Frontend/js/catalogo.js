var btn_filtrar = document.getElementById("filter");
var tocar = false;
btn_filtrar.addEventListener("click", ()=>{
  if (tocar == false){
    document.querySelector(".banner").style.display= "none";
    document.querySelector(".filter").style.display="block";
    tocar = true;
  }
  else{
    document.querySelector(".filter").style.display= "none";
    document.querySelector(".banner").style.display="block";
    tocar = false;
  }  
})

var sugerencias = document.querySelector(".content-suggestion");
sugerencias.addEventListener("click", (event)=>{
  console.log(event.target)
  sugerencias.removeChild(event.target)
})
