import Tile, { Dir, Glyph } from './tile';

class Maze {
    public width: number;
    public height: number;
    public tiles: Tile[] = [];
    public startTile: Tile | null = null;
    public endTile: Tile | null = null;

    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;

        for (let row = 0; row < h; row++) {
            for (let col = 0; col < w; col++) {
                this.tiles.push(new Tile(col, row, w, h));
            }
        }
    }

    public getTile(x: number, y: number): Tile | null {
        for (const tile of this.tiles) {
            if (tile.x == x && tile.y == y) {
                return tile;
            }
        }

        return null;
    }

    public getRandomTile(): Tile {
        const i = Math.floor(Math.random() * this.tiles.length);
        return this.tiles[i];
    }

    public getUnvisitedNeighbors(srcTile: Tile): [Tile[], Dir[]] {
        const nn = this.getTile(srcTile.x, srcTile.y - 1); // north
        const ns = this.getTile(srcTile.x, srcTile.y + 1); // south
        const ne = this.getTile(srcTile.x + 1, srcTile.y); // east
        const nw = this.getTile(srcTile.x - 1, srcTile.y); // west

        let neighbors: Tile[] = [];
        let dirs: Dir[] = [];
        if (nn && !nn.visited) {
            neighbors.push(nn);
            dirs.push(Dir.North);
        }
        if (ns && !ns.visited) {
            neighbors.push(ns);
            dirs.push(Dir.South);
        }
        if (ne && !ne.visited) {
            neighbors.push(ne);
            dirs.push(Dir.East);
        }
        if (nw && !nw.visited) {
            neighbors.push(nw);
            dirs.push(Dir.West);
        }

        return [neighbors, dirs];
    }

    public printToConsole() {
        if (!this.startTile || !this.endTile) {
            return;
        }

        let output: string = '';

        // start tile
        output += `${'  '.repeat(this.startTile.x)}${Glyph.V}\n`;
        // maze
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const tile = this.getTile(col, row);
                if (tile) {
                    output += tile.getGlyph();
                }
            }
            output += '\n';
        }
        // end tile
        output += `${'  '.repeat(this.endTile.x)}${Glyph.V}\n`;

        console.log(output);
    }
}

export default Maze;
