	var canvas;
	var stage;
	var stageHeight;
	var stageWidth;
	var container; // for start button
	
	var welcomeBackground;
	var welcomeHeading; //  for main heading
	var welcomeDescription; // for main description
	
	
	var tutorialAnswerShape;
	var counterContainer; // for showing count down
	var counterShape; // for showing circle of countdown
	var playButton;
	var showcards = false ;
	
	var allowKeyPress=false;
	var keyPress=false;
	var timeFlag=false;
	var playStatus=false; // for checking game play or pause
	var pressKeyArrow=false; // for tutorial press any key variable
	var keyBoardHandlervariable=false; // for restart game helper variable
	var skipgamevariable=false;
	
	var tutorialResponse=false; // for not to change text/color if answer is wrong in tutorial
	
	var counter=2;
	var gamecouterStarted = false;
	var radomNumber=["red","blue","green","black","orange"]; // for image selection //1 for red, 2 for blue , 3 for yellow , 4 for black
	
//	var helpRandomNumber=["red","blue","blue","orange","green","green","red"];
	var helpRandomNumber=["red","blue","orange","orange","red"]; // for tutorial section, first five 
	
	var tutorialRandomNumber=["red","blue","black","orange","green"]; // for tutorial section first five
	
	
	var colorNumber={red:"#ff000c",blue:"#003399 ",green:"#2dbb01",black:"#000",orange:"#ff6700"}; // defining their color here
	
	//var imageNumber={6:"triangle.png",7:"plus.png",8:"square.png",9:"star.png",10:"circle.png"};
	
	var currentShape=0;  // save current shape value
	var currentcolor ;
	var previousShape=0; // save previous shape value
	var image;
	var timeCountDown=90; //90 
	var gameContainer;
	
	var rightBitmap;
	var wrongBitmap;

	var starAnimate = false;

    var leftWord,rightWord,randomColor;

	
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
	
    var timeoutFunction = null;
	var counter3 , counter2 , counter1 , counter1Bitmap, counter2Bitmap,counter3Bitmap , colorTitleBitmap , colorTitle;
	var leftBlankBitmap , rightBlankBitmap;
	

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
		
		counter1=new Image();
		counter1.src="game-images/counter1.png";
		counter1.name="counter1";
		counter1.onload=setBtn;
		
		counter2=new Image();
		counter2.src="game-images/counter2.png";
		counter2.name="counter2";
		counter2.onload=setBtn;
		
		counter3=new Image();
		counter3.src="game-images/counter3.png";
		counter3.name="counter3";
		counter3.onload=setBtn;
		
		colorTitle=new Image();
		colorTitle.src="game-images/colorTitle.png";
		colorTitle.name="colorTitle";

		welcomeText();

}
function welcomeText(){
	
	//	welcomeHeading  = new createjs.Text("Colors","45px poppinRegular", "#fff");
		//welcomeHeading  = new createjs.Text();
		
		/* welcomeHeading.text="Colorsrf";
		welcomeHeading.font='45px poppinRegular';
		welcomeHeading.color="#fff"; */
		colorTitleBitmap= new createjs.Bitmap(colorTitle);
		colorTitleBitmap.x=stageWidth/2-83;
		colorTitleBitmap.y=stageHeight/2-115;
		colorTitleBitmap.textAlign="center";
		
		colorTitleBitmap.alpha=1;
		
		
	
		welcomeDescription = new createjs.Text("Exercise your response inhibition by comparing one word's meaning to another word's color","18px poppinRegular","#fff");
		welcomeDescription.x=stageWidth/2;
		welcomeDescription.lineHeight=32;
		welcomeDescription.lineWidth=stageWidth/2+140;
		welcomeDescription.y=stageHeight/2-20;
		welcomeDescription.textAlign="center";
		
		console.log(welcomeDescription.font);
		
		
		container.addChild(colorTitleBitmap,welcomeDescription);
		stage.update();
		
		
	
}

function registerSounds()
{
	createjs.Sound.registerSound({id:"bgMusic", src:"assets/sounds/bgSound.mp3"});
	SoundJS.addBatch([
        {name:'right', src:'assets/sounds/right.mp3', instances:1},
        {name:'wrong', src:'assets/sounds/wrong.mp3', instances:1},
        {name:'tut_close', src:'assets/sounds/tutorial_popup_close.wav', instances:1},
        {name:'tut_open', src:'assets/sounds/tutorial_popup_open.wav', instances:1},
	/*	{name:'bgSound', src:'assets/sounds/bgSound.mp3', instances:1},*/
		]);
}

// for placing start button 
function setBtn(e){
	
		if(e.target.name=="playbutton"){

				var startbtn=new createjs.Bitmap(playButton);
				startbtn.x = stageWidth/2-70;
				startbtn.y = stageHeight/2+90;
				startbtn.cursor = "pointer";
				container.addChild(startbtn);
				
				//welcomeText();
				startbtn.alpha  = 1;
				
				/* for button hover effect */
				startbtn.addEventListener("mouseover", function() {
				startbtn.alpha  = 0.8;
				stage.update();
				});
				startbtn.addEventListener("mouseout", function() {
				startbtn.alpha  = 1;
				stage.update();
				});
				stage.update();
				
				registerSounds();
				
				startbtn.addEventListener("click",playClickHandler);
	
		}else if(e.target.name=="counter1"){
			
				counter1Bitmap= new createjs.Bitmap(counter1);
				counter1Bitmap.x=stageWidth/2-32;
				counter1Bitmap.y=stageHeight/2-20;
				counter1Bitmap.alpha = 0;
				stage.update();
				
		}else if(e.target.name=="counter2"){
			
				counter2Bitmap= new createjs.Bitmap(counter2);
				counter2Bitmap.x=stageWidth/2-32;
				counter2Bitmap.y=stageHeight/2-20;
				counter2Bitmap.alpha = 0;
				stage.update();
				
		}else if(e.target.name=="counter3"){
			
				counter3Bitmap= new createjs.Bitmap(counter3);
				counter3Bitmap.x=stageWidth/2-32;
				counter3Bitmap.y=stageHeight/2-20;
				counter3Bitmap.alpha = 0;
				
				stage.update();
				
		}else if(e.target.name=="leftBlankImage"){
			
				leftBlankBitmap= new createjs.Bitmap(leftBlankImage);
				leftBlankBitmap.x=-10;
				leftBlankBitmap.y=stageHeight/2-60;
				leftBlankBitmap.alpha = 0;
				gameContainer.addChild(leftBlankBitmap);
				createjs.Tween.get(leftBlankBitmap).to({ x: 65 ,  alpha: 1 }, 300, createjs.Ease.bounceInOut());
				createjs.Ticker.addEventListener("tick", updateStage);
				//createjs.Ticker.setFPS(100);
				stage.update();
				
			
				
		}else if(e.target.name=="rightBlankImage"){
			
				rightBlankBitmap= new createjs.Bitmap(rightBlankImage);
				rightBlankBitmap.x=450;
				rightBlankBitmap.y=stageHeight/2-58;
				rightBlankBitmap.alpha = 0;
				gameContainer.addChild(rightBlankBitmap);
				createjs.Tween.get(rightBlankBitmap).to({ x: stageWidth/2 ,  alpha: 1 }, 300, createjs.Ease.bounceInOut());
				createjs.Ticker.addEventListener("tick", updateStage);
				//createjs.Ticker.setFPS(100);
			    stage.update();
				
		}else if(e.target.name=="skipButton"){
			
				skipBitmap=new createjs.Bitmap(skipButton);
				skipBitmap.x=10;
				skipBitmap.y=10;
				skipBitmap.cursor = "pointer";
				stage.addChild(skipBitmap);
				skipBitmap.addEventListener("click",onSkipClick);
				stage.update();
				
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
				
		}else if(e.target.name=="rightImage"){
			
			rightBitmap=new createjs.Bitmap(rightImage);
			rightBitmap.x=stageWidth/2-55;
			rightBitmap.y=stageHeight/2;
			rightBitmap.alpha=0;
			gameContainer.addChild(rightBitmap);
			stage.update();
		
		}else if(e.target.name=="wrongImage"){
			
			wrongBitmap=new createjs.Bitmap(wrongImage);
			wrongBitmap.x=stageWidth/2-30;
			wrongBitmap.y=stageHeight/2;
			wrongBitmap.alpha=0;
			gameContainer.addChild(wrongBitmap);
			stage.update();
			
		}	
}
function playClickHandler(e)
{	
	createjs.Ticker.addEventListener("tick",stage);
	createjs.Tween.get(container).to({y:-40},260).to({y:420},800).call(transitionComplete);
	
}
function transitionComplete()
{
	/* $("#gameFrame").fadeOut(1000, function() {
		$("#gameFrame").fadeIn(1000);
	}); */
	createjs.Ticker.removeEventListener("tick",stage);
	stage.removeChild(container);
	container.alpha = 0;
	container = null;

	$('#btnPlay').toggleClass('in');
	
	$(".game-log").addClass("log-animate");
	/* $(".game-log").css("display","none");
	$(".game-log").removeClass("hide");
	$(".game-log").show("slow"); */
	$("#divButtons").addClass("animate-divButtons");
	
	
	var timeOut2 = setTimeout(function(){startContainer(); clearTimeout(timeOut2)},500);
}
// start button click functionality
function startContainer(){
		gamecouterStarted = true;
		
		stage.removeChild(container);
		stage.update();
		
		
		if(setTutorial==false){
		
			$("#btnPlay").removeClass("button-disabled");
		
		}
		//$(".game-log").removeClass("hide");
		$(".game-log").addClass("log-animate");
		keyPress=true;
		
		gameContainer=new createjs.Container();	
		stage.addChild(gameContainer);
		stage.update();
		
		setEnvironment(); // initialising stage behind the counter 
		
		
		
		// cross checking counter not run more than one time , while doing pause or play
		if(counter>0){
			
			counterContainer=new createjs.Container();
			stage.addChild(counterContainer);
			
			
			counterContainer.addChild(counter3Bitmap);
			counter3Bitmap.alpha = 1;
			stage.update();
					
			// for creating count down  font-family: 'Poppins', sans-serif;
			createjs.Ticker.removeEventListener("tick",stage);
		
			stage.update();
			
			timeoutFunction = setTimeout(startCounter, 1000);
			
		}
		
		

}

// for starting count down precess
function startCounter(){
	
	
	if(!$("#paused-div").hasClass("game-pause")){	
		if(keyPress==true){	
		
			if(counter==0){
				gamecouterStarted = false;
				stage.removeChild(counterContainer);
				counter--;
			
				 keyPress=true;
				 showCombination();		

			}else{
				if(counter==2){
					
					counterContainer.addChild(counter2Bitmap);
					counter2Bitmap.alpha = 1;
					stage.update();
					
					
				}else{
				
				   counterContainer.addChild(counter1Bitmap);
				   counter1Bitmap.alpha = 1;
				   stage.update();
					
				}
			
				stage.update();
				
				counter--;
			
				
				 timeoutFunction=setTimeout(startCounter,1000);
				
			}
		}
	}
}


function showCombination(){
	createjs.Ticker.removeEventListener("tick", updateStage);
	stage.update();
	showcards = true;
	if(setTutorial==false){
			counterRef=setInterval(countDown, 1000); //Here start clock timer 
			timeFlag=true;
			$("#btnPlay").removeClass("in");
	}
	
	createdTime=Date.now(); // SET TIME FOR SHOWING NEW TIMER
	
	
	/* loading indicator images */
	
	
	wrongImage=new Image();
	wrongImage.src="game-images/wrong.png";
	wrongImage.name="wrongImage";
	wrongImage.onload=setBtn;
	
	rightImage= new Image();
	rightImage.src="game-images/right.png";
	rightImage.name="rightImage";
	rightImage.onload=setBtn;
	
	
	/* end here */
	
	if(setTutorial==false){
		leftWord    = radomNumber[Math.floor(Math.random() * radomNumber.length)]; // left Text
	}else{
		leftWord    = "blue";
	}
	rightWord   = radomNumber[Math.floor(Math.random() * radomNumber.length)]; // right Text
	
	if(setTutorial==false){
		randomColor = radomNumber[Math.floor(Math.random() * radomNumber.length)]; // random right color
	}else{
		randomColor = "orange";
	}
	
	leftText  = new createjs.Text(leftWord,"65px poppinMd", "#000");
	leftText.lineWidth = 340;
	
//	console.log(stageHeight/2);
	
	leftText.x = stageWidth/2-150;
	leftText.textAlign = "center";
		
	//leftText.x=140;
	leftText.y=stageHeight/2-5;
	gameContainer.addChild(leftText);
	
	
	rightText= new createjs.Text(rightWord,"65px poppinMd",colorNumber[randomColor]);
	rightText.lineWidth = 340;
	rightText.textAlign="center";
	
	
	
	rightText.x=stageWidth/2+170;
	rightText.y=stageHeight/2-5;
	gameContainer.addChild(rightText);
		
	if(setTutorial==true){

		$(".game-log").removeClass("log-animate");
	
		/*tutorialAnswerShape = new createjs.Shape(); 
		tutorialAnswerShape.graphics.beginFill(colorNumber[randomColor]); //#e64e4e
		tutorialAnswerShape.graphics.drawRoundRect(0,0,250,100,5);
		tutorialAnswerShape.x=stageWidth/2+45;
		tutorialAnswerShape.y=stageHeight/2-23;
		stage.addChild(tutorialAnswerShape); */
		
		
		if(randomColor==leftWord){
			
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
			
		}else{
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
		}
		
	}
	
	stage.update();		
	
	document.onkeyup = keyBoardHandler;
	keyBoardHandlervariable=true;
	
}


// for game timer
function countDown(){
	
	if(timeFlag==true){	
	
		minutes = parseInt( timeCountDown/ 60, 10);
        seconds = parseInt(timeCountDown % 60, 10);
    
        minutes = minutes < 10 ? minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $("#gameTime").text(minutes + ":" + seconds);

        if (--timeCountDown < 0) {
			 gameComplete();
        }
	}
}


function setEnvironment(){
		// if it start first
	
		leftBlankImage=new Image();
		leftBlankImage.src="game-images/card-meaning.png";
		leftBlankImage.name="leftBlankImage";
		leftBlankImage.onload=setBtn;
			
			
		rightBlankImage=new Image();
		rightBlankImage.src="game-images/card-color.png";
		rightBlankImage.name="rightBlankImage";
		rightBlankImage.onload=setBtn;
		
		
		//createdTime,clickedTime,reactionTime;
		if(createdTime!=0&&clickedTime!=0){
			reactionTime+=(clickedTime-createdTime)/1000;
		}
		
		if(previousShape!=0){
			document.onkeyup = keyBoardHandler;
			keyBoardHandlervariable=true;	
			
		}	
}     


function keyBoardHandler(u){
	
		u = u || window.event;
		tempcontainer=new createjs.Container();
		stage.addChild(tempcontainer);
		
		if((u.keyCode == '37'||u.keyCode == '39')&&(keyPress==true && keyBoardHandlervariable==true && timeCountDown >0)){
			
			// FOR GETTING REACTION TIME OF USER
			clickedTime=Date.now();	
			// END HERE
			
			totalPressed++;
			keyPress=false; // set false value to keyboard handler
			if(u.keyCode=='37'){
					totalQuestion++; // for getting total attempts
					
					if(leftWord==randomColor){ // if answer is not correct
					
						wrongBitmap.alpha=1;
						stage.update();
						if(isMute){
							SoundJS.play('wrong');
						}
						
						/* for score board */
						if(setTutorial==false){
							if(currentLevel==10){
									
								wrongAnswer++;  // for getting total wrong answers
								currentLevel=9;
								currentCorrect=1;
								$("#lblBonus").html("X"+currentLevel);
								$("#bPoints span").removeClass("active");
								$("#animateTrigger").removeClass("max-lvl");
									
							}else{	
									if(currentLevel>1 && currentCorrect==1){
										
										currentLevel=currentLevel-1;
										
										$("#lblBonus").html("X"+currentLevel);
									}
											
									currentCorrect=1;
									$("#bPoints span").removeClass("active");
									wrongAnswer=0;
							}
							
							setTimeout(nextTextDisplay, 200);
							
						}else{ //In case of tutorial
						
							if(tutorialCorrect>5){
								
								tutorialAnswer=0;
								guideLineTop.text="Oops, that's not right";
								
							}
							tutorialResponse=true; //for not to change text/color in tutorial if answer is wrong
							totalQuestion--;
							
							setTimeout(nextTextDisplay, 1000);
						}
						/* for score board */
						
						
					}else{
						
						rightBitmap.alpha=1;
						stage.update();
						if(isMute){	
						 SoundJS.play('right');
						}
						
						/* if tutorial is working */
						if(setTutorial==true){
							
							if(tutorialCorrect>=5){
								
								tutorialAnswer++;
								
							}
							tutorialCorrect++;	

							
							tutorialResponse=false; //for not to change text/color in tutorial if answer is wrong
							
							//setTimeout(nextTextDisplay, 1000);
						}else{
						/* for score board */
							
							totalCorrectAnswer++; // for getting correct attempts
							totalScore+= currentLevel*100;
							
							$("#score").html(totalScore);
							$('#bPoints span:eq('+(currentCorrect-1)+')').addClass('active');
							
							
								/* for animating the level panel at 4 correct ans */		
							if(currentCorrect==4  && currentLevel< 10){
							
								$('#bPoints span:eq('+(3)+')').addClass('active');
									
									var temp_a = currentLevel;
									var temp_b = temp_a+1;
									if(temp_b!=10){$("#lblBonus").html("X"+temp_b);}else{
										$("#animateTrigger").addClass("max-lvl");		
										$("#lblBonus").html("MAX x10");	
									}
									
									$("#animateTrigger").addClass("star-animate");	
									
									setTimeout(function(){ $("#animateTrigger").addClass("ani-trigger");
									$("#bPoints span").removeClass("active");
									starAnimate = true;
									}, 550);
								}else{
									starAnimate = false;
									$("#animateTrigger").removeClass("star-animate");
									$("#animateTrigger").removeClass("ani-trigger");
									
									
								}
							
						
							
							currentCorrect++;
							console.log(currentCorrect);
							if(currentCorrect==5){		
								if(currentLevel==10&& wrongAnswer>0){
									$("#animateTrigger").removeClass("max-lvl");
									$("#lblBonus").html("X9");
									currentLevel=9;
									currentCorrect=1;
									wrongAnswer=0;
								}else if(currentLevel==10 && wrongAnswer==0){
									currentLevel=10;
									currentCorrect=1;
									$("#animateTrigger").addClass("max-lvl"); // for 10 MAX text in 10th level
									$("#lblBonus").html("MAX x10");
										
								}else{ 
									currentLevel++;
									currentCorrect=1;
								}
								if(starAnimate)$("#lblBonus").html("X"+currentLevel);
								//$("#bPoints span").removeClass("active");
							}
							/* for score board */
							//setTimeout(nextTextDisplay, 400);
							if(currentLevel >= 10){		
										$("#animateTrigger").addClass("max-lvl");		
										$("#lblBonus").html("MAX x10");		
										
										}
						}
						setTimeout(nextTextDisplay, 200);
						
						
					}

			}else if(u.keyCode=='39'){
					totalQuestion++;
					if(leftWord==randomColor){
						
						rightBitmap.alpha=1;
						stage.update();
						if(isMute){	
						 SoundJS.play('right');
						}
						/* if tutorial is working */
						if(setTutorial==true){
							if(tutorialCorrect>=5){
								
								tutorialAnswer++;
								
							}
							tutorialCorrect++;	
							
							tutorialResponse=false; //for not to change text/color in tutorial if answer is wrong
							
							setTimeout(nextTextDisplay, 400);// if tutorial working then increase time
							
						}else{
						
							/* for score board */
							totalCorrectAnswer++; // for getting correct attempts
							totalScore+= currentLevel*100;
						
							$("#score").html(totalScore); 
							
							$('#bPoints span:eq('+(currentCorrect-1)+')').addClass('active');
							
							
							/* for animating the level panel at 4 correct ans */		
							if(currentCorrect==4  && currentLevel< 10){
								
								$('#bPoints span:eq('+(3)+')').addClass('active');
									var temp_a = currentLevel;
									var temp_b = temp_a+1;
									if(temp_b!=10){$("#lblBonus").html("X"+temp_b);}else{
										$("#animateTrigger").addClass("max-lvl");		
										$("#lblBonus").html("MAX x10");	
									}
									
									$("#animateTrigger").addClass("star-animate");	
									setTimeout(function(){ $("#animateTrigger").addClass("ani-trigger");
									$("#bPoints span").removeClass("active");	
									starAnimate = true;
									}, 550);
								}else{
									starAnimate = false;
									$("#animateTrigger").removeClass("star-animate");
									$("#animateTrigger").removeClass("ani-trigger");
									
								}
							
							
							
							console.log(currentCorrect);
							currentCorrect++;
							if(currentCorrect==5){		
								if(currentLevel==10&& wrongAnswer>0){
										$("#animateTrigger").removeClass("max-lvl");
										$("#lblBonus").html("X9");
										currentLevel=9;
										currentCorrect=1;
										wrongAnswer=0;
								}else if(currentLevel==10 && wrongAnswer==0){
										currentLevel=10;
										currentCorrect=1;
										$("#animateTrigger").addClass("max-lvl"); // for 10 MAX text in 10th level
										$("#lblBonus").html("MAX x10");
									
								}else{ 
										currentLevel++;
										currentCorrect=1;
								}
								if(starAnimate)$("#lblBonus").html("X"+currentLevel);
								//$("#bPoints span").removeClass("active");
							}
							/* for score board */
							if(currentLevel >= 10){		
									$("#animateTrigger").addClass("max-lvl");		
									$("#lblBonus").html("MAX x10");		
										}
										
							setTimeout(nextTextDisplay, 200); // 
						}
						
						
						
					}else{

						wrongBitmap.alpha=1;
						stage.update();
						if(isMute){
							SoundJS.play('wrong');
						}
						
						/* for score board */
						if(setTutorial==false){
							if(currentLevel==10){
								
								wrongAnswer++;  // for getting total wrong answers
								currentLevel=9;
								currentCorrect=1;
								$("#lblBonus").html("X"+currentLevel);
								$("#bPoints span").removeClass("active");
								$("#animateTrigger").removeClass("max-lvl");
								
							}else{
								
								if(currentLevel>1 && currentCorrect==1){
										
									currentLevel=currentLevel-1;
										
									$("#lblBonus").html("X"+currentLevel);
								}	
								
								currentCorrect=1;
								$("#bPoints span").removeClass("active");
								wrongAnswer=0;
							}
							
							setTimeout(nextTextDisplay, 200);// if tutorial working then increase time
							
						}else{
							
							if(tutorialCorrect>5){
								
								tutorialAnswer=0;
								guideLineTop.text="Oops, that's not right";
								
							}
							tutorialResponse=true; //for not to change text/color in tutorial if answer is wrong
							totalQuestion--; 
							
							setTimeout(nextTextDisplay, 1000);// if tutorial working then increase time
							
						}
						
						/* for score board */
						
						
					}	
			}
			
		//	setTimeout(nextTextDisplay, 400);
		}
		
}
// reset New Text for image
function nextTextDisplay(){

	rightBitmap.alpha=0;
	wrongBitmap.alpha=0;
	
	
	stage.update();
	
	
	if(createdTime!=0&&clickedTime!=0){
			reactionTime+=(clickedTime-createdTime)/1000;		
	}
	
	createdTime=Date.now(); // SET TIME FOR SHOWING NEW TIMER
	
	//alert(tutorialResponse);
	if(tutorialResponse==false){
		rightWord=radomNumber[Math.floor(Math.random() * radomNumber.length)]; // right Text
	}
	
	
	if(setTutorial==false){
		
		randomColor=radomNumber[Math.floor(Math.random() * radomNumber.length)]; // random right color
		
	    radomNumber.push(randomColor); radomNumber.push(randomColor);
		shuffle(radomNumber);
		console.log(radomNumber);
		
		leftWord=radomNumber[Math.floor(Math.random() * radomNumber.length)]; // left Text
		
	
		console.log("leftWord="+leftWord);
		console.log("rightColor="+randomColor);
		
		radomNumber=["red","blue","green","black","orange"]; 
		
		
	}else{ // for tutorial
		
		if(tutorialResponse==false){

			if(tutorialCorrect<5){
				
				leftWord    = tutorialRandomNumber[totalQuestion];
				randomColor = helpRandomNumber[totalQuestion]; // for tutorial, first five only 
				
				
				if(leftWord==randomColor){
					
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
					
					
				}else{
					
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
					
				}
				
			
			}else if(tutorialAnswer==6){
				
					$("#help-bottom-indicator").addClass("hide");
					congratulationMessage();
				
			}else{
				
				
				
				leftWord    = radomNumber[Math.floor(Math.random() * radomNumber.length)]; // left Text
				randomColor = radomNumber[Math.floor(Math.random() * radomNumber.length)]; // random right color
				
				$(".tutorial-indicator").each(function(){
					
					if($(this).data("ref")!="bottom"){
						$(this).addClass("active");
					}
					
				});
				$(".text-blink").each(function(){
					$(this).html("");
				});
			
			}
			}
		
		//alert("left word::"+leftWord);

	}
	
	
	leftText.text = leftWord;	
	
	if(setTutorial==false){
		
		rightText.text = rightWord; 
		rightText.color=colorNumber[randomColor];
		
		
		
		
		
	
	}else{
	
			if(tutorialCorrect<5){
				rightText.text = rightWord; 
				rightText.color=colorNumber[randomColor];
				//tutorialAnswerShape.graphics.beginFill(colorNumber[randomColor]).drawRoundRect(0,0,250,100,5);
				
			}else{
				
				// if(tutorialCorrect==5){
				//	tutorialAnswerShape.graphics.clear();
				// }
				guideLineTop.text="Does the meaning of the left word match the color on the right ?";
				stage.update();
				if(tutorialResponse==false){
					rightText.text = rightWord;
					rightText.color=colorNumber[randomColor];
				}
			}
		
	}
	stage.update();

	if($("#paused-div").hasClass("game-pause")){
			
		keyBoardHandlervariable=false;
		keyPress=false;	
	
	}else{
		
		keyBoardHandlervariable=true;
		keyPress=true;
	}
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
	 
	 
	 console.log(totalScore+","+totalQuestion+","+totalCorrectAnswer);
	parent.saveScore(totalScore,totalQuestion,totalCorrectAnswer);
	
}
function gamePaused(){
	console.log("paused");
	rightText.alpha= 0;
	leftText.alpha= 0;
		stage.update();
	//clearInterval(counterRef);
	keyPress=false;
	timeFlag=false;
	keyBoardHandlervariable=false;
	
}
function gamePlay(){
	if(showcards){
	rightText.alpha= 1;
	leftText.alpha= 1;
	stage.update();
	}
	keyPress=true;
	timeFlag=true;
	if(counter>=0){
		startCounter();
	}
	keyPress=true;
	timeFlag=true;
	keyBoardHandlervariable=true;
	stage.update();
	
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
	
	
	//$(".game-log").css({"display":"none"});
	$(".game-log").removeClass("log-animate");
	$("#divButtons").removeClass("animate-divButtons");
	
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
	createjs.Tween.get(clickIndicator, { loop: true }).wait(3000)
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
		
		

			
		if((d.keyCode == '37'||d.keyCode == '39'||d.keyCode == '40' ||d.keyCode=='38')&&(setTutorial==true && pressKeyArrow==true) ){
		
			
			//$(".game-log").addClass("hide");
			$(".game-log").removeClass("log-animate");
			
			$(".text-blink").each(function(){
					$(this).html("");
			});
			
			stage.removeChild(keyboardContainer);
			stage.update();
			
			resetValues(false);

			
			guidecontainer=new createjs.Container();
			stage.addChild(guidecontainer);

			guideLineTop = new createjs.Text("Does the meaning of the left word match the color on the right ?","23px poppinMd", "#fff");
			guideLineTop.x=stageWidth/2;
			guideLineTop.textAlign="center";
			guideLineTop.lineHeight=32;
			guideLineTop.lineWidth=550;
			guideLineTop.y=100;
		
			
			guidecontainer.addChild(guideLineTop);
			
			guideLineBottom= new createjs.Text("","18px poppinMd","#fff");
			guidecontainer.addChild(guideLineBottom);
			
			

			
			guideLineBottom.x=stageWidth/2+180;
			guideLineBottom.y=stageHeight-55;
			guideLineBottom.textAlign="center";
			
			
			$("#help-bottom-indicator").removeClass("hide");
			
			$("#btnPlay").addClass("button-disabled");
			$("#btnTutorial").addClass("button-disabled");
			
			
			// end here
			
			stage.update();
			
			startContainer();
			
			
		//	showCombination();
			setTimeout(showCombination, 700);
			
			
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
	 timeCountDown=45; //90
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
	 
	 tutorialResponse=false;
	 
	 clearTimeout(timeoutFunction); //cancel the previous timer.
     timeoutFunction = null;
	
	
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
		$("#gameTime").html("0:45");
		$("#bPoints span").removeClass("active");
		$("#score").html("0");
		
		resetValues(true);
		startContainer();
		//$(".game-log").css({"display":"block"});
		$(".game-log").addClass("log-animate");
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
	$("#gameTime").html("0:45");
	$("#bPoints span").removeClass("active");
	$("#score").html("0");
	$("#divButtons").addClass("animate-divButtons");
	//$(".modal-backdrop").removeClass("in");
	$("#help-bottom-indicator").addClass("hide");
	resetValues(true);
	clearInterval(counterRef);
	
	startContainer();
	
	$("#btnPlay").removeClass("button-disabled");
	$("#btnTutorial").removeClass("button-disabled");
	
	
	$(".game-board").css({"display":"block"});
	//$(".game-log").css({"display":"block"});
	$(".game-log").addClass("log-animate");
	
	
}

function removeCongratulation(ref){
		ref = ref || window.event
		

		if ((ref.keyCode == 36|| ref.keyCode == 37 || ref.keyCode == 38 || ref.keyCode == 39 || ref.keyCode == 40 )&&(skipgamevariable==true)) {
			
			skipgamevariable=false;
			
			if($("#congratulations").hasClass("in")){
				
				console.log("working");
				
				$(".congrats").show("slow");
				$("#congratulations").modal('toggle');
				
				
			}
			$("#btnPlay").addClass("in");
			
			$("#score").html("0");
			$("#lblBonus").html("X1");
			$(".bIndicator").removeClass("active");
			$("#gameTime").html("0:45");
			$("#btnPlay").removeClass("button-disabled");
			$("#btnTutorial").removeClass("button-disabled");
			$("#help-bottom-indicator").addClass("hide");
			onSkipClick();

		}		
}
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}
function updateStage()
{
	stage.update();
}

/* for shuffle array */

function shuffle(array) {
	
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
 
  }

  return array;
}
/* end here */