const inputBtn = () =>{
    inputValueShow('spinnerShow', 'block')
    const inputArea = document.getElementById('input_area')
    const inputValue = inputArea.value

    if(inputValue == ''){
        inputValueShow('inputError', 'block')
        inputValueShow('spinnerShow', 'none')
        inputValueShow('notFindError', 'none')
        document.getElementById('modal_show').innerHTML = ""
    }
    else{
        inputValueShow('inputError', 'none')
        document.getElementById('modal_show').innerHTML = ""
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
    if( mobiles.length == 0){
        inputValueShow('notFindError', 'block')
        inputValueShow('spinnerShow', 'none')
    }
    else{
        inputValueShow('notFindError', 'none')
        const firstData = mobiles.slice(0,20)
        for (const mobile of firstData){
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
            <div class="card h-100 p-3 border-1 rounded">
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
            inputValueShow('spinnerShow', 'none')
            document.getElementById('modal_show').innerHTML = ""
           
        }
    }
}


const showDetails = (info) => {
   const fetchId = `https://openapi.programming-hero.com/api/phone/${info}`
   fetch(fetchId)
   .then( res => res.json())
   .then( rec => showDetailsInfo(rec.data))
}
const showDetailsInfo = info => {
    const modalShow = document.getElementById('modal_show')
    modalShow.innerHTML = `
    <div class="card mb-3"  >
        <div class="row g-0 p-3">
            <div class=" col-sm-6 col-md-4 col-lg-4">
                <img src="${info.image}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-sm-6 col-md-8 col-lg-8">
                    <div class="card-body">
                      <h5 class="card-title">Mobile Name: ${info.name}</h5>
                      <p class="card-text">Release Date : ${info.releaseDate ? info.releaseDate : 'Relase Date Not Found'}</p>
                      <hr>
                      <p class="card-text">Storage: ${info.mainFeatures.storage}</p>
                      <p class="card-text">Display Size: ${info.mainFeatures.displaySize}</p>
                      <p class="card-text">Chip Set: ${info.mainFeatures.chipSet}</p>
                      <p class="card-text">Mamory: ${info.mainFeatures.memory}</p>
                      <ul class="list-group">
                      <h5 class="card-title">Sensors</h5>
                            <li class="list-group-item border-0">1. ${info.mainFeatures.sensors[0]}</li>
                            <li class="list-group-item border-0">2. ${info.mainFeatures.sensors[1]}</li>
                            <li class="list-group-item border-0">3. ${info.mainFeatures.sensors[2]}</li>
                            <li class="list-group-item border-0">4. ${info.mainFeatures.sensors[3]}</li>
                            <li class="list-group-item border-0">5. ${info.mainFeatures.sensors[4]}</li>
                            <li class="list-group-item border-0">6. ${info.mainFeatures.sensors[5]}</li>
                        </ul>
                    <ul class="list-group">
                      <h5 class="card-title">Others</h5>
                            <li class="list-group-item border-0">1. ${info.others.WLAN}</li>
                            <li class="list-group-item border-0">2. ${info.others.Bluetooth}</li>
                            <li class="list-group-item border-0">3. ${info.others.GPS}</li>
                            <li class="list-group-item border-0">4. ${info.others.NFC}</li>
                            <li class="list-group-item border-0">5. ${info.others.Radio}</li>
                            <li class="list-group-item border-0">6. ${info.others.USB}</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
    ` 
    const showInfo = document.getElementById('show_info')
    showInfo.textContent = ''
}



// Erro Handeling Function 
const inputValueShow = (idname, condition) =>{
    const inputMsg = document.getElementById(idname)
    inputMsg.style.display = condition
}

