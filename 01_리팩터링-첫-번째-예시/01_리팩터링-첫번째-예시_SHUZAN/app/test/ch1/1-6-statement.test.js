const invoices = require("../../src/chp1/data/invocies.json");
const plays = require("../../src/chp1/data/plays.json");
import { statement } from "../../src/chp1/1-6-statement.js";
import result from "./test-result.js";

describe("[Chpate1.6ver] check refactoring result", () => {
  test("statement test result", () => {
    const statementResult = statement(invoices, plays);
    expect(statementResult).toBe(result);
  });
});
