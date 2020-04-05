'use strict';

const fs = require('fs');
const contentful = require('contentful');

// To filter out Circular JSON references from API
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

// Getting and writing Contentful tools JSON data to file
const client = contentful.createClient({
    space: 'psdhz9zcan92',
    accessToken: 'W8ZGbZOaPTVVQoPa9hrxL8jUIHedgMeIlzICYr81qNM'
});

// This API call will request all content entries based on set specifications
client.getEntries({
    'content_type': 'product', //filters on the content type.. based on the ID as specified in Contentful
    'include': 2 //sets the level of nested content we will retrieve (default is 0, max is 10)
})
.then(entries => {
    const dir = './src/templates/data';
    const jsonData = JSON.stringify(entries.items, getCircularReplacer());
    console.log('Succesfully retrieved: ' + JSON.stringify(entries.items[0].fields.title));
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log('No data folder encountered, created this succesfully.');
    } else {
        console.log('Data folder encountered, will re-use this.');
    }
    
    fs.writeFile(dir + '/contentful.json', jsonData, function(err, result) {
        if (err) console.log('error', err);
        console.log('succesfully written to file');
    });
});