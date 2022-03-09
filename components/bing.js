const request = require('../util/request').request

async function getHPImage(query) {
    let {day} = query;
    if (!day) day = 1

    const options = {
        hostname: 'www.bing.com',
        port: 443,
        path: `/HPImageArchive.aspx?format=js&idx=${day}&n=1`,
        method: 'GET'
    }

    const body =  await request(options, null)
    console.debug("fetch from bing.com: " + body)
    /*
    {
        startdate,
        fullstartdate,
        enddate,
        url,
        urlbase,
        copyright,
        copyrightlink,
        title,
        quiz,
    }
     */
    return  body.images[0]
}

const routeBing = async (req, res) => {
    try {
        const query = req.query
        const image = await getHPImage(query)
        if (query.info === 'true') {
            res.send(JSON.stringify(image))
        } else {
            let size = query.size
            if (!size) size = '1920x1080'

            const imgUrl = `https://www.bing.com${image.urlbase}_${size}.jpg`;
            console.debug('redirect to ' + imgUrl)
            res.redirect(imgUrl)
        }
    } catch (error) {
        console.error("async error: " + error)
        res.status(500).send('Internal Error')
    }
}

module.exports = routeBing
