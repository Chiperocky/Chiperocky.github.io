var questRequirements = [];
var questRewards = [];

var currentQuest = {};
var questSteps =[];

//квесты будут рандомные с случайными требованиями и наградой
//нужны анлоки, видов шагов, видов целей

questSteps[0]={
  name: "Kill ",
  type: "kill",
  targets:[
    {name:"wolf "},
    {name:"boar "},
    {name:"bear "},
  ]
}
questSteps[1]={
  name: "Deliver ",
  type: "common",
  targets:[
    {name:"Box "},
    {name:"Crate "},
    {name:"Package "},
  ]
}

questRequirements[1]={
  parameter: "Class",
}
questRequirements[2]={
  parameter: "Level",
}
