const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let gameOver = false;

class Field {
    constructor(field) {
        this._field = field;
        this._y = 0;
        this._x = 0;
    }

    get field() {
        return this._field;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    set y(index) {
        this._y = index;
    }

    set x(index) {
        this._x = index;
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
        let startingCoordinate;
        let icon;
        switch (direction) {
            case 'u':
                startingCoordinate = this.y;
                if (this.x - 1 < 0 || thisField[this.x - 1][startingCoordinate] === pathCharacter) {
                    console.log('Invalid selection')
                    break;
                } else {
                    icon = thisField[this.x - 1].splice(this.y, 1, pathCharacter);
                    this.x -= 1;
                    break;
                }
            case 'r':
                startingCoordinate = this.y + 1;
                if (startingCoordinate >= thisField.length || thisField[this.x][startingCoordinate] === pathCharacter) {
                    console.log('Invalid selection');
                    break;
                } else {
                    icon = thisField[this.x].splice(startingCoordinate, 1, pathCharacter);
                    this.y = startingCoordinate;
                    break;
                }
            case 'd':
                startingCoordinate = this.y;
                if (this.x + 1 > thisField.length - 1 || thisField[this.x + 1][startingCoordinate] === pathCharacter) {
                    console.log('Invalid selection')
                    break;
                } else {
                    icon = thisField[this.x + 1].splice(this.y, 1, pathCharacter);
                    this.x += 1;
                    break;
                }
            case 'l':
                startingCoordinate = this.y - 1;
                if (startingCoordinate < 0 || thisField[this.lastFieldRow][startingCoordinate] === pathCharacter) {
                    console.log('Invalid selection');
                    break;
                } else {
                    icon = thisField[this.x].splice(startingCoordinate, 1, pathCharacter);
                    this.y = startingCoordinate;
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