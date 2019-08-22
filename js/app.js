(() => {
	// Elementos interfaz
	const writerContainer = document.getElementById('type-writer');

	// Controla el texto que se escribe
	let iText = 0;

	// Lee los textos del atributo
	const dataTexts = writerContainer.getAttribute('data-text');
	// Divide los textos por la coma
	let texts = dataTexts.split(',');
	// Elimina espacios innecesarios al comienzo o final en caso de existir
	texts = texts.map(text => text.trim());
	// Para borrar el texto
	let textsCopy = [...texts];

	// Maneja el total de carácteres a escribir
	let characters = texts[iText].length - 1;

	// Controla el carácter que se escribe
	let i = 0;

	// Maneja tiempo de espera para comenzar a borrar
	const wait = Number(writerContainer.getAttribute('data-wait')),
		// Maneja el tiempo de escritura y lectura
		speed = Number(writerContainer.getAttribute('data-speed'));
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
				eraseProcess = setInterval(erase, speed);
			}, wait);
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
			writeProcess = setInterval(write, speed);
			return;
		}
		textsCopy[iText] = textsCopy[iText].substr(0, total);
		writerContainer.innerText = textsCopy[iText];
	}

	// Dispara todo el proceso
	var writeProcess = setInterval(write, speed);
})();
