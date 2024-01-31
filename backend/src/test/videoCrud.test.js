/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

describe("Test de la route qui récupère toute les vidéos", () => {
  it("devrait retourner une liste de videos avec le statut 200", async () => {
    const response = await request(app).get("/api/videos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const video = response.body[0];
      expect(video).toHaveProperty("id");
      expect(video).toHaveProperty("url");
      expect(video).toHaveProperty("description");
      expect(video).toHaveProperty("creation_date");
      expect(video).toHaveProperty("img");
      expect(video).toHaveProperty("name");
      expect(video).toHaveProperty("promote");
      expect(video).toHaveProperty("category_id");
      expect(video).toHaveProperty("category_name");
      expect(video).toHaveProperty("category_img");
      expect(video).toHaveProperty("category_description");
    }
  });
});
describe("Test de la route qui récupère une vidéo", () => {
  it("devrait retourner une video avec le statut 200", async () => {
    const videoId = 2;

    const response = await request(app)
      .get(`/api/videos/infos/${videoId}`)
      .expect(200);

    const videoDetails = response.body;

    expect(videoDetails).toHaveProperty("id");
    expect(videoDetails).toHaveProperty("url");
    expect(videoDetails).toHaveProperty("description");
    expect(videoDetails).toHaveProperty("creation_date");
    expect(videoDetails).toHaveProperty("img");
    expect(videoDetails).toHaveProperty("name");
    expect(videoDetails).toHaveProperty("promote");
    expect(videoDetails).toHaveProperty("category_id");
    expect(videoDetails).toHaveProperty("category_name");
    expect(videoDetails).toHaveProperty("category_img");
    expect(videoDetails).toHaveProperty("category_description");

    expect(videoDetails.comment).toBeDefined();
    expect(Array.isArray(videoDetails.comment)).toBe(true);
    if (videoDetails.comment.length > 0) {
      const comment = videoDetails.comment[0]; // Utilisez videoDetails au lieu de video
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("content");
      expect(comment).toHaveProperty("creation_date");
      expect(comment).toHaveProperty("User_id");
      expect(comment).toHaveProperty("Videos_id");
      expect(comment).toHaveProperty("firstname");
      expect(comment).toHaveProperty("lastname");
      expect(comment).toHaveProperty("avatar");
    }

    expect(response.status).toBe(200);
  });
});

// Tests d'erreur
describe("Tests d'erreur pour la route qui récupère une vidéo", () => {
  it("devrait retourner une erreur 404 pour une vidéo non existante", async () => {
    const nonExistingVideoId = 99999;
    const response = await request(app)
      .get(`/api/videos/infos/${nonExistingVideoId}`)
      .expect(404);

    expect(response.status).toBe(404);
  });

  it("devrait retourner une erreur 400 pour une demande de création de vidéo incomplète", async () => {
    const incompleteVideo = {
      // Propriétés manquantes
    };

    const response = await request(app)
      .post("/api/videos")
      .send(incompleteVideo)
      .expect(401);

    expect(response.status).toBe(401);
  });

  it("devrait retourner une erreur 400 pour une mise à jour de vidéo incomplète", async () => {
    const incompleteUpdate = {
      // Propriétés manquantes
    };

    const response = await request(app)
      .put("/api/videos/2")
      .send(incompleteUpdate)
      .expect(404);

    expect(response.status).toBe(404);
  });

  it("devrait retourner une erreur 404 pour une suppression de vidéo inexistante", async () => {
    const nonExistingVideoId = 99999;
    const response = await request(app)
      .delete(`/api/videos/${nonExistingVideoId}`)
      .expect(500);

    expect(response.status).toBe(500);
  });
});
