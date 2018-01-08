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
	var pressKeyArrow=false; // for tutorial press any key variable
	var keyBoardHandlervariable=false; // for restart game helper variable
	var skipgamevariable=false;
	var counter=2;
	var radomNumber=[1,2,3,4,5,6,7,8,9,10]; // for image selection
	var helpRandomNumber=[1,7,8,5,6,6,4];
	var imageNumber={1:"plus-black.png",2:"circle-yellow.png",3:"star-black.png",4:"triangle-yellow.png",5:"square-yellow.png",6:"triangle-blue.png",7:"plus-yellow.png",8:"square-green.png",9:"star-red.png",10:"circle-purple.png"};
	
	//var imageNumber={6:"triangle.png",7:"plus.png",8:"square.png",9:"star.png",10:"circle.png"};
	
	var currentShape=0;  // save current shape value
	var previousShape=0; // save previous shape value
	var image;
	var timeCountDown=90; //90
	var gameContainer;
	var rightBitmap;
	var leftBitmap;
	var correctImage;
	
	var backImage;
	var backBitmap;
	var bottedImage;
	var previousBitmap,wrongBitmap,correctBitmap;
	var plusblackImage,circleyellowImage,starblackImage,triangleyellowImage,squareyellowImage,triangleblueImage,plusyellowImage,squaregreenImage,starredImage,circlepurpleImage;
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
    var tutorialAnswer=0;	
	var arrowBitmap,guidekey;
	var counterShape1;
	var trynow;
	var objBravo;
	var isMute=true;
	
	var createdTime=0,clickedTime=0,reactionTime=0;
	var totalPressed=0;


function init1(){
	
		canvas = document.getElementById('gameFrame');
		
	
		stage = new createjs.Stage(canvas);
		
		createjs.Touch.enable(stage);
		
		stage.mouseEventsEnabled = true;
		stage.enableMouseOver();
		
		stageHeight = stage.canvas.height;
		stageWidth  = stage.canvas.width;
		
		container=new createjs.Container();
		stage.addChild(container);
		
		playButton=new Image();
		playButton.src="game-images/play-game.png";
		playButton.name="playbutton";
		playButton.onload=setBtn;
		
		/* setting stage */
		// Background Image
	//	var welcomeBackgroundBitmap= new createjs.Bitmap("game-images/start-bg-sm.jpg"); // for background images
	
	/*	var startbtn=new createjs.Bitmap("game-images/play-game.png"); // for play images
		
		startbtn.x = stageWidth/2-70;
		startbtn.y = stageHeight/2+90;
		startbtn.cursor = "pointer";
		
	//	container.addChild(welcomeBackgroundBitmap,startbtn);
	    container.addChild(startbtn);
		startbtn.addEventListener("click",startContainer);
		stage.update(); */
		welcomeText();
		
		/* end here */
	
    	//registerSounds();

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
		
		$("#gameFrame").removeClass("canvas-background");
		$("#btnPlay").removeClass("button-disabled");
		
		stage.removeChild(container);
		stage.update();
		
		$(".game-log").removeClass("hide");
		keyPress=true;
		
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
			cTimerText.y=stageHeight/2+15;
			
			cTimerText.textAlign="center";
			
			counterContainer.addChild(cTimerText);
			stage.update();
			
			setTimeout(startCounter, 1000);
			
		}
		

}

// for starting count down precess
function startCounter(){
		
	if(keyPress==true){	
	
		if(counter==0){
			
			stage.removeChild(counterContainer);
			counter--;
			$("#divButtons").css({"display":"block"});
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
}

// for first image rotate right to left
function firstimageRotate(){
		
		
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
		// removing flapped element
		
		//alert("start here");
		
		
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
			
		//	guideLineTop.text = "Does the left word match the right word's color?";
			guideLineTop.text = "Does the card DISPLAYED match the one displayed JUST BEFORE?";
			guideLineTop.lineWidth  = 450;
			guideLineTop.lineHeight  = 30;
			guideLineTop.textAlign = "center"; 
			guideLineTop.x=stageWidth/2;
			
			if(tutorialCorrect<=5){
				
				if(currentShape==previousShape){
					
					$(".text-blink").each(function(){
						if($(this).data("ref")=="right"){
							$(this).html("Press the RIGHT ARROW key");
						}else{
							$(this).html("");
						}
					});
					$(".tutorial-indicator").each(function(){
						if($(this).data("ref")=="right"){
							$(this).addClass("active");
						}else{
							$(this).removeClass("active");
						}
					});
					
					/*guideLineBottom.text="Press the RIGHT ARROW KEY";
					guideLineBottom.x=stageWidth/2+180;
					allBitmap.alpha=0;
					rightBlinkBitmap.alpha=1;
					leftBlinkBitmap.alpha=0; */
					
					
				}else{
					
					var previousDetail =  previousShape.split("-");
					var currentDetail  =  currentShape.split("-");

					var found = false;
					for (var i = 0; i < previousDetail.length; i++) {
						if (currentDetail.indexOf(previousDetail[i]) > -1) {
							found = true;
							break;
						}
					}
					
					if(found==false){
						$(".text-blink").each(function(){
							if($(this).data("ref")=="left"){
								$(this).html("Press the LEFT ARROW key");
							}else{
								$(this).html("");
							}
						});
						$(".tutorial-indicator").each(function(){
							if($(this).data("ref")=="left"){
								$(this).addClass("active");
							}else{
								$(this).removeClass("active");
							}
						});
					}else{
						$(".text-blink").each(function(){
							
							if($(this).data("ref")=="bottom"){
								$(this).html("Press the BOTTOM ARROW key");
							}else{
								$(this).html("");
							}
							
						});
						$(".tutorial-indicator").each(function(){
							
							if($(this).data("ref")=="bottom"){
								$(this).addClass("active");
							}else{
								$(this).removeClass("active");
							}
						});
					}
					/*
						guideLineBottom.text="Press the LEFT ARROW KEY";
						guideLineBottom.x=stageWidth/2-180;
						allBitmap.alpha=0;
						rightBlinkBitmap.alpha=0;
						leftBlinkBitmap.alpha=1;
					*/
				}
				
				createjs.Ticker.addEventListener("tick",stage);
				createjs.Tween.get(guideLineBottom, { loop: true }).wait(500)
					.to({ alpha: 1 }, 700)
					.to({ alpha: 0.2 }, 700);
			
				
			}else if(tutorialAnswer==8){ // CHANGE IT TO 12 AFTER COMPLETE IT
					$("#help-bottom-indicator").addClass("hide");
					congratulationMessage();
			}else{
					$(".tutorial-indicator").each(function(){
						$(this).addClass("active");
					});
					$(".text-blink").each(function(){
						$(this).html("");
					});
				  /*
					
					guideLineBottom.text="";
					allBitmap.alpha=1;
					rightBlinkBitmap.alpha=0;
					leftBlinkBitmap.alpha=0;
				   
				   */
					
					/*trynow  = new createjs.Text("Try Now","20px poppinMd", "#fff");
					trynow.x=stageWidth/2-50;
					trynow.y=stageHeight-125;
					guidecontainer.addChild(trynow); */
					stage.update();
			}
			
		}
}




function setEnvironment(){
		// if it start first
		
	
		if(previousShape==0){
			blankImage=new Image();
			blankImage.src="game-images/blank-card.png";
			blankImage.name="Blank";
			blankImage.onload=setBtn;
		}
		
		//createdTime,clickedTime,reactionTime;
		if(createdTime!=0&&clickedTime!=0){
			reactionTime+=(clickedTime-createdTime)/1000;
		}
		
		if(setTutorial==true){
			// for static tutorial
			if(tutorialCorrect<=6){
				currentShape = helpRandomNumber[tutorialCorrect]; //for tutorial
			}else{
				currentShape=helpRandomNumber[Math.floor(Math.random() * helpRandomNumber.length)]; //
			}
		}else{
			currentShape=radomNumber[Math.floor(Math.random() * radomNumber.length)];
		}
		
		// setting up right image
		if(currentShape==1){
			
			
			plusblackImage=new Image();
			plusblackImage.src="game-images/plus-black.png";
			plusblackImage.name="plus-black";
			currentShape="plus-black";
			plusblackImage.onload=setBtn;
		
		}else if(currentShape==2){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/circle-yellow.png");
			rightBitmap.name="circle-yellow"; */
			
			circleyellowImage=new Image();
			circleyellowImage.src="game-images/circle-yellow.png";
			circleyellowImage.name="circle-yellow";
			currentShape="circle-yellow";
			circleyellowImage.onload=setBtn;
		
		
		}else if(currentShape==3){
		
		/*	rightBitmap= new createjs.Bitmap("game-images/star-black.png");
			rightBitmap.name="star-black";	 */

			starblackImage=new Image();
			starblackImage.src="game-images/star-black.png";
			starblackImage.name="star-black";
			currentShape="star-black";
			starblackImage.onload=setBtn;	
		
		
		}else if(currentShape==4){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/triangle-yellow.png");
			rightBitmap.name="triangle-yellow";		*/
			
			triangleyellowImage=new Image();
			triangleyellowImage.src="game-images/triangle-yellow.png";
			triangleyellowImage.name="triangle-yellow";
			currentShape="triangle-yellow";
			triangleyellowImage.onload=setBtn;	

			
		}else if(currentShape==5){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/square-yellow.png");
			rightBitmap.name="square-yellow";	 */
			
			squareyellowImage=new Image();
			squareyellowImage.src="game-images/square-yellow.png";
			squareyellowImage.name="square-yellow";
			currentShape="square-yellow";
			
			squareyellowImage.onload=setBtn;	
				
		}else if(currentShape==6){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/triangle-blue.png");
			rightBitmap.name="triangle-blue";	*/		
			
			triangleblueImage=new Image();
			triangleblueImage.src="game-images/triangle-blue.png";
			triangleblueImage.name="triangle-blue";
			currentShape="triangle-blue";
			
			triangleblueImage.onload=setBtn;
		
		}else if(currentShape==7){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/plus-yellow.png");
			rightBitmap.name="plus-yellow";		*/	
		
			plusyellowImage=new Image();
			plusyellowImage.src="game-images/plus-yellow.png";
			plusyellowImage.name="plus-yellow";
			
			currentShape="plus-yellow";
			plusyellowImage.onload=setBtn;
			
		}else if(currentShape==8){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/square-green.png");
			rightBitmap.name="square-green";	 */		
			
			squaregreenImage=new Image();
			squaregreenImage.src="game-images/square-green.png";
			squaregreenImage.name="square-green";
			
			currentShape="square-green";
			squaregreenImage.onload=setBtn;
		
		}else if(currentShape==9){
			
			
		/*	rightBitmap= new createjs.Bitmap("game-images/star-red.png");
			rightBitmap.name="star-red";	*/
			
			starredImage=new Image();
			starredImage.src="game-images/star-red.png";
			starredImage.name="star-red";
			
			currentShape="star-red";
			
			starredImage.onload=setBtn;
			
			
		
		}else if(currentShape==10){
			
		/*	rightBitmap= new createjs.Bitmap("game-images/circle-purple.png");
			rightBitmap.name="circle-purple";	*/		
			
			circlepurpleImage=new Image();
			circlepurpleImage.src="game-images/circle-purple.png";
			circlepurpleImage.name="circle-purple";
			
			currentShape="circle-purple";
			
			circlepurpleImage.onload=setBtn;
			
			
		}
		if(previousShape!=0){
			document.onkeydown = keyBoardHandler;
			keyBoardHandlervariable=true;	
			
		}

		
}


function keyBoardHandler(u){
	
	if(previousShape!=0){
		u = u || window.event;
		tempcontainer=new createjs.Container();
		stage.addChild(tempcontainer);
		
		if((u.keyCode == '37'||u.keyCode == '39'||u.keyCode=='40')&&(keyPress==true && keyBoardHandlervariable==true && timeCountDown >0)){
			totalPressed++;
			keyPress=false; // set false value to keyboard handler
			
			if(u.keyCode=='37'){
					totalQuestion++; // for getting total attempts
					if(previousShape==currentShape){
						
						// sound check mute or not
						if(isMute){
							SoundJS.play('wrong');
						}
						// calculate score start here
						if(currentLevel==10){
							wrongAnswer++;  // for getting total wrong answers
							currentLevel=9;
							currentCorrect=1;
							$("#lblBonus").html("X"+currentLevel);
							$("#bPoints span").removeClass("active");
						}else{
							wrongAnswer=0;
						}
						
						// calculate end here
						if(setTutorial==true){ // if user is on tutorial section, then only image flip
							if(tutorialCorrect>5){
								tutorialAnswer=0;
								guideLineTop.text="This card is the same as the previous one";
								
							}
							backBitmap.scaleX=1;
							backBitmap.x=235;
							backBitmap.regX=90;
							createjs.Ticker.addEventListener("tick",stage);
							createjs.Tween.get(backBitmap).to({scaleX:0},500,createjs.Ease.linear).call(getPrevious);
						}else{
								wrongImage=new Image();
								wrongImage.src="game-images/wrong.png";
								wrongImage.name="wrongImage";
								wrongImage.onload=setBtn;
						}
						
					}else{
						
						var previousDetail =  previousShape.split("-");
						var currentDetail  =  currentShape.split("-");
						var found = true;
						for (var i = 0; i < previousDetail.length; i++) {
							if (currentDetail.indexOf(previousDetail[i]) > -1) {
								found = false;
								break;
							}
						}
					
					if(found==true){
						
						
						if(isMute){	
						 SoundJS.play('right');
						}
						if(setTutorial==true){
							
							if(tutorialCorrect>5){
								tutorialAnswer++;
							}	
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
									
									if(currentLevel==10 && wrongAnswer>0){
										currentLevel=9;
										currentCorrect=1;
										wrongAnswer=0;
									}else if(currentLevel==10 && wrongAnswer==0){
										currentLevel=10;
										currentCorrect=1;
									
								    }else{ 
										currentLevel++;
										currentCorrect=1;
									}
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
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
							if(currentLevel==10){
									wrongAnswer++;  // for getting total wrong answers
									currentLevel=9;
									currentCorrect=1;
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
							}else{
									wrongAnswer=0;
							}
							if(setTutorial==true){
									if(tutorialCorrect>5){
									guideLineTop.text="When only the color OR the shape match,press the down arrow key.";
									tutorialAnswer=0;
									}
									backBitmap.scaleX=1;
									backBitmap.x=235;
									backBitmap.regX=90;
									createjs.Ticker.addEventListener("tick",stage);
					 
									createjs.Tween.get(backBitmap).to({scaleX:0},500,createjs.Ease.linear).call(getPrevious);
							}else{
									
									wrongImage=new Image();
									wrongImage.src="game-images/wrong.png";
									wrongImage.name="wrongImage";
									wrongImage.onload=setBtn;
									
							}
						
						
					}
						
						
						
						
						
						
					}

			}else if(u.keyCode=='39'){
					totalQuestion++;
					if(previousShape==currentShape){
						if(isMute){	
						 SoundJS.play('right');
						}

						if(setTutorial==true){
							
							if(tutorialCorrect>5){
								tutorialAnswer++;
							}
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
									
									if(currentLevel==10 && wrongAnswer>0){
										currentLevel=9;
										currentCorrect=1;
										wrongAnswer=0;
									}else if(currentLevel==10 && wrongAnswer==0){
										currentLevel=10;
										currentCorrect=1;
									
								    }else{ 
										currentLevel++;
										currentCorrect=1;
									}
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
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
						if(currentLevel==10){
							wrongAnswer++;  // for getting total wrong answers
							currentLevel=9;
							currentCorrect=1;
							$("#lblBonus").html("X"+currentLevel);
							$("#bPoints span").removeClass("active");
						}else{
							wrongAnswer=0;
						}
						if(setTutorial==true){
							if(tutorialCorrect>5){
								guideLineTop.text="This card is not the same as the previous one";
								tutorialAnswer=0;

							}
							backBitmap.scaleX=1;
							backBitmap.x=235;
							backBitmap.regX=90;
							createjs.Ticker.addEventListener("tick",stage);
			 
							createjs.Tween.get(backBitmap).to({scaleX:0},500,createjs.Ease.linear).call(getPrevious);
						}else{
							
							wrongImage=new Image();
							wrongImage.src="game-images/wrong.png";
							wrongImage.name="wrongImage";
							wrongImage.onload=setBtn;
							
						}
					}

			}else if(u.keyCode=='40'){
				
				totalQuestion++;
				// if only previous shape and current shape doen't match
				if(previousShape!=currentShape){
					
					var previousDetail =  previousShape.split("-");
					var currentDetail  =  currentShape.split("-");

					var found = false;
					for (var i = 0; i < previousDetail.length; i++) {
						if (currentDetail.indexOf(previousDetail[i]) > -1) {
							found = true;
							break;
						}
					}
					
					if(found==true){
						
						
						if(isMute){	
						 SoundJS.play('right');
						}
						 if(setTutorial==true){

							if(tutorialCorrect>5){
								tutorialAnswer++;
							}
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
									
									if(currentLevel==10 && wrongAnswer>0){
										currentLevel=9;
										currentCorrect=1;
										wrongAnswer=0;
									}else if(currentLevel==10 && wrongAnswer==0){
										currentLevel=10;
										currentCorrect=1;
									
								    }else{ 
										currentLevel++;
										currentCorrect=1;
									}
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
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
							if(currentLevel==10){
									wrongAnswer++;  // for getting total wrong answers
									currentLevel=9;
									currentCorrect=1;
									$("#lblBonus").html("X"+currentLevel);
									$("#bPoints span").removeClass("active");
							}else{
									wrongAnswer=0;
							}
							if(setTutorial==true){
									
									tutorialAnswer=0;
									if(tutorialCorrect>5)
									guideLineTop.text="When only the color OR the shape match,press the down arrow key.";
									
									backBitmap.scaleX=1;
									backBitmap.x=235;
									backBitmap.regX=90;
									createjs.Ticker.addEventListener("tick",stage);
					 
									createjs.Tween.get(backBitmap).to({scaleX:0},500,createjs.Ease.linear).call(getPrevious);
							}else{
									
									wrongImage=new Image();
									wrongImage.src="game-images/wrong.png";
									wrongImage.name="wrongImage";
									wrongImage.onload=setBtn;
									
							}
						
						
					}
				}else {
					// show wrong answer to them
					if(isMute){	
							SoundJS.play('wrong');
					}
					if(currentLevel==10){
							wrongAnswer++;  // for getting total wrong answers
							currentLevel=9;
							currentCorrect=1;
							$("#lblBonus").html("X"+currentLevel);
							$("#bPoints span").removeClass("active");
					}else{
							wrongAnswer=0;
					}
					if(setTutorial==true){
							tutorialAnswer=0;
							if(tutorialCorrect>5)
							guideLineTop.text="When only the color OR the shape match,press the down arrow key.";
							
							backBitmap.scaleX=1;
							backBitmap.x=235;
							backBitmap.regX=90;
							createjs.Ticker.addEventListener("tick",stage);
			 
							createjs.Tween.get(backBitmap).to({scaleX:0},500,createjs.Ease.linear).call(getPrevious);
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
}
	
// for getting previous Image
function getPrevious(){	
	
	previousImage=new Image();
	
	previousImage.src="game-images/"+previousShape+".png";
	previousImage.name="previousImage";
	previousImage.onload=setBtn; // for previewing previous Image
	
	wrongImage=new Image();
	wrongImage.src="game-images/wrong.png";
	wrongImage.name="wrongImage";
	wrongImage.onload=setBtn;
	
	//keyPress=false;
}
	
	
function stopAnimation(){	
	
	createjs.Tween.get(resultBitmap).to({alpha:1},100).to({alpha:0},100); // for cross flip animation
	backBitmap.x=227;
	backBitmap.scaleX=1;
	if(setTutorial==true){
			guideLineTop.text="Does the card DISPLAYED match the one displayed JUST BEFORE?"
	}
//	createjs.Tween.get(resultBitmap).to({alpha:1},100).wait(500).to({alpha:0},100);
	//gameContainer.removeChild(resultBitmap);
	stage.update();
	keyPress=true;
}


function welcomeText(){
	
		welcomeHeading  = new createjs.Text("Ultra Speed","45px poppinRegular", "#fff");
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
		
		registerSounds()
	
}

// for placing start button 
function setBtn(e){
		//{1:"plus-black.png",2:"circle-yellow.png",3:"star-black.png",4:"triangle-yellow.png",5:"square-yellow.png",6:"triangle-blue.png",7:"plus-yellow.png",8:"square-green.png",9:"star-red.png",10:"circle-purple.png"};
		if(e.target.name=="plus-black" || e.target.name=="circle-yellow" || e.target.name=="star-black"|| e.target.name=="triangle-yellow" || e.target.name=="square-yellow"|| e.target.name=="triangle-blue"||e.target.name=="plus-yellow"||e.target.name=="square-green"||e.target.name=="star-red"||e.target.name=="circle-purple"){
			
				if(e.target.name=="plus-black"){
					rightBitmap= new createjs.Bitmap(plusblackImage);
					rightBitmap.name="plus-black";
				}else if(e.target.name=="circle-yellow"){
					rightBitmap= new createjs.Bitmap(circleyellowImage);
					rightBitmap.name="circle-yellow";
				}else if(e.target.name=="star-black"){
					rightBitmap= new createjs.Bitmap(starblackImage);
					rightBitmap.name="star-black";			
				}else if(e.target.name=="triangle-yellow"){
					rightBitmap= new createjs.Bitmap(triangleyellowImage);
					rightBitmap.name="triangle-yellow";			
				}else if(e.target.name=="square-yellow"){
					rightBitmap= new createjs.Bitmap(squareyellowImage);
					rightBitmap.name="square-yellow";			
				}else if(e.target.name=="triangle-blue"){
					rightBitmap= new createjs.Bitmap(triangleblueImage);
					rightBitmap.name="triangle-blue";			
				}else if(e.target.name=="plus-yellow"){
					rightBitmap= new createjs.Bitmap(plusyellowImage);
					rightBitmap.name="plus-yellow";			
				}else if(e.target.name=="square-green"){
					rightBitmap= new createjs.Bitmap(squaregreenImage);
					rightBitmap.name="square-green";			
				}else if(e.target.name=="star-red"){
					rightBitmap= new createjs.Bitmap(starredImage);
					rightBitmap.name="star-red";			
				}else if(e.target.name=="circle-purple"){
					rightBitmap= new createjs.Bitmap(circlepurpleImage);
					rightBitmap.name="circle-purple";			
				}
				
		
				currentShape=rightBitmap.name;
				rightBitmap.x=390;
				rightBitmap.y=stageHeight/3;
				gameContainer.addChild(rightBitmap);
				stage.update();
			
			
			
		
		}else if(e.target.name=="playbutton"){

				var startbtn=new createjs.Bitmap(playButton);
				startbtn.x = stageWidth/2-70;
				startbtn.y = stageHeight/2+90;
				startbtn.cursor = "pointer";
				container.addChild(startbtn);
				
				welcomeText();
				
				stage.update();
				startbtn.addEventListener("click",startContainer);
	
		}else if(e.target.name=="Blank"){

			leftBitmap=new createjs.Bitmap(blankImage);
			leftBitmap.x=145;
			leftBitmap.y=stageHeight/3;

			gameContainer.addChild(leftBitmap);
			stage.update();
			
		}else if(e.target.name=="dotted"){
				
				backBitmap=new createjs.Bitmap(bottedImage);
				backBitmap.x=390;
				
				backBitmap.y=stageHeight/3;
				backBitmap.scaleX=0;
				gameContainer.addChild(backBitmap);
				
				createjs.Ticker.addEventListener("tick",stage);
				createjs.Tween.get(backBitmap).to({scaleX:-1},300,createjs.Ease.linear);
				
				createdTime=Date.now();
				
				
		}else if(e.target.name=="previousImage"){
				previousBitmap=new createjs.Bitmap(previousImage);
				previousBitmap.x=295;
				previousBitmap.regX=92;
				previousBitmap.y=stageHeight/3;
				previousBitmap.scaleX=0;
				gameContainer.addChild(previousBitmap);
				stage.update();
				createjs.Ticker.addEventListener("tick",stage);
				
			    createjs.Ticker.setFPS(60);
		        createjs.Tween.get(previousBitmap).to({scaleX:-1},100,createjs.Ease.linear).wait(500).to({scaleX:0},100,createjs.Ease.linear).call(stopAnimation);
				
				
		}else if(e.target.name=="wrongImage"){

				resultBitmap=new createjs.Bitmap(wrongImage);
				resultBitmap.x=stageWidth/2-40;
				resultBitmap.y=stageHeight/2+10;
				gameContainer.addChild(resultBitmap);
				
				stage.update();
				
				// user clicked Time
				clickedTime=Date.now();
				
				if(setTutorial==false)
					setTimeout(showCorrectImage, 500);
				
			
		}else if(e.target.name=="correctImage"){
			
				resultBitmap=new createjs.Bitmap(correctImage);
				resultBitmap.x=stageWidth/2-56;
				resultBitmap.y=stageHeight/2+10;

				gameContainer.addChild(resultBitmap);
				stage.update();
				
				// user clicked Time
				clickedTime=Date.now();
				
				setTimeout(showCorrectImage, 500)				

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
				keyboardBitmap.addEventListener("click",continueTutorial);
					
		}else if(e.target.name=="guideKey"){
				
				arrowBitmap= new createjs.Bitmap(guideKey);
				arrowBitmap.x=stageWidth/2-50;
				arrowBitmap.y=450;
				guidecontainer.addChild(arrowBitmap);
				stage.update();
				
		}
}

function showCorrectImage(){
				imageRotateNW();
			    gameContainer.removeChild(resultBitmap);
}

// rotating new image of right side to left side
function imageRotateNW(){	
		
		previousShape=rightBitmap.name;
		createjs.Ticker.addEventListener("tick",stage);
		createjs.Ticker.setFPS(60);
		createjs.Tween.get(rightBitmap).to({scaleX:0},300,createjs.Ease.linear).call(flipRightBitmap);
}
function gameComplete(){
	
	timeFlag=false;
	keyPress=false;
	$("#btnPlay").addClass("button-disabled");
	$("#btnTutorial").addClass("button-disabled");
	
	$('.game-board').hide('slow');
	$('.all-record').show("slow");
	
	
	$('#scoreInfo').html(totalScore);
	$('#userScore_board').html(totalScore);
	
	
	
	percentage=(totalCorrectAnswer/totalQuestion)*100
	if(isNaN(percentage)){
		percentage=0;	
	}
	$('#game-precision').html(''+parseFloat(percentage).toFixed(2)+'%');
	
	$('#game-question').html(''+totalCorrectAnswer+' of '+totalQuestion);
	
	$('.c100').addClass("p"+Math.round(percentage));
	
	$("#game-percentage").html(Math.round(percentage));
	
	var finalreactiontime=reactionTime/totalPressed;
	 if(isNaN(finalreactiontime)){
		finalreactiontime=0;
	 }
	 finalreactiontime =parseFloat(finalreactiontime).toFixed(2);
	 $("#game-timereaction").html(""+finalreactiontime+" s");
	
}
function gamePaused(){
	//clearInterval(counterRef);
	keyPress=false;
	timeFlag=false;
}
function gamePlay(){
	
	keyPress=true;
	timeFlag=true;
	if(counter>=0){
		startCounter();
	}
	keyPress=true;
	timeFlag=true;
}
// for help stage canvas

function helpClick(){

	$("#gameFrame").removeClass("canvas-background");
	$("#btnPlay").addClass("button-disabled");
	$("#btnTutorial").addClass("button-disabled");
	
	$('#gamePlatform').removeClass('game-pause');
	
	keyPress = false
	timeFlag =false;
	if(help==undefined)
	{
		// first remove all child element of container
		stage.removeAllChildren();
		stage.update();
	}
	stage.removeChild(gameContainer);
	stage.update();
	
	
	$(".game-log").css({"display":"none"});
	$("#divButtons").css({"display":"none"});
	
	skipContainer=new createjs.Container();
	stage.addChild(skipContainer);
	
	skipButton=new Image();
	skipButton.src="game-images/skip-btn.jpg";
	skipButton.name="skipButton";
	skipButton.onload=setBtn;
	
	
	keyboardContainer=new createjs.Container();
	
	stage.addChild(keyboardContainer);
	stage.update();
	
	
	playKeyboard=new Image();
	playKeyboard.src="game-images/keyboard.png";
	playKeyboard.name="playKeyboard";
	playKeyboard.onload=setBtn;
	
	var indicator = new createjs.Text("This game uses the ARROW KEYS from your keyboard ","21px poppinMd", "#fff")
	
	indicator.x=100;
	indicator.y=stageHeight/2+80;
	
	document.onkeydown =startTutorial;
	setTutorial=true;
	pressKeyArrow=true;
	
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
	
}

/* for tablet click event */
function continueTutorial(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		var tempobject= new Object();
		tempobject.keyCode='37';
		pressKeyArrow=true;
		startTutorial(tempobject);
		
		
	}
}
/* end here */

function startTutorial(d){
	
		d = d || window.event;
		$("#btnPlay").addClass("button-disabled");
		$("#btnTutorial").addClass("button-disabled");
			
		if((d.keyCode == '37'||d.keyCode == '39'||d.keyCode == '40' ||d.keyCode=='38')&&(setTutorial==true && pressKeyArrow==true) ){
		
			
			$(".game-log").addClass("hide");
			
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
			
			
			$("#help-bottom-indicator").removeClass("hide");
			
			// end here
			
			stage.update();
			
			startContainer();
			
			//setTutorial=true; // initialising flag for tutorial on
			
			setTimeout(firstimageRotate, 500);
			
		}
	
}

function resetValues(ele){
	 
	if(ele==false){
    	 counter=-1;
		 setTutorial=true;
	}else{
         counter=2;
		 setTutorial=false;
	}
	 keyPress=false;
	 pressKeyArrow=false;
	 keyBoardHandlervariable=false;
	 skipgamevariable=false;
	 currentShape=0;  // save current shape value
	 previousShape=0; // save previous shape value
	 image="";
	 timeFlag=false;
	 timeCountDown=90; //90
	 gameContainer="";
	 rightBitmap="";
	 leftBitmap="";
	 correctImage="";
	 backImage="";
	 backBitmap="";
	 bottedImage="";
	 previousBitmap="",wrongBitmap="",correctBitmap="";
	 triangleImage="",circleImage="",flowerImage="",shapeImage="",ytriangleImage="",blankImage="";
	 tutorialCorrect=0;
	 tutorialAnswer=0;
	 //counterRef;      // for set value
	// for score level
	 totalScore=0;      // total score
	 currentLevel=1;    // current level
	 currentCorrect=1;  // current level correct answers  like x3
	 totalCorrectAnswer=0;
	 totalQuestion=0;
	 wrongAnswer=0;
	 totalPercentage=0;
	 createdTime=0,clickedTime=0,reactionTime=0;
	 totalPressed=0;
	
	
}

function congratulationMessage(){
	
	 stage.removeAllChildren();
	 stage.update();
	 
	 $(".congrats").show("slow");
	 $("#congratulations").modal('show');
	 skipgamevariable=true;
	 document.onkeydown=removeCongratulation;
}

// after tutorial finish, restart game
function pressKeyRestart(u){
	
	u = u || window.event;
	if((u.keyCode == '37'||u.keyCode == '39'||u.keyCode == '40' ||u.keyCode=='38')&&(setTutorial==true)){
	
		createjs.Ticker.removeEventListener("tick",stage);
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
    createjs.Ticker.removeEventListener("tick",stage);
	stage.removeAllChildren();
	stage.update();
	setTutorial=false;
	
	$("#lblBonus").html("X1");
	$("#gameTime").html("00:00");
	$("#bPoints span").removeClass("active");
	$("#score").html("0000");
	
	$(".modal-backdrop").removeClass("in");
	$("#help-bottom-indicator").addClass("hide");
	resetValues(true);
	clearInterval(counterRef);
	
	startContainer();
	
	$("#btnPlay").removeClass("button-disabled");
	$("#btnTutorial").removeClass("button-disabled");
	
	
	$(".game-board").css({"display":"block"});
	$(".game-log").css({"display":"block"});
	
	
}

function removeCongratulation(ref){
		ref = ref || window.event
		

		if ((ref.keyCode == 36|| ref.keyCode == 37 || ref.keyCode == 38 || ref.keyCode == 39 || ref.keyCode == 40 )&&(skipgamevariable==true)) {
			
			skipgamevariable=false;
			
			if($("#congratulations").hasClass("in")){
				$(".congrats").hide("slow");
				$("#congratulations").modal('toggle');
			}
			$("#btnPlay").addClass("in");
			
			$("#score").html("0000");
			$("#lblBonus").html("X1");
			$(".bIndicator").removeClass("active");
			$("#gameTime").html("00:00");
			$("#btnPlay").removeClass("button-disabled");
			$("#btnTutorial").removeClass("button-disabled");
			$("#help-bottom-indicator").addClass("hide");
			onSkipClick();

		}		
}