{
  const station = {
    name: "ZB1",
    readings: [
      { temp: 47, time: "2016-11-10 09:10" },
      { temp: 53, time: "2016-11-10 09:20" },
      { temp: 58, time: "2016-11-10 09:30" },
      { temp: 53, time: "2016-11-10 09:40" },
      { temp: 51, time: "2016-11-10 09:50" },
    ],
  };
  function readingsOutsideRange(station, min, max) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }

  alerts = readingsOutsideRange(
    station,
    operationPlan.temperatureFloor,
    operationPlan.temperatureCeiling,
  );
}
//함수 선언 바꾸기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
  }
  function readingOutsideRange(station, min, max, range) {
    return station.readings.filter((r) => r.temp < min || r.temp > max);
  }
  alerts = readingsOutsideRange(
    station,
    operationPlan.temperatureFloor,
    operationPlan.temperatureCeiling,
  );
}
//호출문 변경하기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
  }
  function readingOutsideRange(station, range) {
    return station.readings.filter(
      (r) => r.temp < range.min || r.temp > range.max,
    );
  }
  alerts = readingsOutsideRange(station, range);
}

//진정한 객체로 거듭나기
{
  export class NumberRange {
    constructor(min, max) {
      this._data = { min: min, max: max };
    }
    get min() {
      return this._data.min;
    }
    get max() {
      return this._data.max;
    }
    contains(arg) {
      return arg >= this.min && aNumber <= this.max;
    }
  }
  function readingOutsideRange(station) {
    return station.readings.filter((r) => !r.contains);
  }
  alerts = readingsOutsideRange(station, range);
}
