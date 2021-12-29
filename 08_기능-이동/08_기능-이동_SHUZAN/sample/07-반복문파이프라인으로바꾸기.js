const input = [
  { job: "programmer", name: "a" },
  { job: "programmer", name: "b" },
  { job: "teacher", name: "c" },
];

// 리팩토링 전
{
  const names = [];
  for (const i of input) {
    if (i.job === "programmer") names.push(i.name);
  }
}

// 리팩토링 후
{
  const names = input.filter((i) => i.job === "programmer").map((i) => i.name);
}
