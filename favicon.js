var base64EncodedFavicon = "\
        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\
        WFkeXHJZTwAAAAASUVORK5CYII=";

var linkToFavicon = document.createElement('link');
linkToFavicon.rel = 'shortcut icon';
linkToFavicon.href = 'data:image/png;base64,' + base64EncodedFavicon;

var headElement = document.getElementsByTagName('head')[0];
headElement.appendChild(linkToFavicon);