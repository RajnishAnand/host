//Copy module
//created by Rajnish Anand


export default function copy(txt){
  navigator.clipboard.writeText(txt).then(()=>{},()=>{
    try{
      let inp=document.createElement('input');
      inp.value=txt;
      document.body.appendChild(inp);
      inp.focus();
      inp.select();
      document.execCommand('copy');
      inp.blur();
      document.body.removeChild(inp);
    }
    catch(err){
      prompt('automatic copy failed! please copy it manually : ',txt);
    }
  });
};