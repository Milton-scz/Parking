import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder} from '@angular/forms';
import { Plaza} from 'src/app/model/plaza';
import { getAllPlazas } from 'src/app/graphql/plazas/graphql.queries';

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.component.html',
  styleUrls: ['./estacionamiento.component.css']
})
export class EstacionamientoComponent implements OnInit {
  plazas: Plaza[] = [];
  plazasFiltradas: Plaza[][] = [];

  constructor(private apollo: Apollo, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllPlazas,
      })
      .valueChanges.subscribe((result: any) => {
        this.plazas = result?.data?.getAllPlazas || [];
        this.plazasFiltradas = this.chunkPlazas(this.plazas, 5);
        console.log(this.plazas);
      });
  }

  chunkPlazas(array: Plaza[], chunkSize: number): Plaza[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
}
