/* eslint-disable no-undef */
describe("Tests CRUD user", () => {
  before(() => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("devrait créer un nouvel user", () => {
    const randomEmail = `idirsdsqe${Math.random()}@idir${Math.random()}.com`;

    cy.request({
      url: "http://localhost:5050/api/register",
      method: "POST",
      body: {
        firstname: "Idir",
        lastname: "Adil",
        email: randomEmail,
        password: "password123",
      },
    }).then((res) => {
      expect(res.status).eq(201);
    });
  });

  it("devrait gérer une erreur lors de la création avec des données invalides", () => {
    cy.request({
      url: "http://localhost:5050/api/register",
      method: "POST",
      body: {
        firstname: "Idir",
        email: "invalid_email",
        password: "password123",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).not.eq(201);
      expect(res.status).eq(422);
    });
  });

  it("devrait récupérer tous les users ", () => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
      expect(res.body).to.be.an("array");

      res.body.forEach((user) => {
        expect(user).to.have.property("id");
        expect(user).to.have.property("firstname");
        expect(user).to.have.property("lastname");
        expect(user).to.have.property("email");
        expect(user).to.have.property("is_admin");
      });
    });
  });

  it("devrait récupérer un user ", () => {
    cy.request({
      url: "http://localhost:5050/api/users/1",
    }).then((res) => {
      expect(res.status).eq(200);

      const user = res.body;
      expect(user).to.have.property("id");
      expect(user).to.have.property("firstname");
      expect(user).to.have.property("lastname");
      expect(user).to.have.property("email");
    });
  });

  it("devrait gérer une erreur lors de la récupération d'un user inexistant", () => {
    cy.request({
      url: "http://localhost:5050/api/users/9999",
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).eq(404);
    });
  });
});
