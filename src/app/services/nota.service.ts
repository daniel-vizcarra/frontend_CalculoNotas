import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private apiUrl = environment.apiUrl || 'https://backend-calculonotas.onrender.com';

  constructor(private http: HttpClient) { }

  calcularProgresos(data: any): Observable<any> {
    return this.http.post(this.apiUrl+'/api/v1/calcular_progresos', data).pipe(
      catchError(this.handleError)
    );
  }


  getNotas(): Observable<any> {
    return this.http.get(this.apiUrl+'/api/v1/index');
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Un error inesperado ha sucedido!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 422:
          errorMessage = 'Unprocessable Entity: Las fechas tienen un orden incorrecto.';
          break;
        case 404:
          errorMessage = 'Not Found: No se encontron el recurso solicitado.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Ocurrio un error en el servidor.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
  
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}