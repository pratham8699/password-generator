const inputslider = document.querySelector("[data-lengthslider]");
const copymessage = document.querySelector("[Datacopymessage]");
const allcheckbox = document.querySelectorAll("Input[type = checkbox]");
const passwordstrengthindicator = document.querySelector("[data-indicator]");
const uppercase = document.querySelector("[Uppercase]");
const lowercase = document.querySelector("[Lowercase]");
const symbol = document.querySelector("[symbols]");
const number = document.querySelector("[numbers]");
const generatebutton = document.querySelector("[gneratepassword]");
const lengthdisplay = document.querySelector("[data-lengthnumber]");
const passworddisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[copybutton]");

let password = "";
let passwordlength = 5;
let checkcount = 0;
let symbolstr = "()*&^%$!@#~/}{?";

function copycontrol(){


}
function handleslider(){
    inputslider.value = passwordlength;
    lengthdisplay.textContent = passwordlength;

}
handleslider();
function generatepassword(){


}
function setindicator(color){
    passwordstrengthindicator.style.backgroundColor = color;

}
function getrandominteger(min,max){
    return Math.floor(Math.random()*(max-min)+min);

}
function generaterandomnumber(){
    return getrandominteger(0,9);
}
function calculatestrength(){
    let hasuppercase = false;
    let haslowercase = false;
    let hassymbol = false;
    let hasnumber = false;
    if(uppercase.Checked){
        hasuppercase = true;
    }
    if(lowercase.Checked){
        haslowercase = true;
    }
    if(symbol.Checked){
        hassymbol = true;
    }
    if(number.Checked){
        hasnumber = true;
    }

    if((hasuppercase && haslowercase) && (hasnumber && hassymbol) && passwordlength>=8){
        setindicator(Red);
    }
    else if((hasuppercase & haslowercase) && passwordlength>=6){
        setindicator(yellow);
    }
    else{
        setindicator(blue);
    }


}
function getrandomUppercase(){
    return String.fromCharCode(getrandominteger(65,91));

}
function getrandomlowercase(){
    return String.fromCharCode(getrandominteger(97,123));


}
function getrandomsymbol(){
    return symbolstr.charAt(getrandominteger(0,symbolstr.length));

    
}

async function copycontent(){
    try {

        await navigator.clipboard.writeText(passworddisplay.value);
        copymessage.textContent = "Copied";

    }
    catch{

        copymessage.textContent = "failed while copying the text";

    }

    copymessage.classList.add("active");

    setTimeout(() => {
        copymessage.classList.remove("active");
        
    },2000);
}

inputslider.addEventListener('input', (e)=>{
   passwordlength = e.target.value;
   handleslider();
});

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value){
        copycontent();

    }
});

function checkbox(){
    let checkboxcount = 0;
    allcheckbox.forEach((box)=>{
        if(box.checked){
            checkcount+=1;
        }


    });


    if(passwordlength<checkboxcount){
        passwordlength = checkboxcount;
        handleslider();
    }
}
allcheckbox.forEach((check)=>{
    check.addEventListener('change',checkbox);
})


generatebutton.addEventListener('click',()=>{
   if(checkcount<=0){
    return;
   }
   if(passwordlength<=checkcount){
    passwordlength = checkcount;
    handleslider();

   }

// if(uppercase.checked){
//     password+=getrandomUppercase();
// }
// if(lowercase.checked){
//     password+=getrandomlowercase();
// }
// if(number.checked){
//     password+=generaterandomnumber();
// }
// if(symbol.checked){
//     password+=getrandomsymbol();
// }

let functionarr = [];
if(uppercase.checked){
    functionarr.push(getrandomUppercase);

}
if(lowercase.checked){
    functionarr.push(getrandomlowercase);
}
if(number.checked){
    functionarr.push(generaterandomnumber);

}
if(symbol.checked){
    functionarr.push(getrandomsymbol);
}

for(let i = 0;i<functionarr.length;i++){
    password+=functionarr[i]();
}
for(let i = 0; i<= passwordlength-functionarr.length;i++){
    let randindex = getrandominteger(0,functionarr.length);
    password+=functionarr[i]();
}

passworddisplay.value = password;
password = shufflepassword();

});

