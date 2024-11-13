import { Plaza } from "./plaza";
import { PageInfo } from "./pageInfo";

export class PlazaPage {
  pageInfo: PageInfo;
  items: Plaza[];

  constructor(pageInfo: PageInfo, items: Plaza[]) {
    this.pageInfo = pageInfo;
    this.items = items;
  }
}

