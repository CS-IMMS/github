const APICALL = "https://api.github.com/users/";
let gitForm = document.querySelector('.form-github-recherche');
let inputRecheche = document.querySelector('.inp-recherche')
let affichageCart = document.querySelector('.affichage');
let lesRepos = document.querySelector('.dropend');
let listRepo = document.querySelector('.merde');
let repoListe = document.getElementById('get-repo');
let select;
//console.log(lesRepos);
//let repositorie = 'https://api.github.com/users/repos';
//https://api.github.com/users/CS-IMMS/repos

async function dataGithub(utilisateur) {
    try {
        const reponse1 = await fetch(`${APICALL}${utilisateur}`);
        const data1 = await reponse1.json();
        creationCarte(data1)
        //console.log(data1);
    } catch(e){
        console.log(e)
        location.reload()
    }
   


    
   
    
} 

//clone_url
//<a href=""></a>
async function afficheRepos(utilisateur) {    
 try{
    const reponse2 = await fetch(`https://api.github.com/users/${utilisateur}/repos`);
    const data2 = await reponse2.json();

    select = "<div>";
        select+="<ul>"
    for (let i of data2) {
        select+="<li>"
      select += `<a href=${i.clone_url} target='_blank'>`;
      select +=  i.name;
      select += "</a>";
      select+="</li>"
 
    }
    select+="</ul>"
         select += "</div>";
         document.getElementById(utilisateur).innerHTML=select
 }catch(e){
  console.log(e);
 }
    
}



function creationCarte(user) {

  
    const newDiv = document.createElement("div");
    newDiv.classList.add("row");
    newDiv.innerHTML=
 `
       <div class="carte col-6 mb-5 my-5">
        <img src="${user.avatar_url}" alt="icone avatar" class="avatar">
        <ul class="cont-infos">
            <li >Name:${user.name}</li>
            <li >username:${user.login}</li>
            <li >github: <button type="button" class="btn btn-primary "><a href="${user.html_url}" class="text-white">link</a></button></li>
            <li >Repos Public :<button type="button" class="btn btn-primary">   <a href="${user.html_url}" class="text-white">${user.public_repos}</a></button>
          
            </li>
        </ul>
        </div> 
        <div class="col-6">
        <div class="col-2">
        <button onclick="afficheRepos('${user.login}')" class="mt-5">get repos</button>
        </div>
        <div class="col-4 " id='${user.login}' style="overflow-y: scroll; height:200px;">
        </div>
        </div>
       
    ` 
    // newDiv.appendChild(node)

    affichageCart.append(newDiv)
}
gitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(inputRecheche.value.length ==''){
        alert('veiller saisir un non utilisateur')
        location.reload()
    }
    if (inputRecheche.value.length !=='') {
        //console.log(inputRecheche.value);
        dataGithub(inputRecheche.value);
        // afficheRepos(inputRecheche.value);
        inputRecheche.value='';
    }
 if (inputRecheche.value.length == undefined){
        alert('erreur')
     
    } 
}); 


