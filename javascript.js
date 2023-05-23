let likeCheck = 0;
let counter = 100;

window.onload = () => {
    const likesCounter = document.getElementById('nr_likes');
    const button = document.getElementById('like_button');
    generateLikes();
    button.onclick = () => {
      changeLikeButton();
  }

  function changeLikeButton(){
    if (!likeCheck){
      counter++;
      button.style.background = "rgb(208, 91, 91)";
      button.style.color = "rgb(0, 255, 153)";
      button.innerText = 'Dislike';
    }
    else{
      counter--;
      button.style.color = "rgb(158, 17, 68)";
      button.style.background = "#7affca";
      button.innerHTML = 'Like';
    }
    likesCounter.innerHTML = `${counter} LIKES`;
    likeCheck = 1 - likeCheck;
  };

  const reviewsContainer = document.querySelector('#reviews_container');
  reviewsContainer.addEventListener('dblclick', (e) => {
      const divList = reviewsContainer.querySelectorAll('div');
      divList.forEach(element => {
        element.remove();
      });
  });

  const form = document.getElementById('formular_review');
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      const new_review = document.createElement('div');
    
      let criteriu = form.querySelector('#criteriu').value;
      let nr_stele = form.querySelector('#nr_stele').value;
      let continut_review = form.querySelector('#continut_review').value;
    
      nr_stele = parseInt(nr_stele);
      
      new_review.classList.add('reviews');
      const h3 = document.createElement('h3');
      const sp = document.createElement('span');
      for (let i = 0; i < nr_stele; i++) {
        sp.innerHTML += '&#9733;';
      }
      for (let i = 0; i < 10 - nr_stele; i++){
        sp.innerHTML += '&star;';
      }
      p = document.createElement('p');
      let r = randomValue(200);
      let b = randomValue(200);
      let g = randomValue(200);
      if (criteriu == 'servicii curierat') r = 255;
      else if (criteriu == 'calitate produse') g = 255;
      else b = 255;
  
      if (continut_review.length > 40){
          p.textContent = continut_review.substr(0, 40);
          alert('Continutul review-ului nu poate depasi 40 de caractere!');
      }
      else p.textContent = continut_review;

      p.style.color = `rgb(${r}, ${g}, ${b})`;
      h3.style.color = `rgb(${r}, ${g}, ${b}, 0.5)`;
      h3.style.fontWeight = '800';
      sp.style.color = "rgba(226, 183, 183, 0.849)";
      sp.style.align = 'middle';
      h3.innerHTML = 'Criteriu selectat: ' + criteriu;
      new_review.append(h3, sp, p);
      document.querySelector('#reviews_container').append(new_review);

      new_review.addEventListener('dblclick', (e) => {
        e.stopPropagation(); 
        new_review.remove();
      });

      function randomValue(maxim) {
        return Math.floor(Math.random() * maxim);
      }
    });
}

function generateLikes(){
    setInterval(() => {
        counter++;
        document.getElementById('nr_likes').innerHTML = counter +  ' LIKES';
      }, 2000);

    setInterval(() => {
        counter--;
        document.getElementById('nr_likes').innerHTML = counter +  ' LIKES';
      }, 7000);
}

