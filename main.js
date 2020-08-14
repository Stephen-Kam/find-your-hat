const prompt = require('prompt-sync')({ sigint: true });
const Field = require('./field.js');




const gameStart = () => {
    let gameHeight = prompt('What is the height of the game board? > ');
    let gameWidth = prompt('What is the width of the game board? > ');
    let difficulty = prompt('What is the percentage of holes? > ');
    const myField = new Field(Field.generateField(gameHeight, gameWidth, difficulty));
    myField.print();
    while (myField.gameStatus != true) {
        //prompt user for direction they want to move
        let direction = prompt('Which direction would you like to move? (u)p, (r)ight, (d)own, (l)eft > ');

        //display new map with an * showing the path taken
        myField.updateField(direction);
    }
}

gameStart();
