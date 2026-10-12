import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Medico, MedicoPayload } from '../models/medico.model';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/medicos`;

  listar() { return this.http.get<Medico[]>(this.url); }
  crear(data: MedicoPayload) { return this.http.post<Medico>(this.url, data); }
  actualizar(id: number, data: Partial<MedicoPayload>) { return this.http.patch<Medico>(`${this.url}/${id}`, data); }
  eliminar(id: number) { return this.http.delete<void>(`${this.url}/${id}`); }
}
