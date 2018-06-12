import { Feed, TemplateMap } from '../config/store';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';


class MediaItem {
    constructor(props) {
        let { type, target, titleTarget, titleYPos } = props;

        this.type            = type;
        this.target          = target;
        this.titleTarget     = titleTarget;
        this.titleYPos       = titleYPos;
        this.feedRepository  = Feed;
        this.templateMapping = TemplateMap
    }



    templatize(data) {
        let DOMContent = '';
            DOMContent = this.templateMapping['Content'](data, this.titleTarget, this.titleYPos,
            () => this.showHeaderTitle(data, this.titleTarget, this.titleYPos));

        return DOMContent;
    }



    render(opts) {
        let mediaType       = this.type,
            url             = this.feedRepository[mediaType];

        this.fetchUrl(url);
        this.type === 'video' && this.videoPlayer('video').toggleOnScroll();
    }



    showHeaderTitle(content, titleTarget, yPos) {
        let headerTitle           = document.querySelector(titleTarget);
            headerTitle.innerHTML = content.Title;

        this.scrollIntoView(yPos, () => headerTitle.style.opacity = (window.scrollY > yPos ? 1 : 0));
    }



    scrollIntoView(yPos, method) {
        window.addEventListener('scroll', () => {
            method(yPos);
        })
    }



    videoPlayer(target) {
        let player, top, bottom, coordinates, isVisible;

        let  controls = {
                play : function () { player.play(); console.info('playing') },
                pause: function () { player.pause() },
                toggleOnScroll: function () {
                    document.addEventListener("scroll", () => {
                         player       = document.querySelector(target);
                        if(player) {
                            coordinates = player.getBoundingClientRect();
                            top         = coordinates.top;
                            bottom      = coordinates.bottom;
                            isVisible   = ( top >= 0 && bottom <= window.innerHeight )

                            isVisible && player.play();
                            !isVisible && player.pause();

                            return isVisible;
                        }

                    });
                }
            }
        return controls
    }



    fetchUrl(url) {
        const httpRequest = new XMLHttpRequest();
              httpRequest.open ("GET", url);

              httpRequest.onprogress = (e) => {
                  console.info(e.lengthComputable);
                if(e.lengthComputable){ console.info(e.loaded + "/" + e.total)}
              }

              httpRequest.onreadystatechange = () => {
                (httpRequest.readyState === 4) && this.parse(JSON.parse(httpRequest.response))
              }

              httpRequest.send('');


        



        // fetch(url, props)
            // .then((response) => {
                //  this.getContentProgress(response.body.getReader())
            //  })
            //  .then(response => console.info(response))
            // .then(response => response.json())
            // .then(data => this.parse(data))
    }




    parse(data) {
        let pages  = data.Pages,
            header = { Type: "Header", "Title": data.Title, "Url": data.MainImageUrl },
            feed   = [header, ...pages[1], ...pages[2], ...pages[3], ...pages[4]],
            target = document.querySelector(this.target);

        target.innerHTML = [...feed].map((item) => this.templatize(item)).join('');
    }
}


module.exports = MediaItem;