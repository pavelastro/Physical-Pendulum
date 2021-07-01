var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
var iW = window.innerWidth,
    iH = window.innerHeight;
var rect = [];

var engine = Engine.create();

var render = Render.create({
element: document.body,
engine: engine,
options: {
        width: iW,
        height: iH,
        wireframes: false,
        showDebug: true
}
});

var boxy = Bodies.polygon(iW-iW/2, 200, 4, 50, 50);
var box2 = Bodies.polygon(iW-iW/2+30, 100, 3, 50, 50);
var ground = Bodies.rectangle(iW-iW/2, 620, 600, 60, { isStatic: true });

var boxes = Matter.Composites.stack(ground.position.x+100, 30, 10, 1, 10, 0, function(x, y) {
        return Bodies.polygon(x, y, 2, 20, 30);
    });
var rope = Matter.Composites.chain(boxes, 0.5, 0, -0.5, 0, {stiffness: 1});

Composite.add(boxes, Matter.Constraint.create({ 
        bodyA: boxes.bodies[0],
        pointB: { x: ground.position.x+100, y: 100 },
        stiffness: 1
    }));
    
var mouse = Matter.Mouse.create(render.canvas),
        mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true
                }
            }
        });

function addBody() {
    rect.push(Bodies.polygon(iW-iW/2, 0, 4, 50, 50));
}

Composite.add(engine.world, [boxy, box2, ground, rope, mouseConstraint]);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);