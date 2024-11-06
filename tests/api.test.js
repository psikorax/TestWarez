import { expect } from "chai";
import pkg from "pactum";
const { spec } = pkg;

import { baseURL, userID, user, password } from "../helpers/data.js";

let token_response;

describe("Api tests", () => {
  it("get reqest", async () => {
    const response = await spec()
      .get(`${baseURL}/BookStore/v1/Books`)
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
      .post(`${baseURL}/Account/v1/User`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    expect(response.statusCode).to.eql(201);
  });

  it.only("Generate Token", async () => {
    const response = await spec()
      .post(`${baseURL}/Account/v1/GenerateToken`)
      .withBody({
        userName: user,
        password: password,
      })
      .inspect();
    token_response = response.body.token;
    console.log(token_response);
    expect(response.statusCode).to.eql(200);
    expect(response.body.result).to.eql("User authorized successfully.");
  });

  
  it.only("check token", async () => {
    console.log("another it block" + token_response);
  });
});
