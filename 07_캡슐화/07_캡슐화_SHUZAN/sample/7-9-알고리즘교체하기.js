//알고리즘 교체 전
{
  const foundPerson = (people) => {
    for (let i = 0; i < people.length; i++) {
      const person = people[i];
      if (person === "Don") return "Don";
      if (person === "Jhon") return "Jhon";
      if (person === "Kent") return "Kent";
      return "";
    }
  };
}
//알고리즘 교체 후
{
  const foundPerson = (people) => {
    const candidates = ["Done", "Jhon", "Kent"];
    return people.find((p) => cadidates.indexOf(p)) || "";
  };
}
