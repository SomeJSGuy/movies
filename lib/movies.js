/* eslint-disable semi */
"use strict";

const fdebug = require("./fdebug");
const debug = fdebug("movies:lib:movies");

function Movies(main) {
    this.db = main.db;
    debug('init');
}





Movies.prototype.search = function(obj){
    var self = this;

    debug("search called: "+JSON.stringify(obj));

    return new Promise((resolve, rejec)=>{

        let query = {};

        if(obj.title) query.Title = new RegExp(obj.title);
        if(obj.year) query.Year = obj.year;
        if(obj.id) query._id = self.db.ObjectId(obj.id);

        self.db.movies.find(query, {}, (err, docs)=>{
            err ? reject(err) : resolve(docs);
        })
    });
}

module.exports = Movies;