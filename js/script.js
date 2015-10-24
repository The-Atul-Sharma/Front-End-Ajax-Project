
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    
    var streetMap = $('#street').val();
    var cityMap = $('#city').val(); 
    $greeting.text('So, you want to live at '+streetMap+' '+cityMap+'?');

    var streetview = 'https://maps.googleapis.com/maps/api/streetview?size=600x900&location='+streetMap+' '+cityMap;

    $body.append('<img class="bgimg" src="'+streetview+'">');

    $.getJSON("http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityMap+"&sort=newest&api-key=1eed83813671b0618396a8f0670c5e70%3A18%3A73285246", function(data){
        $nytHeaderElem.text('NYTimes article about '+cityMap);
        for(var i = 0;i<data.response.docs.length;i++){
        $nytElem.append('<li><a href="'+data.response.docs[i].web_url+
            '">'+data.response.docs[i].headline.main+
            '</a><p>'+data.response.docs[i].snippet+'</p></li>');
        };
    }).error(function(e){
             $nytHeaderElem.text('NYTimes article could not be loaded');

    });

     var t = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ cityMap + '&format=json&callback=wikiCallback',
        dataType: "jsonp",
        success: function(response){
            for(var i = 0;i<response[1].length;i++){
               var wikiurl = "https://en.wikipedia.org/wiki/"+response[1][i];
               $wikiElem.append("<li><a href='"+wikiurl+"'>"+response[1][i]+"</a></li>" );
            };

            clearTimeout(t);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

