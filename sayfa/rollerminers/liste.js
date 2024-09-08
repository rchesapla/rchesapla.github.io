/*//ANİMASYONLU YAZI

//ANİMASYONLU YAZI
// DİL AYARLARI
$(document).ready(function() {

    var arrLang={
        
        'tr':{

            'anasayfa':'Ana Sayfa',
            'altaçıklama':'Satın almak istediğiniz ekran kartın üstüne tıklayarak mağazaya gidebilirsiniz.',
            'dilseçeneği':'DİL SEÇENEĞİ',
            'hepsi':'Hepsi',
            'bonuslaragöre':'BONUSLARA GÖRE',
            'levelleregöre':'SEVİYELERE GÖRE',
            'önerinvarmı':'Önerin Nedir?',
            'pilleregöre':'PİLLERE GÖRE',
            'k-açıklama':' Kazım bilgilerini doğru girdiğiniz durumda hesaplama işlemini yapabilirsiniz.',
            'hesapla':'Hesapla',
            'istatistikbaşlık':'🧮 KAZANÇ İSTATİSTİKLERİ',
            'beklenen':"Beklenen",
			'günlük':'Günlük',
			'haftalık':'Haftalık',
			'aylık':'Aylık',
			'yıllık':'Yıllık',
            'satoshidönüştür':"➾ SATOSHI'yi, BITCOIN'e DÖNÜŞTÜR",
            's-açıklama':' BTC,ye dönüştür ne kadar kazandığını öğren.'
        },
// İNGİLİZCE VERSİYONU
        'en':{
            'anasayfa':'Home',
            'altaçıklama':'You can go to the store by clicking on the graphics card you want to buy.',
            'dilseçeneği':'Language Option',
            'hepsi':'All',
            'bonuslaragöre':'BY BONUSES',
            'levelleregöre':'BY LEVELS',
            'önerinvarmı':'What is your suggestion?',
            'pilleregöre':'BY BATTERIES',
            'k-açıklama':' If you enter the information correctly, you can make the correct calculation.',
            'hesapla':'Calculate',
            'istatistikbaşlık':'🧮 EARNING STATS',
            'beklenen':'Expected',
			'günlük':'Daily',
			'haftalık':'Weekly',
			'aylık':'Monthly',
			'yıllık':'Yearly',
            'satoshidönüştür':'➾ CONVERT SATOSHI TO BITCOIN',
            's-açıklama':' Convert to BTC and find out how much you earn.'
        },
		
    };


    
$('.dropdown-item').click(function() {
    localStorage.setItem('dil', JSON.stringify($(this).attr('id'))); 
    location.reload();
  });

    var lang =JSON.parse(localStorage.getItem('dil'));

    if(lang=="en"){
        $("#drop_yazı").html("English");
    }
    else{
        $("#drop_yazı").html("Türkçe");

    }

    $('a,h5,p,h1,h2,span,li,button,h3,label,h6,td,div').each(function(index,element) {
      $(this).text(arrLang[lang][$(this).attr('key')]);
    
  });

});
// DİL AYARLARI */

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.musour-icon'
});

// store filter for each group
var filters = {};

$('.filters').on( 'click', '.button', function( event ) {
  var $button = $( event.currentTarget );
  // get group key
  var $buttonGroup = $button.parents('.button-group');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  filters[ filterGroup ] = $button.attr('data-filter');
  // combine filters
  var filterValue = concatValues( filters );
  // set filter for Isotope
  $grid.isotope({ filter: filterValue });
});

// change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function( event ) {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    var $button = $( event.currentTarget );
    $button.addClass('is-checked');
  });
});
  
// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}