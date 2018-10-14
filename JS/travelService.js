function travelIni(location)
{
  if(data.currentLocation!=location)
  {
    data.targetLocation = location;
    data.onTravel = 1;
    clearLog();
    addLog('Travelling to '+data.locationResources[data.targetLocation].name);
    showAdventureCard('travelCard');
  }


}

function doTravel()
{
  if(data.onBattle ==0 && data.onTravel==1)
  {
    data.currentTravelProgress++;
    if(data.currentTravelProgress>=data.targetTravelProgress)
    {
      data.currentTravelProgress=0;
      data.onTravel = 0;
      changeLocation();
      hideAdventureCard('travelCard');
    }
    updateTravelProgressBar();
  }
}

function changeLocation()
{
  data.currentLocation=data.targetLocation;
  $('#currentLocation').text(data.locationResources[data.currentLocation].name);
  $('#questsSaved').text(data.locationResources[data.currentLocation].questsSaved);
}
