const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

let alumnos = [];

function calcularPromedio(materias) {
    if (materias.length === 0) return 0;
    let total = materias.reduce((suma, materia) => suma + materia[1], 0);
    return total / materias.length;
}

function buscarAlumno(nombre) {
    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i][0].toLowerCase() === nombre.toLowerCase()) {
            return alumnos[i];
        }
    }
    return null;
}

function verAlumnos() {
    if (alumnos.length === 0) {
        console.log("\nNo hay alumnos registrados.");
        return;
    }

    let alumnosOrdenados = [...alumnos].sort((a, b) => calcularPromedio(b[1]) - calcularPromedio(a[1]));

    console.log("\n--- Lista de Alumnos ---");
    alumnosOrdenados.forEach(alumno => {
        let nombre = alumno[0];
        let materias = alumno[1];
        let promedio = calcularPromedio(materias);

        console.log(`\nAlumno: ${nombre} | Promedio: ${promedio.toFixed(2)}`);
        materias.forEach(materia => {
            console.log(`  - ${materia[0]}: ${materia[1]}`);
        });
    });

    if (alumnosOrdenados.length > 0) {
        let mejor = alumnosOrdenados[0];
        console.log(`\n🏆 Mejor alumno: ${mejor[0]} con un promedio de ${calcularPromedio(mejor[1]).toFixed(2)}`);
    }
}

async function agregarAlumno() {
    const nombre = await rl.question("\nIngrese el nombre del alumno: ");
    if (buscarAlumno(nombre)) {
        console.log("El alumno ya está registrado. Ve a la opción 3 para modificar sus notas.");
    } else {
        alumnos.push([nombre, []]);
        console.log(`Alumno ${nombre} agregado con éxito.`);
    }
}

async function gestionarNotas() {
    const nombre = await rl.question("\nIngrese el nombre del alumno: ");
    let alumno = buscarAlumno(nombre);

    if (!alumno) {
        console.log("El alumno no existe. Por favor, agréguelo primero (Opción 2).");
        return;
    }

    const nombreMateria = await rl.question("Ingrese el nombre de la materia: ");
    let notaInput = await rl.question("Ingrese la nota: ");
    let nota = parseFloat(notaInput);

    if (isNaN(nota)) {
        console.log("La nota debe ser un número válido.");
        return;
    }

    let materiasDelAlumno = alumno[1];
    let materiaEncontrada = false;

    for (let i = 0; i < materiasDelAlumno.length; i++) {
        if (materiasDelAlumno[i][0].toLowerCase() === nombreMateria.toLowerCase()) {
            console.log(`Modificando nota de ${materiasDelAlumno[i][0]}: de ${materiasDelAlumno[i][1]} a ${nota}`);
            materiasDelAlumno[i][1] = nota;
            materiaEncontrada = true;
            break;
        }
    }

    if (!materiaEncontrada) {
        materiasDelAlumno.push([nombreMateria, nota]);
        console.log(`Materia ${nombreMateria} agregada con la nota ${nota}.`);
    }
}

async function main() {
    let salir = false;
    while (!salir) {
        console.log("\n==============================");
        console.log("1. Ver alumnos y estadísticas");
        console.log("2. Agregar alumno");
        console.log("3. Agregar o modificar notas");
        console.log("4. Salir");
        console.log("==============================");

        const opcion = await rl.question("Elige una opción: ");

        switch (opcion) {
            case '1':
                verAlumnos();
                break;
            case '2':
                await agregarAlumno();
                break;
            case '3':
                await gestionarNotas();
                break;
            case '4':
                console.log("Saliendo del sistema...");
                salir = true;
                rl.close();
                break;
            default:
                console.log("Opción no válida. Intenta de nuevo.");
        }
    }
}

// Ejecutar el programa
main();