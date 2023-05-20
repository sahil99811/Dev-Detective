const changeModeText=document.querySelector("[modeText]")
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
console.log(Error);
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

function showData(data){
    avatar.src=`${data?.avatar_url}`;
    userName.innerText=`${data?.name}`;
    userLink.href=`${data?.url}`;
    userLink.innerText=`@${data?.login}`;
    userBio.innerText=data.bio==null?"this profile has no bio":`${data?.bio}`;
    let datesegments = data.created_at.split("T").shift().split("-");
    joinedDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    repos.innerText=`${data?.public_repos}`;
    followers.innerText=`${data?.followers}`;
    following.textContent=`${data?.following}`;
    inputValue="";
    location1.innerText=data.location==null?"Not Available":`${data?.location}`;
    page.innerText=data.blog!=null?"Not Available":`${data?.blog}`;
    page.href=data.blog==null?"#":`${data?.blog}`;
    twitter.href=data.twitter_username==null?"Not Available":`https://twitter.com/${data?.twitter_username}}`;
    company.innerText=data.company==null?"Not Available":`${data?.company}`;
    
}