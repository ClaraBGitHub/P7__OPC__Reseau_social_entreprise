const mongoose = require('mongoose');

const postSchema = mongoose.Schema({ // Nous créons un schéma de données qui contient les champs souhaités pour chaque sauce, indique leur type ainsi que leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. 
    userId : { type : String, required : true },
    title : { type : String, required : true },
    author : { type : String, required : true},
    publication : { type : String, required : true },
    date: { type : String, require : true},
    imageUrl : { type : String },
    likes : { type : Number, default: 0},
    usersLiked : { type : Array, required : true},
    moderated: { type: Number, required: true, default : 0}
});

module.exports = mongoose.model('Post', postSchema); // Permet d'exporter le modèle Mongoose, le rendant par là même disponible pour notre application Express.