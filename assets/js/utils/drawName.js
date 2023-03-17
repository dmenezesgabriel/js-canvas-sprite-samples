export default function drawName(display, x, y, text, color) {
  const context = display.context;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineWidth = 2;
  context.fillStyle = "black";
  context.strokeStyle = "gray";

  const font = "10px Arial";
  const margin = 6;
  const textWidth = context.measureText(text).width + margin;
  const textHeight = parseInt(font, 10) + margin;

  context.fillRect(
    x - textWidth / 2,
    y - textHeight / 2,
    textWidth,
    textHeight
  );
  context.strokeRect(
    x - textWidth / 2,
    y - textHeight / 2,
    textWidth,
    textHeight
  );

  display.drawText(x, y, text, color, font);
}
