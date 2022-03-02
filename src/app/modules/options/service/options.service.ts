import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/service/api.service';
import { OptionsDTO } from '../dto/options-dto';
import { OptionsInDTO } from '../dto/options-in-dto';

@Injectable({ providedIn: 'root' })
export class OptionsService {
  private basePath = 'options';

  constructor(private apiService: ApiService) { }

  save(optionsInDTO: OptionsInDTO): Observable<OptionsDTO> {
    return this.apiService.post(this.basePath, optionsInDTO);
  }

  findAll(): Observable<OptionsDTO[]> {
    return this.apiService.get(this.basePath);
  }

  update(id: number, optionsInDTO: OptionsInDTO): Observable<OptionsDTO> {
    return this.apiService.put(`${this.basePath}/${id}`, optionsInDTO);
  }

  delete(id: number): Observable<Object> {
    return this.apiService.delete(`${this.basePath}/${id}`);
  }

}
