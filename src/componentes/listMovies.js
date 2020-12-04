import React from 'react';
import { useState, useEffect, } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber, FormattedPlural } from 'react-intl';
import Table from 'react-bootstrap/Table';
import * as d3 from "d3";
import Graph from './graph';
import Movie from './movie';



const urlEs = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
const urlEn = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";

function ListMovies() {

    var [movies, setMovies] = useState([]);
    var [movieCard, setMovieCard] = useState();

    useEffect(() => {
        var url = urlEs;
        if (window.navigator.language.includes("en")) {
            url = urlEn;
        }
        if (!navigator.onLine) {
            if (localStorage.getItem("movies") === null) {
                setMovies("Loading...");
                console.log("No hay conexión");
            } else {
                setMovies(JSON.parse(localStorage.getItem("movies")));
            }
        }
        else {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setMovies(res);
                    localStorage.setItem("movies", JSON.stringify(res));
                })
                .catch((err) => console.log(err));
        }

    }, []);

    return (
        <>
            <h1>
                Examen 2
            </h1>

            <div className="container">
                <div className="row">
                    <Table striped bordered hover className="col-md-8 col-sm-12" >
                        <thead >
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"><FormattedMessage id="Name" /></th>
                                <th scope="col"><FormattedMessage id="DirectedBy" /></th>
                                <th scope="col"><FormattedMessage id="Country" /></th>
                                <th scope="col"><FormattedMessage id="Budget" /></th>
                                <th scope="col"><FormattedMessage id="Release" /></th>
                                <th scope="col"><FormattedMessage id="Views" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(e => {
                                return (
                                    <tr onClick={() => setMovieCard(e)}>
                                        <th scope="row"> {e.id}</th>
                                        <td> {e.name}</td>
                                        <td> {e.directedBy}</td>
                                        <td> {e.country}</td>
                                        <td> {e.budget + " "}
                                            <FormattedPlural
                                                value={e.budget}
                                                one={<FormattedMessage id="Million" />}
                                                other={<FormattedMessage id="Millions" />} /></td>
                                        <td><FormattedDate
                                            value={new Date(e.releaseDate)}
                                            year='numeric'
                                            month='long'
                                            day='numeric'
                                            weekday='long'
                                        /> </td>
                                        <td><FormattedNumber
                                            value={e.views}
                                        /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div className="col-md-4">
                        {!(movieCard === undefined) &&
                            <Movie movie={movieCard}>

                            </Movie>
                        }
                    </div>
                </div >

            </div>
            {/* { console.log(movies)}
            {!(movies.length === 0) &&

                < Graph data={movies} />
            } */}

        </>
    )



}


export default ListMovies;