require('../scss/main.scss');


import MediaItem from './modules/article';
// import Video from './modules/video';
// import Loader from './modules/preloader'


const article = new MediaItem({
     type       : 'article',
     target     : '.content',
     titleTarget: '.article-title',
     titleYPos  : 176
});
// const loader = new Loader();

// loader.shout();

article.render();
