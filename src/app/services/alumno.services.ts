import { Injectable } from '@angular/core';
import { Alumno } from '../entity/alumnos.entity';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AlumnoService{
    constructor(private http: HttpClient){}

    obtenerTodos = "/ServiciosAlumno/servicios/alumnoServicio/obtenerTodosAlumnos?";
    
    getAllAlumnos(){
        return this.http.get(this.obtenerTodos)
            .toPromise()
            .then(res => <Alumno[]> (res as any)) 
            .then(data => {return this.sortJSON(data, "fechaHoraCreacion", "desc");} ) 
    }

    sortJSON(data, key, orden) {
        return data.sort(function (a, b) {
            var x = a[key],
            y = b[key];
    
            if (orden === 'asc') {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
    
            if (orden === 'desc') {
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            }
        });
    }
}
