// TODO:: name => title 로 바꾼다.
// 1. 기존의 _name => title 로 바꾼다
class Organ {
	/**
	 *  @param data {{ country: name, title?: name}}
	 * */
	constructor(data) {
		this._title = data.title ? data.title : data.name ;    // TODO:: 2 title 및 name 이 허용될수 있게 전체를 바꾼다
		this._country = data.country;
	}
	get title() { return this._title }      // TODO:: 4 최종적으로 get, set  일므을 바꿔준다
	set title(aString) { this._title = aString }
	
}

const org = new Organ({ title: '1', country: 'korea'})   // TODO:: 3 2번까지의 테스트가 마무리되었으면 호출하는쪽에서 변경해준다

const name = org.name // 호출 되는쪽에서 호출이 되어지는데