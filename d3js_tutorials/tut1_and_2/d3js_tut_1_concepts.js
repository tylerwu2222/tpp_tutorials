console.log("hi");
let iris_data;

const width = 500;
const height = 500;

d3.csv('iris.csv').then(
    data =>{
        console.log("data",data);
        iris_data = data;
        let svg = d3.select('#iris-plot');
        svg
            .style("width", width + 'px')
            .style("height", height + 'px');

        // 1a) create scales
        let xScale = d3.scaleLinear()
            .domain([4,8])
            .range([0.1 * width, 0.9 * width]);

        let yScale = d3.scaleLinear()
            .domain([1,5])
            .range([0.9 * width, 0.1 * width]);

        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // 1b) create axes
        let xAxis = d3.axisBottom().scale(xScale);
        svg.append("g").attr("class","x-axis");
        svg.select("g.x-axis")
            .attr("transform","translate(0," + height * 0.9 + ")")
            .call(xAxis);

        let yAxis = d3.axisLeft().scale(yScale);
        svg.append("g").attr("class","y-axis");
        svg.select("g.y-axis")
            .attr("transform","translate(" + width * 0.1 + ", 0)")
            .call(yAxis);   

        // 1c) create labels
        let xLabel = svg.append("text")
            .attr("class","x-label");
        svg.select(".x-label")
            .attr("text-anchor","middle")
            .attr("x", width/2)
            .attr("y", height * 0.98)
            .text("Sepal Length")

        let yLabel = svg.append("text")
            .attr("class","y-label");
        svg.select(".y-label")
            .attr("text-anchor","middle")
            .attr("x", -height/2)
            .attr("y", width * 0.02)
            .attr("transform","rotate(-90)")
            .text("Sepal Width")

        // 2) plot data
        svg.selectAll('circle')
            .data(iris_data)
            .join(
               enter => enter.append('circle')
                .attr('r', 4)
                .attr('cx', d => xScale(d['sepal.length']))
                .attr('cy', d => yScale(d['sepal.width']))
                .attr('fill', d => colorScale(d['variety']))
            )
    }
)