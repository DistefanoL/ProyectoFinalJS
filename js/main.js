const URL = "js/tipos.json"
const URL1 = "js/metodos.json"
const arrayTipos = []
const arrayMetodos = []

const clase = 5000


const divCotizador = document.querySelector("div.panel-cotizacion")
const divResultado = document.querySelector("div.panel-resultado")

const cantClases = document.querySelector("input#cantClases")
const selectTipo = document.querySelector("select#selectTipo")
const selectFormaDePago = document.querySelector("select#selectFormaDePago")
const botonCotizar = document.querySelector("button.botonCotizar")
const botonComprar = document.querySelector("button.botonComprar")
const botonHistorial = document.querySelector("a.botonHistorial")


function cargarDatos() {
    if (arrayTipos.length > 0) {
        arrayTipos.forEach((tipo) => selectTipo.innerHTML += `<option>${tipo.modo}</option>`)
    }
    if (arrayMetodos.length > 0) {
        arrayMetodos.forEach((metodo) => selectFormaDePago.innerHTML += `<option>${metodo.forma}</option>`)
    }

}

function cargarLS() {
    const datosDeCompra = {
        clases: cantClases.value,
        FormaDepago: selectFormaDePago.value,
        TipoDeCurso: selectTipo.value,
    }
    
    localStorage.setItem("datosCompra", JSON.stringify(datosDeCompra))
}

function recuperarLS() {
    let datosCompra = JSON.parse(localStorage.getItem("datosCompra"))

}


function retornarDescuento(forma) {
    let metodo = arrayMetodos.find((metodo) => metodo.forma === forma)
    return metodo.descuento
}

function cotizarClases() {
    let clasesSolicitadas = parseInt(cantClases.value)
    let descuentoAplicado = retornarDescuento(selectFormaDePago.value)

    const resultadoCotizacion = new Cotizador(clasesSolicitadas, descuentoAplicado)
    let subTotal = resultadoCotizacion.calcularTotal()

    const spanResultado = document.querySelector("span.spanResultado")
    spanResultado.textContent = subTotal
    cargarLS()
    recuperarLS()

}

async function obtenerTipos() {
    try {
        const response = await fetch(URL)
        const data = await response.json()
        arrayTipos.push(...data)
        cargarDatos()
    } catch (error) {

    }

}

async function obtenerMetodos(){
    try{
        const response = await fetch(URL1)
        const data = await response.json()
        arrayMetodos.push(...data)
        cargarDatos()
    } catch (error) {
        
    }
}



botonCotizar.addEventListener("click", () => cotizarClases())
botonComprar.addEventListener("click", () => {
    Swal.fire({
        title: "Muchas Gracias!",
        text: "La compra se ha realizado con exito",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(localStorage.clear(),
          location.reload());
        }
      });
})

obtenerTipos()
obtenerMetodos()
recuperarLS()
