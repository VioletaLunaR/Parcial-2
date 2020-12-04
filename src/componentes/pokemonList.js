import React from 'react';
import { useState, useEffect, } from "react";
import { FormattedDate, FormattedMessage, FormattedNumber, FormattedPlural } from 'react-intl';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';

import Graph from './graph';



const urlEs = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
const urlEn = "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";

function PokemonList() {

    var [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        var url = urlEs;
        if (window.navigator.language.includes("en")) {
            url = urlEn;
        }
        if (!navigator.onLine) {
            if (localStorage.getItem("pokemons") === null) {
                setPokemons("Loading...");
                console.log("No hay conexión");
            } else {
                setPokemons(JSON.parse(localStorage.getItem("pokemons")));
            }
        }
        else {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setPokemons(res);
                    localStorage.setItem("pokemons", JSON.stringify(res));
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
                    <Table bordered className="col-12" >
                        <thead className="thead-dark" >
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"><FormattedMessage id="Image" /></th>
                                <th scope="col"><FormattedMessage id="Name" /></th>
                                <th scope="col"><FormattedMessage id="Description" /></th>
                                <th scope="col"><FormattedMessage id="Height" /></th>
                                <th scope="col"><FormattedMessage id="Weight" /></th>
                                <th scope="col"><FormattedMessage id="Type" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemons.map(e => {
                                return (
                                    <tr>
                                        <th scope="row"> {e.id}</th>
                                        <td> <img src={e.ThumbnailImage} alt={e.ThumbnailAltText}></img></td>
                                        <td> {e.name}</td>
                                        <td> {e.description}</td>
                                        <td> {e.height}</td>
                                        <td> {e.weight}</td>
                                        <td>{e.type.map(t => {
                                            return (
                                                <Badge variant="secondary">
                                                    {t}
                                                </Badge>
                                            )
                                        })
                                        }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div >

            </div>


        </>
    )



}


export default PokemonList;