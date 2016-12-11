$(document).ready(function(){
    console.log("Ready!");
    
    var submitBut = document.getElementById("submit");
    
    var newPost = document.getElementById("post");
    
    var OMDB = "http://www.omdbapi.com/?t="
    
    var nameInput  = document.getElementById("name_input");
    var imageInput = document.getElementById("image_input");
    var movieInput = document.getElementById("movie_input");    
    var commentInput = document.getElementById("comment_input");
    
    submitBut.onclick = function(){
        if(userEx.test(nameInput.value) && imageEx.test(imageInput.value) && movieEx.test(movieInput.value) && commentEx.test(commentInput.value)){
            newPost.innerHTML="";

            var newObj = document.createElement("div");
            newObj.id = "newBox";

            var newMovie = document.createElement("div");
            $.ajax({
                url:OMDB+movieInput.value,
                dataType:"jsonp",
                success:function(resp){
                    console.log(resp);
                    var imgDiv = document.createElement("img");
                        imgDiv.src = resp.Poster;
                        imgDiv.style.width="100px";
                        imgDiv.style.height="auto";
                        newMovie.appendChild(imgDiv);
                }
            })
            newMovie.id = "newMovie";
            newObj.appendChild(newMovie);

            var newImg = document.createElement("img");
            newImg.src = imageInput.value;
            newImg.id = "newImage";
            newObj.appendChild(newImg);

            var newName = document.createElement("div");
            newName.innerHTML = nameInput.value;
            newName.id = "newUsername";
            newObj.appendChild(newName);

            var newComm = document.createElement("div");
            newComm.innerHTML = commentInput.value;
            newComm.id = "newComment";
            newObj.appendChild(newComm);

            newPost.appendChild(newObj);
        } else {
            newPost.innerHTML="<b><h2>One or more inputs are incorrect / not entered. Please fix before proceeding!</h2></b>"
        }
    }
    
    // compare something (string) to see if the inside word exists
    // ^ = must start with / $ = must end with / ^$ = must be exact word
    var userEx = /^[A-Za-z0-9]{8,15}$/;
    // [] = the range of characters to allow
    // () = grouped conditions / | = or
    // ? = optional
    // {} minimum,maximum length
    var imageEx = /(.jpg|.png|.gif){1,}$/;
    var movieEx = /^[A-Za-z ]{1,}$/;    
    var commentEx = /^[A-Za-z0-9.,?! ]{1,100}$/;
    
    var errorDiv = document.getElementById("error_msg");
    
    nameInput.onkeyup = function(){
        if(userEx.test(nameInput.value)){
            // change to same colour if it matches
            nameInput.style.color = "royalblue";
            errorDiv.innerHTML = "Your username is correctly inputted!";
        } else {
            // change to red if it doesn't match
            nameInput.style.color = "red";
            errorDiv.innerHTML = "Your username must have 8-15 alphabets or numbers.";
        }
    }
    
    imageInput.onkeyup = function(){
        if(imageEx.test(imageInput.value)){
            // change to same colour if it matches
            imageInput.style.color = "royalblue";
            errorDiv.innerHTML = "Your image link is correctly inputted!";
        } else {
            // change to red if it doesn't match
            imageInput.style.color = "red";
            errorDiv.innerHTML = "Your image link has to end with either .jpg / .png / .gif";
        }
    }
    
    movieInput.onkeyup = function(){
        if(movieEx.test(movieInput.value)){
            // change to same colour if it matches
            movieInput.style.color = "royalblue";
            errorDiv.innerHTML = "Your movie title is correctly inputted!";
        } else {
            // change to red if it doesn't match
            movieInput.style.color = "red";
            errorDiv.innerHTML = "Your movie title must have only alphabets and space";
        }
    }
    
    commentInput.onkeyup = function(){
        if(commentEx.test(commentInput.value)){
            // change to same colour if it matches
            commentInput.style.color = "royalblue";
            errorDiv.innerHTML = "Your comment is correctly inputted!";
        } else {
            // change to red if it doesn't match
            commentInput.style.color = "red";
            errorDiv.innerHTML = "Your comment can only have alphabets, numbers, space, .,?! and at max 100 characters";
        }
    }
})