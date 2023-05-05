var jobArray=[];
function Job(title,location,company,type, overview,requirements,workType){
    this.jobTitle=title;
    this.jobLocation=location;
    this.jobCompany=company;
    this.jobType=type;
    this.jobOverview=overview;
    this.jobRequirements=requirements;
    this.workInvolved=workType;
    
}

var job1=new Job("Web-Developer","United States of America","Google","Full Time","Lorem ipsum dolor sit amet, consectetur adipiscing ","HTML5,CSS3,Javascript,ReactJS","Create Websites");
var job2=new Job("App-Developer","India","Facebook","Part Time","Lorem ipsum dolor sit amet, consectetur adipiscing ","Flutter Django","Create apps");
var job3=new Job("Machine-learning","Australia","Tata","Full Time","Lorem ipsum dolor sit amet, consectetur adipiscing ","Python SQL Ruby","Develop new algorithms for machines");
var job4=new Job("Investment-Banker","France","Morgan Stanley","Full Time","Lorem ipsum dolor sit amet, consectetur adipiscing ","Analysing patterns candlestick","Analyse and make predictions");

jobArray.push(job1);
jobArray.push(job2);
jobArray.push(job3);
jobArray.push(job4);


for(i=0;i<jobArray.length;i++){
    document.getElementsByClassName("jobTitle")[i].innerHTML=jobArray[i].jobTitle;
    document.getElementsByClassName("jobLocation")[i].innerHTML=jobArray[i].jobLocation;
    document.getElementsByClassName("jobCompany")[i].innerHTML=jobArray[i].jobCompany;
    document.getElementsByClassName("type")[i].innerHTML=jobArray[i].jobType;
    document.getElementsByClassName("overview")[i].innerHTML=jobArray[i].jobOverview;
    document.getElementsByClassName("skills")[i].innerHTML=jobArray[i].jobRequirements;
    document.getElementsByClassName("jobRole")[i].innerHTML=jobArray[i].workInvolved;
  
}
document.getElementById("submit").addEventListener("click",function(){
    var job=new Job(document.getElementById("jobTitle").value,document.getElementById("jobLocation").value,document.getElementById("jobCompany").value,document.getElementById("type").value,document.getElementById("overview").value,document.getElementById("skills").value,document.getElementById("jobRole").value,document.getElementById("jobSalary"));
    event.preventDefault();
    jobArray.push(job);
    for(i=0;i<jobArray.length;i++){
        document.getElementsByClassName("jobTitle")[i].innerHTML=jobArray[i].jobTitle;
        document.getElementsByClassName("jobLocation")[i].innerHTML=jobArray[i].jobLocation;
        document.getElementsByClassName("jobCompany")[i].innerHTML=jobArray[i].jobCompany;
        document.getElementsByClassName("type")[i].innerHTML=jobArray[i].jobType;
        document.getElementsByClassName("overview")[i].innerHTML=jobArray[i].jobOverview;
        document.getElementsByClassName("skills")[i].innerHTML=jobArray[i].jobRequirements;
        document.getElementsByClassName("jobRole")[i].innerHTML=jobArray[i].workInvolved;
    }
    for(k=0;k<9;k++){
        var post=document.getElementsByClassName("jobTitle")[k].innerHTML;
        
        if(post!=""){
            let count=k+1;
           $("#"+count).removeClass("noUse");
        }
    }
    
})

document.getElementById("reset-button").addEventListener("click",function(){
    document.getElementById("jobForm").reset();
})

function searchActivation(country){
    for(i=0;i<jobArray.length;i++){
        let count=i+1;
        if(jobArray[i].jobLocation!=country){
            $("#"+count).addClass("noUse");
        }
    }
}


document.getElementById("countrySearch").addEventListener("click",function(){
    var location=document.getElementsByClassName("toptextbox")[1].value;
    var nation=location.toLowerCase();
    var firstLetter=location.slice(0,1).toUpperCase();
    var country=firstLetter.concat(nation.slice(1,));
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==");
    
    var requestOptions = {
       method: 'GET',
       headers: headers,
       redirect: 'follow'
    };
    
    fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.text())
    .then(fetchedResult => {
        const results = JSON.parse(fetchedResult);
        for (const result of results){
            if(country==result.name){   
              searchActivation(country);
            }else{
                var headers = new Headers();
                headers.append("X-CSCAPI-KEY", "YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==");
                
                var requestOptions = {
                   method: 'GET',
                   headers: headers,
                   redirect: 'follow'
                };
                
                fetch("https://api.countrystatecity.in/v1/states", requestOptions)
                .then(response => response.text())
                .then(fetchedResult => {
                    const results = JSON.parse(fetchedResult);
                    for (const result of results) {
                        if(country==result.name){
                            var countryCode=result.country_code;
                            var headers = new Headers();
                        headers.append("X-CSCAPI-KEY", "YTBLNHBHVkdvM2JWUEt2djhzWWZGN2ZZME5QcDZTcGtvblRlUTI2Qw==");
                
                        var requestOptions = {
                        method: 'GET',
                        headers: headers,
                        redirect: 'follow'
                       };
                       fetch("https://api.countrystatecity.in/v1/countries/"+countryCode, requestOptions)
                       .then(response =>response.text())
                       .then(fetchedResult => {
                        const result=JSON.parse(fetchedResult);
                        searchActivation(result.name);
                       });
                        }
                        
                    
                    }
                }
                )
                .catch(error => console.log('error', error));
            }
        }
    })
})
document.getElementById("roleSearch").addEventListener("click",function(){
    var jobRole=document.getElementsByClassName("toptextbox")[0].value;
    for(i=0;i<jobArray.length;i++){
        let count=i+1;
        if(jobArray[i].jobTitle!=jobRole){
            $("#"+count).addClass("noUse");
        }
    }
})
document.getElementById("typeSearch").addEventListener("click",function(){
    var type=document.getElementsByClassName("toptextbox")[2].value;
    for(i=0;i<jobArray.length;i++){
        let count=i+1;
        if(jobArray[i].jobType!=type){
           
            $("#"+count).addClass("noUse");
        }
    }
})
for(k=0;k<9;k++){
    var post=document.getElementsByClassName("jobTitle")[k].innerHTML;
    
    if(post==""){
        let count=k+1;
       $("#"+count).addClass("noUse");
    }
}
document.getElementById("resetChoice").addEventListener("click",function(){

    for(i=0;i<3;i++){
        document.getElementsByClassName("toptextbox")[i].value="";
    } 
    for(k=0;k<9;k++){
        var post=document.getElementsByClassName("jobTitle")[k].innerHTML;
        count=k+1;
        if( $("#"+count).hasClass("noUse")==true && post!="" ){
            $("#"+count).removeClass("noUse");
        }
       
    }
    
})






