const parentDiv = document.querySelector(".block");
const childernOfparentDiv = parentDiv.children;
const childrenXCenterValues = [];

// you can change these values as you want
const range = 4;
const amplifier = 55;
const childSmallestValue = 50;
//---------------------------------------------

function getChildrenXCenterValues() {
    for(let i = 0; i < childernOfparentDiv.length; i++){
        let childernXValue = Math.floor(childernOfparentDiv[i].getBoundingClientRect().x);
        let childernWidth = Math.floor(childernOfparentDiv[i].getBoundingClientRect().width);
        childrenXCenterValues.push((childernXValue + childernWidth / 2) / 100);
    }
}
getChildrenXCenterValues();


function move(index, y){
    childernOfparentDiv[index].style.width = `${y}px`;
    childernOfparentDiv[index].style.height = `${y}px`;
}
function reset(index){
    childernOfparentDiv[index].style.width = childSmallestValue + 'px';
    childernOfparentDiv[index].style.height = childSmallestValue + 'px';
}


parentDiv.addEventListener("mousemove", function(e) {
    let xMouse = parseFloat(e.clientX) / 100;

    for(let i = 0; i < childernOfparentDiv.length; i++) {
        let y = amplifier * Math.sqrt(range - (Math.pow(xMouse - childrenXCenterValues[i], 2)));

        y > childSmallestValue ? move(i, y) : reset(i);
    }
})
  
parentDiv.addEventListener("mouseleave", function() {
    for(let i = 0; i < childernOfparentDiv.length; i++) {
        reset(i);
    }
})


// Made by hassan tahseen - instegram,telegram: @ht3aa