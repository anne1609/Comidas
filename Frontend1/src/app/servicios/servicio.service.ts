import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiUrl ='/api/books';
  constructor(private http: HttpClient) { }
  obtenerLibros(){
    return this.http.get(this.apiUrl);
  }

  obtenerLibro(id: number){
    const url = `/libro/${id}`;
    return this.http.get(url);
  }
  addBook(bookData: any): Observable<any> {
    return this.http.post('/api/books', bookData);
  }
  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`/apiDelete/${bookId}`);
  }
  
  editar(id:any, libro:any):Observable<any>{
    return this.http.put(`/editar/${id}`,libro)
  }
}
