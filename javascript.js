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