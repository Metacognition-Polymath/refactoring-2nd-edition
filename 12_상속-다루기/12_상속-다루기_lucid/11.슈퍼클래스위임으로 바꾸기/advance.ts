/**
 * 물리적인 스크롤과 논리적인 카탈로그 아이템에는 차이가 있다.
 * 석화병 치료법 적어 놓은 스크롤은 사본이 여러개에도, 카탈로그 아이템은 하나이다.  1대 N의 관계다
 * */
class CatalogItem {
  private _id: any;
  private _title: any;
  private _tags: any;

  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags
  }

  get title(): any {
    return this._title;
  }

  get id(): any {
    return this._id;
  }

  hasTag(arg) {
    return this._tags.includes(arg)
  }
}
class Catalog {
  readonly catalogs = [{id: 1, title: 'a', tags: ['abc','cde','efg']},{id: 2, title: 'b', tags: ['abc','cde','efg']}]
  constructor() {}

  get(_id){
    const { id, title, tags } = this.catalogs.filter(c => c.id === _id)[0];
    return new CatalogItem(id, title, tags)
  }
}

/** 정기 세척 이력이 필요했다. */
class Scroll {
  private _lastCleaned: any;
  private readonly _catalogItem: CatalogItem;
  private _id: any;

  constructor(id, dateLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._catalogItem.title;
  }

  hasTag(arg) {
    return this._catalogItem.hasTag(arg);
  }

  needCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daySinceLastCleaning(targetDate) > threshold
  }

  private daySinceLastCleaning(targetDate: any) {
    return this._lastCleaned.until(targetDate, 'DAYS')
  }
}

class LocalDate {
  constructor() {
  }

  static parse(lastCleaned: number) {
    return new Date(lastCleaned).toISOString();
  }
}

const aDocument = [{
  id: 12,
  catalogData: {
    id: 123,
    title: 'bc',
    tags: ['abc', 'cde'],
  },
  lastCleaned: 1645010869049,
}]

const catalog = new Catalog();

{
  // const scroll = aDocument.map(record => new Scroll(record.id, record.catalogData.title, record.catalogData.tags, LocalDate.parse(record.lastCleaned), record.catalogData.id, re))
  const scroll = aDocument.map(record => new Scroll(record.id, LocalDate.parse(record.lastCleaned), record.catalogData.id, catalog))
  console.log(scroll);
}
