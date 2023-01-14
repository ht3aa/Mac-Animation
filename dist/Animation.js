"use strict";
function customError(msg) {
    return new Error(msg);
}
function get_center_points_x(els) {
    if (!els || !els.length) {
        throw customError("elements parameter is empty");
    }
    let points_x = [];
    for (let i = 0; i < els.length; i++) {
        let point_x = Math.floor(els[i].getBoundingClientRect().x);
        let el_width = Math.floor(els[i].getBoundingClientRect().width);
        points_x.push((point_x + el_width / 2) / 100);
    }
    return points_x;
}
function update_height_width(els, index, y) {
    if (!els || !els.length) {
        throw customError("elements parameter is empty");
    }
    els[index].style.width = `${y}px`;
    els[index].style.height = `${y}px`;
}
const start = function (e, els, points_x, equation_values) {
    if (!els || !els.length) {
        throw customError("elements parameter is empty");
    }
    let xMouse = e.clientX / 100;
    for (let i = 0; i < els.length; i++) {
        let y = equation_values.amplifier *
            Math.sqrt(equation_values.range - Math.pow(xMouse - points_x[i], 2));
        y > equation_values.min_value
            ? update_height_width(els, i, y)
            : update_height_width(els, i, equation_values.min_value);
    }
};
function stop(els, min_value) {
    if (!els || !els.length) {
        throw customError("elements parameter is empty");
    }
    for (let i = 0; i < els.length; i++) {
        update_height_width(els, i, min_value);
    }
}
