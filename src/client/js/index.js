require('../scss/main.scss');

import MediaItem from './modules/media';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// import Loader from './modules/preloader'

OfflinePluginRuntime.install({
    onUpdateReady: () => {
        OfflinePluginRuntime.applyUpdate();

        caches.keys().then( (names) => {
            for (let name of names) {
                caches.delete(name);
            }
        });
    }, 

    onUpdated: () => window.reload
});


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
