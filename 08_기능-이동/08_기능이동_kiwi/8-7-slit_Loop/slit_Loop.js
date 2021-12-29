const people = [{
                age : 20,
                salary :2000
                },
                {
                    age : 10,
                    salary :3000
                },
                {
                    age : 15,
                    salary :4000
                }
            ]

let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) {
    youngest = p.age;
  }
  totalSalary += p.salary;
}

module.exports = `최연소: ${youngest}, 총 급여: ${totalSalary}`;