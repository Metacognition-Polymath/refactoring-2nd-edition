var assert = require('assert');
const renderPerson =  require("./move_s_into_function1");
const renderPerson2 =  require("./move_s_into_function2");


function sampleRenderPerson(){
    return {
        name: "case1",
        photo : {
            title: "title",
            location : "seoul",
            date: "2021-12-29"
        }
    }
}


describe("move_statement", function () {
    const result = renderPerson(1, sampleRenderPerson())

    it("distance", function () {
        assert.equal(result, '<p>case1</p>\n<p>제목: title</p>\n<p>위치: seoul</p>\n<p>날짜: 2021-12-29</p>');
      });
})

describe("move_statement2", function () {
    const result = renderPerson2(1, sampleRenderPerson())

    it("distance", function () {
        assert.equal(result, '<p>case1</p>\n' +
        '<p>제목: title</p>\n' +
        '<p>제목: title</p>,<p>위치: seoul</p>,<p>날짜: 2021-12-29</p>');
      });
}
)