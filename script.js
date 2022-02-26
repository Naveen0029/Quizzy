var quizController = (function(){
   //question constructor

   function Question(id,questionText,options,correctAnswer){
       this.id=id;
       this.questionText= questionText;
       this.options=options;
       this.correctAnswer = correctAnswer;
   }

   var questionLocalStorage = {
       setQuestionCollection: function(newCollection){
           localStorage.setItem('questionCollection',JSON.stringify(newCollection));

       },
       getQuestionCollection: function(){
           return JSON.parse(localStorage.getItem('questionCollection'));
       },
       removeQuestionCollection:function(){
           localStorage.removeItem('questionCollection');
       }
   }
   return {
       addQuestionOnLocalStorage: function(newQuestText,opts){
           var optionsArr,corrAns,questionId,newQuestion,getStoredQuests,isChecked;

           if(questionLocalStorage.getQuestionCollection()=== null){
               questionLocalStorage.setQuestionCollection([]);
           }

           optionsArr = [];//calculating total options
        
            for(var i=0;i<opts.length;i++){
                if(opts[i].value!==""){
                    optionsArr.push(opts[i].value);
                }

                if(opts[i].previousElementSibling.checked && opts[i].value!==""){
                    corrAns = opts[i].value;
                    isChecked=true;
                }
            }
           //[ {id:0} {id:1}]
           if(questionLocalStorage.getQuestionCollection().length>0){
               questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length-1].id+1;
           }
           else {
               questionId = 0;
           }

        if(newQuestText.value!==""){
             if(optionsArr.length>1){
                 if(isChecked){
           newQuestion = new Question(questionId,newQuestText.value,optionsArr,corrAns);
           
           getStoredQuests = questionLocalStorage.getQuestionCollection();

           getStoredQuests.push(newQuestion);

           questionLocalStorage.setQuestionCollection(getStoredQuests);

           newQuestText.value = "";
           for(var x=0;x<opts.length;x++){
               opts[x].value="";
               opts[x].previousElementSibling.checked = false;
           }

           console.log(questionLocalStorage.getQuestionCollection());
             }
             else{
                 alert('You missed to check correct answer, or you checked answer without value');
             }
           }
           else{
               alert('You Must Add Atleast Two Options');
           }
        }
        else{
            alert('Please Insert The Question');
        }
       }
   }

})();

var UIController = (function(){
    var domItems={
        questInsertBtn:document.getElementById("question-insert-btn"),
        newQuestionText:document.getElementById("new-question-text"),
        adminOptions:document.querySelectorAll(".admin-option")
    }

    return {
        getDomItems:domItems
    }
    
})();

var controller = (function(quizCtrl,UICtrl){
    var selectedDomItems = UICtrl.getDomItems;
    selectedDomItems.questInsertBtn.addEventListener('click',function(){
        quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText,selectedDomItems.adminOptions);
    })
})(quizController,UIController);