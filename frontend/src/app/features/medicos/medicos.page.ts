import { Component, OnInit, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Medico } from '../../core/models/medico.model';
import { mensajeError } from '../../core/services/error-message';
import { MedicosService } from '../../core/services/medicos.service';

/** Componente (Vista + lógica de presentación) del CRUD de médicos. */
@Component({
  selector: 'app-medicos-page',
  imports: [ReactiveFormsModule],
  templateUrl: './medicos.page.html',
})
export class MedicosPage implements OnInit {
  private readonly api = inject(MedicosService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly medicos = signal<Medico[]>([]);
  readonly editandoId = signal<number | null>(null);
  readonly error = signal('');
  readonly exito = signal('');

  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    especialidad: ['', [Validators.required, Validators.maxLength(60)]],
    correo: ['', [Validators.required, Validators.email]],
    activo: [true],
  });

  ngOnInit() { this.cargar(); }

  cargar() {
    this.api.listar().subscribe({
      next: (data) => this.medicos.set(data),
      error: (e) => this.error.set(mensajeError(e)),
    });
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const id = this.editandoId();
    const peticion = id ? this.api.actualizar(id, this.form.getRawValue()) : this.api.crear(this.form.getRawValue());
    peticion.subscribe({
      next: () => { this.ok(id ? 'Médico actualizado' : 'Médico creado'); this.cancelar(); this.cargar(); },
      error: (e) => this.fallo(e),
    });
  }

  editar(m: Medico) {
    this.editandoId.set(m.id);
    this.form.setValue({ nombre: m.nombre, especialidad: m.especialidad, correo: m.correo, activo: m.activo });
  }

  eliminar(m: Medico) {
    if (!confirm(`¿Eliminar al médico ${m.nombre}?`)) return;
    this.api.eliminar(m.id).subscribe({
      next: () => { this.ok('Médico eliminado'); this.cargar(); },
      error: (e) => this.fallo(e),
    });
  }

  cancelar() {
    this.editandoId.set(null);
    this.form.reset({ nombre: '', especialidad: '', correo: '', activo: true });
  }

  private ok(msg: string) { this.error.set(''); this.exito.set(msg); }
  private fallo(e: unknown) { this.exito.set(''); this.error.set(mensajeError(e)); }
}
