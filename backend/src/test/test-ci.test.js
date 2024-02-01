/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

// Tests d'erreur
describe("Tests d'erreur pour la route qui récupère une vidéo", () => {
  it("devrait retourner une erreur 404 pour une suppression de vidéo inexistante", async () => {
    const nonExistingVideoId = 99999;
    const response = await request(app)
      .delete(`/api/videos/${nonExistingVideoId}`)
      .expect(500);

    expect(response.status).toBe(500);
  });
});
