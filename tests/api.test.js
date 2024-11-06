import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;
import "dotenv/config";
import {baseURL, userID} from "../helpers/data.js";

describe("Api tests", () => {
  it("get reqest", async () => {
    const response = await spec()
      .get("https://demoqa.com/BookStore/v1/Books")
      .inspect();
    console.log("BlaBlaBLa" + process.env.SECRET_PASSWORD);
    expect(response.statusCode).to.eql(200);
    expect(response.body.books[4].author).to.eql("Kyle Simpson");
    expect(response.body.books[1].title).to.eql(
      "Learning JavaScript Design Patterns"
    );
  });
  it.skip("Create user", async () => {
    const response = await spec()
      .post(baseURL + "/Account/v1/User")
      .withBody({
        userName: "Patka",
        password: process.env.SECRET_PASSWORD,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });
});
