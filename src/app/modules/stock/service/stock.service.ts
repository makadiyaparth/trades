import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/service/api.service';
import { StockDTO } from '../dto/stock-dto';
import { StockInDTO } from '../dto/stock-in-dto';
import { StockUpdateDTO } from '../dto/stock-update-dto';

@Injectable()
export class StockService {
  private basePath = 'stocks';

  constructor(private apiService: ApiService) { }

  save(stockInDTO: StockInDTO): Observable<StockDTO> {
    return this.apiService.post(this.basePath, stockInDTO);
  }

  findAll(name?: string): Observable<StockDTO[]> {
    let httpParams = new HttpParams();

    if (name) {
      httpParams = httpParams.set('name', name);
    }

    return this.apiService.get(this.basePath, httpParams);
  }

  update(stockUpdateDTO: StockUpdateDTO): Observable<StockDTO> {
    return this.apiService.put(this.basePath, stockUpdateDTO);
  }

  delete(id: number): Observable<Object> {
    return this.apiService.delete(`${this.basePath}/${id}`);
  }

}
