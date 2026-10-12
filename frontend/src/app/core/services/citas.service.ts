import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Cita, CitaPayload } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/citas`;

  listar() { return this.http.get<Cita[]>(this.url); }
  crear(data: CitaPayload) { return this.http.post<Cita>(this.url, data); }
  actualizar(id: number, data: Partial<CitaPayload>) { return this.http.patch<Cita>(`${this.url}/${id}`, data); }
  eliminar(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
}
