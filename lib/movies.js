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
        if(obj.id) query.imdbID = obj.id;

        console.log('query: ', query);

        self.db.movies.find(query, {}, (err, docs)=>{
            err ? reject(err) : resolve(docs);
        })
    });
}



Movies.prototype.saveToDB = function(movie) {
    var self = this;
    var promises = [];
    debug('.saveToDB called');

    movies.forEach((m) => {
        promises.push(new Promise((resolve, reject) => {
            self.db.movies.findOne({ imdbID: m.imdbID }, {}, (err, doc) => {
                if (err) {
                    return reject(err);
                }

                if (!doc) {
                    self.db.movies-save(m, (e, d) => {
                        debug('inserted: ', JSON.stringify(d));
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        }));// end promise
    });// end push

    return Promise.all(promises);

};

Movies.prototype.searchOmbd = function(obj){
    var self = this;

    debug("searchOmbd called: "+JSON.stringify(obj));

    return new Promise((resolve, rejec)=>{

        let query = {};

        if(obj.title) query.Title = new RegExp(obj.title);
        if(obj.year) query.Year = obj.year;
        if(obj.id) query.imdbID = obj.id;

        console.log('query: ', query);



        // self.db.movies.find(query, {}, (err, docs)=>{
        //     err ? reject(err) : resolve(docs);
        // })
    });
}

module.exports = Movies;
