//리팩토링 전
{
  let appliesToMass = false;
  const states = ["MA", "JJ"];
  for (const s of states) {
    if (s === "MA") appliesToMass = true;
  }
}
//리팩토링 후

{
  const states = ["MA", "JJ"];
  const appliesToMass = states.includes["MA"];
}
