const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();
app.use(express.json()); // Intercepte toutes les requêtes qui contiennent du json et mettent à disposition le contenu sur l'objet requête dans req.body


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://ClaraJMgDB:Q4dkhqKHqN9TN4px@cluster0.skndynf.mongodb.net/<P7_Post>?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Empêcher les erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/post', postRoutes); // On précise que pour cette route "api/post" on utilise le router qui est exposé par postRoutes
app.use('/api/auth', userRoutes);

module.exports = app;