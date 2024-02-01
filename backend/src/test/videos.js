// Données fictives de vidéos
const mockVideos = [
  {
    id: 1,
    url: "https://example.com/video1",
    description: "Description de la vidéo 1",
    creation_date: "2022-01-01",
    img: "https://example.com/img/video1.jpg",
    name: "Vidéo 1",
    promote: true,
    category_id: 1,
    category_name: "Catégorie 1",
    category_img: "https://example.com/img/category1.jpg",
    category_description: "Description de la catégorie 1",
  },
  {
    id: 2,
    url: "https://example.com/video2",
    description: "Description de la vidéo 2",
    creation_date: "2022-02-01",
    img: "https://example.com/img/video2.jpg",
    name: "Vidéo 2",
    promote: false,
    category_id: 2,
    category_name: "Catégorie 2",
    category_img: "https://example.com/img/category2.jpg",
    category_description: "Description de la catégorie 2",
  },
];

// Données fictives de commentaires pour la vidéo 2
const mockComments = [
  {
    id: 1,
    content: "Commentaire 1 pour la vidéo 2",
    creation_date: "2022-02-15",
    User_id: 1,
    Videos_id: 2,
    firstname: "John",
    lastname: "Doe",
    avatar: "https://example.com/img/avatar.jpg",
  },
  {
    id: 2,
    content: "Commentaire 2 pour la vidéo 2",
    creation_date: "2022-02-20",
    User_id: 2,
    Videos_id: 2,
    firstname: "Jane",
    lastname: "Doe",
    avatar: "https://example.com/img/avatar.jpg",
  },
];

module.exports = {
  mockVideos,
  mockComments,
};
