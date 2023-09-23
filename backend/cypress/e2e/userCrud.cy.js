/* eslint-disable no-undef */
describe("CRUD User Tests", () => {
  before(() => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("should create a new user", () => {
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

  it("should handle error on create with invalid data", () => {
    cy.request({
      url: "http://localhost:5050/api/register",
      method: "POST",
      body: {
        firstname: "Idir",
        email: "invalid_email", // Adresse e-mail incorrecte
        password: "password123",
      },
      failOnStatusCode: false, // Ne pas échouer automatiquement le test en cas d'erreur
    }).then((res) => {
      expect(res.status).not.eq(201);
      expect(res.status).eq(422);
    });
  });

  it("should retrieve all users", () => {
    cy.request({
      url: "http://localhost:5050/api/users",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("should retrieve one user", () => {
    cy.request({
      url: "http://localhost:5050/api/users/1",
    }).then((res) => {
      expect(res.status).eq(200);
    });
  });

  it("should handle error when retrieving non-existent user", () => {
    cy.request({
      url: "http://localhost:5050/api/users/9999", // ID inconnu
      failOnStatusCode: false,
    }).then((res) => {
      // Vérifiez que la requête a renvoyé un statut d'erreur (404 - Not Found)
      expect(res.status).eq(404);
    });
  });
});
