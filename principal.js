let {cursos} = require("./cursos");
const fs = require ('fs');

/**
 * Lista de opciones para ejecutar la librería yargs
 */
let opciones = {
    idCurso: {
        demand: true,
        alias: 'i'
    },
    nombre: {
        demand: true,
        alias: 'n'
    },
    cedula: {
        demand: true,
        alias: 'x'
    }
}

const argv = require('yargs')
            .command ('inscribir','Matricular en un curso', opciones)
            .argv

/**
 * Método que muestra los cursos a matricular
 */
let mostrarCursos = () => {
    for (let index = 1; index <= cursos.length; index++) {
        setTimeout(() => {
            let curso = cursos[index - 1];
            let respuesta = "El curso se llama " + curso.nombre + " tiene un id " + curso.id +
                            ", una duración de " + curso.duracion + 
                            " horas y un valor de " + curso.valor + " pesos"; 
            console.log(respuesta); 
        }, index * 2000);// Pasan 2 segundos entre cada curso
    }
}

// Parametros ingresados en el comando
let idCurso = argv.idCurso;
let nombre = argv.nombre;
let cedula = argv.cedula;

/**
 * Método que obtiene un curso dado su ID.
 * @param {Id del curso} idCursoP 
 */
let obtenerCurso = (idCursoP) => {
    return cursos.find(curso => curso.id == idCursoP )
}

/**
 * Método que escribe en un archivo la información del interesado y la información del curso
 * para crear la matricula.
 * @param {Curso} curso 
 */
let escribirArchivo = (curso) => {
    let texto = "Información del interesado" + "\n" +  
                "\t" + "Nombre: " + nombre + "\n" + 
                "\t" + "Cédula: " + cedula + "\n" + 
                "Información del curso" + "\n" + 
                "\t" + "Id: " + curso.id + "\n" + 
                "\t" + "Nombre: " + curso.nombre + "\n" + 
                "\t" + "Duración: " + curso.duracion + " horas" + "\n" + 
                "\t" + "Valor: " + curso.valor + "\n";
    fs.writeFile('prematricula.txt', texto, (err) => {
        if (err) throw (err);
        console.log('Se ha creado el archivo');
        
    })
}

// Se valida si está interesado en la matricula o si quiere ver los cursos.
if (typeof argv.cedula !== "undefined") {
    let cursoAMatricular = obtenerCurso(idCurso);
    if (typeof cursoAMatricular !== "undefined") {
        escribirArchivo(obtenerCurso(idCurso));
    } else {
        console.log("Ha ingresado un ID que no corresponde a ningún curso");
        mostrarCursos();
    }
} else {
    mostrarCursos();
}


