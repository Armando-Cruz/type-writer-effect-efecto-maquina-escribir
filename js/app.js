// Elementos interfaz
const writerContainer = document.getElementById('writer'),
	typedCursor = document.getElementById('typed-cursor');
let text = 'Diseño web completo',
	// Para borrar el texto
	textCopy = text;
let characters = text.length - 1;

// Controla el carácter que se escribe
let i = 0;

// Proceso para borrar texto
let eraseProcess = null;

function write() {
	// Maneja la escritura del texto cada cierto tiempo
	// Cuando se termina de escribir hace que el cursor parpadee
	if (i > characters) {
		// Restablece el contador para la proxima escritura
		i = 0;
		// Hace que el cursor parpadee
		typedCursor.classList.add('typed-cursor-blink');
		// Deja de escribir
		clearInterval(writeProcess);
		setTimeout(() => {
			// Empieza a borrar lo escrito
			eraseProcess = setInterval(erase, 50);
		}, 3000);
		return;
	}
	writerContainer.innerText += text[i];
	++i;
}

function erase() {
	let total = textCopy.length - 1;
	// Cuando borre todo que deje de borrar y empiece a escribir
	if (total <= 0) {
		// Borra el último carácter que faltaba
		textCopy = textCopy.substr(0, total);
		writerContainer.innerText = textCopy;
		// Nueva copia del texto para tener algo que borrar
		textCopy = text;
		// Toma el nuevo total
		total = textCopy.length - 1;
		clearInterval(eraseProcess);
		writeProcess = setInterval(write, 100);
		return;
	}
	textCopy = textCopy.substr(0, total);
	writerContainer.innerText = textCopy;
}

// Dispara todo el proceso
var writeProcess = setInterval(write, 100);
