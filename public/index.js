var navSearchBar = document.getElementById('nav-search-bar');
navSearchBar.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("nav-search-button").click();
  }
});

document.getElementById('nav-search-button').onclick = function(element) {
   sendQuery(navSearchBar.value,"recipe");
}

var searchBar = document.getElementById('page-search-bar');
if (searchBar != null) {
   searchBar.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("page-search-button").click();
     }
   });

   document.getElementById('filter-recipe').onclick = function(element) {
      sendQuery(searchBar.value,"recipe");
   }
   document.getElementById('filter-ingredient').onclick = function(element) {
      sendQuery(searchBar.value,"ingredient");
   }
   document.getElementById('filter-author').onclick = function(element) {
      sendQuery(searchBar.value,"author");
   }

   document.getElementById('page-search-button').onclick = function(element) {
      var d = getParameterByName('d');
      sendQuery(searchBar.value,d);
   }
}

function sendQuery(q,d) {
   window.location.href="/search?q="+q+"&d="+d;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
