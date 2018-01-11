var STEPS = [
    '11111111',
    '21111111',
    '22111111',
    '23211111',
    '23221111',
    '23322111',
    '23422211',
    '23432221',
    '23432222',
    '33443222',
    '33453222',
    '34453322',
    '34454322',
    '34454332',
    '34555332',
    '34556433',
    '44556433',
    '44556433',
    '45566543',
    '45566543',
    '45566643',
    '45666744',
    '55666754',
    '55667754',
    '56667754',
    '56677764',
    '56677765',
    '66777775',
    '66777785',
    '67777885',
    '67778886',
    '77788886',
    '77888886',
    '78888887',
    '88888887',
    '88888888',
    '77777777',
    '77777767',
    '77777766',
    '67777756'
];

var WIDTH = 512;
var HEIGHT = 512;
var CELL_WIDTH = WIDTH/8;
var CELL_HEIGHT = HEIGHT/8;
var currentStep = 0;

var space = new CanvasSpace('#space');
var form = new Form(space);

var x, y, height;

if (space.size.y > space.size.x) {
    x = space.size.x * .2;
    height = space.size.x * .6;
    y = space.size.y/2 - height/2;
} else {
    y = space.size.y * .2;
    height = space.size.y * .6;
    x = space.size.x/2 - height/2;
}

var grid = new Grid(x, y).to(x + height, y + height).init(8, 8, "stretch", "stretch");

grid.generate(function(size, position, row, column, type, isOccupied) {
    form.stroke(false).fill(false).rect(new Rectangle( position ).resizeTo( size ));
}.bind(grid));

function cellColor(x, y) {
    var COLORS = [
        "#004D40",
        "#0D47A1",
        "#4A148C",
        "#880E4F",
        "#B71C1C",
        "#D84315",
        "#FFEB3B",
        "#69F0AE"
    ];
    var offset = x - y;
    return COLORS[ offset < 0 ? offset + 8 : offset];
}

function render(step) {
    for (var i = 0; i < STEPS[step].length; i++) {
        var y = parseInt(STEPS[step][i]) - 1;
        var square = grid.cellToRectangle(i, 7 - y);
        form.fill(cellColor(i, y)).rect(square);
    }

    grid.create();
}

space.add({
    animate: function(time, fs, context) {
        render(Math.floor((time/1000) % STEPS.length));
    }
});

space.play();
