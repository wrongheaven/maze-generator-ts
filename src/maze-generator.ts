import Maze from './maze';
import Tile, { oppDir } from './tile';

class Generator {
    public maze: Maze | null = null;

    public generate(w: number, h: number): Maze {
        if (w < 1 || h < 1) {
            throw Error('width and height must be > 0');
        }

        this.maze = new Maze(w, h);

        const [startX, endX] = [
            Math.floor(Math.random() * w),
            Math.floor(Math.random() * w),
        ];

        this.maze.startTile = new Tile(startX, -1, w, h);
        this.maze.endTile = new Tile(endX, h, w, h);
        this.maze.tiles.push(this.maze.startTile, this.maze.endTile);

        let tileStack: Tile[] = [];

        const genStartTile = this.maze.getRandomTile();

        let currentTile = genStartTile;
        currentTile.visited = true;
        tileStack.push(currentTile);

        while (true) {
            const [unvisitedNeighbors, dirs] =
                this.maze.getUnvisitedNeighbors(currentTile);
            if (unvisitedNeighbors.length == 0) {
                if (currentTile == genStartTile) {
                    break;
                }

                // backtrack
                currentTile = tileStack.pop() as Tile;
                continue;
            }

            // pick random neighbor
            const i = Math.floor(Math.random() * unvisitedNeighbors.length);
            const otherTile = unvisitedNeighbors[i];

            currentTile.walls ^= dirs[i];
            otherTile.walls ^= oppDir(dirs[i]);

            currentTile = otherTile;
            currentTile.visited = true;
            tileStack.push(currentTile);
        }

        return this.maze;
    }
}

export default Generator;
