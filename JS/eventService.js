

function generateEvent()
{

    if(data.onEvent ==0 && data.onQuest==1 && data.onBattle ==0)
    {
      var eventId = Math.floor(Math.random() * 30);
      if (eventId<1){
        data.onEvent = 1;
        addLog("Event started");
      }
    }


}


function doEvent()
{
  if (data.onEvent==1)
  {
    if (data.currentEventProgress >= data.targetEventProgress && data.onEvent==1) {
        addLog("Event completed");
        data.currentEventProgress = 0;
        data.onEvent = 0;


    }else{
        data.currentEventProgress += data.speed;
    }
  }


  updateEventProgressBar();
}
