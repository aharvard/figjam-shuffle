const selection = figma.currentPage.selection;

const stickies = selection.filter((node) => node.type === "STICKY");

const stickiesCoordinates = getCoordinates(stickies);

const shuffledStickiesCoordinated = shuffle(stickiesCoordinates);

updateStickies(stickies, shuffledStickiesCoordinated);

figma.closePlugin();

function updateStickies(selection, coordinates) {
    selection.forEach((node, index) => {
        node.x = coordinates[index].x;
        node.y = coordinates[index].y;
        figma.currentPage.insertChild(
            figma.currentPage.children.length - 1,
            node
        );
    });
}

function getCoordinates(stickies) {
    return stickies.map((sticky) => ({
        x: sticky.absoluteBoundingBox.x,
        y: sticky.absoluteBoundingBox.y,
    }));
}

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
