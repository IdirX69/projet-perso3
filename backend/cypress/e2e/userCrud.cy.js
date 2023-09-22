/* eslint-disable no-undef */
describe("crud user test", () => {
  before(() => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("get All", () => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("create", () => {
    cy.request({
      url: "http://localhost:5050/api/register",
      method: "POST",
      body: {
        firstname: "Idir",
        lastname: "Adil",
        email: `idirsdsqe${Math.random()}@idir.com`,
        password: "password123",
      },
    }).then((res) => {
      expect(res.status).eq(201);
    });
  });

  it("get All", () => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("get one", () => {
    cy.request({
      url: "http://localhost:5050/api/users/1",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });
});
