import Generator from '@/maze-generator';

main();

function main() {
    if (process.argv.length == 2) {
        console.error('missing width and height (ex. 16x9)');
        process.exit(1);
    }

    const [width, height] = process.argv[2].split('x').map((s) => parseInt(s));
    if (!width || !height) {
        console.error('missing width and height (ex. 16x9)');
        process.exit(1);
    }

    try {
        const generator = new Generator();
        const maze = generator.generate(width, height);
        maze.printToConsole();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
