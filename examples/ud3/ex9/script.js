var carta = null;
let aciertos=0;
let errores=0;

function compararCarta(cartaNueva) {
    if (carta == null) {
        carta = cartaNueva;
        return;
    }

    if (cartaNueva.attributes['name'].value == carta.attributes['name'].value) {
        //marcar ambas cartas como correctas
        carta.classList.add('correcta');
        cartaNueva.classList.add('correcta');
        aciertos++;

    } else {
        //quitamos la clase girada
        carta.classList.remove('girada');
        cartaNueva.classList.remove('girada');
        errores++;
    }
    carta = null;
    console.log(aciertos);
    console.log(errores);
    establecerAciertosErrores();
}

/**
 * @param {HTMLElement} cartaNueva - The date
 */
function girarCarta(cartaNueva) {
    if (!cartaNueva.classList.contains('girada')) {
        cartaNueva.classList.add('girada');
        //OJO. si pongo compararCarta(cartaNueva) se ejecuta directamente, si lo piensas tiene sentido.
        setTimeout(compararCarta, 500, cartaNueva);
    }
}

function resetear(){
    aciertos=0;
    errores=0;
    var cartas = document.getElementsByClassName("carta")
    for (var i = 0; i < cartas.length; i++) {
        cartas.item(i).classList.remove('girada');
        cartas.item(i).classList.remove('correcta');

    }

    establecerAciertosErrores();
}

function establecerAciertosErrores(){
    document.getElementById("aciertos").innerHTML = aciertos;
    document.getElementById("errores").innerHTML = errores;
}