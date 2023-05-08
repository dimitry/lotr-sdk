const { LotrAPI } = require('./dist/index');

// const apiKey = 'your-api-key';
const apiKey = 'VygRBOq1Xc5YTpAd-Zqb';
const lotrApi = new LotrAPI(apiKey);

(async () => {
  try {
    // const options = { limit: 2, offset: 0 };
    // const movies = await lotrApi.listMovies(options);
    // console.log(movies);

    // const movie = await lotrApi.getMovie('5cd95395de30eff6ebccde56');
    // console.log(movie);

    // const movieQuotes = await lotrApi.getMovieQuotes(
    //   '5cd95395de30eff6ebccde5d',
    // );
    // console.log(movieQuotes);

    // const quotes = await lotrApi.getQuotes();
    // console.log(quotes);

    const quote = await lotrApi.getQuote('5cd96e05de30eff6ebcce84c');
    console.log(quote);
  } catch (error) {
    console.log(error);
    if (error.statusCode === 401) {
      console.warn('Did you update your API key?');
    }
  }
})();
