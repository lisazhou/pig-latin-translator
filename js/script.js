var engToPigBtn = document.getElementById('pig-translation-btn');
engToPigBtn.addEventListener('click', translateToPig);
var pigToEngBtn = document.getElementById('eng-translation-btn');
pigToEngBtn.addEventListener('click', translateToEng);

function translateToPig() {
  var input = document.getElementById('translation-input').value;
  var outputContainer = document.getElementById('translated');
  var output = document.getElementById('translated-text');
  if (input === ""){
    if (document.getElementById('translation-input').placeholder === 'Please type something to translate.'){
      document.getElementById('translation-input').placeholder = 'This translator works best when you type in text to translate.';
    }else{
      document.getElementById('translation-input').placeholder = 'Please type something to translate.';
    }
  }else{
    var translated = englishToPig(input);
    output.innerHTML = translated;
    outputContainer.setAttribute("style", "display:block");
  }
}

function translateToEng() {
  var input = document.getElementById('translation-input').value;
  var outputContainer = document.getElementById('translated');
  var output = document.getElementById('translated-text');
  if (input === ""){
    if (document.getElementById('translation-input').placeholder === 'Please type something to translate.'){
      document.getElementById('translation-input').placeholder = 'This translator works best when you type in text to translate.';
    }else{
      document.getElementById('translation-input').placeholder = 'Please type something to translate.';
    }
  }else{
    var translated = pigToEnglish(input);
    output.innerHTML = translated;
    outputContainer.setAttribute("style", "display:block");
  }
}

function englishToPig(engString){
  if (typeof engString !== 'string'){
    throw new Error();
  }
  //1. seperate sentence into array
  var seperate = engString.split(' ');
  for (var i = 0; i < seperate.length; i++){
    //2. take each word and split based on if it starts with vowel or consonant ('y' considered vowel if within word)
    var splitUp = seperate[i].split(/([aeiouyAEIOUY].*)/);
    //this string starts with a vowel
    if (splitUp[0].length === 0){
      if (splitUp[1].charAt(0) === 'y' || splitUp[1].charAt(0) === 'Y'){ //if word begins with 'y' then considered consonant
        var secondSplit = splitUp[1].split(/([aeiouAEIOU].*)/);
        if (secondSplit.length === 1){ //this is just the letter 'y'
          splitUp[1] += 'ay';
        }else{
          secondSplit[0] += 'ay';
          secondSplit[1] += '-';
          splitUp = secondSplit.reverse();
        }
      }else{
        splitUp[1] += 'ay';
      }
    }else if (splitUp.length === 1){ //this string does not have vowels
      splitUp[0] +='-ay';
    }else{ //this string begins with a consonant
      splitUp[0] += 'ay';
      splitUp[1] += '-';
      splitUp.reverse();
    }
    //3. put the word back together
    seperate[i] = splitUp.join('');
  }
  //4. put the sentence back together
  return seperate.join(' ');
}

function pigToEnglish(pigString) {
  if (typeof pigString !== 'string'){
    throw new Error();
  }
  //1. seperate sentence into array
  var seperate = pigString.split(' ');
  //2. take each word and remove/move the end based on if appended with "ay" or "'-' + consonant + 'ay'"
  for (var i = 0; i < seperate.length; i++) {
    //this will be an English word that begins with a vowel
    if (seperate[i].indexOf('-') === -1){
      seperate[i] = seperate[i].slice(0, -2);
    }else{ //this will be an English word that begins with a consonant
      var clippedEnd = seperate[i].slice(0, -2);
      seperate[i] = clippedEnd.split('-').reverse().join('');
    }
  }
  //3. put the sentence back together
  return seperate.join(' ');
}