(function(){
  var visitors= document.querySelector(".visitors-text");
  const CurrentVisitors = 56+Math.floor(Math.random() * Math.floor(10));
  visitors.innerHTML = "Şu anda <b>"+CurrentVisitors+ "</b> kişilik ziyaretçimiz bulunmakta!";
})();