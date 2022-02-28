const inputBtn = () =>{
    const inputArea = document.getElementById('input_area')
    const inputValue = inputArea.value
    const fetchUrl = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    
    fetch(fetchUrl)
    .then( res => res.json())
    .then( rec => showResults(rec.data))


   inputArea.value = ''
}

const showResults = mobiles => {
    console.log(mobiles)
}





// Erro Handeling Function 
