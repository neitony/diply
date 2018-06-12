const Feed = {
    "video"  : "https://cdn.diply.com/json/changing-rooms-test.json",
    "article": "https://cdn.diply.com/json/fun-adam-sandler-facts.json"
};



const TemplateMap = {
    Content: function (data, titleTarget, titleYPos, method) {
        if (data.Type !== "Ad Placeholder") {
            let template = 
                `<div class="item">
                                ${data.Type === "Header" ? this.Header(data, titleTarget, titleYPos, method) : ''}
                                ${data.Type === "VideoEmbed" ? this.VideoEmbed(data) : ''}
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


    Header: (data, titleTarget, titleYPos, method) => {
        method(titleTarget, data.Title, titleYPos);

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
    },


    VideoEmbed: function (data, method) {
        method && method()
        let video    = data.Properties.mp4_url,
            poster   = data.ThumbUrl,
            template = 
             `<div class="video-content">
                <video class="player" controls>
                    <source src= "${video}">
                </video>
             </div>`

        return template
    }


};


export { Feed, TemplateMap }