
//Параметры

	var data={};
	data.characterLevel = 1;
	data.characterExperience =0;
	data.characterClass = 'Novice';

	data.strength = 1;
	data.strengthExperience = 0;
	data.dexterity = 1;
	data.dexterityExperience = 0;
	data.inteligence = 1;
	data.inteligenceExperience = 0;
	data.speed = 1;
	data.speedExperience = 0;

	data.currentWeapon = "";
	data.currentArmor = "";

	data.gold = 0;

//***************************************************************************
//UTILITY
	data.cardsCount = 1;
	//для приостановки после боя или квеста (чтобы увидеть окончание прогресса)
	data.onPause = 0;
	//признаки завершения боя, шага квеста
	data.endBattle = 0;
	data.endQuestStep = 0;

	//таймер до получения следующего квеста
	data.timerNextQuest = 1;
	data.timerNextQuestIni = 4;
	data.currentQuestsQuantity = 0;
	data.questsLimit = 3;

	//признак автоквестов
	data.autoQuest = 0;
//***************************************************************************

//TRAVEL
	data.currentLocation = 1;
	data.targetLocation = 0;
	data.onTravel = 0;
	data.currentTravelProgress = 0;
	data.targetTravelProgress = 20;

//QUESTS
	data.onQuest = 0;
	data.acceptAllQuests = 1;
	//data.currentQuest = 0;
	data.currentQuestStep = 0;

	data.currentQuestStepProgress = 0;
	data.targetQuestStepProgress = 0;

	data.onEvent = 0;
	data.currentEventProgress = 0;
	data.targetEventProgress = 5;

//BATTLE
	data.onBattle = 0;

	data.maxPlayerHP = 30;
	data.currentPlayerHP = 30;
	data.playerDmg = 2;
	data.playerActionTimer = 1;
	data.playerActionTimerIni = 3;

	data.maxMobHP = 40;
	data.currentMobHP = 0;
	data.mobDmg = 2;
	data.mobActionTimer = 2;
	data.mobActionTimerIni = 5;


	//------------------------------------------------------------------------------------------------
	//ФУНКЦИИ

	//получение опыта
	function getExperience()
	{
			data.characterExperience++;//нужна формула
	}




	function changeClass(characterClass)
	{
		data.characterClass = characterClass;
	}


	function doPause()
	{
		if(data.onPause!=0){
			data.onPause--;
		}
	}

	function gameTurn()
	{
		questTimer();
		generateQuest();
		autoAcceptQuests();
		doQuest();
		generateBattle();
		doBattle();
		//doEvent();
		//doTravel();
		//generateEvent();
	}



	// Run UI update code every 500ms
window.setInterval(function () {
	gameTurn();
	updateUi();

}, 100);
