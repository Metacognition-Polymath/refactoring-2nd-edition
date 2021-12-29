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


function youngestAge() {
    return Math.min(...people.map((p) => p.age));
}

function totalSalary() {
    return people.reduce((total, p) => total + p.salary, 0);
}

function example() {
    return `최연소: ${youngestAge()}, 총 급여: ${totalSalary()}`;
}

module.exports = example();