var database = firebase.database().ref();
var posts = document.getElementById("post");
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

database.child("posts").on("child_added",function(snapshot){
    var obj = snapshot.val();
    obj.id = snapshot.key;
    render(obj);
})

function render(dua){
var div = document.createElement("DIV");
div.setAttribute("id",dua.id);

var Span = document.createElement("SPAN");
var Sender = document.createTextNode("Name: "+ dua.sender + " ");
var Duatext = document.createTextNode("Dua: "+ dua.dua);

Span.appendChild(Sender);
Span.appendChild(Duatext);
div.appendChild(Span);

var commentbox = document.createElement("INPUT");
commentbox.setAttribute("id","comment" + dua.id);
var btn = document.createElement("BUTTON");

var btnText = document.createTextNode("comment");
btn.onclick = function () {
submitComment(dua.id);
}
btn.appendChild(btnText);

posts.appendChild(div);

div.appendChild(commentbox);
div.appendChild(btn);
}
function submitComment(duaId) {
    
var commentInput = document.getElementById("comment" + duaId);
var commentObj = {
sender: currentUser.name,
comment: commentInput.value,
duaId : duaId

}
database.child("comments").push(commentObj);
commentInput.value = '';
}