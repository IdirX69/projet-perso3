module.exports = {
  testEnvironment: "node", // Utilisez 'node' si vous testez du code côté serveur
  roots: ["<rootDir>/src", "<rootDir>/tests"], // Chemins où Jest doit chercher les tests
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.js$", // Expression régulière pour les fichiers de test
  moduleFileExtensions: ["js", "json", "node"], // Extensions de fichiers à prendre en compte
  moduleNameMapper: {
    // Vous pouvez définir des alias pour les modules ici, par exemple, pour les imports de style
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.js$": "babel-jest", // Utilise Babel pour transpiler le code JavaScript
  },
  collectCoverageFrom: ["src/**/*.js"], // Fichiers à inclure dans les rapports de couverture
  coverageDirectory: "coverage", // Répertoire où Jest stockera les rapports de couverture
  coverageReporters: ["text", "lcov"], // Formats de rapports de couverture
  // D'autres options de configuration peuvent être ajoutées selon vos besoins
};
