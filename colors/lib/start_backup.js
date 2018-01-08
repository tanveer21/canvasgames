	var canvas;
	var stage;
	var stageHeight;
	var stageWidth;
	var container; // for start button
	
	var welcomeBackground;
	var welcomeHeading; //  for main heading
	var welcomeDescription; // for main description
	
	var counterContainer; // for showing count down
	var counterShape; // for showing circle of countdown
	var playButton;
	var allowKeyPress=false;
	var keyPress=false;
	var timeFlag=false;
	var playStatus=false; // for checking game play or pause
	var counter=2;
	var radomNumber=[6,7,8,9,10]; // for image selection
	//var imageNumber={6:"triangle.jpg",7:"triangle-yellow.jpg",8:"green-shape.JPG",9:"flower.jpg",10:"circle.JPG"};
	
	var imageNumber={6:"triangle.png",7:"plus.png",8:"square.png",9:"star.png",10:"circle.png"};
	
	var currentShape=0;  // save current shape value
	var previousShape=0; // save previous shape value
	var image;
	var timeCountDown=20; //90
	var gameContainer;
	var rightBitmap;
	var leftBitmap;
	var correctImage;
	
	var backImage;
	var backBitmap;
	var bottedImage;
	var previousBitmap,wrongBitmap,correctBitmap;
	var triangleImage,circleImage,flowerImage,shapeImage,ytriangleImage,blankImage;
	var counterRef=0;      // for set value
	// for score level
	var totalScore=0;      // total score
	var currentLevel=1;    // current level
	var currentCorrect=1;  // current level correct answers  like x3
	var totalCorrectAnswer=0;
	var totalQuestion=0;
	var wrongAnswer=0;
	var totalPercentage=0;
	// for help screen
	var help; // variable for help stage
	var isHelp = false ;// for help stage
	var skipButton; // define skip button
	var skipBitmap;
	var playKeyboard;
	var keyboardBitmap;
	var skipContainer;
	var keyboardContainer;
	var setTutorial=false;	
    var guidelinecontainer,guideLineTop,guideLineBottom;
	
    var tutorialCorrect=0;	
	var arrowBitmap,guidekey;
	var counterShape1;
	var trynow;
	var objBravo;
	var isMute=true;


function init1(){
	//	console.log("22");
		canvas = document.getElementById('gameFrame');
		
	
		stage = new createjs.Stage(canvas);
		
		stage.mouseEventsEnabled = true;
		stage.enableMouseOver();
		
		stageHeight = stage.canvas.height;
		stageWidth  = stage.canvas.width;
		
		container=new createjs.Container();
		stage.addChild(container);	
		
		/* setting stage */
	
		// Background Image
		welcomeBackground=new Image();
		welcomeBackground.src="game-images/start-bg-sm.jpg";
		welcomeBackground.name="welcomeBackground";
		welcomeBackground.onload=setBtn;
		
		// Play Button
		playButton=new Image();
		playButton.src="game-images/play-game.png";
		playButton.name="playbutton";
		playButton.onload=setBtn;
		
		/* end here */
	
    	registerSounds();

}

function registerSounds()
{
	createjs.Sound.registerSound({id:"bgMusic", src:"assets/sounds/bgSound.mp3"});
	SoundJS.addBatch([
        {name:'right', src:'assets/sounds/right.mp3', instances:1},
        {name:'wrong', src:'assets/sounds/wrong.mp3', instances:1},
		{name:'bgSound', src:'assets/sounds/bgSound.mp3', instances:1},
		]);
}

// start button click functionality
function startContainer(){
		
	//	console.log("21");
		
		stage.removeChild(container);
		stage.update();
		
		$("#btnPlay").removeClass("button-disabled");
		$("#btnTutorial").removeClass("button-disabled");
		
		$(".game-log").removeClass("hide");
		
		
		gameContainer=new createjs.Container();	
		stage.addChild(gameContainer);
		stage.update();
		
		setEnvironment(); // initialising stage behind the counter 
		
		// cross checking counter not run more than one time , while doing pause or play
		if(counter>0){
			
			counterContainer=new createjs.Container();
			stage.addChild(counterContainer);
			
			counterShape = new createjs.Shape(); 
			counterShape.graphics.beginFill("#e64e4e"); //#e64e4e
			counterShape.graphics.drawCircle(0,0,40);
		//	counterShape.graphics.endFill();
			counterShape.x=stageWidth/2+15;
			counterShape.y=stageHeight/2+30;
			counterContainer.addChild(counterShape);
			stage.update();
					
			// for creating count down  font-family: 'Poppins', sans-serif;
			createjs.Ticker.removeEventListener("tick",stage);
			cTimerText  = new createjs.Text("READY","bold 23px poppinMd", "#fff");
			
			cTimerText.x=stageWidth/2+15;
			cTimerText.y=stageHeight/2+10;
			
			cTimerText.textAlign="center";
			
			counterContainer.addChild(cTimerText);
			stage.update();
			
			setTimeout(startCounter, 1000);
			
		}
		

}

// for starting count down precess
function startCounter(){
	
	//	console.log("20");
		
		if(counter<=0){
			
			stage.removeChild(counterContainer);
			
			$("#divButtons").css({"display":"block"});
			//console.log("counter end");
			firstimageRotate(); // first static rotate image functionality

		}else{
			if(counter==2){
				counterShape.graphics.clear().beginFill("#fff15d").drawCircle(0,0,40);
				cTimerText.text="SET";
			}else{
				counterShape.graphics.clear().beginFill("#3cb778").drawCircle(0,0,40);
				cTimerText.text="GO!";
			}
		
		//	cTimerText.text=counter;
			stage.update();
			counter--;
			setTimeout(startCounter, 1000)
		}
}

// for first image rotate right to left
function firstimageRotate(){	
		
	//	console.log("19");
		//check tutorial working or not

	//	console.log("setTutorila value check::"+setTutorial);
		if(setTutorial==false){
			
			counterRef=setInterval(countDown, 1000); //Here start clock timer 
			timeFlag=true;
			$("#btnPlay").removeClass("in");
		}
		
		previousShape=rightBitmap.name; // reference id assigning to previousShape variable
		
		//rightBitmap.regX=92;
		
		createjs.Ticker.addEventListener("tick",stage);
	//	createjs.Tween.get(rightBitmap).to({scaleX:0,x:332},500,createjs.Ease.linear).call(flipRightBitmap);
		createjs.Ticker.setFPS(60);
		createjs.Tween.get(rightBitmap).to({scaleX:0},500,createjs.Ease.linear).call(flipRightBitmap);
		
}



function countDown(){
	
	//	console.log("18");
	
	if(timeFlag==true){	
	
		minutes = parseInt( timeCountDown/ 60, 10)
        seconds = parseInt(timeCountDown % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#gameTime").text(minutes + ":" + seconds);

        if (--timeCountDown < 1) {
			 gameComplete();
        }
	}
}




// for flipping right image to center , set dotted image after that and then remove rightbitmap image
function flipRightBitmap(){
	
		//console.log("17");
		
		//console.log("first right working");
		
		// removing flapped element
		
		
		gameContainer.removeChild(rightBitmap);
		
		stage.update();
		// placing dotted image on left side
		bottedImage=new Image();
		bottedImage.src="game-images/back-card.png";
		bottedImage.name="dotted";
		bottedImage.onload=setBtn;
		
		setEnvironment();
		
		keyPress=true;
		
		if(setTutorial==true){
			
			guideLineTop.text = "Does the left word match the right word's color?";
			guideLineTop.lineWidth  = 450;
			guideLineTop.lineHeight  = 30;
			guideLineTop.textAlign = "center"; 
			guideLineTop.x=stageWidth/2;
			
			if(tutorialCorrect<=5){
				
				if(currentShape==previousShape){
					guideLineBottom.text="Press the RIGHT ARROW KEY";
					guideLineBottom.x=stageWidth/2+180;
					allBitmap.alpha=0;
					rightBlinkBitmap.alpha=1;
					leftBlinkBitmap.alpha=0;
					
					
				}else{
					guideLineBottom.text="Press the LEFT ARROW KEY";
					guideLineBottom.x=stageWidth/2-180;
					allBitmap.alpha=0;
					rightBlinkBitmap.alpha=0;
					leftBlinkBitmap.alpha=1;
				}
				
				createjs.Ticker.addEventListener("tick",stage);
				createjs.Tween.get(guideLineBottom, { loop: true }).wait(500)
					.to({ alpha: 1 }, 700)
					.to({ alpha: 0.2 }, 700);
			
				
			}else if(tutorialCorrect==9){
					congratulationMessage();
			}else{
					guideLineBottom.text="";
					allBitmap.alpha=1;
					rightBlinkBitmap.alpha=0;
					leftBlinkBitmap.alpha=0;
					
					trynow  = new createjs.Text("Try Now","23px poppinMd", "#fff");
					trynow.x=stageWidth/2-50;
					trynow.y=stageHeight-125;
					guidecontainer.addChild(trynow);
					stage.update();
			}
			
		}
}




function setEnvironment(){
		//console.log("16");
		// if it start first
		
		if(previousShape==0){
			blankImage=new Image();
			blankImage.src="game-images/blank-card.png";
			blankImage.name="Blank";
			blankImage.onload=setBtn;
		}

		currentShape=radomNumber[Math.floor(Math.random() * radomNumber.length)];
        //triangleImage,circleImage,flowerImage,shapeImage,ytriangleImage;
		
		if(currentShape==6){
			triangleImage=new Image();
			triangleImage.src="game-images/triangle.png";
			triangleImage.name="triangle";
			triangleImage.onload=setBtn;
			
		}else if(currentShape==7){
			ytriangleImage=new Image();
			ytriangleImage.src="game-images/plus.png";
			ytriangleImage.name="plus";
			ytriangleImage.onload=setBtn;
			
		}else if(currentShape==8){
			shapeImage=new Image();
			shapeImage.src="game-images/square.png";
			shapeImage.name="square";
			shapeImage.onload=setBtn;
			
		}else if(currentShape==9){ 
			flowerImage=new Image();
			flowerImage.src="game-images/star.png";
			flowerImage.name="star";
			flowerImage.onload=setBtn;
			
		}else if(currentShape==10){
			circleImage=new Image();
			circleImage.src="game-images/circle.png";
			circleImage.name="circle";
			circleImage.onload=setBtn;	
		}
		
		if(previousShape!=0){
			document.onkeydown = keyBoardHandler;		
		}
		
}


function keyBoardHandler(u){
		//console.log("15");
		u = u || window.event;
		tempcontainer=new createjs.Container();
		stage.addChild(tempcontainer);
		//console.log(u.keyCode);
		//console.log("cross check::"+keyPress);
		if((u.keyCode == '37'||u.keyCode == '39')&&(keyPress==true && timeCountDown >0)){
			keyPress=false; // set false value to keyboard handler
			
			if(u.keyCode=='37'){
					totalQuestion++; // for getting total attempts
					if(previousShape==currentShape){
						
						// sound check mute or not
						if(isMute){
							SoundJS.play('wrong');
						}
						// calculate score start here
						wrongAnswer++  // for getting total wrong answers
						// calculate end here
						console.log("check 1"+setTutorial);
						if(setTutorial==true){ // if user is on tutorial section, then only image flip
							if(tutorialCorrect>5)
							guideLineTop.text="This card is the same as the previous one";
						
							backBitmap.scaleX=1;
							backBitmap.x=235;
							backBitmap.regX=90;
							createjs.Ticker.addEventListener("tick",stage);
							createjs.Tween.get(backBitmap).to({scaleX:0},1000,createjs.Ease.linear).call(getPrevious);
						}else{
								wrongImage=new Image();
								wrongImage.src="game-images/wrong.png";
								wrongImage.name="wrongImage";
								wrongImage.onload=setBtn;
						}
						
					}else{
						
						
						if(isMute){	
							SoundJS.play('right');
						}
						
						
						if(setTutorial==true){
								tutorialCorrect++;
						}else{
								// for correct answers
								//calculate score start here
								totalCorrectAnswer++; // for getting correct attempts
								totalScore+= currentLevel*100;
								
								$("#score").html(totalScore);
							
								$('#bPoints span:eq('+(currentCorrect-1)+')').addClass('active');
								currentCorrect++;
								
								if(currentCorrect==5){
									
									currentLevel++;
									currentCorrect=1;
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
								}
								if(currentLevel==9&&currentCorrect==5&&wrongAnswer<0){
									currentLevel--;
									currectCorrect=1;
									$('#bPoints i:eq('+(currentCorrect-1)+')').addClass('active');
									
								}
						 }
						// calculate score end here
						
						
						correctImage=new Image();
						correctImage.src="game-images/right.png";
						correctImage.name="correctImage";
						correctImage.onload=setBtn;
					}
				
			}else if(u.keyCode=='39'){
					totalQuestion++;
					if(previousShape==currentShape){
						if(isMute){	
						 SoundJS.play('right');
						}
						 if(setTutorial==true){ 	tutorialCorrect++;	 }else{
						 
						
						// for correct answers
						//calculate score start here
								totalCorrectAnswer++; // for getting correct attempts
								totalScore+= currentLevel*100;
								
								$("#score").html(totalScore);
							
								$('#bPoints span:eq('+(currentCorrect-1)+')').addClass('active');
								currentCorrect++;
								
								if(currentCorrect==5){
									
									currentLevel++;
									currentCorrect=1;
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
								}
								if(currentLevel==9&&currentCorrect==5&&wrongAnswer<0){
									//console.log(currentLevel+"=="+currentCorrect);
									currentLevel--;
									currectCorrect=1;
									$('#bPoints span:eq('+(currentCorrect-1)+')').addClass('active');
									
								}
								
					        }
						
						// calculate score end here

						correctImage=new Image();
						correctImage.src="game-images/right.png";
						correctImage.name="correctImage";
						correctImage.onload=setBtn;

					}else{
						if(isMute){	
							SoundJS.play('wrong');
						}
						// calculating values
						// end here
						wrongAnswer++ // for getting wrong answers
						console.log("check 2"+setTutorial);
						if(setTutorial==true){
							if(tutorialCorrect>5)
							guideLineTop.text="This card is not the same as the previous one";
							
							backBitmap.scaleX=1;
							backBitmap.x=235;
							backBitmap.regX=90;
							createjs.Ticker.addEventListener("tick",stage);
			 
							createjs.Tween.get(backBitmap).to({scaleX:0},1000,createjs.Ease.linear).call(getPrevious);
						}else{
							
							wrongImage=new Image();
							wrongImage.src="game-images/wrong.png";
							wrongImage.name="wrongImage";
							wrongImage.onload=setBtn;
							
						}
					}
			}
		}
	
}
	
// for getting previous Image
function getPrevious(){	
	//console.log("14");
	
	previousImage=new Image();
	previousImage.src="game-images/"+imageNumber[previousShape];
	previousImage.name="previousImage";
	previousImage.onload=setBtn; // for previewing previous Image
	
	wrongImage=new Image();
	wrongImage.src="game-images/wrong.png";
	wrongImage.name="wrongImage";
	wrongImage.onload=setBtn;
	
	//keyPress=false;
}
	
	
function stopAnimation(){	
	//console.log("13");
	
	createjs.Tween.get(resultBitmap).to({alpha:1},100).to({alpha:0},100); // for cross flip animation
	if(setTutorial==true){
			guideLineTop.text="Does the left word match the right word's color?"
	}
//	createjs.Tween.get(resultBitmap).to({alpha:1},100).wait(500).to({alpha:0},100);
	//gameContainer.removeChild(resultBitmap);
	stage.update();
	keyPress=true;
}


function welcomeText(){
	
		console.log("last");
		welcomeHeading  = new createjs.Text("Speed","45px poppinRegular", "#fff");
		welcomeHeading.x=stageWidth/2;
		welcomeHeading.y=stageHeight/2-115;
		welcomeHeading.textAlign="center";
		
		
		welcomeDescription = new createjs.Text("Train your information processing by determining whether the symbols match.","18px poppinRegular","#fff");
		welcomeDescription.x=stageWidth/2;
		welcomeDescription.lineHeight=32;
		welcomeDescription.lineWidth=stageWidth/2+140;
		welcomeDescription.y=stageHeight/2-20;
		welcomeDescription.textAlign="center";
		
		container.addChild(welcomeHeading,welcomeDescription);
		stage.update();
	
}

// for placing start button 
function setBtn(e){
	//console.log("12");
	if(e.target.name=="welcomeBackground"){
		
				console.log("1");
				var welcomeBackgroundBitmap=new createjs.Bitmap(welcomeBackground);
			//	welcomeBackgroundBitmap.x=0;
			//	welcomeBackgroundBitmap.y=0;
				container.addChild(welcomeBackgroundBitmap);
				
				stage.update();
	
    }else if(e.target.name=="playbutton"){
				
				console.log("2");
				
				var startbtn=new createjs.Bitmap(playButton);
				startbtn.x = stageWidth/2-70;
				startbtn.y = stageHeight/2+90;
				startbtn.cursor = "pointer";
				container.addChild(startbtn);
				
				welcomeText();
				
				stage.update();
				startbtn.addEventListener("click",startContainer);
	}else if(e.target.name=="triangle" ||e.target.name=="plus"||e.target.name=="square"||e.target.name=="star"||e.target.name=="circle"){
			
			if(e.target.name=="triangle"){
				
				rightBitmap=new createjs.Bitmap(triangleImage);
				rightBitmap.name=6;
				
		     }else if(e.target.name=="plus"){
				 
				rightBitmap=new createjs.Bitmap(ytriangleImage);
				rightBitmap.name=7;
				 
			 }else if(e.target.name=="square"){
				
				rightBitmap=new createjs.Bitmap(shapeImage);
				rightBitmap.name=8;
				 
			 }else if(e.target.name=="star"){
				 
				rightBitmap=new createjs.Bitmap(flowerImage);
				rightBitmap.name=9;

			 }else if(e.target.name=="circle"){
				 
				rightBitmap=new createjs.Bitmap(circleImage);
				rightBitmap.name=10;
			 }
			 currentShape=rightBitmap.name;

        	 rightBitmap.x=390;
			 rightBitmap.y=stageHeight/3;
			 
			 gameContainer.addChild(rightBitmap);
			 
			 stage.update();
			
		}else if(e.target.name=="Blank"){

			leftBitmap=new createjs.Bitmap(blankImage);
			leftBitmap.x=145;
			leftBitmap.y=stageHeight/3;

			gameContainer.addChild(leftBitmap);
			stage.update();
			
		}else if(e.target.name=="dotted"){
				
				backBitmap=new createjs.Bitmap(bottedImage);
				backBitmap.x=390;
				
			//	backBitmap.regX=92;
				backBitmap.y=stageHeight/3;
			//	backBitmap.y=375;
				backBitmap.scaleX=0;
				gameContainer.addChild(backBitmap);
				
				createjs.Ticker.addEventListener("tick",stage);
			//	createjs.Tween.get(backBitmap).to({scaleX:1,x:243},500,createjs.Ease.linear);
				createjs.Tween.get(backBitmap).to({scaleX:-1},300,createjs.Ease.linear);
			//	alert("here i am");
				
		}else if(e.target.name=="previousImage"){
				previousBitmap=new createjs.Bitmap(previousImage);
				previousBitmap.x=295;
				previousBitmap.regX=92;
				previousBitmap.y=stageHeight/3;
				previousBitmap.scaleX=0;
				gameContainer.addChild(previousBitmap);
				stage.update();
				createjs.Ticker.addEventListener("tick",stage);
				//keyPress=false;
			//	createjs.Tween.get(resultBitmap).to({alpha:1},100).wait(500).to({alpha:0},100);
			
		    //   createjs.Tween.get(previousBitmap).to({scaleX:-1},500,createjs.Ease.linear).wait(500).to({scaleX:0},500,createjs.Ease.linear);
			    createjs.Ticker.setFPS(60);
		        createjs.Tween.get(previousBitmap).to({scaleX:-1},100,createjs.Ease.linear).wait(500).to({scaleX:0},100,createjs.Ease.linear).call(stopAnimation);
				
				
			   //createjs.Tween.get(previousBitmap).to({scaleX:-1},500,createjs.Ease.linear).wait(500).to({scaleX:0},500,createjs.Ease.linear).call(stopAnimation);
			
	            //keyPress=true;
				
			}else if(e.target.name=="wrongImage"){

				resultBitmap=new createjs.Bitmap(wrongImage);
				resultBitmap.x=stageWidth/2-40;
				resultBitmap.y=stageHeight/2+10;
			//	resultBitmap.alpha=0;
				gameContainer.addChild(resultBitmap);
				
				stage.update();
				
				
				
				if(setTutorial==false)
					setTimeout(showCorrectImage, 500);
				
				
				
				//keyPress=true;
			
			}else if(e.target.name=="correctImage"){
			
				resultBitmap=new createjs.Bitmap(correctImage);
				resultBitmap.x=stageWidth/2-56;
				resultBitmap.y=stageHeight/2+10;

				gameContainer.addChild(resultBitmap);
				stage.update();
				
				setTimeout(showCorrectImage, 500)	
				//createjs.Tween.get(resultBitmap).wait(500);				

			}else if(e.target.name=="skipButton"){
				
				
				
				skipBitmap=new createjs.Bitmap(skipButton);
				skipBitmap.x=10;
				skipBitmap.y=10;
				skipBitmap.cursor="pointer";
				skipContainer.addChild(skipBitmap);
				stage.update();
				skipBitmap.addEventListener("click",onSkipClick);
				
			}else if(e.target.name=="playKeyboard"){
				
				
				
				keyboardBitmap=new createjs.Bitmap(playKeyboard);
				keyboardBitmap.x=120;
				keyboardBitmap.y=0;
				keyboardContainer.addChild(keyboardBitmap);
				stage.update();
					
			}else if(e.target.name=="guideKey"){
				
				arrowBitmap= new createjs.Bitmap(guideKey);
				arrowBitmap.x=stageWidth/2-50;
				arrowBitmap.y=450;
				guidecontainer.addChild(arrowBitmap);
				stage.update();
				
			}
}

function showCorrectImage(){
			//	console.log("11");
				imageRotateNW();
			    gameContainer.removeChild(resultBitmap);
				
			//	keyPress=true;
}

// rotating new image of right side to left side
function imageRotateNW(){	
		//console.log("10");
	//	counterRef=setInterval(countDown, 1000);
	//	$("#btnPlay").removeClass("in");
		
		previousShape=rightBitmap.name;
		createjs.Ticker.addEventListener("tick",stage);
		createjs.Ticker.setFPS(60);
	//	createjs.Tween.get(rightBitmap).to({scaleX:0,x:332},500,createjs.Ease.linear).call(flipRightBitmap);
		createjs.Tween.get(rightBitmap).to({scaleX:0},300,createjs.Ease.linear).call(flipRightBitmap);
}
function gameComplete(){
	//console.log("9");
	timeFlag=false;
	keyPress=false;
	
	
	$('.game-board').hide('slow');
	$('.all-record').show("slow");
	
	
	
	//$('#scoreInfo').html(''+totalScore+'');
	
	$('#scoreInfo').html(totalScore);
	
	percentage=(totalCorrectAnswer/totalQuestion)*100
	if(isNaN(percentage)){
		percentage=0;	
	}
	$('#game-precision').html(''+parseFloat(percentage).toFixed(2)+'%');
	
	$('#game-question').html(''+totalCorrectAnswer+' of '+totalQuestion);
	
	$('.c100').addClass("p"+Math.round(percentage));
	
	$("#game-percentage").html(Math.round(percentage));
	
	/*$("#u-score").html(totalScore);
	$("#CorrectAnswer").html(totalCorrectAnswer+ " of " + totalQuestion);
	percentage=(totalCorrectAnswer/totalQuestion)*100
	if(isNaN(percentage)){
		percentage=0;	
	}
	$("#precision").html(""+parseFloat(percentage).toFixed(2)+" %");
	$(".knobC").val(parseFloat(percentage).toFixed(2)); */
	
}
function gamePaused(){
	//console.log("8");
	//clearInterval(counterRef);
	keyPress=false;
	timeFlag=false;
}
function gamePlay(){
	//console.log("7");
	if(counter==2){
		startContainer();
	}else{
		keyPress=true;
		timeFlag=true;
	}
	
	
}
// for help stage canvas

function helpClick(){
	
	//console.log("6");
//	document.getElementById("btnTutorial").disabled = true;

	$("#btnPlay").addClass("button-disabled");
	$("#btnTutorial").addClass("button-disabled");
	
	
	
	$('#gamePlatform').removeClass('game-pause');
	
	keyPress = false
	if(help==undefined)
	{
		// first remove all child element of container
		stage.removeAllChildren();
		stage.update();
	}
	
//	$(".game-board").css({"display":"none"});
	
	$(".game-log").css({"display":"none"});
	$("#divButtons").css({"display":"none"});
	
	skipContainer=new createjs.Container();
	stage.addChild(skipContainer);
	
	skipButton=new Image();
	skipButton.src="game-images/skip-btn.png";
	skipButton.name="skipButton";
	skipButton.onload=setBtn;
	
	
	keyboardContainer=new createjs.Container();
	
	stage.addChild(keyboardContainer);
	stage.update();
	
	
	playKeyboard=new Image();
	playKeyboard.src="game-images/keyboard.png";
	playKeyboard.name="playKeyboard";
	playKeyboard.onload=setBtn;
	
	var indicator = new createjs.Text("This game use the ARROWS KEYS form your keyboard ","21px poppinMd", "#fff")
	
	indicator.x=100;
	indicator.y=stageHeight/2+80;
	
	
	
	var clickIndicator = new createjs.Text("Press an ARROW KEY  to continue","21px poppinMd","#fff");
	clickIndicator.x=stageWidth/2;
	clickIndicator.textAlign="center";
	clickIndicator.y=stageHeight/2+170;
	clickIndicator.alpha=0;
	
	keyboardContainer.addChild(indicator,clickIndicator);
	/* for blink message */
	createjs.Ticker.addEventListener("tick",stage);
	createjs.Tween.get(clickIndicator, { loop: true }).wait(500)
        .to({ alpha: 1 }, 700)
        .to({ alpha: 0.2 }, 700);
	/* end here */
	
	
	document.onkeydown =startTutorial;
	setTutorial=true;
	

	$('#btnTutorial').disabled = true;
	
	
}
//REMAINDER

function startTutorial(u){
		//console.log("5");
		u = u || window.event;
	
		//tempcontainer=new createjs.Container();
		//stage.addChild(tempcontainer);
		//console.log(u.keyCode);
		//alert("here i am");
		
		if((u.keyCode == '37'||u.keyCode == '39'||u.keyCode == '40' ||u.keyCode=='38')&&(setTutorial==true)){
			$(".game-log").addClass("hide");
		//	setTutorial=false;
			stage.removeChild(keyboardContainer);
			stage.update();
			
			resetValues(false);
			
			guidecontainer=new createjs.Container();
			stage.addChild(guidecontainer);

			guideLineTop = new createjs.Text("Memorize the COLOR and the SHAPE on this card.","23px poppinMd", "#fff");
			guidecontainer.addChild(guideLineTop);
			
			guideLineBottom= new createjs.Text("","18px poppinMd","#fff");
			guidecontainer.addChild(guideLineBottom);
			
			
			
			
			
			
			guideLineTop.x=120;
			guideLineTop.y=100;
			
			guideLineBottom.x=stageWidth/2+180;
			guideLineBottom.y=stageHeight-55;
			guideLineBottom.textAlign="center";
			
			
			// for loading keyboard here
			
			// guideKey=new Image();
			// guideKey.src="assets/4arrows.png";
			// guideKey.name="guideKey";
			// guideKey.onload=setBtn;
			
			guidecontainer.addChild(counterShape1);
			
			// load keyboard 
			
			allBitmap =       new createjs.Bitmap("assets/all-button.png");
			allBitmap.x=stageWidth/2-50;
			allBitmap.y=stageHeight-90;
			allBitmap.alpha=1;
			
			leftBlinkBitmap = new createjs.Bitmap('assets/leftBlink.png');
			rightBlinkBitmap = new createjs.Bitmap('assets/rightBlink.png');
			
			leftBlinkBitmap.x=stageWidth/2-50;
			leftBlinkBitmap.y=stageHeight-90;
			leftBlinkBitmap.alpha=0;
			
			rightBlinkBitmap.x=stageWidth/2-50;
			rightBlinkBitmap.y=stageHeight-90;
			rightBlinkBitmap.alpha=0;
			
			guidecontainer.addChild(allBitmap,leftBlinkBitmap,rightBlinkBitmap);
			
			
			// end here
			
			stage.update();
			
			startContainer();
			
			setTutorial=true; // initialising flag for tutorial on
			
			setTimeout(firstimageRotate, 1000);
			
			
			
			
		}
	
}

function resetValues(ele){
	 
	// console.log("4");

	if(ele==false){
	
    	 counter=0;
		 setTutorial=true;
	//	 keyPress=false;
		
	}else{
		
         counter=2;
		 setTutorial=false;
	//	 keyPress=true;

	}
	 keyPress=false;
	 
	 currentShape=0;  // save current shape value
	 previousShape=0; // save previous shape value
	 image="";
	 timeFlag=false;
	 timeCountDown=20; //90
	 gameContainer="";
	 rightBitmap="";
	 leftBitmap="";
	 correctImage="";
	 backImage="";
	 backBitmap="";
	 bottedImage="";
	 previousBitmap="",wrongBitmap="",correctBitmap="";
	 triangleImage="",circleImage="",flowerImage="",shapeImage="",ytriangleImage="",blankImage="";
	 //counterRef;      // for set value
	// for score level
	 totalScore=0;      // total score
	 currentLevel=1;    // current level
	 currentCorrect=1;  // current level correct answers  like x3
	 totalCorrectAnswer=0;
	 totalQuestion=0;
	 wrongAnswer=0;
	 totalPercentage=0;
	
	
}

function congratulationMessage(){
	
	//console.log("3");
	
	 stage.removeAllChildren();
	 stage.update();
	 
	objBravo = new InstructionBox("This game balances accuracy and speed.\n\n Try to response as quickly as possible while avoiding mistakes \n\nThat's it.Let's play!",'#efefef',400);
	objBravo.x = 150;
	objBravo.y = stageHeight/2-100;
	
	stage.addChild(objBravo);
	
	var finish_indicator = new createjs.Text("Press an ARROW KEY  to continue","21px poppinMd","#fff");
	finish_indicator.x=stageWidth/2;
	finish_indicator.textAlign="center";
	finish_indicator.y=stageHeight/2+170;
	finish_indicator.alpha=0;
	
	stage.addChild(finish_indicator);
	/* for blink message */
	createjs.Ticker.addEventListener("tick",stage);
	createjs.Tween.get(finish_indicator, { loop: true }).wait(500)
        .to({ alpha: 1 }, 700)
        .to({ alpha: 0.2 }, 700);
	
	
	
	
	document.onkeydown=pressKeyRestart;

	
	
}

// after tutorial finish, restart game
function pressKeyRestart(u){
	
	//console.log("2");
	u = u || window.event;
	if((u.keyCode == '37'||u.keyCode == '39'||u.keyCode == '40' ||u.keyCode=='38')&&(setTutorial==true)){
	
	createjs.Ticker.removeEventListener("tick",stage);
		//createjs.Ticker.removeAllEventListeners();
		stage.removeAllChildren();
		stage.update();
		setTutorial=false;
		
		$("#lblBonus").html("X1");
		$("#gameTime").html("00:00");
		$("#bPoints span").removeClass("active");
		$("#score").html("0000");
		
		resetValues(true);
		
		
		startContainer();
		
		$(".game-log").css({"display":"block"});
		document.getElementById("btnTutorial").disabled = false;
	}
}




// reset value before skip tutorial
function onSkipClick(e)
{
	 //console.log("1");	
     createjs.Ticker.removeEventListener("tick",stage);
	//createjs.Ticker.removeAllEventListeners();
	stage.removeAllChildren();
	stage.update();
	setTutorial=false;
	
	$("#lblBonus").html("X1");
	$("#gameTime").html("00:00");
	$("#bPoints span").removeClass("active");
	$("#score").html("0000");
	
	
	
	resetValues(true);
	clearInterval(counterRef);
	
	startContainer();
	
	$(".game-board").css({"display":"block"});
	$(".game-log").css({"display":"block"});
	
	document.getElementById("btnTutorial").disabled = false;
	
}