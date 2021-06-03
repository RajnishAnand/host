//Curious Coders
//chat-app-module : format string
export default function encrypt(m){
  return formatString(encryptHTML(m));
};

//Below code is for Regex by Arnav
function formatString(string) {
  var str = string.toString();
  var boldRegex = /\*\*[^\*\*]+\*\*/g;
  var italicRegex = /\*\*\*[^\*\*\*]+\*\*\*/g;
  var strikeRegex = /\~[^\~]+\~/g;
  var codeRegex = /\`[^\`]+\`/g;
  var mentionRegex = /\@[^\@]+\@/g;
  var spoilerRegex = /\|\|[^\|\|]+\|\|/g;
  str = str.replace(codeRegex, inlineCodeBlock);
  str = str.replace(italicRegex, italic);
  str = str.replace(boldRegex, bold);
  str = str.replace(strikeRegex, strikeThrough);
  str = str.replace(spoilerRegex, spoiler);
  str = str.replace(mentionRegex, mention);
  str = linkify(str);
  return str;
}
function bold(str) {
  let string = str.substr(2, str.length - 4);
  return `<b>${string}</b>`;
}
function italic(str) {
  let string = str.substr(3, str.length - 6);
  return `<i>${string}</i>`;
}

function strikeThrough(str) {
  let string = str.substr(1, str.length - 2);
  return `<s>${string}</s>`;
}
function spoiler(str){
  let string = str.substr(2, str.length - 4);
  return `<span class="spoiler">${string}</span>`;
}
function inlineCodeBlock(str) {
  let string = str.substr(1, str.length - 2);
  return `<span class="inline-code">${string}</span>`;
}
function mention(str){
  let string = str.substr(1, str.length - 2);
  return `<span class="msg-mention">@${string}</span><span class="hide">@</span>`;
}
function imgURL(url) {
  if (typeof url !== 'string') return false;
  let reg = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]).(jpeg|jpg|gif|png|svg|webm|bmp|tiff|ico|webp)+\b/gmi;
  var matches = [];
  var result = [];
  url.replace(reg, function (wholeMatch) {
    result.push(wholeMatch)
    return wholeMatch;
  });
  let urlsRemoved = url.replace(reg, function (wholeMatch) {
    return "";
  })
  return { urls: result, text: urlsRemoved };
}
// <a> tag replace function
function linkify(inputText) {
  var imgObj = imgURL(inputText), text, P1, P2, P3;
  if (imgObj.text.trim() == "" || imgObj.text.trim() == " ") {
    inputText = ""
  }
  //URLs starting with http://, https://, or ftp://
  P1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  P2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  //Change email addresses to mailto:: links.
  P3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;

  text = inputText.replace(P1, '<a class="auto-link" href="$1" target="_blank">$1</a>');

  text = text.replace(P2, '$1<a class="auto-link" href="http://$2" target="_blank">$2</a>');

  text = text.replace(P3, '<a class="auto-link" href="mailto:$1">$1</a>');
  var imgs = imgObj.urls;
  for (let img of imgs) {
    text += "<img src='" + img + "' class='msg-img' onerror='removeElement(this)'/>";
  }
  return text;
}
function removeElement(el) {
  el.parentNode.removeChild(el);
}
//Custom function that escapes every symbol copied from arnav's code, hihi ...
function encryptHTML(str) {
  let regex = /[&|<|>|"|'|\\|(|)|{|}|;|$|-|!|\||\n]/g;
  let htmlString = str.toString().replace(regex, function (match) {
    if (match === "&") {
      return "&amp;";
    } else if (match === "<") {
      return "&lt;"
    } else if (match === ">") {
      return "&gt;";
    } else if (match === '"') {
      return "&quot;";
    }
    else if (match === "'") {
      return "&#39;";
    }
    /*else if(match === '/'){
      return "&#47;";
    }*/
    else if (match === '\\') {
      return "&#92;";
    }
    else if (match === '(') {
      return "&#40;";
    }
    else if (match === ')') {
      return "&#41;";
    }
    else if (match === '{') {
      return "&#123;";
    }
    else if (match === '}') {
      return "&#125;";
    }
    else if (match === ';') {
      return "&#59;";
    }
    /*else if(match === ':'){
      return "&#58;";
    }*/
    else if (match === '$') {
      return "&#36;";
    }
    /*else if(match === '+'){
      return "&#43;";
    }*/
    /*else if(match === '='){
      return "&#61;";
    }*/
    else if (match === '-') {
      return "&#45;";
    }
    /*else if(match === '%'){
      return "&#37;";
    }*/
    /*else if(match === '#'){
      return "&#35;";
    }*/
    /*else if (match === '@') {
      return "&#64;";
    }*/
    /*else if(match === '?'){
      return "&#63;";
    }*/
    else if (match === "!") {
      return "!"
    }
    else if (match === "\|") {
      return "|"
    }
    else if (match === "\n") {
      return " <br> "
    }

  });

  return htmlString;
}