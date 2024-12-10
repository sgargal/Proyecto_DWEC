//DEFINIR OBJETO DIRECCION (ATRIBUTO DE CLASE ESTUDIANTE)
class Direccion{
    #calle;
    #numero;
    #piso;
    #codigoPostal;
    #provincia;
    #localidad;

    constructor(calle, numero, piso, codigoPostal, provincia, localidad){
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
    }

    //GETTERS Y SETTERS
    get calle(){
        return this.#calle;
    }

    set calle(calle){
        this.#calle = calle;
    }

    get numero(){
        return this.#numero;
    }

    set numero(numero){
        this.#numero = numero;
    }

    get piso(){
        return this.#piso;
    }

    set piso(piso){
        this.#piso = piso;
    }

    get codigoPostal(){
        return this.#codigoPostal;
    }

    set codigoPostal(codigoPostal){
        this.#codigoPostal = codigoPostal;
    }

    get provincia(){
        return this.#provincia;
    }

    set provincia(provincia){
        this.#provincia = provincia;
    }

    get localidad(){
        return this.#localidad;
    }

    set localidad(localidad){
        this.#localidad = localidad;
    }

    toString(){
        return `Calle: ${this.calle}, Numero: ${this.numero}, Piso: ${this.piso}, Código Postal: ${this.codigoPostal}, Provincia: ${this.provincia}, Localidad: ${this.localidad}`;
    }
    // get direccion(){
    //     return `${this.#direccion.calle}, ${this.#direccion.numero}, ${this.#direccion.piso}, ${this.#direccion.codigoPostal}, ${this.#direccion.provincia}, ${this.#direccion.localidad}`;
    // }

    // // set direccion(direccion){
    // //     this.#direccion = direccion;
    // // }

    // set direccion(direccion){
    //     //Verifico que direccion no sea null o undefined
    //     if(direccion && 
    //         typeof direccion.calle === "string" && //Válido que calle sea un string
    //         typeof direccion.numero === "number" &&  //Válido que numero sea un number
    //         typeof direccion.piso === "number" && //Válido que piso sea un number
    //         (/^[0-9]{5}/.test(direccion.codigoPostal)) && //Validación de que codPostal tenga 5 numeros
    //         typeof direccion.provincia === "string" &&
    //         typeof direccion.localidad === "string"
    //     ){
    //         this.#direccion = direccion;
    //     }else{
    //         console.error("La direccion no es válida");
    //     }
    // }
}
//DEFINIR CLASE PERSONA
class Persona{
    #nombre;
    #edad;
    #direccion;

    constructor (nombre, edad, direccion){
        this.nombre = nombre;
        this.edad = edad;
        this.direccion = direccion;
    }

    //NOMBRE
    get nombre(){
        return this.#nombre;
    }

    set nombre(nombre){
        //Compruebo que solo se puedan poner letras y espacios
        if(/^[A-Za-z\s]+$/.test(nombre)){
            this.#nombre = nombre;
        }else{
            console.error("ERROR: El nombre solo debe contener letras y espacios.");
        }
    }

    //EDAD
    get edad(){
        return this.#edad;
    }

    set edad(edad){
        //compruebo que la edad sea un numero y que no sea nagativo ni mayor de 100
        if(/^[0-9]+$/.test(edad) && edad > 0 && edad <= 100){
            this.#edad = edad;
        }else{
            console.error("ERROR: La edad solo debe contener números.");
        }
    }

    //DIRECCIÓN
    get direccion(){
        return this.#direccion.toString();
    }

    set direccion(direccion){
        //compruebo que se haya instaciado el objeto direccion
        if(direccion instanceof Direccion){
            this.#direccion = direccion;
        }else{
            console.error("ERROR: La direccion no es correcta.")
        }
    }

    //MÉTODOS
    toString(){
        return `${this.nombre}, ${this.edad}, ${this.direccion}`;
    }

}

//DEFINIR CLASE ESTUDIANTE
class Estudiante extends Persona{
    //Creo los atributos de la clase estudiante privados para que no sean accesibles fuera de la clase
    #id;
    #asignaturas;
    static numerosAsignados = [];
    #historial;

    constructor(id, nombre, edad, direccion){
        //Llamo al constructor de la clase pasre (PERSONA) para inicializar estos atributos
        super(nombre, edad, direccion);
        //Llamo al setter para aplicar la validacion y evitar la duplicacion
        this.id = id; 
        this.#asignaturas = [];
        this.#historial = [];//Historial de matriculaciones y desmatriculaciones
    }

    //Getters y setters
    //ID
    get id(){
        return this.#id; //Devuelve el valor interno de _id
    }

    set id(id){
        if(!/^[0-9]{3}[E]$/.test(id)){
            console.error("ERROR: El id de los estudiantes no permite ese formato.");
            return;
        }
        if(Estudiante.numerosAsignados.includes(id)){
            console.error(`ERROR: El ID ${id} esta siendo utilizado`)
            return;
        }

        this.#id = id;
        Estudiante.numerosAsignados.push(id);
        
    }

    get asignaturas(){
        return [...this.#asignaturas];
    }


    get historial(){
        if(this.#historial.length === 0){
            return [];
        }

        return this.#historial.map(([actividad, asignatura, fecha]) => {
            const dia = String(fecha.getDate()).padStart(2,'0');
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const anio = fecha.getFullYear();

            return `${actividad} en ${asignatura} el ${dia}-${mes}-${anio}`;
        });
    }

    //MÉTODOS
    toString(){
        let mostrarAsignaturas = "Sin asignaturas";
        if(this.#asignaturas.length>0){
            mostrarAsignaturas = this.#asignaturas.map(([asig, calif]) => `${asig.nombreAsignatura}: ${calif ?? "Sin calificar"}`).join(", ");
        }

        return `${super.toString()}, ID: ${this.id}, Asignaturas: [${mostrarAsignaturas}]`;
    }

    //MATRICULAR ALUMNO
    matricular(asignatura){
        const matriculado = this.#asignaturas.some(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(matriculado){
            console.error("ERROR: Ya esta matriculado");
            return;
        }

        this.#asignaturas.push([asignatura, "Sin calificar"]);
        this.#historial.push(["Matriculacion", asignatura.nombreAsignatura, new Date()]);

        console.log(`Se ha matriculado en ${asignatura.nombreAsignatura} correctamente.`);
    }

    //DESMATRICULAR ALUMNO
    desmatricular(asignatura){
        const ind = this.#asignaturas.findIndex(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(ind === -1){
            console.error(`ERROR: No esta matriculado en la asignatura.`);
            return;
        }

        this.#asignaturas.splice(ind, 1);

        this.#historial.push(["Desmatriculación", asignatura.nombreAsignatura, new Date()]);
    }

    
    //AGREGAR NOTAS
    agregarCalificacion(asignatura, calificacion){
        const asigEncontrada = this.#asignaturas.find(asig => asig[0].nombreAsignatura === asignatura.nombreAsignatura);

        if(!asigEncontrada){
            console.error(`ERROR: El estudiante no esta matriculado.`);
            return;
        }

        if(typeof calificacion !== 'number' || calificacion < 0 || calificacion > 10){
            console.error("ERROR: La calificación no es válida.");
            return;
        }


        asigEncontrada[1] = calificacion;
        console.log(`La calificacion fue agregada correctamente.`);
    }
    //MEDIA DE LAS NOTAS
    promedioCalificaciones(){
        const asignaturasCalificadas = this.#asignaturas.filter(asig => typeof asig[1] === 'number');
 
        if(asignaturasCalificadas.length === 0 ){
            console.warn("No hay calificaciones registradas para este estudiante.");
            return "Sin calificaciones";
        }

        const sum = asignaturasCalificadas.reduce((acumulador, asig) => acumulador + asig[1], 0);
        return (sum / asignaturasCalificadas.length).toFixed(2);
    }

    //ELIMINAR ID
    eliminarIdRegistrado(id){
        //guarso en una variable el indice del id que se desea eliminar.
        const indiceId = Estudiante.numerosAsignados.indexOf(id);

        //Si devuelve distinto de -1 (ha ecnontrado el id), lo elimina
        if(indiceId !== -1){
            Estudiante.numerosAsignados.splice(indiceId, 1);
            console.log(`ID ${id} ha sido correctamente eliminado.`)
        }else{
            console.error(`ERROR: El ID ${id} no esta siendo utilizado`);
        }
    }

}
//CLASE ASIGNATURAS
class Asignaturas{
    #nombreAsignatura;
    #calificaciones;

    constructor(nombreAsignatura){
        this.nombreAsignatura = nombreAsignatura;
        this.#calificaciones = [];
    }

    //GETTERS Y SETTERS
    get nombreAsignatura(){
        return this.#nombreAsignatura;
    }
    set nombreAsignatura(nombreAsignatura){
        //compruebo que el valor introducido sea un string sino salta un error
        if(typeof(nombreAsignatura) === "string"){
            this.#nombreAsignatura = nombreAsignatura;
        }else{
            console.error("ERROR: El nombre de la asignatura no es válido.")
        }
    }

    //MÉTODOS
    //Para añadir calificaciones creo un metodo ya que con setter borraria los valores anteriores
    aniadirCalificacion(calificacion){
        //Compruebo que el valor pasado como parámetro sea un número y que sea entre 0 y 10
        if(Number.isInteger(calificacion) && calificacion >= 0 && calificacion <= 10){
            this.#calificaciones.push(calificacion);
            console.log(`La calificacion se ha añadido correctamente.`);
        }else{
            console.error("ERROR: La calificacion no es válida.");
        }
    }

    calcularPromedioCalificaciones(){
        //Si el array esta vacío, devuelve 0
        if(this.#calificaciones.length === 0){
            return 0;
        }
        //Si el array contiene valores hago la media
        const suma = this.#calificaciones.reduce((acumulador, calificacion) => acumulador+calificacion,0); //sumamos todos los valores del array
        //calculo la media y devuelvo un el resultado con 2 decimales
        return (suma / this.#calificaciones.length).toFixed(2);
    }

    toString(){
        return `Nombre: ${this.nombreAsignatura}, Calificaciones: ${this.#calificaciones}`;
    }

}

//CLASE LISTAS
class ListaEstudiantes{
    #listaEstu = [];

    constructor(){
        this.#listaEstu = [];
    }

    get listaEstu() {
        return this.#listaEstu;
    }

    agregarEstudiante(estudiante){
        if(this.#listaEstu.some(est => est.id === estudiante.id)){
            console.error("El estudiante ya se encuentra en la lista.");
            return;
        }
        this.#listaEstu.push(estudiante);
        console.log(`Estudiante ${estudiante.nombre} agragado correctamente.`);
    }

    eliminarEstudiante(id){
        //uso el parametro para encontrar el indice
        const indice = this.#listaEstu.findIndex(est => est.id === id);
        if(indice === -1){
            console.error("ERROR: No se encontró ese estudiante.");
            return;
        }
        this.#listaEstu.splice(indice, 1)
        console.log(`Estudiante con ID ${id} ha siso eliminado correctamente.`);
    }

    buscarEstudiantes(nombre){
        const estudiantesEncontrados = this.#listaEstu.filter(est => est.nombre.toLowerCase().includes(nombre.toLowerCase()));

        if(estudiantesEncontrados.length === 0){
            console.log("No hay resultados para tu búsqueda.");
        }else{
            estudiantesEncontrados.forEach(est => console.log(est.toString()));
        }
    }

    mostrarListaEstudiantes(){
        if(this.#listaEstu.length === 0){
            console.error("No hay estudiantes registrados.");
            return;
        }
        this.#listaEstu.forEach(est => console.log(est.toString()));
    }
}

class ListaAsignaturas{
    #listaAsignaturas = [];

    constructor(){
        this.#listaAsignaturas = [];
    }

    get listaAsignaturas(){
        return this.#listaAsignaturas;
    }
    agregarAsignatura(asignatura){
        if(this.#listaAsignaturas.some(asig => asig.nombreAsignatura === asignatura.nombreAsignatura)){
            console.error("La asignatura ya fue añadida anteriormente.");
            return;
        }
        this.#listaAsignaturas.push(asignatura);
        console.log(`Asignatura añadida correctamente.`);
    }

    eliminarAsignatura(nombreAsignatura){
        const ind = this.#listaAsignaturas.findIndex(asig => asig.nombreAsignatura === nombreAsignatura);

        if(ind === -1){
            console.error("ERROR: No ese ha encontrado la asignatura.");
            return;
        }

        this.#listaAsignaturas.splice(ind, 1);
        console.log(`${nombreAsignatura} ha sido correctamente eliminada.`);
    }

    buscarAsignaturas(nombre){
        const asignaturasEncontradas = this.#listaAsignaturas.filter(asig => asig.nombreAsignatura.toLowerCase().includes(nombre.toLowerCase()));

        if(asignaturasEncontradas.length === 0){
            console.log("No se han encontrado resultados.");
        }else{
            asignaturasEncontradas.forEach(asig => console.log(asig.toString()));
        }
    }

    mostrarListaAsignaturas(){
        if(this.#listaAsignaturas.length === 0){
            console.error("No hay asignaturas creadas.");
            return;
        }
        this.#listaAsignaturas.forEach(asig => console.log(asig.toString()));
    }
}

//PROGRAMA PRINCIPAL

const listaEstudiantes = new ListaEstudiantes();
const listaAsignaturas = new ListaAsignaturas();

const estudiante1 = new Estudiante("123E", "Sara", 19, new Direccion("Calle Flor", 2, 3, 18013, "Granada", "Granada"));
const estudiante2 = new Estudiante("124E", "Santiago", 23, new Direccion("Calle Real", 3, 4, 18014, "Granada", "Granada"));
const estudiante3 = new Estudiante("125E", "Samuel", 25, new Direccion("Calle Nueva", 5, 2, 20029, "Cordoba", "Cordoba"));

listaEstudiantes.agregarEstudiante(estudiante1);
listaEstudiantes.agregarEstudiante(estudiante2);
listaEstudiantes.agregarEstudiante(estudiante3);

const asignatura1 = new Asignaturas("DWEC");
const asignatura2 = new Asignaturas("DWES");
const asignatura3 = new Asignaturas("DIW");

listaAsignaturas.agregarAsignatura(asignatura1);
listaAsignaturas.agregarAsignatura(asignatura2);
listaAsignaturas.agregarAsignatura(asignatura3);

estudiante1.matricular(asignatura1);
listaEstudiantes.mostrarListaEstudiantes();






function menuPrincipal(){
    console.log(`
        +-----   MENÚ PRINCIPAL  ----+
        | 1. Crear                   |
        | 2. Eliminar                |
        | 3. Matricular              |
        | 4. Desmatricular           |
        | 5. Mostrar Registros       |
        | 6. Calificar               |
        | 7. Mostrar Promedio        |
        | 8. Buscar                  |
        | 9. Reporte                 |      
        | 10. Salir                  |  
        +----------------------------+         
    `);
}

function menuCrear(){
    console.log(`
        +-----    MENÚ     ----+ 
        | 1. Crear Estudiante  | 
        | 2. Crear Asignatura  | 
        | 3. Salir             | 
        +----------------------+
    `);
}

function menuEliminar(){
    console.log(`
        +-----     MENÚ       ----+ 
        | 1. Eliminar Estudiante  | 
        | 2. Eliminar Asignatura  | 
        | 3. Salir                | 
        +-------------------------+
    `);
}

function menuBuscar(){
    console.log(`
        +-----     MENÚ       ----+ 
        | 1. Buscar Estudiante    | 
        | 2. Buscar Asignatura    | 
        | 3. Salir                | 
        +-------------------------+
    `);
}


let salirMenuPrincipal = false;
while(!salirMenuPrincipal){
    menuPrincipal();
    const op = prompt("Elija una opción: ");

    switch(op){
        case '1': 
            menuCrear();
            const opCrear = prompt("Elija una opción: ");
            switch(opCrear){
                case '1':
                    const id = prompt("ID del estudiante: ");
                    const nombre = prompt("Nombre del estudiante: ");
                    const edad = prompt("Edad del estudiante: ");
                    const calle = prompt("Ingrese la calle: ");
                    const numero = prompt("Ingrese el número: ");
                    const piso = prompt("Ingrese el piso: ");
                    const provincia = prompt("Ingrese la provincia: ");
                    const codPostal = prompt("Ingrese el código postal: ");
                    const localidad = prompt ("Ingrese la localidad: ");
    
                    const direccion = new Direccion(calle, numero, piso, codPostal, provincia, localidad);

                    const estudiante = new Estudiante(id, nombre, edad, direccion);

                    console.log("Estudiante correctamente creado.");
                    console.log(estudiante.toString());
                    listaEstudiantes.agregarEstudiante(estudiante);
                    break;
                case '2':
                    const nombreAsig = prompt("Nombre de la asignatura: ");

                    if(nombreAsig.trim() === ""){
                        console.error("ERROR: Debe ingresar un nombre válido.");
                    }else{
                        const asig = new Asignaturas(nombreAsig);

                        console.log("Asignatura creada correctamente.");
                        console.log(asig.toString());
                        listaAsignaturas.agregarAsignatura(asig);
                    }
                    break;
                case '3':
                    salirMenuPrincipal = true;
                    break;
                default:
                    console.error("Opción no válida."); 
            }
            break;
            case '2':
                menuEliminar();
                const opEliminar = prompt("Elija una opción: ");

                switch(opEliminar){
                    case '1':
                        const idEliminar = prompt("Ingrese el ID del alumno que desea eliminar: ");
                        listaEstudiantes.eliminarEstudiante(idEliminar);
                        
                        console.log("Lista de estudiantes actualizada: ");
                        listaEstudiantes.mostrarListaEstudiantes();

                        break;
                    case '2':
                        const nombreEliminar = prompt("Ingrese el nombre de la asignatura que desea eliminar: ");
                        listaAsignaturas.eliminarAsignatura(nombreEliminar);

                        console.log("Lista de asignaturas actualizada: ");
                        listaAsignaturas.mostrarListaAsignaturas();
                        
                        break;
                    case '3':
                        salirMenuPrincipal = true;
                        break;
                    default:
                        console.error("ERROR: Opción no válida.");
                }
            break;
            case '3':
                console.log("Seleccione que estudiante quiere matricular: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstudiante = prompt("Introduzca el ID del estudiante: ");

                const estudiante = listaEstudiantes.listaEstu.find(est => est.id === idEstudiante);
                if(!estudiante){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }

                console.log("Seleccione la asignatura donde lo quiere matricular: ");
                listaAsignaturas.mostrarListaAsignaturas();
                const nombreAsignatura = prompt("Introduzca el nombre de la asignatura: ");

                const asignatura = listaAsignaturas.listaAsignaturas.find(asig => asig.nombreAsignatura === nombreAsignatura);
                if(!asignatura){
                    console.error("ERROR: Asignatura no encontrada.");
                    break;
                }
                estudiante.matricular(asignatura);
                console.log(`El estudiante ha sido correctamente matriculado.`);
                break;
            case '4':
                console.log("Seleccione que estudiante quiere matricular: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstudianteDesmatricular = prompt("Introduzca el ID del estudiante: ");

                const estudianteDesmatricular = listaEstudiantes.listaEstu.find(est => est.id === idEstudianteDesmatricular);
                if(!estudianteDesmatricular){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }

                console.log(`Asignaturas del estudiante: `);

                estudianteDesmatricular.asignaturas.forEach((asig, index) => {
                    console.log(`${index + 1}. ${asig[0].nombreAsignatura} - ${asig[1]}`);
                });

                const numAsignatura = prompt("Introduzca el número de la asignatura. ");
                const asignaturaDesmatricular = estudianteDesmatricular.asignaturas[numAsignatura - 1];

                if(!asignaturaDesmatricular){
                    console.error("ERROR: Asignatura no encontrada.");
                    break;
                }

                estudianteDesmatricular.desmatricular(asignaturaDesmatricular[0]);

                console.log(`El estudiante ha sido desmatriculado correctamente.`);

                break;

            case '5':
                console.log("Seleccione el estudiante para ver sus registros: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstuRegistros = prompt("Introduzca el ID del estudiante: ");

                const estudianteRegistros = listaEstudiantes.listaEstu.find(est => est.id === idEstuRegistros);
                if(!estudianteRegistros){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }

                if(Array.isArray(estudianteRegistros.historial) && estudianteRegistros.historial.length === 0){
                    console.log("No tiene registros este estudiante.");
                }else{
                    console.log(`Registros del estudiante: `);
                    estudianteRegistros.historial.forEach(registro => console.log(registro));
                }
                break;
            case '6':
                console.log("Seleccione el estudiante para calificarle: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstuCalificar = prompt("Introduzca el ID del estudiante: ");

                const estudianteCalificar = listaEstudiantes.listaEstu.find(est => est.id === idEstuCalificar);
                if(!estudianteCalificar){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }
                console.log("Seleccione la asignatura donde lo quiere calificar: ");
                listaAsignaturas.mostrarListaAsignaturas();
                const nombreAsignaturaCalificar = prompt("Introduzca el nombre de la asignatura: ");

                const asignaturaCalificar = listaAsignaturas.listaAsignaturas.find(asig => asig.nombreAsignatura === nombreAsignaturaCalificar);

                if(!asignaturaCalificar){
                    console.error("ERROR: Asignatura no encontrada.");
                    break;
                }

                const cali = prompt("Introduzca la calificacion: ");
                const calificacion = parseFloat(cali);

                if(isNaN(calificacion) || calificacion < 0 || calificacion > 10){
                    console.error("ERROR: La calificación no es válida.");
                    break;
                }

                estudianteCalificar.agregarCalificacion(asignaturaCalificar, calificacion);

                console.log(`El estudiante ha sido calificado correctamente.`);
                break;
            case '7':
                console.log("Seleccione el estudiante para ver su promedio: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstuPromedio = prompt("Introduzca el ID del estudiante: ");

                const estudiantePromedio = listaEstudiantes.listaEstu.find(est => est.id === idEstuPromedio);

                if(!estudiantePromedio){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }

                const promedio = estudiantePromedio.promedioCalificaciones();

                if(promedio === "Sin calificaciones"){
                    console.log("Este estudiante no tiene calificaciones.");
                }else{
                    console.log(`El promedio del estudiante es ${promedio}`);
                }
                break;
            case '8':
                menuBuscar();
                const opBuscar = prompt("Elija una opción: ");
                switch(opBuscar){
                    case '1':
                        const patron = prompt("Introduzca el nombre del estudiante que quiere ver: ");
                        listaEstudiantes.buscarEstudiantes(patron);
                        break;

                    case '2':
                        const patronAsig = prompt("Introduzca el nombre de la asignatura que quiere ver: ");
                        listaAsignaturas.buscarAsignaturas(patronAsig);
                        break;
                    case '3':
                        salirMenuPrincipal = true;
                        break;
                    default:
                      console.error("ERROR: Opción no válida.");

                }
                break;
            case '9':
                console.log("Seleccione el estudiante para calificarle: ");

                listaEstudiantes.mostrarListaEstudiantes();
                const idEstuReporte = prompt("Introduzca el ID del estudiante: ");

                const estudianteReporte = listaEstudiantes.listaEstu.find(est => est.id === idEstuReporte);
                if(!estudianteReporte){
                    console.error("ERROR: Estudiante no encontrado.");
                    break;
                }

                //Muestro los detalles del estudiante
                console.log(`REPORTE DE ESTUDIANTE: `);
                console.log(`Nombre: ${estudianteReporte.nombre}`);
                console.log(`Edad: ${estudianteReporte.edad}`);
                console.log(`Direccion: ${estudianteReporte.direccion}`);

                //Muestro las asignaturas y calificaciones
                console.log("\nAsignaturas y calificaciones: ");
                estudianteReporte.asignaturas.forEach(([asig,calif], index) => {
                    console.log(`${index + 1}. ${asig.nombreAsignatura} - Calificaciones: ${calif}`);
                });

                //Muestro promedio
                const promedioReporte = estudianteReporte.promedioCalificaciones();
                console.log(`\nPromedio del estudiante: ${promedioReporte}`);

                //Muestro el historial
                console.log("\nHistorial: ");
                if(estudianteReporte.historial.length === 0){
                    console.log("No hay registros disponibles");
                }else{
                    estudianteReporte.historial.forEach(registro => console.log(registro));
                }

                break;

            case '10':
                console.log("Saliendo del programa...");
                salirMenuPrincipal = true;
                break;
            default:
                console.error("ERROR: Opción no valida.");   
    }
}









