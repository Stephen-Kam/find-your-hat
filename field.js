const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
        this._y = 0;
        this._x = 0;
        this._gameStatus = false;
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

    get gameStatus() {
        return this._gameStatus;
    }

    set y(index) {
        this._y = index;
    }

    set x(index) {
        this._x = index;
    }

    set gameStatus(status) {
        this._gameStatus = status; 
    }

    print() {
        this._field.forEach(element => console.log(element.join(' ')));
    }

    checkGameStatus(spaceLandedOn) {
        if (spaceLandedOn != undefined) {
            if (spaceLandedOn[0] === hat) {
                console.log('You found the hat! You win!!');
                this.gameStatus = true;
            } else if (spaceLandedOn[0] === hole) {
                console.log('You fell into a hole! Better luck next time!!');
                this.gameStatus = true;
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
                    console.log('Invalid selection');
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
                    console.log('Invalid selection');
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
    static generateField(height, width, percentage) {
        const spacesArr = [hole];
        const holePercent = Math.floor(100 / percentage);
        for (let i = 0; i < holePercent - 1; i++) {
            spacesArr.push(fieldCharacter);
        }
        let anArray = [];
        for (let i = 0; i < height; i++) {
            anArray.push([]);
            for (let j = 0; j < width; j++) {
                let randomSpace = Math.floor(Math.random() * holePercent);
                anArray[i].push(spacesArr[randomSpace]);
            }
        }
        anArray[Math.floor(Math.random() * height)].splice(Math.floor(Math.random() * width), 1, hat);
        anArray[0].splice(0, 1, pathCharacter);
        return anArray;
    }
}

module.exports = Field;