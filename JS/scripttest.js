

// 1. Utilise filter pour ne garder que les utilisateurs actifs
const activeUsers = test.filter(user => user.active);

// 2. Utilise map pour récupérer seulement les noms des utilisateurs actifs
const activeUserNames = activeUsers.map(user => user.name);

// 3. Utilise reduce pour calculer l'âge moyen des utilisateurs actifs
const totalAge = activeUsers.reduce((sum, user) => sum + user.age, 0);
const averageAge = totalAge / activeUsers.length;

// Affichage
console.log("Utilisateurs actifs :", activeUserNames);
console.log("Âge moyen des utilisateurs actifs :", averageAge.toFixed(2));
