import { Injectable } from '@angular/core';
import { Alumno } from '../entity/alumnos.entity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const header = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
@Injectable({providedIn: 'root'})
export class AlumnoService{
    constructor(private http: HttpClient){}

    obtenerTodos     = "/ServiciosAlumno/servicios/alumnoServicio/obtenerTodosAlumnos";
    urlGuardarAlumno = "/ServiciosAlumno/servicios/alumnoServicio/guardarAlumno";
    urlEditar        = "/ServiciosAlumno/servicios/alumnoServicio/modificarAlumno?"; 
    urlEliminar      = "/ServiciosAlumno/servicios/alumnoServicio/eliminarAlumno?matricula=";

    editarAlumno(alumno: Alumno): Observable<Alumno> {
        return this.http.put<Alumno>(this.urlEditar, alumno, header)
    }
    
    eliminarAlumno(id: number): Observable<{}>{
        return this.http.delete(this.urlEliminar+id);
    }

    guardarAlumno(alumno:Alumno){
        return this.http.post(this.urlGuardarAlumno, alumno, header)
    }
     
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
