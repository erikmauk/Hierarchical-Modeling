// To start the animation click anywhere in the window
var loc, dir;
var neckR, wingR, leftLegR, rightLegR, topBeakR, bottomBeakR, time;

var neckDown = true;
var wingDown = false;
var animate = false;
var LeftLegForward = true;
var RightLegForward = false;
var topBeakDown = true;
var bottomBeakDown = false;

const topText = "ICE FRESH"
const bottomText = "LEMONADE"

// normal set up
function setup() 
{
   createCanvas(400, 400);

   loc = createVector(width*.9, height*.5);
   dir = createVector(-1, 0);
   neckR = 0;
   wingR = -PI/10;
   leftLegR = PI/6;
   rightLegR = -PI/6;
   topBeakR = 0;
   bottomBeakR = 0;
}

// normal draw
function draw() 
{
   background(164, 235, 237);

   //foreground
   fill(52, 180, 61);
   rect(0, height/2, width, height/2);
   
   //Buildings
      push();
      fill(180);
      stroke(0);
      strokeWeight(2)
      rect(250, 80, 50, 120);
      rect(290, 110, 40, 90);
      rect(340, 70, 59, 130);
      rect(310, 150, 60, 50);
      pop();

   //Person
      push();
         translate(100,180);
         //neck
         fill(89, 150, 255);
         rect(-5, 10, 10, 15)
         //torso
         ellipse(0, 35, 20, 40);
         //afro
         fill(140, 68, 50);
         ellipse(0, -7, 40)
         //face      
         fill(237, 161, 141);
         ellipse(0, 0, 30);
         //mouth
         strokeWeight(3);
         stroke(0);
         line(-5, 7, 5, 7);
         //eyes and nose
         strokeWeight(1);
         fill(255);
         ellipse(-5, -4, 7, 6);
         ellipse(5, -4, 7, 6);
         fill(0);
         ellipse(-4, -4, 2);
         ellipse(6, -4, 2);
         ellipse(1, 2, 2, 3)
      pop();




   drawDuck();
   if (animate) 
   {
      moveDuck();
   }

   //Lemonade stand
      push();
         stroke(0);
         strokeWeight(2);
         fill(166, 67, 11);
         rect(20, 100, 10, 180);
         rect(160, 100, 10, 180);
         rect(15, 100, 165, 40);
         rect(20, 220, 150, 80);
      pop();
      push();
         fill(0);
         textSize(24)
         textAlign(CENTER);
         textFont('helvetica');
         text(topText, 97,130);
         text(bottomText, 97, 260)
      pop();

   fill(238, 179, 0);
   ellipse(0,0, 90);

}

// method to control starting the duck over again and 
// control animation on and off
function mousePressed() 
{
   loc = createVector(width*.9, height*.5);
   animate = !animate;
}

// code to draw the duck with animation parameters 
// neckR and wingR - other transforms align the pieces 
// to the correct pivot points Be very careful modifying 
// this code - the structure of the push and pops are 
// what builds the hierarchical relationships
function drawDuck() 
{
   noStroke();

   push();
      //move the entire duck
      translate(loc.x, loc.y);
      scale(1.75); //scale the entire duck

      // draw body
      fill(245, 226, 12);
      ellipse(0, 0, 40, 30); 

      //draw neck and head with possible animation transforms
      push();
         translate(-16, 0); //move into pivot position
         rotate(neckR);  //rotate by neckR parameter
         ellipse(0, -10, 10, 18); //neck
         ellipse(0, -17, 14, 14); //head
         fill(255);
         ellipse(0, -19, 4, 4);  //eye
         fill(0);
         ellipse(-1, -19, 2);
         push();
            translate(-4, -18);
            rotate(topBeakR);
            fill(155, 111, 16);
            triangle(-11, 0, 0, 3, 0, 0);
         pop();
         push();
            translate(-4, -18);
            rotate(bottomBeakR);
            fill(155, 111, 16);
            triangle(-11, 0, 0, -3, 0, 0); //beak
         pop();
      pop();


      //draw left leg and foot
      push();
         translate(-5, 14);
         rotate(leftLegR);
         stroke(255, 137, 32);
         strokeWeight(3);
         line(0, 0, 0, 10);
         fill(255, 137, 32);
         ellipse(-2, 10, 5, 2);
      pop();

      //draw right leg and foot
      push();
         translate(5, 14);
         rotate(rightLegR);
         stroke(255, 137, 32);
         strokeWeight(3);
         line(0, 0, 0, 10);
         fill(255, 137, 32);
         ellipse(-2, 10, 5, 2);                  
      pop();

      //draw wing with possible animation transforms
      fill(227, 208, 66);
      push();
         translate(-8, -5); //move into pivot position
         rotate(wingR); //animtion parameter to control wing flap
         ellipse(14, 0, 30, 16); //wing
      pop();

   pop();
}

// function to update all animation parameters - very 
// simple scripted animation
function moveDuck() 
{
   // update the ducks global location
   loc.add(dir);

   // find out how much the neck is rotated to decide which way to rotate
   // these constrain how much the neck moves up and down
   if (neckR < -PI/3) 
   {
      neckDown = false;
   } 
   if (neckR > PI/10) 
   {
      neckDown = true;
   }

   // depending on which way we need to rotate, do so
   if (neckDown == true) 
   {
      neckR -= PI/100;
   } 
   else 
   {
      neckR += PI/100;
   }

   // find out how much the wing is rotated to decide which way to rotate
   // these constrain how much the wing moves up and down
   if (wingR < -2*PI/5) 
   {
      wingDown = true;
   } 
   if (wingR > -PI/20) 
   {
      wingDown = false;
   }

   // depending on which way we need to rotate, do so
   if (wingDown == false) 
   {
      wingR -= PI/100;
   } 
   else 
   {
      wingR += PI/100;
   }

   // find out how much the left leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (leftLegR > PI/6)
   {
      LeftLegForward = true;
   }
   if (leftLegR < -PI/6)
   {
      LeftLegForward = false;
   }
   
   // depending on which way we need to rotate, do so
   if (LeftLegForward == false)
   {
      leftLegR += PI/150;
   }
   else
   {
      leftLegR -= PI/150; 
   }


   // find out how much the right leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (rightLegR > PI/6)
   {
      RightLegForward = true;
   }
   if (rightLegR < -PI/6)
   {
      RightLegForward = false;
   }
   
   // depending on which way we need to rotate, do so
   if (RightLegForward == false)
   {
      rightLegR += PI/150;
   }
   else
   {
      rightLegR -= PI/150; 
   } 


      // find out how much the left leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (topBeakR > 0)
   {
      topBeakDown = true;
   }
   if (topBeakR < -PI/12)
   {
      topBeakDown = false;
   }
   
   // depending on which way we need to rotate, do so
   if (topBeakDown == false)
   {
      topBeakR += PI/150;
   }
   else
   {
      topBeakR -= PI/150; 
   }


   // find out how much the right leg is rotated to decide which way to rotate
   // these constrain how much the leg moves forward and backward
   if (bottomBeakR > PI/12)
   {
      bottomBeakDown = true;
   }
   if (bottomBeakR < 0)
   {
      bottomBeakDown = false;
   }
   
   // depending on which way we need to rotate, do so
   if (bottomBeakDown == false)
   {
      bottomBeakR += PI/150;
   }
   else
   {
      bottomBeakR -= PI/150; 
   }  
}

