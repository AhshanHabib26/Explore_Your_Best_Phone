const inputBtn = () =>{
    const inputArea = document.getElementById('input_area')
    const inputValue = inputArea.value

    if(inputValue == ''){
        inputError('inputError', 'block')
    }
    else{
        inputError('inputError', 'none')
        const fetchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    
        fetch(fetchUrl)
        .then( res => res.json())
        .then( rec => showResults(rec.data))
    
    
       inputArea.value = ''
    }
}


const showResults = mobiles => {
    const showInfo = document.getElementById('show_info')
    showInfo.textContent = ''
    const firstData = mobiles.slice(0,20)
    for (const mobile of firstData){
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 p-2 border-1 rounded">
        <img height="350px" src="${mobile.image}" class="card-img-top " alt="...">
        <div class="card-body p-3">
          <h5 class="card-title">Name: ${mobile.phone_name}</h5>
          <p class="card-text">Brand: ${mobile.brand}</p>
        </div>
        <div class="card-btn text-center">
        <a onclick="showDetails('${mobile.slug}')" class="btn btn-primary">Show Details</a>
        </div>
      </div>
        `
        showInfo.appendChild(div)
       
    }





}


const showDetails = (info) => {
   const fetchId = `https://openapi.programming-hero.com/api/phone/${info}`
   fetch(fetchId)
   .then( res => res.json())
   .then( rec => showDetailsInfo(rec.data))
}
const showDetailsInfo = info => {
   
}



// Erro Handeling Function 
const inputError = (idname, condition) =>{
    const inputErrorMsg = document.getElementById(idname)
    inputErrorMsg.style.display = condition
}