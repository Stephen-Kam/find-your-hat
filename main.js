const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let gameOver = false;

class Field {
    constructor(field) {
        this._field = field;
        this._lastIndex = 0;
        this._lastFieldRow = 0;
    }

    get field() {
        return this._field;
    }

    get lastIndex() {
        return this._lastIndex;
    }

    get lastFieldRow() {
        return this._lastFieldRow;
    }

    set lastIndex(index) {
        this._lastIndex = index;
    }

    set lastFieldRow(index) {
        this._lastFieldRow = index;
    }

    print() {
        this._field.forEach(element => console.log(element.join(' ')));
    }

    checkGameStatus(spaceLandedOn) {
        if (spaceLandedOn != undefined) {
            if (spaceLandedOn[0] === hat) {
                console.log('You found the hat! You win!!');
                gameOver = true;
            } else if (spaceLandedOn[0] === hole) {
                console.log('You fell into a hole! Better luck next time!!');
                gameOver = true;
            }
        }
    }

    updateField(direction) {
        const thisField = this.field;
        let startingIndex;
        let icon;
        switch (direction) {
            case 'u':
                startingIndex = this.lastIndex;
                if (this.lastFieldRow - 1 < 0 || thisField[this.lastFieldRow - 1][startingIndex] === pathCharacter) {
                    console.log('Invalid selection')
                    break;
                } else {
                    icon = thisField[this.lastFieldRow - 1].splice(this.lastIndex, 1, pathCharacter);
                    this.lastFieldRow -= 1;
                    break;
                }
            case 'r':
                startingIndex = this.lastIndex + 1;
                if (startingIndex >= thisField.length || thisField[this.lastFieldRow][startingIndex] === pathCharacter) {
                    console.log('Invalid selection');
                    break;
                } else {
                    icon = thisField[this.lastFieldRow].splice(startingIndex, 1, pathCharacter);
                    this.lastIndex = startingIndex;
                    break;
                }
            case 'd':
                startingIndex = this.lastIndex;
                if (this.lastFieldRow + 1 > thisField.length - 1 || thisField[this.lastFieldRow + 1][startingIndex] === pathCharacter) {
                    console.log('Invalid selection')
                    break;
                } else {
                    icon = thisField[this.lastFieldRow + 1].splice(this.lastIndex, 1, pathCharacter);
                    this.lastFieldRow += 1;
                    break;
                }
            case 'l':
                startingIndex = this.lastIndex - 1;
                if (startingIndex < 0 || thisField[this.lastFieldRow][startingIndex] === pathCharacter) {
                    console.log('Invalid selection');
                    break;
                } else {
                    icon = thisField[this.lastFieldRow].splice(startingIndex, 1, pathCharacter);
                    this.lastIndex = startingIndex;
                    break;
                }
        }
        this.print();
        this.checkGameStatus(icon);
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);


myField.print();


while (!gameOver) {
    //prompt user for direction they want to move
    let direction = prompt('Which direction would you like to move? (u)p, (r)ight, (d)own, (l)eft > ');

    //display new map with an * showing the path taken
    myField.updateField(direction);
}