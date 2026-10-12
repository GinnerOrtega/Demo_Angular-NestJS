import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cita } from '../../core/models/cita.model';
import { Medico } from '../../core/models/medico.model';
import { CitasService } from '../../core/services/citas.service';
import { mensajeError } from '../../core/services/error-message';
import { MedicosService } from '../../core/services/medicos.service';

@Component({
  selector: 'app-citas-page',
  imports: [ReactiveFormsModule],
  templateUrl: './citas.page.html',
})
export class CitasPage implements OnInit {
  private readonly citasApi = inject(CitasService);
  private readonly medicosApi = inject(MedicosService);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly citas = signal<Cita[]>([]);
  readonly medicos = signal<Medico[]>([]);
  readonly medicosActivos = computed(() => this.medicos().filter((m) => m.activo));
  readonly editandoId = signal<number | null>(null);
  readonly error = signal('');
  readonly exito = signal('');

  readonly form = this.fb.group({
    paciente: ['', [Validators.required, Validators.maxLength(80)]],
    documento: ['', [Validators.required, Validators.pattern(/^\d{5,20}$/)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    motivo: [''],
    medicoId: [0, Validators.min(1)],
  });

  ngOnInit() {
    this.medicosApi.listar().subscribe({ next: (d) => this.medicos.set(d), error: (e) => this.fallo(e) });
    this.cargar();
  }

  cargar() {
    this.citasApi.listar().subscribe({ next: (d) => this.citas.set(d), error: (e) => this.fallo(e) });
  }

  guardar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const datos = { ...this.form.getRawValue(), medicoId: Number(this.form.getRawValue().medicoId) };
    const id = this.editandoId();
    const peticion = id ? this.citasApi.actualizar(id, datos) : this.citasApi.crear(datos);
    peticion.subscribe({
      next: () => { this.ok(id ? 'Cita actualizada' : 'Cita agendada'); this.cancelar(); this.cargar(); },
      error: (e) => this.fallo(e),
    });
  }

  editar(c: Cita) {
    this.editandoId.set(c.id);
    this.form.setValue({
      paciente: c.paciente, documento: c.documento, fecha: c.fecha,
      hora: c.hora, motivo: c.motivo ?? '', medicoId: c.medico.id,
    });
  }

  eliminar(c: Cita) {
    if (!confirm(`¿Cancelar la cita de ${c.paciente}?`)) return;
    this.citasApi.eliminar(c.id).subscribe({
      next: () => { this.ok('Cita eliminada'); this.cargar(); },
      error: (e) => this.fallo(e),
    });
  }

  cancelar() {
    this.editandoId.set(null);
    this.form.reset({ paciente: '', documento: '', fecha: '', hora: '', motivo: '', medicoId: 0 });
  }

  private ok(msg: string) { this.error.set(''); this.exito.set(msg); }
  private fallo(e: unknown) { this.exito.set(''); this.error.set(mensajeError(e)); }
}
