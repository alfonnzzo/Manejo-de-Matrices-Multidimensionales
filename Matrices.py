def calcular_promedio(materias):
    if not materias:
        return 0
    total = sum(materias.values())
    return total / len(materias)

def buscar_alumno(alumnos, nombre):
    for alumno in alumnos:
        if alumno["nombre"].lower() == nombre.lower():
            return alumno
    return None

def obtener_promedio_para_ordenar(alumno):
    return calcular_promedio(alumno["materias"])

def ver_alumnos(alumnos):
    if not alumnos:
        print("\nNo hay alumnos registrados.")
        return

    alumnos_ordenados = sorted(alumnos, key=obtener_promedio_para_ordenar, reverse=True)
    
    print("\n--- Lista de Alumnos ---")
    for alumno in alumnos_ordenados:
        nombre = alumno["nombre"]
        materias = alumno["materias"]
        promedio = calcular_promedio(materias)
        
        print(f"\nAlumno: {nombre} | Promedio: {promedio:.2f}")
        
        for materia, nota in materias.items():
            print(f"  - {materia}: {nota}")
            
    if alumnos_ordenados:
        mejor = alumnos_ordenados[0]
        promedio_mejor = calcular_promedio(mejor["materias"])
        print(f"\n🏆 Mejor alumno: {mejor['nombre']} con un promedio de {promedio_mejor:.2f}")

def agregar_alumno(alumnos):
    nombre = input("\nIngrese el nombre del alumno: ")
    if buscar_alumno(alumnos, nombre):
        print("El alumno ya está registrado. Ve a la opción 3 para modificar sus notas.")
    else:
        alumnos.append({"nombre": nombre, "materias": {}})
        print(f"Alumno {nombre} agregado con éxito.")

def gestionar_notas(alumnos):
    nombre = input("\nIngrese el nombre del alumno: ")
    alumno = buscar_alumno(alumnos, nombre)
    
    if not alumno:
        print("El alumno no existe. Agréguelo primero (Opción 2).")
        return
        
    materia = input("Ingrese el nombre de la materia: ")
    try:
        nota = float(input("Ingrese la nota: "))
    except ValueError:
        print("La nota debe ser un número válido.")
        return

    materias_del_alumno = alumno["materias"]
    
    if materia in materias_del_alumno:
        print(f"Modificando nota de {materia}: de {materias_del_alumno[materia]} a {nota}")
    else:
        print(f"Materia {materia} agregada con la nota {nota}.")
        
    materias_del_alumno[materia] = nota

def main():
    alumnos = []
    
    while True:
        print("Ver alumnos y estadísticas")
        print("Agregar alumno")
        print("Agregar o modificar notas")
        print("Salir")
        
        opcion = input("Elige una opción")
        
        if opcion == '1':
            ver_alumnos(alumnos)
        elif opcion == '2':
            agregar_alumno(alumnos)
        elif opcion == '3':
            gestionar_notas(alumnos)
        elif opcion == '4':
            print("Saliendo del sistema...")
            break
        else:
            print("Opción no válida. Intenta de nuevo.")

if __name__ == "__main__":
    main()