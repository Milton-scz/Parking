import { Abonado} from "./abonado";
import { PageInfo } from "./pageInfo";

export class AbonadoPage {
  pageInfo: PageInfo;
  items: Abonado[];

  constructor(pageInfo: PageInfo, items: Abonado[]) {
    this.pageInfo = pageInfo;
    this.items = items;
  }
}

