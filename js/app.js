(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  $('.btn-large').click(function(){

    event.preventDefault()

    if ($('#search').val() === '') {
     window.alert('What movie are you looking for?')

   }
   else {

    let query = $('#search').val().toLowerCase()

    query = '?s='+query.replace(/[\s]/g, '%20')

    let $xhr = $.getJSON(`https://omdb-api.now.sh/${query}`)

    $('#search').val('')

    $xhr.done(function(data){
      if($xhr.status !==200) {
        return;
      }

      let result = data.Search

      for (let index in result){

        let movie = {
          id: result[index].imdbID,
          poster: result[index].Poster,
          title: result[index].Title,
          year: result[index].Year
        }
        movies.push(movie)
      }
      renderMovies()
    })
    }
  })

})();
