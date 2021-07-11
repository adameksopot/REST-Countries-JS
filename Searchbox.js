function Searchbox() {
    

    let search = document.getElementById('search').value.toLowerCase()
    const countries = document.getElementsByClassName('card')
   Array.from(countries).forEach((country) => {
    const title = country.textContent
    
    if(title.toLowerCase().indexOf(search) != -1){
      country.style.display = 'block';
    } else {
      country.style.display = 'none';
    }});
   
}






