import { Tarifa } from "./tarifa";
import { PageInfo } from "./pageInfo";

export class TarifaPage {
  pageInfo: PageInfo;
  items: Tarifa[];

  constructor(pageInfo: PageInfo, items: Tarifa[]) {
    this.pageInfo = pageInfo;
    this.items = items;
  }
}

