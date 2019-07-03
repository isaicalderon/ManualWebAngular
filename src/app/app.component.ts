import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AlumnoService } from './services/alumno.services';
import { Alumno } from './entity/alumnos.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService] // importante
})
export class AppComponent implements OnInit{

  constructor(private alumnoService: AlumnoService, private messageService: MessageService) {}
  
  menuNav:MenuItem[]; // p-breadcrumb
  menuBar:MenuItem[]; // p-menubar

  cols:any[];

  alumnos:Alumno[];

  alumnoSelect:Alumno;
  
  alumnoSend: Alumno = {
    nombres:"",
    apellidoPaterno:"",
    apellidoMaterno:"",
    creadoPor:"user",
    modificadoPor:""
  }

  displayAgregar: boolean = false;
  displayEditar: boolean = false;
  displayConfirm: boolean = false;

  disabledRow: boolean = true;

  showDialogAgregar(){
    this.displayAgregar = !this.displayAgregar;
  }

  showDialogEditar(){
    this.displayEditar = !this.displayEditar;
  }

  showDialogDeleteConfirm(){
    this.displayConfirm = !this.displayConfirm;
  }

  funAgregarAlumno(){
    this.alumnoService.guardarAlumno(this.alumnoSend)
      .subscribe(data => {
        this.showDialogAgregar(); // cerramos el dialog
        this.showMessage('Se ha agregado correctamente el alumno '+(data as Alumno).matricula+' - '
          +(data as Alumno).nombres+" "+(data as Alumno).apellidoPaterno+" "+(data as Alumno).apellidoMaterno);
    });  
  }

  funEditarAlumno(){ 
    this.alumnoService.editarAlumno(this.alumnoSend).subscribe();
    this.alumnoService.getAllAlumnos().then(alumnos => this.alumnos = alumnos);
    this.onRowSelect();
    this.showDialogEditar();
    this.showMessage('Se ha editado correctamente al alumno '+this.alumnoSend.matricula+' - '
      +this.alumnoSend.nombres+" "+this.alumnoSend.apellidoPaterno+" "+this.alumnoSend.apellidoMaterno);
   }

  funEliminarAlumno(){
    this.alumnoService.eliminarAlumno(this.alumnoSend.matricula).subscribe();
    this.alumnoService.getAllAlumnos().then(alumnos => this.alumnos = alumnos);
    this.onRowSelect();
    this.showDialogDeleteConfirm();
    this.showMessage('Se ha eliminado correctamente al alumno '+this.alumnoSend.matricula+' - '
      +this.alumnoSend.nombres+" "+this.alumnoSend.apellidoPaterno+" "+this.alumnoSend.apellidoMaterno);
  }

  showMessage(details) {
    this.messageService.add({
        key: 'msgToast',
        severity:'success', 
        summary:'Alumnos', 
        detail: details}
    );
  }

  onRowSelect() {
    this.disabledRow = false;
    this.alumnoSend = this.alumnoSelect;
    this.ngOnInit();
    //console.log(this.alumnoSelect);
  }

  onRowUnselect(event) {
    this.disabledRow = true;
    this.ngOnInit();
  }

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
              icon: 'pi pi-fw pi-plus',
              command: (onclick) => {
                this.showDialogAgregar();
              }
            },
            {
              label: 'Editar', 
              icon: 'pi pi-fw pi-plus',
              disabled: this.disabledRow,
              command: (onclick) => {
                this.showDialogEditar();
              }
            },
            {
              label: 'Eliminar', 
              icon: 'pi pi-fw pi-plus',
              disabled: this.disabledRow,
                command: (onclick) => {
                  if (!this.disabledRow){
                    this.showDialogDeleteConfirm();
                  }
                }
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
