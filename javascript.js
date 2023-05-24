let likeCheck = 0;
let counter = 100; //like urile incep de la 100
let imagesDisplay = true;

document.addEventListener('keydown', (e) => { //cand apas s (de la show) se adauga/elimina clasa "show" la pozele din dreapta, schimbandu-le display-ul
  if (e.key == 'S' || e.key == 's') {
    let images = document.querySelectorAll('#reduceri_flex div img');
    images.forEach(element => {
      if (imagesDisplay)
        element.classList.add('show') ;
      else 
        element.classList.remove('show') ;
        //element.style.display = 'none';
    });
    imagesDisplay = !imagesDisplay;
  }
});

window.onload = () => {
  const likesCounter = document.getElementById('nr_likes');
  const button = document.getElementById('like_button');
  generateLikes(); //simuleaza like uri si dislekuri prin 2 setInterval, pana se ajunge la o anumita valoare
  button.onclick = () => {
      changeLikeButton(); //vizitatorul poate da like/dislike, numarul de like uri modificandu-se cu 1
  }

  let images = document.querySelectorAll('#reduceri_flex div img');
    images.forEach(element => { element.classList.add('show') ;
  });//initial pozele au display = none

  const reviewsContainer = document.querySelector('#reviews_container');
  reviewsContainer.addEventListener('dblclick', (e) => { //la dublu click in container-ul cu review-uri, dar nu pe unul dintre review-uri, se sterg toate, s-a folosit stop propagation, deoarece la dublu click pe unul din review-uri se sterge doar el
    const divList = [...reviewsContainer.querySelectorAll('div')];
    divList.forEach(element => {
      element.remove();
  });
});

  const comanda_form = document.getElementById('comanda');
  comanda_form.addEventListener('submit', (e) => { comandaNoua(e); //cand se trimite o noua comanda
  showConfirmation();
  });
  const lista_comenzi = document.getElementById('lista_comenzi');
  lista_comenzi.addEventListener('click', (e) =>{ deleteOrders(e);}); 

  const review_form = document.getElementById('formular_review');
  review_form.addEventListener('submit', reviewNou); //s-a trimis un nou review

  let comenzi = JSON.parse(localStorage.getItem('comenzi')) || NULL;
  comenzi.forEach(element => { //la incarcarea paginii, se adauga in lista comenzile care se afla deja in local storage
    const li = document.createElement('li');
    li.textContent = `Ati comandat produsul avand codul: ${element.cod_produs}, numar de bucati: ${element.nr_bucati}`;
    li.classList.add('list_comanda');
    lista_comenzi.appendChild(li);
  });

  addEventListenerForLi(); //se executa dupa incarcarea elementelor din local storage, astfel ca la click pe una dintre comenzi se va mari fontul
  
  const titles = [...document.getElementsByTagName("h3")];
  titles.forEach(element => {element.addEventListener('contextmenu', (e) => changeTitle(e, element)); //la dublu click pe un h3 i se va modifica fontul
});

 
  function changeLikeButton(){
    if (!likeCheck){ //daca userul nu a apasat like
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
    likesCounter.innerHTML = `${counter} persoane apreciaza pagina`;
    likeCheck = 1 - likeCheck;
  };

}

function addEventListenerForLi(){ 
  const ordersList = Array.from(document.getElementsByClassName("list_comanda"));
  ordersList.forEach(element => {
    element.addEventListener('click', () =>{
      const computed_style = window.getComputedStyle(element);
      const fontSize = parseFloat(computed_style.fontSize);
      if (fontSize < 20) //nu se poate mari mai mult de 20px
        element.style.fontSize = fontSize + 0.2 + 'px';
    }); //daca s-a apasat pe un element din lista se mareste font-ul
  });
}

function deleteOrders(e) {
  if (e.target == e.currentTarget) // trebuie verificat pentru ca nu s-a folosit stop propagation; clickul a avut loc in lista, dar nu pe un element al sau, deci se vor sterge toate
    localStorage.clear(); //dupa reincarcarea paginii vor disparea
}
function showConfirmation() { //dupa trimiterea unei comenzi va aparea un mesaj care confirma comanda si spune ca va ajunge peste 4 zile
  let data_comanda = new Date();
  data_comanda.setDate(data_comanda.getDate() + 4); //aflam ce data va fi peste 4 zile
  const data_finala = data_comanda.toLocaleDateString();
  alert(`Comanda va ajunge in data de ${data_finala}.`);
}

function randomValue(max) {
  return Math.floor(Math.random() * max);
}

function reviewNou(e) {
  e.preventDefault();
  const new_review = document.createElement('div');
  const review_form = document.getElementById('formular_review');
  let criteriu = review_form.querySelector('#criteriu').value;
  let nr_stele = review_form.querySelector('#nr_stele').value;
  let continut_review = review_form.querySelector('#continut_review').value;

  nr_stele = parseInt(nr_stele);
  
  new_review.classList.add('reviews');
  new_review.addEventListener('dblclick', (e) => {
    e.stopPropagation(); 
    new_review.remove(); //la dublu-click pe un review se va sterge
  });

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
  if (criteriu == 'servicii curierat') r = 255; //review-ul va avea o culoare de baza in functie de criteriul ales
  else if (criteriu == 'calitate produse') g = 255;
  else b = 255;

  if (continut_review.length > 40){
      p.textContent = continut_review.substr(0, 40); //folosim functii pe stringuri pentru a ne asigura ca afisam din comentariu doar primele 40 de caractere
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
}

function comandaNoua(e) {
  e.preventDefault(); //va anula comportamentul default de la submit

  const lista_comenzi = document.getElementById('lista_comenzi');
  const cod_prod = document.getElementById('cod_produs').value;
  const nr_buc = document.getElementById('nr_bucati').value;
  
  let cod_pr_reg = /\d{2,4}/; 
  if (!cod_pr_reg.test(cod_prod)) { //verificam printr-o expresie regulata daca codul produsului este intre 2 si 4 caractere, deoarece alte produse nu sunt disponibile
    alert('Produsul nu este valabil!');
    return;
  }
  
  const li = document.createElement('li');
  li.textContent = `Ati comandat produsul avand codul: ${cod_prod}, numar de bucati: ${nr_buc}`;
  lista_comenzi.appendChild(li);
  li.classList.add('list_comanda');
  li.addEventListener('click', () =>{ //se adauga eventul si pentru noua comanda; nu folosim stopPropagation, deci clickul se va propaga si la lista care are un event listener pt click
    const computed_style = window.getComputedStyle(li); //folosim functia pentru a determina dimensiunea actuala a fontului
    const fontSize = parseFloat(computed_style.fontSize);
    if (fontSize < 20)
        li.style.fontSize = fontSize + 0.2 + 'px';
  });

  const comanda = {
    cod_produs: cod_prod, nr_bucati: nr_buc}; //cream un nou obiect
  
  let comenzi = []; 
  try {
    comenzi = JSON.parse(localStorage.getItem('comenzi')) || []; //accesam comenzile existente in spatiul de stocare
  } catch (error) {
    comenzi = [];
  }
  comenzi.push(comanda); //adaugam noua comanda la restul comenzilor
  localStorage.setItem('comenzi', JSON.stringify(comenzi));
}

function generateLikes(){
  let intervalId1 = null;
  let intervalId2 = null;
    intervalId1 = setInterval(() => {
        counter++;
        document.getElementById('nr_likes').innerHTML = counter +  ' persoane apreciaza pagina';
        if (counter > 210)
          clearInterval(intervalId1);
      }, 2000);

    intervalId2 = setInterval(() => {
        counter--;
        document.getElementById('nr_likes').innerHTML = counter +  ' persoane apreciaza pagina';
        if (counter > 205)
          clearInterval(intervalId2);
      }, 7000);
}

function changeTitle(e, h3){ //schimba culoarea dupa 1000 ms si o schimba inapoi dupa 3000 ms
  e.preventDefault();
  const color = e.target.style.color;
  setTimeout(()=>{
    h3.style.color = "rgba(142, 26, 138, 0.849)";
  }, 1000
  )
  setTimeout(()=>{
    h3.style.color = color;
  }, 3000
  )
}


