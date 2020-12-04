
import * as d3 from "d3";
import { useState, useEffect, } from "react";
const urlEs = "https://gist.githubusercontent.com/jhonatan89/e379fadf8ed0f5381a2d8f8f3dea90c3/raw/e2bc20df02828d297f99558551e37959ac97a6f8/pokemon-es.json";
const urlEn = "https://gist.githubusercontent.com/jhonatan89/2089276d3ce0faceff8e55fc3459b818/raw/30ee1a77b3e328108faaaa9aaac6f2ddaa3d3711/pokemons-en.json";


export default function Graph() {

    var url = urlEs;
    if (window.navigator.language.includes("en")) {
        url = urlEn;
    }
    d3.json(url).then(data => {
        console.log(data);
        setGraph(data);
    });

    return (
        <>
            <div className="container">
                <div className="row">
                    <div id="canvas" className="col-12">
                    </div>
                </div>
            </div>
        </>
    )

    //Crear grafica 
    function setGraph(data) {
        console.log(data[0].views);
        const canvas = d3.select("#canvas");
        const width = 1000;
        const height = 700;
        const margin = { top: 10, left: 70, bottom: 40, right: 23 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = canvas.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, iwidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, 1102])
            .range([iheight, 0]);

        const bars = g.selectAll("rect").data(data);

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.height))
            .attr("width", x.bandwidth())
            .attr("height", d => iheight - y(d.height))

            g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);  
            
            g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }

}
