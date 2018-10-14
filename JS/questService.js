
var questList =[];
var currentQuest=[];

      questList[0]={
        name:"none",
        state:"disabled",

      }
	  questList[1]={
        name:"none",
        state:"disabled",

      }
      questList[2]={
        name:"none",
        state:"disabled",

      }
      questList[3]={
        name:"none",
        state:"disabled",

      }
      questList[4]={
        name:"none",
        state:"disabled",

      }


function questTimer()
{
  if(data.timerNextQuest > 0)
  {
    //data.timerNextQuest--;
  }
}


function generateQuest()
{

	if(data.timerNextQuest == 0 && data.currentQuestsQuantity<data.questsLimit)
  {

      var steps = [];
      var stepId = Math.floor(Math.random() * 2);
      var targetId = Math.floor(Math.random() * 2);
      var targetQuantity = Math.floor(Math.random() * 2+1);
      var questName = questSteps[stepId].name + " "+targetQuantity+" "+questSteps[stepId].targets[targetId].name;
       steps = [
          {name:"Travel somewhere",targetProgress:5,type:"common"},
          {name:questSteps[stepId].name+questSteps[stepId].targets[targetId].name,targetProgress:targetQuantity,type:questSteps[stepId].type, target:questSteps[stepId].targets[targetId].name},
          {name:"Collect reward",targetProgress:10,type:"common"},
        ]

      for (var i = 0; i<3; i++){
        if(questList[i].state=="disabled"){
          questList[i]={
            name: questName,
            steps: steps,
            state: "enabled",
          }
          data.timerNextQuest = data.timerNextQuestIni;
          data.currentQuestsQuantity++;
		  break;
        }
      }




		//data.currentQuestsQuantity++;
		updateQuestList();
		data.timerNextQuest = data.timerNextQuestIni;
    }else if(data.timerNextQuest > 0 && data.currentQuestsQuantity!=data.questsLimit){
		data.timerNextQuest --;
	}


}

function doQuest()
{
  if (data.onQuest==1 && data.onEvent ==0 && data.onBattle ==0 && data.onPause==0 && data.endBattle==0)
  {

    //проверка что квест выполнен
    if ((data.currentQuestStep==currentQuest.steps.length-1)&&(data.currentQuestStepProgress >= data.targetQuestStepProgress)) {
        getExperience();//получили опыт
        data.onQuest = 0;
        addLog('Quest completed!');
        data.currentQuestStep++;
        updateQuestStepsList();
        data.currentQuestStepProgress=0;
        hideAdventureCard('questCard');
    //проверка что шаг квеста выполнен
  }else if((data.currentQuestStepProgress >= data.targetQuestStepProgress)){
        data.currentQuestStep++;
        updateQuestStepsList();
        data.currentQuestStepProgress = 0;
        data.targetQuestStepProgress = currentQuest.steps[data.currentQuestStep].targetProgress;
    //продолжаю выполнять текущий шаг квеста
  }else if ((data.currentQuestStepProgress < data.targetQuestStepProgress)){
        //ТУТ надо проверить code шага квеста и соответственно шагу считать прогресс
        //нужен тип шага и отдельно цель

          if(currentQuest.steps[data.currentQuestStep].type == "common" ){
            data.currentQuestStepProgress += data.speed;
          }


    }
  }

  updateQuestStepProgressBar();
}

function acceptQuest()
{
  data.onQuest = 1;
  data.currentQuestStep = 0;
  data.currentQuestsQuantity--;
  updateQuestStepsList();
  data.targetQuestStepProgress = currentQuest.steps[data.currentQuestStep].targetProgress;
  addLog('Quest accepted');
}

function declineQuest()
{
  data.currentQuestsQuantity--;
  addLog('Quest declined');
}

function autoAcceptQuests(){
if(data.onQuest==0 && data.autoQuest==1){
  for (var i = 0; i<3; i++){
    if(questList[i].state=="enabled"){
      //currentQuest=questList[i];
      currentQuest = jQuery.extend(true, {}, questList[i]);
      data.currentQuestStep = -1;
      updateQuestStepsList();
      showAdventureCard('questCard');
      acceptQuest();
        questList[i].state ="disabled";
      sortQuests();
      updateQuestList();
    }
      break;
    }
  }
}


function sortQuests()
{
  for (var i=0;i<2;i++){
    if (questList[i].state=="disabled" && questList[i+1].state=="enabled")
    {
      for (var j = 0; j<3; j++)
      {
        if(questList[j].state=="disabled")
        {
          //deep clone quest object using jquery
          questList[j] = jQuery.extend(true, {}, questList[i+1]);

          questList[i+1].state = "disabled";
          break;
        }
      }
    }
  }
}
