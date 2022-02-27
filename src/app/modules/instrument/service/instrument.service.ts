import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/service/api.service';
import { InstrumentDTO } from '../dto/instrument-dto';
import { InstrumentInDTO } from '../dto/insturment-in-dto';

@Injectable()
export class InstrumentService {
  private basePath = '/instruments';

  constructor(private apiService: ApiService) { }

  save(instrumentInDTO: InstrumentInDTO): Observable<InstrumentDTO> {
    return this.apiService.post(this.basePath, instrumentInDTO);
  }

  findAll(name?: string): Observable<InstrumentDTO[]> {
    let httpParams = new HttpParams();

    if (name) {
      httpParams = httpParams.set('name', name);
    }

    return this.apiService.get(this.basePath, httpParams);
  }

  update(instrumentDTO: InstrumentDTO): Observable<InstrumentDTO> {
    return this.apiService.put(this.basePath, instrumentDTO);
  }

  delete(id: number): Observable<Object> {
    return this.apiService.delete(`${this.basePath}/${id}`);
  }

}
