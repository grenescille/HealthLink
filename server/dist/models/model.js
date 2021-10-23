"use strict";
const fs = require('fs');
<<<<<<< HEAD:models/model.js
const { DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const Sequelize = require('sequelize');
=======
// const {DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env;
// const Sequelize = require('sequelize');
>>>>>>> backend:dist/models/model.js
const { Model } = require('sequelize');
const path = require('path'); //builtin in node. help us to get the specific path to this file
const Sequelize = require('sequelize');
const config = {
<<<<<<< HEAD:models/model.js
  host: 'localhost',
  dialect: 'postgres',
};

const sequelize = new Sequelize('healthdb', 'davidgreen', '', config); //creating a sequelize instance
=======
    host: 'localhost',
    dialect: 'postgres',
};
const sequelize = new Sequelize('healthdb', 'postgres', '123', config); //creating a sequelize instance
>>>>>>> backend:dist/models/model.js
const db = {}; //empty object initialization
const files = fs.readdirSync(__dirname); //asking node to give us a list of the files in the current folder ('models' in this case and will be an array of strings)
//we going to grab each file from the list of files @models folder
for (const file of files) {
<<<<<<< HEAD:models/model.js
  if (file !== 'model.js') {
    //require(path.join(__dirname,file)) we are importing an individual model file (app)
    //require(path.join(__dirname,file))(Sequelize,Sequelize.DataType) the models are expecting 2 arguments: sequelize instance and the available DataTypes. (Bottomline: we are executing each model function file)
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model; //we add to our db object so that we can access later. PS: model.name <=> to the first argument in the function sequelize.define() in every model
  }
=======
    if (file !== 'model.ts') {
        //require(path.join(__dirname,file)) we are importing an individual model file (app)
        //require(path.join(__dirname,file))(Sequelize,Sequelize.DataType) the models are expecting 2 arguments: sequelize instance and the available DataTypes. (Bottomline: we are executing each model function file)
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model; //we add to our db object so that we can access later. PS: model.name <=> to the first argument in the function sequelize.define() in every model
    }
>>>>>>> backend:dist/models/model.js
}
//this loop is done after for(const file of files) because we want to be sure all models exist in the db object
for (const model in db) {
<<<<<<< HEAD:models/model.js
  if (db[model].associate) {
    db[model].associate(db); //we run through all the models and execute any associations presents in the model definition
  }
=======
    if (db[model].associate)
        db[model].associate(db); //we run through all the models and execute any associations presents in the model definition
>>>>>>> backend:dist/models/model.js
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;
<<<<<<< HEAD:models/model.js

module.exports = db;
=======
module.exports = db;
//# sourceMappingURL=model.js.map
>>>>>>> backend:dist/models/model.js
