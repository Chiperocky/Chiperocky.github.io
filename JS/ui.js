//пока не используется - оставлю как пример добавления событий с кнопками
function showEvent(currentEventId)
{
        $('#events').append('<div id=\"event'+currentEventId+'\"></div>');
        for(var j=0;j<2;j++)
        {
          $('#event'+currentEventId).append('<div id=\"eventButton'+currentEventId+'\">'+ events[data.currentEvents[currentEventId]].actions[j] +'</div>');
          //$('#eventButton'+currentEventId).on('click', function(){doEvent('Accept',1)});
          $('#eventButton'+currentEventId).on('click', function(){doEvent(events[data.currentEvents[currentEventId]].actions[j],1)});
        }
}

function updateUi()
{
  //обновление информации
  $('#character-Class').text(data.characterClass);
  $('#character-Level').text(data.characterLevel);
	$('#character-experience').text(data.characterExperience);
  $('#gold').text(data.gold);
  $('#character-weapon').text(data.currentWeapon);
  $('#character-armor').text(data.currentArmor);
  $('#questTimer').text(Math.ceil(data.timerNextQuest/2));
  $('#currentLocation').text(data.locationResources[data.currentLocation].name);




}


function updateQuestStepProgressBar() {
	var elem = $(".questStepProgressBar");
	if (data.currentQuestStepProgress ==0)
  {
    elem.css("transition","all 0s linear");
  }else {
    elem.css("transition","all 0.5s linear");
  }
  elem.css("width", (data.currentQuestStepProgress / data.targetQuestStepProgress * 100) + "%");

}




function updateTravelProgressBar() {
	var elem = $(".travelProgressBar");
	if (data.currentTravelProgress ==0)
  {
    elem.css("transition","all 0s linear");
  }else {
    elem.css("transition","all 0.5s linear");
  }
  elem.css("width", (data.currentTravelProgress / data.targetTravelProgress * 100) + "%");

}

function updateHPProgressBar() {
	var elem1 = $(".playerHPProgressBar");
  var elem2 = $(".mobHPProgressBar");

  elem1.css("width", (data.currentPlayerHP / data.maxPlayerHP * 100) + "%");
  elem2.css("width", (data.currentMobHP / data.maxMobHP * 100) + "%");

}

function updateEventProgressBar() {
	var elem = $(".eventProgressBar");
	if (data.currentEventProgress ==0)
  {
    elem.css("transition","all 0s linear");
  }else {
    elem.css("transition","all 0.5s linear");
  }
  elem.css("width", (data.currentEventProgress / data.targetEventProgress * 100) + "%");

}


function updateQuestList(){
  //clearQuestList();

  for (var i=0;i<5;i++)
  {
    if(questList[i].state =="disabled")
    {
        $('#quest'+i).hide();
        $('#quest'+i+'Name').hide();
        $('#declineQuest'+i).hide();

    }else
    {
        $('#quest'+i).show();
        $('#quest'+i+'Name').show();
        $('#declineQuest'+i).show();
        $('#quest'+i+'Name').text(questList[i].name);
    }

  }


}

function updateQuestStepsList()
{
  clearQuestStepsList();
  //$("<p>Quest log:</p>").appendTo(".quest-steps");
  $("<p>"+currentQuest.name+":</p>").appendTo(".quest-steps");
  for (var i=0;i<currentQuest.steps.length;i++)
  {
    if(i == data.currentQuestStep)
    {
        $("<p class = 'currentQuestStep'>"+currentQuest.steps[i].name+"</p>").appendTo(".quest-steps");
    }else if (i<data.currentQuestStep)
    {
      $("<p class = 'completedQuestStep'>"+currentQuest.steps[i].name+"</p>").appendTo(".quest-steps");
    }else if (i>data.currentQuestStep)
    {
      $("<p class = 'futureQuestStep'>"+currentQuest.steps[i].name+"</p>").appendTo(".quest-steps");
    }

  }

}

function clearLog(){
  $('.log').empty();
}

function clearQuestStepsList(){
  $('.quest-steps').empty();
}

function clearQuestList(){
  $('#quest-list').empty();
}



//*********************************************************************************************************************
//TRAVEL BUTTONS
$(document).ready(function(){
    $("#travelCamp").click(function(){
        travelIni(0);
    });
});

$(document).ready(function(){
    $("#travelForest").click(function(){
        travelIni(1);
    });
});

$(document).ready(function(){
    $("#travelSwamp").click(function(){
        travelIni(2);
    });
});

$(document).ready(function(){
    $("#travelMine").click(function(){
        travelIni(3);
    });
});
//*********************************************************************************************************************
//*********************************QUEST BUTTONS***********************************************************************
//*********************************************************************************************************************

//REFRESH QUEST LIST
$(document).ready(function(){
    $("#refreshQuestList").click(function(){
        if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
          generateQuest();
          updateQuestList();
        }

    });
});
//*********************************************************************************************************************
//SHOW|HIDE QUEST LIST
$(document).ready(function(){
    $("#questList").click(function(){
      if($('#questListCard').css('display') == 'none'){
        updateQuestList();
        showAdventureCard('questListCard');
      }else{
        hideAdventureCard('questListCard');
      }
    });
});


//SHOW|HIDE TRAVEL LIST
$(document).ready(function(){
    $("#travelList").click(function(){
      if($('#travelListCard').css('display') == 'none'){
        showAdventureCard('travelListCard');
      }else{
        hideAdventureCard('travelListCard');
      }
    });
});
//*********************************************************************************************************************
//START QUEST BUTTONS
$(document).ready(function(){
    $("#quest0").click(function(){
      if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
        currentQuest=questList[0];
        data.currentQuestStep = -1;
        updateQuestStepsList();
        showAdventureCard('questCard');
        acceptQuest();
        //questList[0].name ="none";
        questList[0].state ="disabled";
        sortQuests();
        updateQuestList();
      }
    });
});
$(document).ready(function(){
    $("#quest1").click(function(){
      if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
        currentQuest=questList[1];
        data.currentQuestStep = -1;
        updateQuestStepsList();
        showAdventureCard('questCard');
        acceptQuest();
        //questList[1].name ="none";
        questList[1].state ="disabled";
        sortQuests();
        updateQuestList();
      }
    });
});
$(document).ready(function(){
    $("#quest2").click(function(){
      if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
        currentQuest=questList[2];
        data.currentQuestStep = -1;
        updateQuestStepsList();
        showAdventureCard('questCard');
        acceptQuest();
        //questList[2].name ="none";
        questList[2].state ="disabled";
        sortQuests();
        updateQuestList();
      }
    });
});
$(document).ready(function(){
    $("#quest3").click(function(){
      if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
        currentQuest=questList[3];
        data.currentQuestStep = -1;
        updateQuestStepsList();
        showAdventureCard('questCard');
        acceptQuest();
        //questList[3].name ="none";
        questList[3].state ="disabled";
        sortQuests();
        updateQuestList();
      }
    });
});
$(document).ready(function(){
    $("#quest4").click(function(){
      if(data.onBattle ==0 && data.onQuest==0 && data.onEvent ==0){
        currentQuest=questList[4];
        data.currentQuestStep = -1;
        updateQuestStepsList();
        showAdventureCard('questCard');
        acceptQuest();
        //questList[4].name ="none";
        questList[4].state ="disabled";
        sortQuests();
        updateQuestList();
      }
    });
});

//*************************************************************************************
//Decline quest BUTTONS
//*************************************************************************************
$(document).ready(function(){
    $("#declineQuest0").click(function(){
      questList[0].state ="disabled";
      data.currentQuestsQuantity--;
      addLog('Quest declined');
      sortQuests();
      updateQuestList();
    });
});
$(document).ready(function(){
    $("#declineQuest1").click(function(){
      questList[1].state ="disabled";
      data.currentQuestsQuantity--;
      addLog('Quest declined');
      sortQuests();
      updateQuestList();
    });
});
$(document).ready(function(){
    $("#declineQuest2").click(function(){
      questList[2].state ="disabled";
      data.currentQuestsQuantity--;
      addLog('Quest declined');
      sortQuests();
      updateQuestList();
    });
});
$(document).ready(function(){
    $("#declineQuest3").click(function(){
      questList[3].state ="disabled";
      data.currentQuestsQuantity--;
      addLog('Quest declined');
      sortQuests();
      updateQuestList();
    });
});
$(document).ready(function(){
    $("#declineQuest4").click(function(){
      questList[4].state ="disabled";
      data.currentQuestsQuantity--;
      addLog('Quest declined');
      sortQuests();
      updateQuestList();
    });
});

//*************************************************************************************





$(document).ready(function(){
    $("#doQuest").click(function(){
        generateQuest();
    });
});

$(document).ready(function(){
    $("#change-class-novice").click(function(){
        changeClass('Novice');
    });
});

$(document).ready(function(){
    $("#change-class-fighter").click(function(){
        changeClass('Fighter');
    });
});

$(document).ready(function(){
    $("#change-class-thief").click(function(){
        changeClass('Thief');
    });
});

$(document).ready(function(){
    $("#change-class-mystic").click(function(){
        changeClass('Mystic');
    });
});


$(document).ready(function(){
    $("#accept-quest").click(function(){
        acceptQuest();
    });
});

$(document).ready(function(){
    $("#decline-quest").click(function(){
        declineQuest();
    });
});

function addLog(message)
{
  if($('.log').children().length>=25)
  {
    $('.log p:first-child').remove();
  }

  $("<p>"+message+"</p>").appendTo(".log").hide().fadeIn(400, function() {$(this).removeClass('new')});
  $('.log').animate({scrollTop: $('.log')[0].scrollHeight}, "fast");

}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function(){
    $("#change-weapon-sword").click(function(){
        changeWeapon(0);
    });
});
$(document).ready(function(){
    $("#change-weapon-dagger").click(function(){
        changeWeapon(1);
    });
});
$(document).ready(function(){
    $("#change-weapon-club").click(function(){
        changeWeapon(2);
    });
});

$(document).ready(function(){
    $("#change-weapon-staff").click(function(){
        changeWeapon(3);
    });
});

$(document).ready(function(){
    $("#change-armor-LeatherArmor").click(function(){
        changeArmor(0);
    });
});

$(document).ready(function(){
    $("#change-armor-ChainMail").click(function(){
        changeArmor(1);
    });
});
$(document).ready(function(){
    $("#change-armor-Robe").click(function(){
        changeArmor(2);
    });
});

//скрыть карточку на вкладке Adventure и уменьшить счётчик карточек
function hideAdventureCard(cardName)
{

    $('#'+cardName).hide();
    $('#'+cardName).removeClass("order-"+data.cardsCount);
    data.cardsCount--;
}

//показать карточку на вкладке Adventure и увеличить счётчик карточек
function showAdventureCard(cardName)
{
  data.cardsCount++;
  $('#'+cardName).addClass(" order-"+data.cardsCount);
  $('#'+cardName).show(500);
}
