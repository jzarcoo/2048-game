import { useEffect, useState } from "react";
import Grid from "./Grid";
import Tile from "./Tile";

const Game = () => {
    const [tiles, setTiles] = useState(Array.from({ length: 4}, () => Array.from({ length: 4 }, () => ({ value: 0 }))));
    const [score, setScore] = useState(0);

    const addRandomTile = (tiles, value) => {
        const emptyTiles = tiles.flat().filter((tile) => tile.value === 0);
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        randomTile.value = value;
    }
    
    const initialize = () => {
        const nextTiles = tiles.map((row) => row.slice());
        const nextScore = 0;
        addRandomTile(nextTiles, 2);
        addRandomTile(nextTiles, 2);
        setTiles(nextTiles);
        setScore(nextScore);
    }

    const moveUp = () => {
        let nextTiles = tiles.map((row) => row.slice());
        let nextScore = score;
        let moved = false;
        for (let col = 0; col < 4; col++) {
            let roof = 0;
            for (let row = 0; row < 4; row++) {
                // Current tile is empty
                if (nextTiles[row][col].value === 0) {
                    continue;
                }
                // Current tile is not at the top
                if (roof !== row) {
                    nextTiles[roof][col].value = nextTiles[row][col].value;
                    nextTiles[row][col].value = 0;
                    moved = true;
                    // Current tile is at the top
                }
                // Roof tile has the same value as the above tile 
                if (roof > 0 && tiles[roof][col].value === nextTiles[roof - 1][col].value) {
                    nextTiles[roof - 1][col].value *= 2;
                    nextTiles[roof][col].value = 0;
                    moved = true;
                    nextScore += nextTiles[roof - 1][col].value
                } else {
                    roof++;
                }
            }
        }
        if (moved) {
            addRandomTile(tiles, Math.random() < 0.5 ? 2 : 4);
            setTiles(nextTiles);
            setScore(nextScore);
        }
    };

    const moveDown = () => {
        let nextTiles = tiles.map((row) => row.slice());
        let nextScore = score;
        let moved = false;
        for (let col = 0; col < 4; col++) {
            let floor = 3;
            for (let row = 3; row >= 0; row --) {
                // Current tile is empty
                if (nextTiles[row][col].value === 0) {
                    continue;
                }
                // Current tile is not at the bottom
                if (floor !== row) {
                    nextTiles[floor][col].value = nextTiles[row][col].value;
                    nextTiles[row][col].value = 0;
                    moved = true;
                    // Current tile is at the bottom
                }
                // Bootom tile has the same value as the below tile
                if (floor < 3 && nextTiles[floor][col].value === nextTiles[floor + 1][col].value) {
                    nextTiles[floor + 1][col].value *= 2;
                    nextTiles[floor][col].value = 0;
                    moved = true;
                    nextScore += nextTiles[floor + 1][col].value;
                } else {
                    floor--;
                }
                
            }
        }
        if (moved) {
            addRandomTile(tiles, Math.random() < 0.5 ? 2 : 4);
            setTiles(nextTiles);
            setScore(nextScore);
        }
    }

    const moveLeft = () => {
        let nextTiles = tiles.map((row) => row.slice());
        let nextScore = score;
        let moved = false;
        for (let row = 0; row < 4; row++) {
            let leftWall = 0;
            for (let col = 0; col < 4; col++) {
                // Current tile is empty
                if (nextTiles[row][col].value === 0) {
                    continue;
                }
                // Current tile is not at the left wall
                if (leftWall !== col) {
                    nextTiles[row][leftWall].value = nextTiles[row][col].value;
                    nextTiles[row][col].value = 0;
                    moved = true;
                    // Current tile is at the left wall
                }
                // Left wall tile has the same value as the left tile
                if (leftWall > 0 && nextTiles[row][leftWall].value === nextTiles[row][leftWall - 1].value) {
                    nextTiles[row][leftWall - 1].value *= 2;
                    nextTiles[row][leftWall].value = 0;
                    moved = true;
                    nextScore += nextTiles[row][leftWall - 1].value;
                } else {
                    leftWall++;
                }
            }
        }
        if (moved) {
            addRandomTile(tiles, Math.random() < 0.5 ? 2 : 4);
            setTiles(nextTiles);
            setScore(nextScore);
        }
    }

    const moveRight = () => {
        let nextTiles = tiles.map((row) => row.slice());
        let nextScore = score;
        let moved = false;
        for (let row = 0; row < 4; row++) {
            let rightWall = 3;
            for (let col = 3; col >= 0; col--) {
                // Current tile is empty
                if (nextTiles[row][col].value === 0) {
                    continue;
                }
                // Current tile is not at the right wall
                if (rightWall !== col) {
                    nextTiles[row][rightWall].value = nextTiles[row][col].value;
                    nextTiles[row][col].value = 0;
                    moved = true;
                    // Current tile is at the right wall
                }
                // Right wall tile has the same value as the right tile
                if (rightWall < 3 && nextTiles[row][rightWall].value === nextTiles[row][rightWall + 1].value) {
                    nextTiles[row][rightWall + 1].value *= 2;
                    nextTiles[row][rightWall].value = 0;
                    moved = true;
                    nextScore += nextTiles[row][rightWall + 1].value;
                } else {
                    rightWall--;
                }
            }
        }
        if (moved) {
            addRandomTile(tiles, Math.random() < 0.5 ? 2 : 4);
            setTiles(nextTiles);
            setScore(nextScore);
        }
    }

    const keyBoardInputManager = (e) => {
        switch (e.key) {
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", keyBoardInputManager);
        return () => {
            window.removeEventListener("keydown", keyBoardInputManager);
        }
    }, []);

    const newGame = (e) => {
        e.preventDefault();
        initialize();
    }

    return (
        <>
            <header className="App-header">
                <h1>2048</h1>
                <div className="scores-container">
                    <div className="score-container">0
                    </div>
                    <div className="best-container">0</div>
                </div>
            </header>
            <div className="above-game">
                <p className="game-intro">Join the tiles, get to <strong>2048!</strong></p>
                <a href="/" onClick={newGame} className="restart-button">New Game</a>
            </div>
            <div className="game-container">
                <div className="game-message"></div>
                <Grid />
                <div className="tile-container">
                    {tiles.flat().map((tile, index) => (
                        <Tile key={index} value={tile.value} row={Math.floor(index / 4)} col={index % 4} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Game;