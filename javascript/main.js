$(document).ready(function(){

    var movie = {};
    movie.database = [];
    movie.loadAssets = function(){
      $.getJSON('db/movies.json',function(data){
          movie.database = data;
          
          movie.init();
      });  
    };

    movie.init = function(){
    movie.filterSlider();
        movie.getType();
        movie.getDirector();
        movie.generateMarkup();
};

    movie.filterSlider = function(){

    $('.filter.open').on('click',function(){
        
    $('.filter_container').slideToggle(300,function(){
    var btn = $(this).prev();
        
    if(btn.hasClass('active')){
        
    $('.filter.open').find('.btn_title').text('Filter by');
    btn.removeClass('active');
        
}else{
    
    $('.filter.open').find('.btn_title').text('close');
    btn.addClass('active');
    
}

});
});
};
    
    movie.getType = function(){
      var types = [];
        $.each(movie.database,function(index,element){
            if($.inArray(movie.database[index].type,types)){
                var typeValue = movie.database[index].type;
                types.push(typeValue);
                $('#categories').append('<option value="'+typeValue+'">'+typeValue+'</option>')
            }
        });
    };
    
   movie.getDirector = function(){
            var db = movie.database;
            var director = [];

            $.each(db,function (index) {
                if($.inArray(db[index].director, director)){
                    var directorValue = db[index].director;
                    director.push(directorValue);
                    $('#directors').append('<option value="'+ directorValue +'">' + directorValue + '</option>')
                }
            })

        };
    
     movie.generateMarkup = function(){

            var template = '';

            $.each(movie.database,function (index) {

                var db = movie.database;
                var id = db[index].id;

                template +=  '<div class="movie_item" data-id="'+ id +'" >';
                template +=     '<div class="header">';
                template +=         '<div class="left">';
                template +=             '<img src="images/movies/'+ db[index].img +'">';
                template +=         '</div>';
                template +=         '<div class="right">';
                template +=             '<h3>'+ db[index].title +'</h3>';
                template +=             '<div class="node">';
                template +=                 '<span>Year:</span> '+ db[index].year;
                template +=             '</div>';
                template +=             '<div class="node">';
                template +=                 '<span>Director:</span> '+ db[index].director;
                template +=             '</div>';
                template +=             '<div class="node">';
                template +=                 '<span>Type:</span> '+ db[index].type ;
                template +=             '</div>';
                template +=             '<div class="show_desc">See description</div>';
                template +=         '</div>';
                template +=     '</div>';
                template +=     '<div class="description">';
                template +=         '<strong>Description:</strong> ' + db[index].desc;
                template +=     '</div>';
                template += '</div>';
            });

            $('.movies_content').append(template);
            movie.showDescription();
            movie.startFilter();

        };
    
    movie.showDescription = function(){
      $('.show_desc').on('click',function(){
         var $this = $(this);
          var parent = $this.parents().eq(2);
          var element = parent.find('.description');
          
          element.slideToggle(300,function(){
             if($this.hasClass('active')){
                $this.text('see description').removeClass('active');
                }else{
                $this.text('hide description').addClass('active');
                } 
          });
      });  
    };

    movie.loadAssets();
    
    movie.startFilter = function(){
      $('select').on('change',function(){
         var db = movie.database;
          var type = $('#categories').val();
          var director = $('#directors').val();
          var results = [];
          
          $.each(db,function(index){
             if(db[index].type === type){
                results.push(db[index].id);
                } 
              if(db[index].director === director){
                results.push(db[index].id);
                } 
          });
          
          if(results.length < 1){
              $('.movie_item').show();
          }else{
              var uniqueArray = [];
              $.each(results,function(i,e){
             if($.inArray(e,uniqueArray) == -1) uniqueArray.push(e);     
          });
              $('.movie_item').hide();
              $.each(uniqueArray,function(i,e){
                 $('div[data-id = "'+e+'"]').show(); 
              });
          }
          
          //console.log(uniqueArray);
      });
    };
});