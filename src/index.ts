function get_x_center_values(elements: HTMLCollection | null): Array<number> {
  if (!elements) return [];

  let children_x_center_Values = [];
  for (let i = 0; i < elements.length; i++) {
    let children_x_value = Math.floor(elements[i].getBoundingClientRect().x);
    let children_width = Math.floor(elements[i].getBoundingClientRect().width);
    children_x_center_Values.push(
      (children_x_value + children_width / 2) / 100
    );
  }

  return children_x_center_Values;
}

function update_height_width(
  children: HTMLCollectionOf<HTMLElement> | null,
  index: number,
  y: number
): void {
  if (!children) return;
  children[index].style.width = `${y}px`;
  children[index].style.height = `${y}px`;
}

function reset_height_width(
  children: HTMLCollectionOf<HTMLElement> | null,
  index: number,
  min_value: number
): void {
  if (!children) return;
  children[index].style.width = `${min_value}px`;
  children[index].style.height = `${min_value}px`;
}

const start = function (
  e: MouseEvent,
  children: HTMLCollectionOf<HTMLElement> | null,
  values: Array<number>,
  min_value: number
) {
  if (!children) return e;
  let xMouse = e.clientX / 100;

  for (let i = 0; i < children.length; i++) {
    let y = amplifier * Math.sqrt(range - Math.pow(xMouse - values[i], 2));

    y > child_smallest_value
      ? update_height_width(children, i, y)
      : reset_height_width(children, i, min_value);
  }

  return e;
};

function stop(
  children: HTMLCollectionOf<HTMLElement> | null,
  min_value: number
) {
  if (!children_of_parent_el) return;
  for (let i = 0; i < children_of_parent_el.length; i++) {
    reset_height_width(children, i, min_value);
  }
}

let parent_el = document.querySelector(".block") ?? null;
const children_of_parent_el = parent_el
  ? (parent_el.children as HTMLCollectionOf<HTMLElement>)
  : null;
const children_x_center_Values = get_x_center_values(children_of_parent_el);

// you can change these values as you want
const range = 4;
const amplifier = 55;
const child_smallest_value = 50;
//---------------------------------------------

if (parent_el !== null) {
  parent_el.addEventListener("mousemove", function (e) {
    start(
      e as MouseEvent,
      children_of_parent_el,
      children_x_center_Values,
      child_smallest_value
    );
  });
  parent_el.addEventListener("mouseleave", function (e) {
    stop(children_of_parent_el, child_smallest_value);
  });
}
