const app = {};
app.key = `d2161ea38715b720b904008fef5e9fd1`;
app.getMovies = function(userInput) {
  const key = app.key
    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie`,
      method: 'GET',
      dataType: 'json',
      data: {
        api_key: key, 
        query:userInput
      }
    }).then(function(res) {
        $('.searchResults').empty();
        $('input[type="text"]').val('');
        // console.log(res.results)
        app.displayMovies(res.results)
    });
  };

  app.displayMovies = function(movies) {
    movies.forEach(function (movie) {
            // console.log(`${movie.original_title}, ${movie.release_date} ${movie.poster_path}`)
      const movieHtml = `
      <div class="search">
      <div>
        <p class="movie-title">${movie.original_title}</p>
          <div class="img-box">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.original_title}">
          </div>
        <p class="release-date"> ${movie.release_date}</p>
        </div>
      </div>
    `;

    $('.searchResults').append(movieHtml);
    
         });
      }


app.init = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    const selection = $('input').val();
    // console.log(selection);
    app.getMovies(selection);
  });
};


$(function() {
  app.init();
});