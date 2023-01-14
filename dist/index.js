"use strict";
var _a;
const parent_el = (_a = document.querySelector(".block")) !== null && _a !== void 0 ? _a : null;
const children_of_parent_el = parent_el
    ? parent_el.children
    : null;
const children_x_center_Values = get_center_points_x(children_of_parent_el);
// you can change these values as you want
const range = 4;
const amplifier = 55;
const min_value = 50;
//---------------------------------------------
if (parent_el !== null) {
    parent_el.addEventListener("mousemove", function (e) {
        start(e, children_of_parent_el, children_x_center_Values, {
            range,
            amplifier,
            min_value,
        });
    });
    parent_el.addEventListener("mouseleave", function () {
        stop(children_of_parent_el, min_value);
    });
}
else {
    customError("The parent element is null");
}
