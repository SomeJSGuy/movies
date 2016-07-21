/* eslint-disable semi */
"use strict";

const fdebug = require("../lib/fdebug");
const request = require("request");


function Movies(main) {
    fdebug("init.");
    return {

        'search': (req, res, next) => {
            fdebug(".search called");

            var title  = req.swagger.params.title ? req.swagger.params.title.value : null;
            var year  = req.swagger.params.year ? req.swagger.params.year.value : null;
            var id  = req.swagger.params.id ? req.swagger.params.id.value : null;

            main.libs.Movies.search({title: title, year: year, id: id})
            .then((movies) => {
                    if (movies.length === 0) {
                        main.libs.Movies.searchOmbd(req, res, next).then((movies2) => {
                            console.log('movies2: ', movies2);
                            res.json(movies2);
                        });
                    }

                    res.json(movies);
                })
            .catch(next);
        },
        'searchOmbd': (req, res, next) => {
            fdebug(".searchOmdb called");

            var title = req.swagger.params.title ?
                            req.swagger.params.title.value :
                            null,
                url = 'http://www.omdbapi.com/?';

            if (title != null) {
                url = url + 't=' + title;
            }

            request(url, (err, res, body) => {
                if (err) {
                    // manejar error y salir
                    console.error('Error: ', error);
                    throw error;
                }

                if (res.statusCode == 200) {
                    console.log('body: ', body);
                    res(body);
                }
            });
        }

    };//end return
}

module.exports = Movies;
