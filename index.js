const changeModeText=document.querySelector("[modeText]");
const root = document.documentElement.style;
const changeModeIcon=document.querySelector("[modeIcon]");
const noResults=document.querySelector("[noResult]");
const input=document.querySelector("input");
const button=document.querySelector("button");
const avatar=document.querySelector("[avatar]");
const userName=document.getElementById("name");
const userLink=document.getElementById("user");
const userBio=document.getElementById("bio");
const joinedDate=document.getElementById("date");
const repos=document.getElementById("repos");
const followers=document.getElementById("followers");
const following=document.getElementById("following");
const location1=document.getElementById("location");
const page=document.getElementById("page");
const twitter=document.getElementById("twitter");
const company=document.getElementById("company");
const Error=document.querySelector("[errorMessage]");
let inputValue;
let result="sahil99811";
let url="https://api.github.com/users/"
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
fetcheData(url.concat(result));
button.addEventListener("click",()=>{
    inputValue=input.value;
    result="";
    if(inputValue!=null){
    result=url.concat(inputValue);
    fetcheData(result);
    }
})
input.addEventListener("keypress",(Event)=>{
    if(Event.key=="Enter")
    {    
    inputValue=input.value;
    result="";
    if(inputValue!=null){
    result=url.concat(inputValue);
    fetcheData(result);
    }
    }
});
input.addEventListener("input",()=>{
    Error.classList.remove("active");
})
async function fetcheData(result)
{   try{
    let response=await fetch(result);
    if(response.status==404)
    {
     Error.classList.add("active");
    }
    else{
    let data=await response.json();
    showData(data);
    }
    }
    catch(err)
    {
        
    }
}
const changeMode=document.getElementById("change-mode");
const body=document.querySelector("[changeBodyColour]");
const wrapper=document.querySelector("[wrapper]");
changeMode.addEventListener("click",()=>{
  const mode=changeModeText.innerText;
  if(mode=="DARK")
  {
    changeModeText.innerText="LIGHT";
    changeModeIcon.src="./images/sun-icon.svg"
     darkModeProperties();
  }
  else{
     changeModeText.innerText="DARK";
     changeModeIcon.src="./images/moon.png"
     lightModeProperties();
  }
})
function showData(data){
    avatar.src=`${data?.avatar_url}`;
    userName.innerText=`${data?.name}`;
    userLink.href=`${data?.html_url}`;
    userLink.innerText=`@${data?.login}`;
    userBio.innerText=data.bio==null?"this profile has no bio":`${data?.bio}`;
    let datesegments = data.created_at.split("T").shift().split("-");
    joinedDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    repos.innerText=`${data?.public_repos}`;
    followers.innerText=`${data?.followers}`;
    following.textContent=`${data?.following}`;
    inputValue="";
    location1.innerText=data.location==null?"Not Available":`${data?.location}`;
    page.innerText=data.blog==""?"Not Available":`${data?.blog}`;
    page.href=data.blog==""?"#":`${data?.blog}`;
    twitter.innerText=data.twitter_username==null?"Not Available":`${data?.twitter_username}`;
    twitter.href=data.twitter_username==null?"#":`https://twitter.com/${data?.twitter_username}`;
    company.innerText=data.company==null?"Not Available":`${data?.company}`;
    
}
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
  
  }
  function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    
  }
