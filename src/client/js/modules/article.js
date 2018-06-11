import Feed from '../config/feed';


class MediaItem {
    constructor(props) {
        let { type, target, titleTarget, titleYPos } = props;

        this.type           = type;
        this.target         = target;
        this.titleTarget    = titleTarget;
        this.titleYPos      = titleYPos;
        this.feedRepository = Feed;
    }



    templatize(data) {
        let DOMContent = '';


        const templateMapping = {
            article: {
                Content: function (data, titleTarget, titleYPos) {

                    if (data.Type !== "Ad Placeholder") {
                        let template = 
                            `<div class="item">
                                ${data.Type === "Header" ? this.Header(data, titleTarget, titleYPos) : ''}
                                ${data.Type === "TextBlock" ? this.TextBlock(data) : ''}
                                ${data.Type === "Image" ? this.Image(data) : ''}
                            </div>`

                        return template;
                    }

                },

                Image: function (data) {
                    let template = 
                        `<h2>${data.Title}</h2>
                        <figure>
                            <img src = "${data.Url}" />
                        </figure>`

                    return template
                },

                Header: (data, titleTarget, titleYPos) =>  {
                    this.showHeaderTitle(titleTarget, data.Title, titleYPos);

                    let template = 
                        `<h1>${data.Title}</h1>
                        <figure>
                            <img src = "${data.Url}" />
                        </figure>`

                    return template
                },


                TextBlock: function (data) {
                    let template = 
                        `<div class="block">
                            <p>${data.Content}</p>
                        </div>`

                    return template
                }
            }
        },

            type       = templateMapping[this.type]
            DOMContent = type['Content'](data, this.titleTarget, this.titleYPos);

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