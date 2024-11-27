// Conexión MQTT utilizando WebSocket seguro (wss://)
const client = mqtt.connect('wss://n1781645.ala.us-east-1.emqxsl.com:8084/mqtt', {
    username: 'cochabamba',  // Si necesitas un usuario para autenticarte
    password: 'bolivia',  // Si necesitas una contraseña
    rejectUnauthorized: false   // Evita errores de certificado (solo en entornos de prueba)
});

client.on('connect', function () {
    console.log('Conectado al broker MQTT');
});

client.on('error', function (err) {
    console.error('Error de conexión:', err);
});

client.on('message', function (topic, message) {
    console.log('Mensaje recibido:', topic, message.toString());
});

// Variable para guardar el estado del LED
    let ledState = 'off';  // El estado inicial es 'apagado'

    // Función para alternar el estado del LED
    function toggleLED() {
        const ledButton = document.getElementById('ledButton');  // Obtener el botón de forma segura
        if (!ledButton) {
            console.error("No se encontró el botón de LED.");
            return;
        }

        // Alterna el estado del LED
        if (ledState === 'off') {
            ledState = 'on';  // Si está apagado, lo enciende
            ledButton.innerText = 'Apagar LED';  // Cambia el texto del botón
            client.publish('test/led1', 'on', { qos: 2, retain: true }, function (error) {
                if (error) {
                    console.error('Error al enviar el mensaje:', error);
                } else {
                    console.log('LED encendido');
                }
            });
        } else {
            ledState = 'off';  // Si está encendido, lo apaga
            ledButton.innerText = 'Encender LED';  // Cambia el texto del botón
            client.publish('test/led1', 'off', { qos: 2, retain: true }, function (error) {
                if (error) {
                    console.error('Error al enviar el mensaje:', error);
                } else {
                    console.log('LED apagado');
                }
            });
        }
    }

    // Asociar la función toggleLED al botón
    const button = document.getElementById('ledButton');
    if (button) {
        button.addEventListener('click', toggleLED);
    } else {
        console.error("No se encontró el botón con el id 'ledButton'.");
    }
});
