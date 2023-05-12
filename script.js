function tema1(){
    const seasons = document.getElementsByTagName('li');
    const seasonNames = [...seasons].map(el => el.innerText);
    for (let i = 0; i < seasons.length; i++){
        const [season,emoji] = seasons[i].innerText.split(" ");
        seasons[i].innerText = `${emoji} anotimpul ${1+i} (urmat de ${seasonNames[(i+1)%seasons.length]})`;
    }
}
window.onload = tema1;