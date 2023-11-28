import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicioService } from '../../servicios/servicio.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})
export class ListaLibrosComponent implements OnInit{
  filtro: string = '';
  /*libros = [
    { titulo: 'Libro 1', descripcion: 'Descripción del Libro 1', imagen: '1.png' },
    { titulo: 'Libro 2', descripcion: 'Descripción del Libro 2', imagen: '2.png' },
 
  ];*/
  
  libros:any;
  constructor(private dialog: MatDialog, private productosService: ServicioService,) {}

  ngOnInit(){
    this.productosService.obtenerLibros().subscribe(
      data => this.libros = data,
      error => console.log(error),
      () => console.log("FIN")
    )
    console.log(this.libros)
  }

  editarLibro(libro: any) {
    console.log('Editar libro:', libro);
  }

  eliminarLibro(libro: any) {
    console.log('Eliminar libro:', libro);
    if (libro && libro._id) {
      this.productosService.deleteBook(libro._id).subscribe(
        response => {
          console.log('Book deleted successfully:', response);
        },
        error => {
          console.error('Error deleting book:', error);
        }
      );
    }
    this.productosService.obtenerLibros().subscribe(
      data => this.libros = data,
      error => console.log(error),
      () => console.log("FIN")
    )
  }

  filtrarLibro(filtro: string) {
    const librosFiltrados = this.libros.filter((libro: { titulo: string } & { descripcion?: string } & { imagen?: string }) => {
      if (libro.titulo.toLowerCase().includes(filtro.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    this.libros = librosFiltrados;
  }
  

}