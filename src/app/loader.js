/* eslint-disable no-var */
/* disable ttag */

// Checks compatibility and loads XBReader in the appropriate language
// WARNING: Do not use modern ECMAScript syntax in this file to be safe!

var defaultLanguage = "en"; // Default language to use when no appropriate client language is detected
var supportedLanguages = [ // Languages supported for XBReader
    "en",
    "ja",
    "de",
    "fr"
];
var xbdestroyer;

function getLanguage() {
    var naviLang = navigator.browserLanguage || navigator.language || navigator.userLanguage;
    if (typeof naviLang !== "string") return defaultLanguage;
    var clientLanguage = navigator.language.split("-")[0];
    if (supportedLanguages.indexOf(clientLanguage) !== -1)
        return clientLanguage;
    else
        return defaultLanguage;
}

function getMangaManifest(identifier) {
    return {
        "@context": "https:\/\/readium.org\/webpub-manifest\/context.jsonld",
        "metadata": {
            "@type": "https:\/\/schema.org\/ComicIssue",
            "title": "deserunt hic",
            "author": "40meterP",
            "subtitle": "This is Dummy Manga",
            "language": "en",
            "modified": "2024-07-24T15:54:49.000000Z",
            "published": "2024-07-23T16:26:01.000000Z",
            "numberOfPages": 2,
            "identifier": "http:\/\/localhost:8000\/manga\/2121604690\/chapter\/2121604690?cid=:2121604690",
            "readingProgression": "rtl",
            "rendition": {
                "layout": "fixed",
                "orientation": "portrait",
                "spread": "landscape"
            },
            "belongsTo": {
                "series": {
                    "name": "deserunt hic",
                    "identifier": "\/manga\/2121604690"
                }
            },
            "xbr": {
                "volumes": [
                    {
                        "title": "deserunt hic",
                        "uuid": "2121604690",
                        "chapters": [
                            {
                                "uuid": "2121604690",
                                "title": "Original"
                            }
                        ]
                    }
                ]
            }
        },
        "readingOrder": [
            {
                "alternate": [
                    {
                        "id": 354,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_f47c6c86-bbf1-45c1-8887-4526ed5aaa9d.jpg",
                        "width": 897,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 355,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_f47c6c86-bbf1-45c1-8887-4526ed5aaa9d.webp",
                        "width": 897,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 356,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_fcfdc7c9-5835-4eb0-ab21-825c56e4c6db.jpg",
                        "width": 1077,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 357,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_fcfdc7c9-5835-4eb0-ab21-825c56e4c6db.webp",
                        "width": 1077,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 358,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_9f88d929-12be-4fda-bb3d-cb38fb38b5b4.jpg",
                        "width": 1436,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 359,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_9f88d929-12be-4fda-bb3d-cb38fb38b5b4.webp",
                        "width": 1436,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 361,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_8a68b8b8-1667-4949-98cb-d65ac74b2c7f.webp",
                        "width": 1795,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_8a68b8b8-1667-4949-98cb-d65ac74b2c7f.jpg",
                "type": "image\/jpeg",
                "title": "Page 0",
                "height": 2560,
                "width": 1795
            },
            {
                "alternate": [
                    {
                        "id": 363,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_309c206e-fded-4dc8-ae69-2cd4a9f6063f.jpg",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 364,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_309c206e-fded-4dc8-ae69-2cd4a9f6063f.webp",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 365,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_afb6a477-7dfc-43a4-a5f7-2461f539c4f8.jpg",
                        "width": 1069,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 366,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_afb6a477-7dfc-43a4-a5f7-2461f539c4f8.webp",
                        "width": 1069,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 367,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_322835ae-23e6-4dea-b8d4-d6a73f0aa370.jpg",
                        "width": 1425,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 368,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_322835ae-23e6-4dea-b8d4-d6a73f0aa370.webp",
                        "width": 1425,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 370,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_c3255161-f54c-4a19-b7a7-81c750bdf11c.webp",
                        "width": 1782,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_c3255161-f54c-4a19-b7a7-81c750bdf11c.jpg",
                "type": "image\/jpeg",
                "title": "Page 1",
                "height": 2560,
                "width": 1782
            },
            {
                "href": "\/lastchapter\/2121604690",
                "type": "text\/html",
                "properties": {
                    "orientation": "landscape",
                    "page": "center",
                    "spread": "both",
                    "layout": "fixed"
                },
                "height": 980,
                "width": 800,
                "title": "Last page",
                "xbr": {
                    "final": true
                }
            }
        ],
        "links": [
            {
                "rel": "self",
                "href": "http:\/\/localhost:8000\/api\/mangas\/2121604690\/2121604690\/manifest",
                "type": "application\/divina+json"
            }
        ]
    }
}

// TODO no IE smaller than 10
document.addEventListener("DOMContentLoaded", function () {
    var reader = document.createElement("script");
    var language = getLanguage();
    if (language === "en")
        reader.src = __NAME__ + ".js?v=" + __VERSION__;
    else
        reader.src = __NAME__ + "-" + getLanguage() + ".js?v=" + __VERSION__;
    document.head.appendChild(reader);
    reader.onload = function () {
        window.xbreader({
            tabs: [
                // Buttons on right side of top bar
                {
                    title: "Discover",
                    href: "/",
                    icon: "list",
                },
                {
                    title: "Search",
                    href: "/search",
                    icon: "search",
                },
                {
                    title: "Settings",
                    href: "javascript:window.postMessage('xbr:settings', '*')",
                    icon: "cog",
                },
            ],
            brand: {
                name: "J18", // Site/company name
                logo: "http://localhost:8000/images/J18-logo-white-777x599.png", // Logo image
            },
            onMount: (reader) => {
                xbdestroyer = () => reader.destroy();
            },
            loader: (identifier) => {
                return getMangaManifest(identifier);
            },
        });
    };
});