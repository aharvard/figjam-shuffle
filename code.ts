function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const selection = figma.currentPage.selection;

const stickies = selection.filter((node) => node.type === "STICKY");

// get current positions of selected stickies
const originalPositions: {
  x: number;
  y: number;
  width: number;
  height: number;
}[] = [];
stickies.forEach((node) => {
  originalPositions.push({
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
  });
});

// randomize positions of selected stickies
shuffle(originalPositions);

// update positions of selected stickies
stickies.forEach((node, index) => {
  node.x = originalPositions[index].x;
  node.y = originalPositions[index].y;
  figma.currentPage.insertChild(
    Math.floor(stickies.length * Math.random()),
    node
  );
});

// figma.viewport.scrollAndZoomIntoView(stickies);

figma.closePlugin();
