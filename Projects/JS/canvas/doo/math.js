function calculateCircle(amplitude, angle) {
  const x = amplitude * Math.sin(angle);
  const y = amplitude * Math.cos(angle);
  return [x, y];
}

function translate(position, translate) {
  const x = position.x + translate.x;
  const y = position.y + translate.y;
  return [x, y];
}
