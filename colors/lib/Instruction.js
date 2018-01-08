(function() {

function Instruction(label,width){
	this.Container_constructor();
	this.label = label;
	this.boxWidth = width;
	this.instructionPoint = 0;
	this.direction;
	this.setup();
	
}
var p = createjs.extend(Instruction, createjs.Container);
var background;
var msgText;
var arr;
var arr1;
var arr2;
var arr3;
var msgTextBlink;
var canvas;
var stage;
var direction;
var pointing;

var allowKeyPress = false;

p.setup = function() {
	this.height = 200;
	this.width = this.boxWidth +200;
	
	// main message text
	msgText = new createjs.Text(this.label, " bold 25px Arial", "#ffffff");
	msgText.textAlign = "center";
	msgText.lineWidth = this.boxWidth -10;
		
	var b = msgText.getBounds();
	msgText.x = this.boxWidth/2;
	msgText.y = 20;
	
	// Blinking message text
	msgTextBlink = new createjs.Text("Press the LEFT ARROW key", " bold 18px Arial", "#ffffff");
	msgTextBlink.alpha = 0;
	msgTextBlink.lineWidth = this.boxWidth;
	msgTextBlink.x = 50;
	msgTextBlink.y = 130;
	
	
	background = new createjs.Shape();
	background.graphics.beginFill("0#000000").drawRect(0,0,this.boxWidth,200);
	background.alpha = 0.5;
	arr = new createjs.Bitmap('assets/leftBlink.png');
	arr1 = new createjs.Bitmap('assets/topBlink.png');
	arr2 = new createjs.Bitmap('assets/rightBlink.png');
	arr3 = new createjs.Bitmap('assets/bottomBlink.png');
	arr.y = 90;
	arr.x = this.boxWidth/2 - 40;
	
	this.addChild(arr,background,msgText,msgTextBlink);
	msgTextBlink.tweenObj = createjs.Tween.get(msgTextBlink, { loop: true })
        .to({ alpha: 1 }, 700)
        .to({ alpha: 0.2 }, 700);
	this.direction = 37;
	allowKeyPress = true;
	//document.onkeydown = this.keyPress;
} ;

p.showInst1 = function()
{
		createjs.Tween.get(msgText).to({ alpha: 1 }, 800).call(this.showInst2)

}

p.showInst2 = function()
{
	createjs.Tween.get(msgTextBlink, { loop: true })
        .to({ alpha: 1 }, 700)
        .to({ alpha: 0.2 }, 700);
}
p.changeText = function(txt1,text2,direction)
{
	msgText.alpha = 0;
	msgText.text = txt1;
	//createjs.Ticker.addEventListener("tick",stage);
	createjs.Tween.get(msgText).wait(200).to({alpha:1}, 1000);
	msgText.textAlign = "center";
	msgText.lineWidth = this.boxWidth -10;
	msgTextBlink.text = text2;
	if(direction == "u")
	{
		arr.image = arr1.image;
	}
	if(direction == "r")
	{
		msgTextBlink.x = arr.x + 110;
		arr.image = arr2.image;
	}
	else if(direction =="d")
	{
		msgTextBlink.x = arr.x-80;
		msgTextBlink.y = this.height -30;
		arr.image = arr3.image;
	}
	if(text2 == "hide")
	{
		msgTextBlink.text = "";
		arr.alpha = 0;
	}
	//stage.update();
};

window.Instruction = createjs.promote(Instruction, "Container");
}());




