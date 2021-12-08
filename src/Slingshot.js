import React from 'react';
import Matter from 'matter-js';

const Slingshot = () => {

        const engine = Matter.Engine.create();

        const render = Matter.Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1600,
            height: 800,
            wireframes: false
            }
    });

        const ground = Matter.Bodies.rectangle(1200,500,300,20,{isStatic: true});
        const wall = Matter.Bodies.rectangle(1500,300,30,175,{isStatic: true});
        const floor = Matter.Bodies.rectangle(10,780,3200,10,{isStatic: true});
        const ceiling = Matter.Bodies.rectangle(700,25,900,10,{isStatic: true});

        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                render: {visible: true}
            }
        });
        render.mouse = mouse;

        let ball = Matter.Bodies.circle(400,600,25);
        let sling = Matter.Constraint.create({
            pointA: {x:400, y:600},
            bodyB: ball,
            stiffness: 0.35
        });

        let firing = false;
        Matter.Events.on(mouseConstraint,'enddrag', function(e){
            if(e.body === ball) firing = true;
        })
        Matter.Events.on(engine,'afterUpdate',function(){
            if(firing && Math.abs(ball.position.x-400)<20 && Math.abs(ball.position.y-600)<20) {
                ball = Matter.Bodies.circle(400, 600, 20);
                Matter.World.add(engine.world, ball);
                sling.bodyB = ball;
                firing = false;
            }
        });

        const stack = Matter.Composites.stack(1100,270,6,6,5,0, function(x,y){
            return Matter.Bodies.polygon(x,y,4,25);
        })

        Matter.World.add(engine.world,[stack,ground,wall,floor,ceiling,ball,sling,mouseConstraint]);
        Matter.Engine.run(engine);
        Matter.Render.run(render);

    return (
        <div className="App">
        </div>
    );
};


export default Slingshot;