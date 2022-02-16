/**
 *  고대 스크롤(두루마리) 보관  오뢔된 도서관에 컨설팅, 이미 카탈로그로 분류돼있고 id, title, tags 복수개로 구성되었다.
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
class Scroll extends CatalogItem {
  private _lastCleaned: any;
  constructor(id, title, tags, dateLastCleaned) {
    super(id, title, tags)
    this._lastCleaned = dateLastCleaned;
  }

  needCleaning(targetDate){
    const threshold = this.hasTag('reverd' ) ? 700 : 1500;
    return this.daySinceLastCleaning(targetDate) > threshold
  }

  private daySinceLastCleaning(targetDate: any) {
    return this._lastCleaned.until(targetDate, 'DAYS')
  }
}
