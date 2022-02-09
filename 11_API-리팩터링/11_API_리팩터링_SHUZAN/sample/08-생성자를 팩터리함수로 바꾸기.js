class Employee {}
const document = { leadEngineer: "Dahye" };

//리팩토링 전
{
  const leadEngineer = new Employee(document.leadEngineer, "E");
}

//리팩토링 후
{
  const createEngineer = (engineer) => new Employee(engineer, "E");
  const leadEngineer = createEngineer(document.leadEngineer);
}
