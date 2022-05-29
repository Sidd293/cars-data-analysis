function preload() {
  fueltk = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653629975/download-removebg-preview_3_vedqb3.png"
  );
  fl = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653629699/download-removebg-preview_2_zkiywg.png"
  );
  carsm = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653628964/download-removebg-preview_dmtfwq.png"
  );
  gO = loadImage(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdYoz_fnfiAE16XqyWe0KaUBGXa6PIOpnOPg&usqp=CAU"
  );
  carside = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653598763/car_dmusf0.png"
  );
  car1 = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653625435/images__1_-removebg-preview_ezwpf9.png"
  );
  car2 = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653625547/images-removebg-preview_q2dhkv.png"
  );
  tree1 = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653720840/clipart2269705_mvp3ne.png"
  );
  tree2 = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653720840/SeekPng.com_tree-top-png_541414_fxwmu9.png"
  );
  road = loadImage(
    "https://res.cloudinary.com/sidd293/image/upload/v1653725667/44d281a699eb03fdab979f383c66e15f_dqpgxx.jpg"
  );
  soundFormats("mp3", "ogg");
  mySound = loadSound(
    "https://res.cloudinary.com/sidd293/video/upload/v1653815138/crash_t61xkt.mp3"
  );
}
mode = 0;

timer = 1000;
flx = 0;
repairs = 5;
e = 0;
s = 0.09;
p = 0;
speed = 3;
k = 0;
f = 67;
l = 0;
rsn = "";
el = 10;
ttime = 12000;
tfuel = 6700;
tdist = 8000;

proceed = 0;
if (document.getElementById("gmode").innerText != "0") {
  // console.log(,document.getElementById('tfuel').innerText)
  speed = 2 + (document.getElementById("torque").innerText * 6) / 100;
  tfuel =  document.getElementById("tfuel").innerText * 100;
  console.log("tfuel",tfuel);
}
ltime = ttime;
ldist = tdist;
lfuel = tfuel;

function setup() {
  createCanvas(400, 500);
}

function coll(x1, y1, w1, h1, x2, y2, w2, h2) {
  if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && h1 + y1 > y2) {
    // collision detected!
    return true;
  } else {
    // no collision
    return false;
  }
}

function gameover() {
  background(200);
  image(gO, 130, 10, 150, 150);
  text(rsn + "\npress enter to restart the game", 50, 200);
  textSize(20);
  if (keyIsDown(ENTER)) mode = 0;
}

function start() {
  repairs = 5;

  ltime = ttime;

  ldist = tdist;
  lfuel = tfuel;

  background(0, 255, 255);
  if (timer <= 0) {
    proceed = 0;
    mode = 1;
  }

  textSize(15);

  text(
    "How to play:\nuse UP key to accelerate , DOWN key to break \nand right ,left keys to steer. Avoid other cars and \ntrees and finish the race in given time",
    30,
    350
  );

  textSize(50);
  text("Race\n  Game", 30, 150);

  textSize(20);

  if (proceed == 1) {
    timer -= 5;
    // text(timer,30,50)
    text(
      "Fasten on your seatbelts \ngame starting in " + int(timer / 200) + "sec",
      30,
      300
    );
  } else text("Press Enter to start the game", 30, 300);
  image(carside, 200, 100, 400, 200);
  if (keyIsDown(ENTER)) proceed = 1;
}

function gamescreen() {
  ltime -= 2;

  e += s;
  s -= p;
  s += 0.6;

  // text
  if (keyIsDown(LEFT_ARROW)) {
    l += 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    l -= 1;
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (p >= 0) {
      p -= 0.15;
      f += 0.2;
      k -= 0.15;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    ldist -= 2;
    lfuel -= 2;
    if (p <= speed) p += 0.15;
    f -= 0.2;
    k += 0.15;
  }
  if (p >= 0) {
    p -= 0.07;
    k += p;
  }

  background(200, 255, 200, 255);

  image(tree1, 10, (0 + k * 5) % width, 70, 70);
  image(tree2, 10, (100 + k * 5) % width, 70, 70);
  image(tree1, 10, (200 + k * 5) % width, 70, 70);
  image(tree2, 10, (300 + k * 5) % width, 70, 70);
  image(tree1, 10, (400 + k * 5) % width, 70, 70);

  image(road, 75, ((0 + k * 5) % (width + 100)) - 100, 250, 100);
  image(road, 75, ((100 + k * 5) % (width + 100)) - 100, 250, 100);
  image(road, 75, ((200 + k * 5) % (width + 100)) - 100, 250, 100);
  image(road, 75, ((300 + k * 5) % (width + 100)) - 100, 250, 100);
  image(road, 75, ((400 + k * 5) % (width + 100)) - 100, 250, 100);
  image(road, 75, ((500 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((600 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((700 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((800 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((900 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((1000 + k * 5) % (height + 100)) - 100, 250, 100);
  image(road, 75, ((1100 + k * 5) % (height + 100)) - 100, 250, 100);

  rect(200, (0 + k * 5) % width, 10, 70);
  rect(200, (100 + k * 5) % width, 10, 70);
  rect(200, (200 + k * 5) % width, 10, 70);
  rect(200, (300 + k * 5) % width, 10, 70);
  rect(200, (400 + k * 5) % width, 10, 70);
  image(fueltk, 200 + flx, (400 + k * 5) % (15 * width), 70, 70);

  if ((400 + k * 5) % (15 * width) > height) flx = random(-80, 80);
  if (
    coll(
      200 + flx,
      (400 + k * 5) % (15 * width),
      70,
      70,
      width / 2 - l + 15,
      height - 130,
      70,
      100
    ) && lfuel < tfuel
  ) {
    // console.log("fuel")
    lfuel += 50;
  }
  if (lfuel <= 0) {
    proceed = 2;
    timer = 1000;
    rsn = "you ran out of fuel";
    mode = 2;
  }
  image(tree1, 330, (0 + k * 5) % (width + 100), 70, 70);
  image(tree2, 330, (100 + k * 5) % (width + 100), 70, 70);
  image(tree1, 330, (200 + k * 5) % (width + 100), 70, 70);
  image(tree2, 330, (300 + k * 5) % (width + 100), 70, 70);
  image(tree1, 330, (400 + k * 5) % (width + 100), 70, 70);
  // text(height-70-s ,0,10)
  if (height - 70 - s > height + 200) {
    el = random(-30, 150);
    s = height + 100;
  }

  push();
  image(car2, el + 80, height - 70 - s, 75, 100);
  //  text(",",el+80,height-70-s)
  rectMode(CENTER);
  // rotate(4);
  // text('.',width/2-l,height-130)
  image(car1, width / 2 - l, height - 130, 75, 100);
  pop();
 
  if (
    coll(
      el + 80 + 20,
      height - 70 - s,
      75 - 10,
      80,
      width / 2 - l + 15,
      height - 130,
      70,
      100
    ) ||
    width / 2 - l + 15 < 80 ||
    width / 2 - l + 80 > 350
  ) {
    mySound.play();
    ltime -= 700;
    repairs--;

    timer = 1000;
    mode = 4;
    l = 0;
    s = height;
  }
  if (repairs == -1) {
    proceed = 2;
    timer = 1000;
    rsn = "Out of more repairs";
    mode = 2;
  }
  noStroke();
  fill(200, 100, 20);
  rect(0, 460, width, 40);
  image(carsm, width * (1 - ldist / tdist), 460, 35, 30);
  image(fl, width - 30, 460, 35, 30);
  fill(240);
  rect(0, 0, 150, 50);
  fill(0);
  textSize(20);
  // console.log(ldist)
  if (ldist < 500) {
    proceed = 2;
    timer = 1000;
    rsn = "Yay 😃 you won the race";
    mode = 2;
  }

  if (ltime < 0) {
    proceed = 2;
    timer = 1000;
    rsn = "time over";
    mode = 2;
  }
  text(
    "Time left " +
      int(ltime / 100) +
      "sec" +
      "\nFuel left " +
      int(lfuel / 100) +
      "lt",
    0,
    20
  );
  // console.log(ldist,tdist)
}

function collision() {
  p = 0;

  background(255);
  if (timer <= 0) {
    proceed = 0;
    mode = 1;
  }
  push();
  textSize(40);
  text("Accident", 30, 50);
  pop();
  text("repair will take " + int(timer / 200) + "sec", 30, 70);
  text("Repairs Left " + repairs, 30, 90);

  // textSize(50)

  textSize(20);

  timer -= 5;
  // text(timer,30,50)

  // else
  // text("Press Enter to start the game",30,300)
  image(carside, 200, 100, 400, 200);
}
function draw() {
  if (mode == 4) collision();
  else if (mode == 0) start();
  else if (mode == 1) gamescreen();
  else gameover();
}
