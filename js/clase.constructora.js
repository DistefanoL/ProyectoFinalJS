class Cotizador {
    constructor(clases, descuento) {
        this.clases = clases || 0
        this.descuento = descuento || 0
    }


    calcularTotal() {
        let total = parseFloat(this.clases * 5000) - (this.clases * 5000 * this.descuento)
        total = total.toFixed(2)
        return parseFloat(total)
    }

}

