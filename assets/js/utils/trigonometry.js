function orbitAroundObject(
  orbitCenterX,
  orbitCenterY,
  velocity,
  orbitRadius,
  radian
) {
  /**
   *
   */
  radian += velocity;
  const newRadian = radian;
  const newX = orbitCenterX + Math.cos(radian) * orbitRadius;
  const newY = orbitCenterY + Math.sin(radian) * orbitRadius;

  return { newRadian, newX, newY };
}

export { orbitAroundObject };
