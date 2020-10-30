var ball, db, position;

function setup(){
    createCanvas(500,500);
    db = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballRef = db.ref('Ball/Position');
    ballRef.on("value", readData);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    db.ref('Ball/Position').set({
        'X': ball.x+x,
        'Y': ball.y+y
    })
}

function readData(data){
    position = data.val();
    ball.x = position.X;
    ball.y = position.Y;
}