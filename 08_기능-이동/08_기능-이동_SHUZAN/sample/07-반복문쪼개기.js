//리팩토링 전
{
  let average = 0;
  let totalSalary = 0;
  const people = [
    { age: 30, salary: 4000 },
    { age: 40, salary: 7000 },
    { age: 24, salary: 2800 },
    { age: 37, salary: 4600 },
    { age: 27, salary: 3200 },
  ];
  for (const p of people) {
    average += p.age;
    totalSalary += p.salary;
  }
}

//리팩토링 후
{
  let average = 0;
  let totalSalary = 0;
  const people = [
    { age: 30, salary: 4000 },
    { age: 40, salary: 7000 },
    { age: 24, salary: 2800 },
    { age: 37, salary: 4600 },
    { age: 27, salary: 3200 },
  ];
  for (const p of people) {
    average += p.age;
  }
  for (const p of people) {
    totalSalary += p.salary;
  }
}
