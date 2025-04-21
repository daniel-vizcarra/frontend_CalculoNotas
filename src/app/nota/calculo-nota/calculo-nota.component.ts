import { Component, OnInit } from '@angular/core';
import { NotaService } from '../../services/nota.service';

interface Progreso {
  title: string;
  start: string;
  end: string;
}

interface Nota {
  id: number;
  nota: number;
  fecha: string;
  alumno_id: number;
  alumno_nombre: string;
}

interface CalculoResponse {
  data: Nota[];
}

@Component({
  selector: 'app-calculo-nota',
  templateUrl: './calculo-nota.component.html',
  styleUrls: ['./calculo-nota.component.scss']
})
export class CalculoNotaComponent implements OnInit {
  progresos: Progreso[] = [
    { title: 'Progreso 1', start: '', end: '' },
    { title: 'Progreso 2', start: '', end: '' },
    { title: 'Progreso 3', start: '', end: '' }
  ];
  results: Nota[] = [];
  notas: Nota[] = [];
  error: string | null = null;

  constructor(private notaService: NotaService) {}

  ngOnInit(): void {
    this.fetchNotas();
  }

  fetchNotas(): void {
    this.notaService.getNotas().subscribe(
      (data: Nota[]) => {
        this.notas = data;
      },
      (error: Error) => {
        console.error('Error fetching notas:', error);
      }
    );
  }

  onSubmit(progresoIndex: number): void {
    const progresoData = {
      progreso1_start: this.progresos[0].start,
      progreso1_end: this.progresos[0].end,
      progreso2_start: this.progresos[1].start,
      progreso2_end: this.progresos[1].end,
      progreso3_start: this.progresos[2].start,
      progreso3_end: this.progresos[2].end,
    };
    console.log(progresoData);

    this.notaService.calcularProgresos(progresoData).subscribe({
      next: (response: CalculoResponse) => {
        this.results = response.data;
        this.error = null;
      },
      error: (error: string) => {
        this.error = error;
        this.results = [];
      }
    });
  }
}