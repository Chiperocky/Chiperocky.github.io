var weapons = [];
weapons[0]={
  code: "Sword",
}
weapons[1]={
  code: "Dagger",
}
weapons[2]={
  code: "Club",
}
weapons[3]={
  code: "Staff",
}

function changeWeapon(weaponId){
  data.currentWeapon = weapons[weaponId].code;
}


var armors = [];
armors[0]={
  code: "Leather armor",
}
armors[1]={
  code: "Chain mail",
}
armors[2]={
  code: "Robe",
}

function changeArmor(armorId){
  data.currentArmor = armors[armorId].code;
}
