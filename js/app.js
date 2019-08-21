// Elementos interfaz
const writerContainer = document.getElementById('writer');

// Controla el texto que se escribe
let iText = 0;

// Para una lista de textos
const texts = [
	'Complemento Frase 1',
	'Complemento Frase 2',
	'Complemento Frase 3',
	'Complemento Frase 4',
	'Complemento Frase 5',
	'Complemento Frase 6',
	'Complemento Frase 7',
	'Complemento Frase 8'
];
// Para borrar el texto
let textsCopy = [...texts];

// Maneja el total de carácteres a escribir
let characters = texts[iText].length - 1;

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
		// Deja de escribir
		clearInterval(writeProcess);
		setTimeout(() => {
			// Empieza a borrar lo escrito
			eraseProcess = setInterval(erase, 50);
		}, 3000);
		return;
	}
	writerContainer.innerText += texts[iText][i];
	++i;
}

function erase() {
	let total = textsCopy[iText].length - 1;
	// Cuando borre todo que deje de borrar y empiece a escribir
	if (total <= 0) {
		// Borra el último carácter que faltaba
		textsCopy[iText] = textsCopy[iText].substr(0, total);
		writerContainer.innerText = textsCopy[iText];
		// Nueva copia del texto para tener algo que borrar
		textsCopy = [...texts];
		// Avanza al siguiente texto
		++iText;
		// Si ya se escribieron todas las palabras, que empieze de nuevo
		if (iText >= texts.length) {
			iText = 0;
		}
		// Toma el nuevo total
		total = textsCopy[iText].length - 1;
		// Cuenta los caracteres del nuevo texto
		characters = texts[iText].length - 1;
		clearInterval(eraseProcess);
		writeProcess = setInterval(write, 100);
		return;
	}
	textsCopy[iText] = textsCopy[iText].substr(0, total);
	writerContainer.innerText = textsCopy[iText];
}

// Dispara todo el proceso
var writeProcess = setInterval(write, 100);
