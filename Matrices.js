const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

// Array de objetos. Ejemplo: [{ nombre: "Juan", materias: { "Matemáticas": 9, "Historia": 8 } }]
let alumnos = [];

const calcularPromedio = (materias) => {
    const notas = Object.values(materias);
    if (notas.length === 0) return 0;
    const total = notas.reduce((suma, nota) => suma + nota, 0);
    return total / notas.length;
};

const buscarAlumno = (nombre) => 
    alumnos.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());

function verAlumnos() {
    if (alumnos.length === 0) {
        return console.log("\nNo hay alumnos registrados.");
    }

    const alumnosOrdenados = [...alumnos].sort((a, b) => 
        calcularPromedio(b.materias) - calcularPromedio(a.materias)
    );

    console.log("\n--- Lista de Alumnos ---");
    alumnosOrdenados.forEach(({ nombre, materias }) => {
        const promedio = calcularPromedio(materias);
        console.log(`\nAlumno: ${nombre} | Promedio: ${promedio.toFixed(2)}`);
        
        Object.entries(materias).forEach(([materia, nota]) => {
            console.log(`  - ${materia}: ${nota}`);
        });
    });

    const mejor = alumnosOrdenados[0];
    console.log(`\n🏆 Mejor alumno: ${mejor.nombre} con un promedio de ${calcularPromedio(mejor.materias).toFixed(2)}`);
}

async function agregarAlumno() {
    const nombre = await rl.question("\nIngrese el nombre del alumno: ");
    
    if (buscarAlumno(nombre)) {
        console.log("El alumno ya está registrado. Ve a la opción 3 para modificar sus notas.");
    } else {
        // Guardamos un objeto en lugar de un array
        alumnos.push({ nombre, materias: {} });
        console.log(`Alumno ${nombre} agregado con éxito.`);
    }
}

async function gestionarNotas() {
    const nombre = await rl.question("\nIngrese el nombre del alumno: ");
    const alumno = buscarAlumno(nombre);

    if (!alumno) {
        return console.log("El alumno no existe. Por favor, agréguelo primero (Opción 2).");
    }

    const materia = await rl.question("Ingrese el nombre de la materia: ");
    const nota = parseFloat(await rl.question("Ingrese la nota: "));

    if (isNaN(nota)) {
        return console.log("La nota debe ser un número válido.");
    }

    if (alumno.materias[materia] !== undefined) {
        console.log(`Modificando nota de ${materia}: de ${alumno.materias[materia]} a ${nota}`);
    } else {
        console.log(`Materia ${materia} agregada con la nota ${nota}.`);
    }
    
    alumno.materias[materia] = nota;
}

async function main() {
    let salir = false;
    while (!salir) {
        console.log("Ver alumnos y estadísticas");
        console.log("Agregar alumno");
        console.log("Agregar o modificar notas");
        console.log("Salir");
        const opcion = await rl.question("Elige una opción");

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