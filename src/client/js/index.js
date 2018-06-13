require('../scss/main.scss');

import MediaItem from './modules/media';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';


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



let elapse       = 0,
    runner;

let clearContent = (target) => document.querySelector(target).innerHTML = "";



const menuMap = {
    items: ['video', 'article'],
    video: () => {
        clearContent('.content');

        new MediaItem({
            type       : 'video',
            target     : '.clips',
            titleTarget: '.article-title',
            titleYPos  : 176
        }).render({ player: 'video' })

        document.body.className = 'video';

    },


    article: () => {
        clearContent('.clips')

        new MediaItem({
            type       : 'article',
            target     : '.content',
            titleTarget: '.article-title',
            titleYPos  : 176
        }).render()

        document.body.className = 'article';

    }
}




const progress = (percent) => {
    let bar             = document.querySelector('.loader');
        bar.style.width = `${percent}%`;
}




const timer = () => {
    let bar           = document.querySelector('.loader'),
        loaderContent = document.querySelector('.loader-content');


    if (elapse > 100) {
        bar.style.color = "#fff";

        if (elapse >= 107) {
            clearInterval(runner);

            bar.style.display = "none";
            loaderContent.style.opacity = "1";
            menuMap['article']();
        }
    }
    else {
        progress(elapse);
    }

    elapse++;
}



runner = setInterval(() => { timer() }, 25);
document.querySelector('.video').onclick   = () => menuMap['video']();
document.querySelector('.article').onclick = () => menuMap['article']();