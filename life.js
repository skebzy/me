/* Conway's rules, applied to the same pixels used by the drawing canvas. */
(function (root) {
  function nextGeneration(pixels, step, width, height) {
    const neighbors = new Map();
    for (const cell of pixels.values()) {
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        if (!dx && !dy) continue;
        const x = cell.x + dx * step, y = cell.y + dy * step;
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        const key = `${x},${y}`, entry = neighbors.get(key) || {x, y, count: 0, color: cell.color};
        entry.count++;
        neighbors.set(key, entry);
      }
    }
    const result = new Map();
    for (const [key, cell] of neighbors) {
      const alive = pixels.get(key);
      if (cell.count === 3 || (alive && cell.count === 2)) {
        result.set(key, {x:cell.x, y:cell.y, color:alive?.color || cell.color, age:alive ? (alive.age || 0) + 1 : 0});
      }
    }
    return result;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {nextGeneration};
  else root.PixelLife = {nextGeneration};
})(typeof window !== 'undefined' ? window : {});
