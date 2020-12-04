
import * as d3 from "d3";
import { useState, useEffect, } from "react";
const urlEs = "https://gist.githubusercontent.com/josejbocanegra/f784b189117d214578ac2358eb0a01d7/raw/2b22960c3f203bdf4fac44cc7e3849689218b8c0/data-es.json";
const urlEn = "https://gist.githubusercontent.com/josejbocanegra/8b436480129d2cb8d81196050d485c56/raw/48cc65480675bf8b144d89ecb8bcd663b05e1db0/data-en.json";


export default function Graph() {
    var [movies, setMovies] = useState([]);

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
            .domain([0, 9256000])
            .range([iheight, 0]);

        const bars = g.selectAll("rect").data(data);

        bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "steelblue")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.views))
            .attr("width", x.bandwidth())
            .attr("height", d => iheight - y(d.views))

            g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);  
            
            g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));
    }

}
