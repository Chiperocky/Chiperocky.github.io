var mob = [];


//***************************************************************
//BATTLE EFFECTS
//***************************************************************
var playerEffects = [];
var mobEffects = [];

playerEffects[0]={
  name:"damageUp",
  time:0,
  value:0,
}
playerEffects[1]={
  name:"bleed",
  time:0,
  value:0,
}
mobEffects[0]={
  name:"damageUp",
  time:0,
  value:0,
}
mobEffects[1]={
  name:"bleed",
  time:0,
  value:0,
}
//***************************************************************

function battleIni()
{
  data.onBattle = 1;

  data.currentPlayerHP = data.maxPlayerHP;
  data.playerActionTimer = 1;

  mob.name=currentQuest.steps[data.currentQuestStep].target;
  $("#mobName").text(mob.name);
  data.currentMobHP = data.maxMobHP;
  data.mobActionTimer = 2;
  updateHPProgressBar();
}

function generateBattle()
{
  if(data.onBattle ==0 && data.endBattle ==0 && data.onPause ==0)
  {
    if(data.onQuest==1 && currentQuest.steps[data.currentQuestStep].type == "kill")
    {
        addLog("Battle started");
        battleIni();
        showAdventureCard('battleCard');
    }
  }
}

function doBattle()
{
  if (data.onBattle==1 && data.endBattle ==0 && data.onPause==0)
  {
      applyEffects();
      var currentPlayerDmg;
      //Player
      if(data.playerActionTimer==0 && data.currentPlayerHP>0 && data.currentMobHP>0)
      {
          currentPlayerDmg = data.playerDmg + playerEffects[0].value;
          data.currentMobHP-=currentPlayerDmg;

          addLog("Player hit " +mob.name+" with "+data.currentWeapon+" for "+currentPlayerDmg+ " damage");
          switch (data.currentWeapon)
          {
            case "Dagger":
              addMobEffect('bleed',10,1);
              break;
            case "Sword":
              addPlayerEffect('damageUp',10,1);
              break;

          }

          data.playerActionTimer = data.playerActionTimerIni;
          updateHPProgressBar();
          checkBattleResult();
      }else {
          data.playerActionTimer--;
      }

      //MOB
      if(data.mobActionTimer==0 && data.currentPlayerHP>0 && data.currentMobHP>0)
      {
          data.currentPlayerHP-=data.mobDmg;
          addLog(mob.name+" hit Player for "+data.mobDmg+ " damage");

          data.mobActionTimer = data.mobActionTimerIni;
          updateHPProgressBar();
          checkBattleResult();
      }else {
          data.mobActionTimer--;
      }

  }else if(data.onBattle==0 && data.endBattle==1 && data.onPause>0){
    data.onPause--;
  }else if (data.onBattle==0 && data.endBattle==1 && data.onPause==0) {
    data.endBattle=0;
    hideAdventureCard("battleCard");
  }



}

function checkBattleResult()
{
  if(data.currentPlayerHP<=0){
    addLog(data.characterClass+" knocked down");
    data.currentPlayerHP = data.maxPlayerHP;
    clearAllBattleEffects();

    data.endBattle=1;
    data.onPause = 1;
    data.onBattle = 0;
    //hideAdventureCard("battleCard");
  }

  if(data.currentMobHP<=0){
    addLog("Mob defeated");
    data.currentPlayerHP = data.maxPlayerHP;
    data.currentQuestStepProgress++;
    clearAllBattleEffects();

    data.endBattle=1;
    data.onPause = 1;
    data.onBattle = 0;
    //hideAdventureCard("battleCard");
  }
}

//ДЕЙСТВИЕ ЭФФЕКТОВ
function applyEffects()
{
  for (var i = 0; i < 2; i++)
  {
    // PLAYER EFFECTS
    if(playerEffects[i].time>0)
    {
      playerEffects[i].time--;
      if(playerEffects[i].time==0)
      {
        playerEffects[i].value=0;
      }
      switch (playerEffects[i].name)
      {
        case "bleed":
          data.currentPlayerHP -= playerEffects[i].value;
          updateHPProgressBar();
          break;
      }
    }
    //MOB EFFECTS
    if(mobEffects[i].time>0)
    {
      mobEffects[i].time--;
      if(mobEffects[i].time==0)
      {
        mobEffects[i].value=0;
      }
      switch (mobEffects[i].name)
      {
        case "bleed":
          data.currentMobHP -= mobEffects[i].value;
          addLog(mob.name+" - "+mobEffects[i].value+" HP (bleeding)");
          updateHPProgressBar();
          break;
      }
    }
  }
  checkBattleResult();
}

function addMobEffect(name, time, value)
{
  for(var i =0; i<2;i++)
  {
    if(mobEffects[i].name==name)
    {
      mobEffects[i].time += time;
      mobEffects[i].value += value;
      addLog(mob.name+" bleeds");
    }
  }
}

function addPlayerEffect(name, time, value)
{
  for(var i =0; i<2;i++)
  {
    if(playerEffects[i].name==name)
    {
      playerEffects[i].time += time;
      playerEffects[i].value += value;
    }
  }
}

function clearAllBattleEffects()
{
  for(var i =0; i<2;i++)
  {
    playerEffects[i].time = 0;
    playerEffects[i].value = 0;
    mobEffects[i].time = 0;
    mobEffects[i].value = 0;
  }
}
