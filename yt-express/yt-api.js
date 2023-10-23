const axios = require("axios");

const ytDataRegex = new RegExp('ytInitialData = (.*?);<\/script>');

const search = async (keyword) => {
    const url = [
        'https://www.youtube.com/results?search_query=',
        encodeURI(keyword),
        '&sp=EgIQAQ%253D%253D'
    ].join('');
    const { data } = await axios.get(url);
    const [ skip, dataString, ...rest ] = ytDataRegex.exec(data);
    const parsedJson = JSON.parse(dataString);
    const videoRenderers = parsedJson.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents ?? [];
    const videos = videoRenderers.map(n => {
        const { videoRenderer: m } = n;
        return !!m ? {
            thumbnailUrl: m.thumbnail.thumbnails[0].url,
            videoId: m.videoId,
            title: m.title.runs[0].text
        }: {};
    }).filter(v => !!v.videoId);
    return videos;
}


module.exports = {
    search
};