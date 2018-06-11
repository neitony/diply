import {Feed, TemplateMap} from '../config/store';


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
            DOMContent = this.templateMapping['Content'](data, this.titleTarget, this.titleYPos, () =>  this.showHeaderTitle);


        return DOMContent;
    }



    render() {
        let mediaType = this.type,
            url       = this.feedRepository[mediaType];

        this.fetchUrl(url)
    }



    showHeaderTitle(titleTarget, content, yPos) {
        let headerTitle           = document.querySelector(titleTarget);
            headerTitle.innerHTML = content;

        this.scrollIntoView(yPos, () => headerTitle.style.opacity = (window.scrollY > yPos ?  1 : 0 ));
    }



    scrollIntoView(yPos, method) {
        window.addEventListener('scroll', () => {
            method(yPos)
        })
    }



    fetchUrl(url) {
        const props = {
            method: 'GET',
            mode  : 'cors',
            cache : 'default'
        };


        fetch(url, props)
            .then((response) => response.json())
            .then((data) => this.parse(data));
    }



    parse(data) {
        let pages  = data.Pages,
            header = { Type: "Header", "Title": data.Title, "Url": data.MainImageUrl },
            feed   = [header, ...pages[1], ...pages[2], ...pages[3], ...pages[4]],
            target = document.querySelector(this.target);
        // 
        target.innerHTML = [...feed].map((item) => this.templatize(item)).join('');
    }
}


module.exports = MediaItem;