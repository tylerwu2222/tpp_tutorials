console.log("hi");
let circle_data = [1, 2, 3];

const colors = ['steelblue', 'gold', 'red'];
const config = {
    width: 500,
    height: 100,
    marginLeft: 100,
    marginTop: 100
};

// 0) define svg   
let svg = d3.select('#circle-plot');
svg
    .style("width", config.width + 2 * config.marginLeft + 'px')
    .style("height", config.height + 2 * config.marginTop + 'px');

// 1a) create scales
let xScale = d3.scaleLinear()
    .domain([0, 6])
    .range([config.marginLeft, config.width + config.marginLeft]);

let yScale = d3.scaleLinear()
    .domain([0, 2])
    .range([config.marginTop + config.height, config.marginTop]);

// 2) plot data
const plot_data = (new_data, fill_color, radius) =>{
    svg.selectAll('circle')
        .data(new_data)
        .enter()
        .append('circle')
        .transition()
        .duration(2000)
        .attr('r', radius)
        .attr('cx', d => xScale(d))
        .attr('cy', yScale(1))
        .style('fill', fill_color)
        .style('stroke','black')
        .style('stroke-width',1);
};

plot_data(circle_data, colors[0], 10);

const merge_data = (new_data, fill_color, radius) =>{
    let existing_circles = svg.selectAll('circle')
        .data(new_data);
    existing_circles
        .enter()
        .append('circle')
        .merge(existing_circles)
        .transition()
        .duration(2000)
        .attr('r', radius)
        .attr('cx', d => xScale(d))
        .attr('cy', yScale(1))
        .style('fill', fill_color)
        .style('stroke','black')
        .style('stroke-width',1);
};

const remove_data = (new_data, fill_color, radius) =>{
    svg.selectAll('circle')
        .data(new_data)
        .exit()
        .transition()
        .duration(2000)
        .attr('r', radius)
        .attr('cx', d => xScale(d))
        .attr('cy', yScale(1))
        .style('fill', fill_color)
        .style('stroke','black')
        .style('stroke-width',1)
        .remove();
};

const update_dots = (new_data, fill_color, radius, type = 'add') => {
    if (type=='add'){
        plot_data(new_data, fill_color, radius);
    }
    else if(type=='merge'){
        merge_data(new_data, fill_color, radius);
    }
    else{
        remove_data(new_data, fill_color, radius);
    }
};


let add_btn = document.getElementById('add-dots-btn');
add_btn.onclick = () => { update_dots([1,2,3,4,5],colors[1],5)};

let merge_btn = document.getElementById('merge-dots-btn');
merge_btn.onclick = () => { update_dots([1,2,3,4,5],colors[1],10, 'merge')};

let reset_btn = document.getElementById('reset-dots-btn');
reset_btn.onclick = () => { update_dots([1,2,3],colors[2],0, 'remove')};