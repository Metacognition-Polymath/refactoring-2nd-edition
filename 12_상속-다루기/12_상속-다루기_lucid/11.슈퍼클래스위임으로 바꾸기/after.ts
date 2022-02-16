/**
 * 물리적인 스크롤과 논리적인 카탈로그 아이템에는 차이가 있다.
 * 석화병 치료법 적어 놓은 스크롤은 사본이 여러개에도, 카탈로그 아이템은 하나이다.  1대 N의 관계다
 * */
class CatalogItem {
  get title(): any {
    return this._title;
  }

  get id(): any {
    return this._id;
  }

  hasTag(arg) {
    return this._tags.includes(arg)
  }


  private _id: any;
  private _title: any;
  private _tags: any;

  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags
  }
}

/** 정기 세척 이력이 필요했다. */
class Scroll {
  private _lastCleaned: any;
  private readonly _catalogItem: CatalogItem;
  
  constructor(id, title, tags, dateLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dateLastCleaned;
  }

  get id() {
    return this._catalogItem.id;
  }
  get title() {
    return this._catalogItem.title;
  }

  hasTag(arg) {
    return this._catalogItem.hasTag(arg);
  }

  get catalogItem(): CatalogItem {
    return this._catalogItem;
  }

  needCleaning(targetDate){
    const threshold = this.hasTag('revered' ) ? 700 : 1500;
    return this.daySinceLastCleaning(targetDate) > threshold
  }

  private daySinceLastCleaning(targetDate: any) {
    return this._lastCleaned.until(targetDate, 'DAYS')
  }
}
