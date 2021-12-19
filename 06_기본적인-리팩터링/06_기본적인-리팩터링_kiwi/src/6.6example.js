let defaultAgreements = [
  // ...
]


//before
class Agreements {
  constructor() {
      this._agreements = defaultAgreements
  }

  get agreements() {return this._agreements}
  setAgreements(arg) {this._agreements = arg}

  // 약관 하나 체크
  handleAgreementChange(id) {
      this.agreements.some((item) => {
          if (item.id === id) {
              item.checked = !item.checked
          }
          return item.id === id
      })
  }

  // 약관 전체 동의
  handleAgreementAllChange() {
      this.agreements.forEach((item) => {
          item.checked = true
      })
  }
}

//after
const agreements = () => cloneDeep(defaultAgreements) // lodash.cloneDeep

class Agreements {
    constructor() {
        this._agreements = agreements()
    }

    get agreements() {return this._agreements}
    setAgreements(arg) {this._agreements = arg}

    // 약관 하나 체크
    handleAgreementChange(id) {
        this.agreements.some((item) => {
            if (item.id === id) {
                item.checked = !item.checked
            }
            return item.id === id
        })
    }

    // 약관 전체 동의
    handleAgreementAllChange() {
        const nextList = this.agreements.map((item) => {
            item.checked = true
            return item
        })
        this.setAgreements(nextList)
    }
}