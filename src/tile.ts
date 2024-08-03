class Tile {
    public x: number;
    public y: number;
    public walls: number = 0b1111;
    public visited: boolean = false;
    public mazeW: number;
    public mazeH: number;

    constructor(x: number, y: number, mw: number, mh: number) {
        this.x = x;
        this.y = y;
        this.mazeW = mw;
        this.mazeH = mh;
    }

    public getGlyph() {
        let glyph: Glyph = Glyph.X;
        switch (this.walls) {
            case 0b0010:
                glyph = Glyph.N;
                break;
            case 0b1000:
                glyph = Glyph.S;
                break;
            case 0b0001:
                glyph = Glyph.E;
                break;
            case 0b0100:
                glyph = Glyph.W;
                break;
            case 0b0011:
                glyph = Glyph.NE;
                break;
            case 0b0110:
                glyph = Glyph.NW;
                break;
            case 0b1001:
                glyph = Glyph.SE;
                break;
            case 0b1100:
                glyph = Glyph.SW;
                break;
            case 0b1010:
                glyph = Glyph.H;
                break;
            case 0b0101:
                glyph = Glyph.V;
                break;
            case 0b0000:
                glyph = Glyph.P;
                break;
            case 0b0111:
                glyph = Glyph.N1;
                break;
            case 0b1101:
                glyph = Glyph.S1;
                break;
            case 0b1011:
                glyph = Glyph.E1;
                break;
            case 0b1110:
                glyph = Glyph.W1;
                break;
        }
        return glyph;
    }
}

export enum Dir {
    North = 0b1000,
    South = 0b0010,
    East = 0b0100,
    West = 0b0001,
}

export enum Glyph {
    N = '╩═',
    S = '╦═',
    E = '╠═',
    W = '╣ ',
    NE = '╚═',
    NW = '╝ ',
    SE = '╔═',
    SW = '╗ ',
    H = '══',
    V = '║ ',
    P = '╬═',
    N1 = '┴ ',
    S1 = '┬ ',
    E1 = '├═',
    W1 = '┤ ',
    X = '? ',
}

export function oppDir(dir: Dir): Dir {
    return dir >> 2 || dir << 2;
}

export default Tile;
