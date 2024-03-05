
// Guardar valores en LocalStorage
window.addEventListener('load', function() {
    const savedmontoPrestamo = localStorage.getItem('montoPrestamo');
    const savedtasaInteres = localStorage.getItem('tasaInteres');
    const savedPlazo = localStorage.getItem('Plazo');

    if (savedmontoPrestamo) {
        document.getElementById('montoPrestamo').value = savedmontoPrestamo;
    }
    if (savedtasaInteres) {
        document.getElementById('tasaInteres').value = savedtasaInteres;
    }
    if (savedPlazo) {
        document.getElementById('Plazo').value = savedPlazo;
    }
});

document.getElementById('Formulario').addEventListener('submit', function(e) {
    // Evitar el envio del formulario standard
    e.preventDefault();

    //  Obtengo los valores
    const montoPrestamo = parseFloat(document.getElementById('montoPrestamo').value);
    const tasaInteres = parseFloat(document.getElementById('tasaInteres').value) / 100 / 12; // interes mensual
    const Plazo = parseFloat(document.getElementById('Plazo').value) * 12; // Mensualidad

    // Guardado de datos
    localStorage.setItem('montoPrestamo', montoPrestamo);
    localStorage.setItem('tasaInteres', tasaInteres * 12 * 100); // Guardo TNA
    localStorage.setItem('Plazo', Plazo / 12); // Guardo TNA en anos

    // Calculo matematico
    const x = Math.pow(1 + tasaInteres, Plazo);
    const Mensualidad = (montoPrestamo * x * tasaInteres) / (x - 1);

    // El resultado es un nro finito?
    if (isFinite(Mensualidad)) {
        // Muestra los resultados
        document.getElementById('Mensualidad').innerText = '$' + Mensualidad.toFixed(2);
        document.getElementById('pagoTotal').innerText = '$' + (Mensualidad * Plazo).toFixed(2);
        document.getElementById('Intereses').innerText = '$' + ((Mensualidad * Plazo) - montoPrestamo).toFixed(2);

        document.getElementById('Resultados').style.display = 'block';
    } else {
        // En caso de Error
        showError('Por favor revise los datos');
    }
});

function showError(error) {
    // Creo un div
    const errorDiv = document.createElement('div');

    // Traigo los elementos
    const card = document.querySelector('.container');
    const heading = document.querySelector('h2');

    // class
    errorDiv.className = 'alert alert-danger';

    // Agrego al div
    errorDiv.appendChild(document.createTextNode(error));

    // Inserto el error
    card.insertBefore(errorDiv, heading);

    // Duracion de 3 segundos
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}
