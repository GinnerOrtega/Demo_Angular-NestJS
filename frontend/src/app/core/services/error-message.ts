import { HttpErrorResponse } from '@angular/common/http';

export function mensajeError(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) return 'No hay conexión con la API. ¿Está corriendo el backend en el puerto 3000?';
    const msg = err.error?.message;
    return Array.isArray(msg) ? msg.join(' · ') : (msg ?? err.message);
  }
  return 'Ocurrió un error inesperado';
}
