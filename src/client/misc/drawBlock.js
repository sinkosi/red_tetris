import { config } from "./canvasConfig";

/****
 * Canvas drawing functions
 */
const drawBlock = (
  context,
  x,
  y,
  colour = config.EMPTY_BG,
  strokeColour = config.BORDER
) => {
  context.fillStyle = colour;
  context.fillRect(
    x * config.BLOCK,
    y * config.BLOCK,
    config.BLOCK,
    config.BLOCK
  );
  context.strokeStyle = strokeColour;
  context.strokeRect(
    x * config.BLOCK,
    y * config.BLOCK,
    config.BLOCK,
    config.BLOCK
  );
};

export default drawBlock;
