def calcular_promedio(materias):
    if not materias:
        return 0
    total = sum(materia[1] for materia in materias)
    return total / len(materias)

def buscar_alumno(alumnos, nombre):
    for alumno in alumnos:
        if alumno[0].lower() == nombre.lower():
            return alumno
    return None

def ver_alumnos(alumnos):
    if not alumnos:
        print("\nNo hay alumnos registrados.")
        return

    alumnos_ordenados = sorted(alumnos, key=lambda x: calcular_promedio(x[1]), reverse=True)
    
    print("\nLista de Alumnos")
    for alumno in alumnos_ordenados:
        nombre = alumno[0]
        materias = alumno[1]
        promedio = calcular_promedio(materias)
        
        print(f"\nAlumno: {nombre} | Promedio: {promedio:.2f}")
        for materia in materias:
            print(f"  - {materia[0]}: {materia[1]}")
            
    if alumnos_ordenados:
        mejor = alumnos_ordenados[0]
        print(f"\nMejor alumno: {mejor[0]} con un promedio de {calcular_promedio(mejor[1]):.2f}")

def agregar_alumno(alumnos):
    nombre = input("\nIngrese el nombre del alumno: ")
    if buscar_alumno(alumnos, nombre):
        print("El alumno ya está registrado. Ir la opción 3 para modificar sus notas.")
    else:
        alumnos.append([nombre, []])
        print(f"Alumno {nombre} agregado con éxito.")

def gestionar_notas(alumnos):
    nombre = input("\nIngrese el nombre del alumno: ")
    alumno = buscar_alumno(alumnos, nombre)
    
    if not alumno:
        print("El alumno no existe. Agréguelo primero (Opción 2).")
        return
        
    nombre_materia = input("Ingrese el nombre de la materia: ")
    try:
        nota = float(input("Ingrese la nota: "))
    except ValueError:
        print("La nota debe ser un número válido.")
        return

    materias_del_alumno = alumno[1]
    materia_encontrada = False

    for materia in materias_del_alumno:
        if materia[0].lower() == nombre_materia.lower():
            print(f"Modificando nota de {materia[0]}: de {materia[1]} a {nota}")
            materia[1] = nota
            materia_encontrada = True
            break
            
    if not materia_encontrada:
        materias_del_alumno.append([nombre_materia, nota])
        print(f"Materia {nombre_materia} agregada con la nota {nota}.")

def main():
    alumnos = []
    
    while True:
        print("\n" + "="*30)
        print("1. Ver alumnos y estadísticas")
        print("2. Agregar alumno")
        print("3. Agregar o modificar notas")
        print("4. Salir")
        print("="*30)
        
        opcion = input("Elige una opción: ")
        
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