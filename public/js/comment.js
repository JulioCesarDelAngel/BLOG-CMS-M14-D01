var deleteBtn = document.getElementById("deleteBtn");
var updateBtn = document.getElementById("updateBtn");
var formComment = document.getElementById("formComment");


async function deletePost() {
    //alert(`eliminar registro : ${formComment.dataset.id}`); 
      const response = await fetch (`/comment/${formComment.dataset.id}`,{
        method: 'DELETE',
        body: JSON.stringify({}),
        headers : {
        'Content-Type': 'application/json'
        }
    });
    
    if (response.ok){
        document.location.replace("/");
    }
    else {
        alert(`Ocurrio un error al eliminar registro : ${formComment.dataset.id}`); 
    } 
}

async function updatePost() {
    const comment = document.getElementById("textComment").value;
    //alert(`actualizar registro : ${formComment.dataset.id}  Comment ${comment}`); 

      const response = await fetch(`/comment/${formComment.dataset.id}`,{
        method: 'PUT',
        body: JSON.stringify({
            comment
        }),
        headers : {
        'Content-Type': 'application/json'
        }
    });  

    if (response.ok){
        document.location.replace("/");
    }
    else {
        alert(`Ocurrio un error al actualizar el comentario id : ${formComment.dataset.id}`); 
    }    
    
}

deleteBtn.addEventListener("click", deletePost);
updateBtn.addEventListener("click", updatePost);