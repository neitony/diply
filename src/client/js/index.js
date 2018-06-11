require('../scss/main.scss');


import MediaItem from './modules/article';
// import Loader from './modules/preloader'


/*
const article = new MediaItem({
     type       : 'article',
     target     : '.content',
     titleTarget: '.article-title',
     titleYPos  : 176
});
*/

const video = new MediaItem({
    type  : 'video',
    target: '.clips',
    titleTarget: '.article-title',
    titleYPos  : 176
})


// const loader = new Loader();

// loader.shout();

// article.render();

video.render();
