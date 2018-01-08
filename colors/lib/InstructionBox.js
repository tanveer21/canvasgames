(function() {
function InstructionBox(label, color,strWidth) {
	this.Container_constructor();
	this.width = strWidth;
	this.color = color;
	this.label = label;
	this.setup();
	this.arrB;
}
var p = createjs.extend(InstructionBox, createjs.Container);
var background;
var msgText;
var arr;

p.setup = function() {
	msgText = new createjs.Text(this.label, "20px poppinMd", "#000");
	//text.textBaseline = "top";
	msgText.textAlign = "center";
	msgText.lineWidth = 400;
	
	var width = msgText.getMeasuredWidth()+30;
	var height = msgText.getMeasuredHeight()+20;
	
	msgText.x = this.width/2+35;
	msgText.y = 20;
	background = new createjs.Shape();
	background.graphics.setStrokeStyle(10);
	background.graphics.beginStroke("grey").beginFill(this.color).drawRect(0,0,500,200);
	
	arrB = new createjs.Bitmap('assets/play_Button.png');
	arrB.addEventListener("click", this.handleClick);
	arrB.x = 50;
	arrB.y = 90;
	arrB.alpha = 1;
	this.addChild(background,msgText);
} ;

p.handleClick = function(e)
{
	var evtPlay = new createjs.Event("playClick");
    arrB.dispatchEvent(evtPlay);
};

window.InstructionBox = createjs.promote(InstructionBox, "Container");
}());