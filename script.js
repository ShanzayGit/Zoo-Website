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
let tickets=document.querySelector(".tickets");
let signedIn=document.querySelector('#sign-in');
let signedUp=document.querySelector('#sign-up');
let ticketBtn=document.querySelector('#ticket-btn');
let ticketCards=document.querySelectorAll(".ticket");
let numOfTickets=document.querySelector('#no-of-tickets');
let totalPrice=document.querySelector('#total');
let cancel=document.querySelector("#cancel");
let cancelTour=document.querySelector('#cancel-tour');
let purchaseTour=document.querySelector('.tour-purchase');
let tourBtn=document.querySelector("#tour-btn");
let viewZooBtn=document.querySelector("#view-zoo-btn");
let zooMap=document.querySelector('#zoo-map');
let cancelMap=document.querySelector('#zoo-map-cancel');
let logInStatus=false;

if(zooMap){
  viewZooBtn.addEventListener('click',()=>{
    zooMap.showModal();
  });
}

if(cancelMap){
    cancelMap.addEventListener('click',()=>{
        zooMap.close();
    });
}

function updateTicketSummary(){
    let totalCount=0;
    let totalPriceOfTickets=0;

    ticketCards.forEach(card =>{
        let price=+(card.dataset.price);
        let count=+(card.querySelector('.count').textContent);
        totalCount+=count;
        totalPriceOfTickets+=count*price;
    });
    if(numOfTickets) numOfTickets.value=totalCount;
    if(totalPrice) totalPrice.value='$ '+totalPriceOfTickets;
};

if(purchaseTour){
    tourBtn.addEventListener('click',()=>{
        if(logInStatus){
        purchaseTour.showModal();
        }
        else{
        logUpDialog.showModal();
        }

    });
}

if(cancelTour){
    cancelTour.addEventListener('click',()=>{
    purchaseTour.close();
    });
}


if(tickets){
    ticketBtn.addEventListener('click',()=>{
        if(numOfTickets.value==0){
            alert("Please select atleast one ticket");
        }
        else{
        if(logInStatus){
        tickets.showModal();
        }
        else{
        logUpDialog.showModal();
        if(logInStatus){
           ticketBtn.addEventListener('click',()=>{
           tickets.showModal();
        });  
        }
    }

    }
    });
}

if(cancel){
    cancel.addEventListener('click',()=>{
       ticketCards.forEach(card =>{
        card.querySelector('.count').textContent='0';
    });
    updateTicketSummary();
    tickets.close();
    })
}
signedIn.addEventListener('click',(e)=>{
    e.preventDefault();
    logInStatus=true;
    logInDialog.close();
});

signedUp.addEventListener('click',(e)=>{
    e.preventDefault();
    logInStatus=true;
    logUpDialog.close();
});

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
        btn.style.display='none';
        let showLess=currentSection.querySelector('.show-less');
        if(showLess)
        {
            showLess.style.display='none';
        }
       }
    });

});
showLessBtn.forEach((btn)=>{
    btn.addEventListener('click',()=>{
       const currentSection=btn.closest(".animals-12,.animals-18,.animals-24");
       let array=Array.from(sections);
       let indCurrSection=array.indexOf(currentSection);
for (let i = indCurrSection; i < array.length; i++) {
      array[i].style.display = "none";

    }  
  if(indCurrSection>=0){
    let showMore=array[indCurrSection-1].querySelector(".show-more");
    let showLess=array[indCurrSection-1].querySelector(".show-less");
    
    if(showMore){
        showMore.style.display='';
    }
    if(showLess){
        showLess.style.display='';
    }
}
});
});

let noResults=document.querySelector('.no-results');
if(select){
    select.addEventListener("change", () => {
        const fivalue = select.value;
        let hasMatch=false;

        animal_card.forEach(card => {
            const match = fivalue === 'all' || card.dataset.category === fivalue;
            card.style.display = match ? '' : 'none';
            if(match) hasMatch=true;
        });

        if (fivalue === 'all') {
            // restore the normal paginated behavior
            sections.forEach((section, index) => {
                section.style.display = index === 0 ? '' : 'none';
            });
            showMoreBtn.forEach((btn, i) => btn.style.display = i === 0 ? '' : 'none');
            showLessBtn.forEach(btn => btn.style.display = 'none');
        } else {
            // reveal every section that contains at least one matching card
            sections.forEach(section => {
                const hasMatch = section.querySelector(`.card[data-category="${fivalue}"]`);
                section.style.display = hasMatch ? '' : 'none';
            });
            // no need for pagination controls while a filter is active
            showMoreBtn.forEach(btn => btn.style.display = 'none');
            showLessBtn.forEach(btn => btn.style.display = 'none');
        }
        noResults.style.display=hasMatch?'none':'';
    });
}

plus_btn.forEach(btn  =>{ 
    btn.addEventListener("click", ()=>{
   let count= btn.previousElementSibling;
count.textContent=Number(count.textContent) + 1;
updateTicketSummary();
});


});

minus_btn.forEach(btn =>{
    btn.addEventListener("click",()=>{ 
           let count=btn.nextElementSibling;
           if(count.textContent>0)
             count.textContent=Number(count.textContent)-1;
        updateTicketSummary();
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
