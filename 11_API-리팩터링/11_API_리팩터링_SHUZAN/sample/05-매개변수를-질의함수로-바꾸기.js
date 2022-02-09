//리팩토링 전
{
  availableVacation(anEmployee, anEmployee.grade);

  function availableVacation(anEmployee, grade) {
    // 연휴계산 logic
  }
}
//리팩토링 후
{
  availableVacation(anEmployee);

  function availableVacation(anEmployee) {
    const grade = anEmployee.grade;
    // 연휴계산 logic
  }
}
