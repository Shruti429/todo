import { Injectable } from '@angular/core';
import * as Papa from 'papaparse'

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  exportToCsv(filename: string, data: any[]) {
    const csv = Papa.unparse(data, { header: true });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Your browser does not support the download attribute.');
    }
  }
}
