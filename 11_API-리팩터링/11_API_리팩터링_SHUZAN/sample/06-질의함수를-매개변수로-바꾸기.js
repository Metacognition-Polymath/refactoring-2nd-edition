//리팩토링 전
{
  const aPlan = {};
  const thermostat = { currentTemperature };
  function targetTemperature(aPlan) {
    currentTemperature = thermostat.currentTemperature;
    //logic
  }
  targetTemperature(aPlan);
}
//리팩토링 후 - 거북한 참조를 매개변수로 수정
{
  const aPlan = {};
  const thermostat = { currentTemperature };
  function targetTemperature(aPlan, currentTemperature) {
    //logic
  }
  targetTemperature(aPlan, thermostat.currentTemperature);
}
