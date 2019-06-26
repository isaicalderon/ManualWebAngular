import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AlumnoService } from './services/alumno.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  menuNav:MenuItem[]; // p-breadcrumb
  menuBar:MenuItem[]; // p-menubar
  cols:any[];
  alumnos: AlumnoService[];

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(){
    
    this.alumnoService.getAllAlumnos().then(alumnos => this.alumnos = alumnos);

    this.cols = [
      { field: 'matricula', header: 'Matricula' },
      { field: 'nombres', header: 'Nombre' },
      { field: 'apellidoPaterno', header: 'Apellido Paterno' },
      { field: 'apellidoMaterno', header: 'Apellido Materno' }
    ];

    this.menuBar = [
      {
          label: 'Opciones',
          items: [
            {
              label: 'Agregar', 
              icon: 'pi pi-fw pi-plus'
            },
            {
              label: 'Editar', 
              icon: 'pi pi-fw pi-plus',
              disabled: true
            },
            {
              label: 'Eliminar', 
              icon: 'pi pi-fw pi-plus',
              disabled: true
            }
          ]
      }
    ];

    this.menuNav = [
      {icon:'pi pi-home'},
      {label:'Catálogo'},
      {label:'Alumnos'}
    ];
  }

}
