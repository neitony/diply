class Video  {
    constructor() { }

    template(){}

    render() {}

    fetch(url) {
       return fetch(url).then((response) => {
               console.info(response);
       });
    }

    parse() {}
}


module.exports = Video;