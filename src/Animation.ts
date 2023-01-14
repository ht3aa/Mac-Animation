interface EquationType {
  range: number;
  amplifier: number;
  min_value: number;
}

function customError(msg: string) {
  return new Error(msg);
}

function get_center_points_x(els: HTMLCollection | null): Array<number> {
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

function update_height_width(
  els: HTMLCollectionOf<HTMLElement> | null,
  index: number,
  y: number
): void {
  if (!els || !els.length) {
    throw customError("elements parameter is empty");
  }
  els[index].style.width = `${y}px`;
  els[index].style.height = `${y}px`;
}

const start = function (
  e: MouseEvent,
  els: HTMLCollectionOf<HTMLElement> | null,
  points_x: Array<number>,
  equation_values: EquationType
) {
  if (!els || !els.length) {
    throw customError("elements parameter is empty");
  }
  let xMouse = e.clientX / 100;

  for (let i = 0; i < els.length; i++) {
    let y =
      equation_values.amplifier *
      Math.sqrt(equation_values.range - Math.pow(xMouse - points_x[i], 2));

    y > equation_values.min_value
      ? update_height_width(els, i, y)
      : update_height_width(els, i, equation_values.min_value);
  }
};

function stop(els: HTMLCollectionOf<HTMLElement> | null, min_value: number) {
  if (!els || !els.length) {
    throw customError("elements parameter is empty");
  }
  for (let i = 0; i < els.length; i++) {
    update_height_width(els, i, min_value);
  }
}
