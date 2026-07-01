let plus_btn=document.querySelectorAll(".plus");
let minus_btn=document.querySelectorAll(".minus");
let read_more=document.querySelectorAll(".read-more");
let dialog=document.querySelectorAll(".animal-details");
let close_btn=document.querySelectorAll(".close");
let select=document.querySelector("select");
let animal_card=document.querySelectorAll(".card");
let sections=document.querySelectorAll(".animals-6,.animals-12,.animals-18,.animals-24");
let showMoreBtn=document.querySelectorAll(".show-more");
let showLessBtn=document.querySelectorAll(".show-less");
let logInBtn=document.querySelector("#sign-inBtn");
let signIn=document.querySelector(".accountCreated");
let signUp=document.querySelector(".create-account");
let logInDialog=document.querySelector(".log-in");
let logUpDialog=document.querySelector(".log-up");
let closeBtn=document.querySelectorAll(".closeBtn");

logInBtn.addEventListener('click',()=>{
   logUpDialog.showModal();
});

signUp.addEventListener('click',()=>{
    logInDialog.close();
    logUpDialog.showModal();
});

signIn.addEventListener('click',()=>{
    logUpDialog.close();
    logInDialog.showModal();
});

closeBtn.forEach(btn =>{
    btn.addEventListener('click',()=>
    {
        btn.closest("dialog").close();
    });
});
if(sections){
sections.forEach((section,index) =>{
   section.style.display=index=== 0?'':'none';
});
} 

showMoreBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
       const currentSection=btn.closest(".animals-6,.animals-12,.animals-18");
       let array=Array.from(sections);
       let indCurrSection=array.indexOf(currentSection);
       let nextSection=array[indCurrSection + 1];
       if(nextSection) {
        nextSection.style.display='';
       }
    });

});
showLessBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
       const currentSection=btn.closest(".animals-12,.animals-18,.animals-24");
       let array=Array.from(sections);
       let indCurrSection=array.indexOf(currentSection);
      // let nextSection=array[indCurrSection+1];
for (let i = indCurrSection; i < array.length; i++) {
      array[i].style.display = "none";
    }    
});
});

if(select){
    select.addEventListener("change",()=>{
    const fivalue=select.value;
    animal_card.forEach(card =>{
        const match=fivalue==='all' || card.dataset.category === fivalue ;
        card.style.display=match? '':'none';

    });
});

}
plus_btn.forEach(btn  =>{ 
    btn.addEventListener("click", ()=>{
   let count= btn.previousElementSibling;
count.textContent=Number(count.textContent) + 1;
}
    );


});

minus_btn.forEach(btn =>{
    btn.addEventListener("click",()=>{ 
           let count=btn.nextElementSibling;
           if(count.textContent>0)
             count.textContent=Number(count.textContent)-1;
});
});

read_more.forEach((btn,index) =>{
    btn.addEventListener("click",()=>{
        dialog[index].showModal();
    });
});

close_btn.forEach((btn) =>{
    btn.addEventListener("click",()=>{
        btn.closest("dialog").close();
    });
});
