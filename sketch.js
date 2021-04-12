let render_framerate = 30;
let world_framerate = 60;
let dt = 1 / world_framerate;


let balls = [];

function setup() {
    createCanvas(windowWidth, windowHeight);

    frameRate(render_framerate);
    setInterval(update_world, dt);
}


function draw() {
    background(0);
    balls.forEach(ball => {
        ball.show();
    });
}


function mousePressed() {
    balls.push(new Ball(mouseX, mouseY));
}


function update_world() {
    balls.forEach(ball => {
        ball.update();
    });
}


class Ball {
    constructor(x, y) {
        this.p = new createVector(x, y);
        this.v = new createVector(0, 0);
        this.a = new createVector(0, 0);

        this.r = 20;
    }

    show() {
        fill(255 - 255 * this.p.y / height, 255 * this.p.x / width, 255);
        stroke(255);
        ellipse(this.p.x, this.p.y, this.r);
    }

    update() {
        this.a = new createVector(0, 100);

        let dv = p5.Vector.mult(this.a, dt);
        this.v = p5.Vector.add(this.v, dv);

        if (this.p.y >= height - this.r) {
            this.v.y *= -0.95;
            this.p.y = height - this.r;
        }

        let dp = p5.Vector.mult(this.v, dt);
        this.p = p5.Vector.add(this.p, dp);
    }
}