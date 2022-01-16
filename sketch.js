var WIDTH;
var HEIGHT;
var daysInMonth;
var startingSeconds;

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  var canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent('display');
  noStroke();
}

function draw() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  resizeCanvas(WIDTH, HEIGHT);
  background(40);
  
  drawSeconds();
  drawMinutes();
  drawHours();
  drawDays();
  drawMonths();
  drawText();
}

//draws the bar for the current second
drawSeconds = () => {
  push();
  fill('#D92B04');
  rect(0, HEIGHT * 4 / 5, WIDTH * (second()/60), HEIGHT/5);
  pop();
}

//draws the bar for the current minute
drawMinutes = () => {
  push();
  fill('#BF9765');
  rect(0, HEIGHT * 3 / 5, WIDTH * (minute()/60 + second()/3600), HEIGHT/5);
  pop();
}

//draws the bar for the current hour
drawHours = () => {
  push();
  fill('#D9C589');
  rect(0, HEIGHT * 2 / 5, WIDTH * (hour()/24 + minute()/1440), HEIGHT/5);
  pop();
}

//draws the bar for the current day
drawDays = () => {
  updateDaysInMonth();
  push();
  fill('#A0D9D9');
  rect(0, HEIGHT / 5, WIDTH * ((day()/daysInMonth) + hour()/(24 * daysInMonth)), HEIGHT/5);
  pop();
}

//draws the bar for the current month
drawMonths = () => {
  push();
  fill('#45858C');
  rect(0, 0, WIDTH * (((month() - 1)/12) + day()/(daysInMonth * 12)), HEIGHT/5);
  pop();
}

//figures out the total number of days within the current month
updateDaysInMonth = () => {
  let tempMonth = month();
  switch(tempMonth){
    case 1:
      daysInMonth = 31;
      break;
    case 2:
      if(isLeapYear()) daysInMonth = 29;
      else daysInMonth = 28;
      break;
    case 3:
      daysInMonth = 31;
      break;
    case 4:
      daysInMonth = 30;
      break;
    case 5:
      daysInMonth = 31;
      break;
    case 6:
      daysInMonth = 30;
      break;
    case 7:
      daysInMonth = 31;
      break;
    case 8:
      daysInMonth = 31;
      break;
    case 9:
      daysInMonth = 30;
      break;
    case 10:
      daysInMonth = 31;
      break;
    case 11:
      daysInMonth = 30;
      break;
    case 12:
      daysInMonth = 31;
      break;
  }
}

//determines whether or not the current year is a leap year
isLeapYear = () => {
  if(year() % 400 == 0) return true;
  else if(year() % 100 == 0) return false;
  else if(year() % 4 == 0) return true;
  else return false;
}

//writes the white text on the bars
drawText = () => {
  push();
  textAlign(LEFT, CENTER);
  textFont('Readex Pro');
  textSize(HEIGHT/6);
  
  //text shadow
  fill(20);
  text(getMonthName(), WIDTH/50 + WIDTH/200, HEIGHT/10 + HEIGHT/200);
  text(day() + getDaySuffix(), WIDTH/50 + WIDTH/200, 3 * HEIGHT/10 + HEIGHT/200);
  text(hour(), WIDTH/50 + WIDTH/200, 5 * HEIGHT/10 + HEIGHT/200);
  text(":" + getClockMinute(), WIDTH/50 + WIDTH/200, 7 * HEIGHT/10 + HEIGHT/200);
  text(":" + second(), WIDTH/50 + WIDTH/200, 9 * HEIGHT/10 + HEIGHT/200);
  
  //main text
  fill(230);
  text(getMonthName(), WIDTH/50, HEIGHT/10);
  text(day() + getDaySuffix(), WIDTH/50, 3 * HEIGHT/10);
  text(hour(), WIDTH/50, 5 * HEIGHT/10);
  text(":" + getClockMinute(), WIDTH/50, 7 * HEIGHT/10);
  text(":" + second(), WIDTH/50, 9 * HEIGHT/10);
  
  pop();
}

//converts the month number to an english name
getMonthName = () => {
  switch(month()){
     case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
}

//adds the suffix to the day number
getDaySuffix = () => {
  let tempD = day();
  if(day % 10 === 1) return "st";
  if(day % 10 === 2) return "nd";
  if(day % 10 === 3) return "rd";
  return "th";
}

//puts the 0 before single digit minutes
getClockMinute = () => {
  let tempM = minute();
  if(tempM >= 10) return tempM;
  else return "0" + tempM.toString();
}