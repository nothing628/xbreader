/* eslint-disable no-var */
/* disable ttag */

import("drmwasm").then(mod => {
    get_replacement_jpeg = mod.get_replacement_jpeg;
    get_replacement_webp = mod.get_replacement_webp;
});

let get_replacement_jpeg;
let get_replacement_webp;

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
            "author": "40meterP2",
            "subtitle": "This is Dummy Manga",
            "language": "en",
            "modified": "2024-08-08T14:59:14.000000Z",
            "published": "2024-07-23T16:26:01.000000Z",
            "numberOfPages": 10,
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
                        "id": 422,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d8e0ea74-8053-4005-8980-1a3b0c4cc85b.jpg",
                        "width": 895,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 423,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d8e0ea74-8053-4005-8980-1a3b0c4cc85b.webp",
                        "width": 895,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 424,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_f6c4cfcc-d1b4-4051-b5ce-3a7b82169af5.jpg",
                        "width": 1074,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 425,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_f6c4cfcc-d1b4-4051-b5ce-3a7b82169af5.webp",
                        "width": 1074,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 426,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_8dee6560-af0f-48c0-a0b6-deee7cfc3b33.jpg",
                        "width": 1432,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 427,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_8dee6560-af0f-48c0-a0b6-deee7cfc3b33.webp",
                        "width": 1432,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 429,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_6475dbb0-7102-41c9-b4bf-cbc66307ce7c.webp",
                        "width": 1790,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_6475dbb0-7102-41c9-b4bf-cbc66307ce7c.jpg",
                "type": "image\/jpeg",
                "title": "Page 0",
                "height": 2560,
                "width": 1790,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 431,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_4b65c656-fd19-4a12-8ad3-6c3f1a73527d.jpg",
                        "width": 899,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 432,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_4b65c656-fd19-4a12-8ad3-6c3f1a73527d.webp",
                        "width": 899,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 433,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_bd256e9e-34cb-4c0e-88c0-a0c50628923a.jpg",
                        "width": 1078,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 434,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_bd256e9e-34cb-4c0e-88c0-a0c50628923a.webp",
                        "width": 1078,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 435,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_33a1906a-e52e-4811-8c54-e224a9e805b9.jpg",
                        "width": 1438,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 436,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_33a1906a-e52e-4811-8c54-e224a9e805b9.webp",
                        "width": 1438,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 438,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_d0b7af43-ca95-4af7-a240-7b03cb5bd57a.webp",
                        "width": 1797,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_d0b7af43-ca95-4af7-a240-7b03cb5bd57a.jpg",
                "type": "image\/jpeg",
                "title": "Page 1",
                "height": 2560,
                "width": 1797,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 440,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d1fe456e-dc01-47c3-963d-6d7c8b2f86ee.jpg",
                        "width": 899,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 441,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d1fe456e-dc01-47c3-963d-6d7c8b2f86ee.webp",
                        "width": 899,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 442,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_2cf3042b-f544-4581-843f-24d86e85e334.jpg",
                        "width": 1079,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 443,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_2cf3042b-f544-4581-843f-24d86e85e334.webp",
                        "width": 1079,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 444,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_4329122d-8d9f-4b57-b21f-4ba6053bca1f.jpg",
                        "width": 1438,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 445,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_4329122d-8d9f-4b57-b21f-4ba6053bca1f.webp",
                        "width": 1438,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 447,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_3da6fbd9-f8b6-435f-855f-5c1853c66ddf.webp",
                        "width": 1798,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_3da6fbd9-f8b6-435f-855f-5c1853c66ddf.jpg",
                "type": "image\/jpeg",
                "title": "Page 2",
                "height": 2560,
                "width": 1798,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 449,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_22d0f61f-8e1e-4483-9bf1-e61c1246d3d5.jpg",
                        "width": 897,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 450,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_22d0f61f-8e1e-4483-9bf1-e61c1246d3d5.webp",
                        "width": 897,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 451,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_f3211817-2545-4ad5-b359-5b17d0cdd8aa.jpg",
                        "width": 1077,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 452,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_f3211817-2545-4ad5-b359-5b17d0cdd8aa.webp",
                        "width": 1077,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 453,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_d6d4463e-63ce-4ad5-97e7-a36c748bd5d7.jpg",
                        "width": 1436,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 454,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_d6d4463e-63ce-4ad5-97e7-a36c748bd5d7.webp",
                        "width": 1436,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 456,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_1bf724e1-a466-488c-abfe-ebc80a8918b3.webp",
                        "width": 1795,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_1bf724e1-a466-488c-abfe-ebc80a8918b3.jpg",
                "type": "image\/jpeg",
                "title": "Page 3",
                "height": 2560,
                "width": 1795,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 458,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_265cc896-91c1-4795-8c9a-98f6c8d0cc2c.jpg",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 459,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_265cc896-91c1-4795-8c9a-98f6c8d0cc2c.webp",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 460,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_6bd95dfa-6b96-421b-a368-1d594ca4bad5.jpg",
                        "width": 1069,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 461,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_6bd95dfa-6b96-421b-a368-1d594ca4bad5.webp",
                        "width": 1069,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 462,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_8275cbe3-39fb-417e-a62b-5c3d1b1cc727.jpg",
                        "width": 1425,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 463,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_8275cbe3-39fb-417e-a62b-5c3d1b1cc727.webp",
                        "width": 1425,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 466,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_ac5b048f-fb45-417e-91dd-f4ef7835780d.webp",
                        "width": 1782,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_ac5b048f-fb45-417e-91dd-f4ef7835780d.jpg",
                "type": "image\/jpeg",
                "title": "Page 4",
                "height": 2560,
                "width": 1782,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 467,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_7e1a24ef-e489-4db0-83de-631f2a1161b7.jpg",
                        "width": 898,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 468,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_7e1a24ef-e489-4db0-83de-631f2a1161b7.webp",
                        "width": 898,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 469,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_5049096d-33af-4629-b597-4d718f33bac3.jpg",
                        "width": 1078,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 470,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_5049096d-33af-4629-b597-4d718f33bac3.webp",
                        "width": 1078,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 471,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_af6023cd-4fad-4c60-8968-c5697c386a78.jpg",
                        "width": 1437,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 472,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_af6023cd-4fad-4c60-8968-c5697c386a78.webp",
                        "width": 1437,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 474,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_e6e153f2-4993-4e3b-a141-dde55538bf00.webp",
                        "width": 1797,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_e6e153f2-4993-4e3b-a141-dde55538bf00.jpg",
                "type": "image\/jpeg",
                "title": "Page 5",
                "height": 2560,
                "width": 1797,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 476,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_df37db32-82ba-4e79-a988-136d01bbeed4.jpg",
                        "width": 900,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 477,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_df37db32-82ba-4e79-a988-136d01bbeed4.webp",
                        "width": 900,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 478,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_871f7b28-9c26-42c0-9d08-d05b604cba64.jpg",
                        "width": 1079,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 479,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_871f7b28-9c26-42c0-9d08-d05b604cba64.webp",
                        "width": 1079,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 480,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_def8f0d4-9993-4c10-84de-7b03109bf8b1.jpg",
                        "width": 1439,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 481,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_def8f0d4-9993-4c10-84de-7b03109bf8b1.webp",
                        "width": 1439,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 483,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_942a22a0-981c-411c-af2b-711f7117e5a9.webp",
                        "width": 1799,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_942a22a0-981c-411c-af2b-711f7117e5a9.jpg",
                "type": "image\/jpeg",
                "title": "Page 6",
                "height": 2560,
                "width": 1799,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 485,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d42bebb9-8c42-48de-9639-286b12989646.jpg",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 486,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_d42bebb9-8c42-48de-9639-286b12989646.webp",
                        "width": 891,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 487,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_de331fc8-d7e3-4b87-972a-556057abf39a.jpg",
                        "width": 1070,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 488,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_de331fc8-d7e3-4b87-972a-556057abf39a.webp",
                        "width": 1070,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 489,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_3ee9ef42-39b8-4c6a-b2ce-4f4a76f1f023.jpg",
                        "width": 1426,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 490,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_3ee9ef42-39b8-4c6a-b2ce-4f4a76f1f023.webp",
                        "width": 1426,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 492,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_a629e6a9-ccf3-40fe-b877-9ba9480e493d.webp",
                        "width": 1783,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_a629e6a9-ccf3-40fe-b877-9ba9480e493d.jpg",
                "type": "image\/jpeg",
                "title": "Page 7",
                "height": 2560,
                "width": 1783,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 494,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_1a4eb8c2-d449-4ade-bc56-831b21bcde6c.jpg",
                        "width": 893,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 495,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_1a4eb8c2-d449-4ade-bc56-831b21bcde6c.webp",
                        "width": 893,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 496,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_d4cfa65d-c7c7-4a4b-9dc8-4c1401cd54d2.jpg",
                        "width": 1072,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 497,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_d4cfa65d-c7c7-4a4b-9dc8-4c1401cd54d2.webp",
                        "width": 1072,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 498,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_19d07d0c-dbf5-43a3-9ca5-70d63c042cac.jpg",
                        "width": 1429,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 499,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_19d07d0c-dbf5-43a3-9ca5-70d63c042cac.webp",
                        "width": 1429,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 501,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_7f58d1dd-fb81-4aa3-8481-b63567b1ada5.webp",
                        "width": 1787,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_7f58d1dd-fb81-4aa3-8481-b63567b1ada5.jpg",
                "type": "image\/jpeg",
                "title": "Page 8",
                "height": 2560,
                "width": 1787,
                xbr: {
                    rawRange: true,
                }
            },
            {
                "alternate": [
                    {
                        "id": 503,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_ed2f8c55-7e8c-472c-8abc-dd3f67656717.jpg",
                        "width": 895,
                        "height": 1280,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 504,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1280\/1280_ed2f8c55-7e8c-472c-8abc-dd3f67656717.webp",
                        "width": 895,
                        "height": 1280,
                        "type": "image\/webp"
                    },
                    {
                        "id": 505,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_7f6dbee2-b4b0-461f-82f9-ca0ee9fd4d8b.jpg",
                        "width": 1074,
                        "height": 1536,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 506,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/1536\/1536_7f6dbee2-b4b0-461f-82f9-ca0ee9fd4d8b.webp",
                        "width": 1074,
                        "height": 1536,
                        "type": "image\/webp"
                    },
                    {
                        "id": 507,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_7461b070-4fb5-4172-9a79-80eb618e0938.jpg",
                        "width": 1432,
                        "height": 2048,
                        "type": "image\/jpeg"
                    },
                    {
                        "id": 508,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2048\/2048_7461b070-4fb5-4172-9a79-80eb618e0938.webp",
                        "width": 1432,
                        "height": 2048,
                        "type": "image\/webp"
                    },
                    {
                        "id": 510,
                        "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_22356eb9-ba86-4298-a24c-7c61d7602e43.webp",
                        "width": 1790,
                        "height": 2560,
                        "type": "image\/webp"
                    }
                ],
                "href": "http:\/\/localhost:8000\/storage\/media\/resize\/2560\/2560_22356eb9-ba86-4298-a24c-7c61d7602e43.jpg",
                "type": "image\/jpeg",
                "title": "Page 9",
                "height": 2560,
                "width": 1790,
                xbr: {
                    rawRange: true,
                }
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
                "width": 700,
                "height": 980,
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

const getReplacementImage = (file_uint8) => {
    try {
        // Try jpeg
        const subimage_replacement = get_replacement_jpeg(file_uint8);
        return { ...subimage_replacement, type: 'image/jpeg' };
    } catch { }

    try {
        // Try webp
        const subimage_replacement = get_replacement_webp(file_uint8);
        return { ...subimage_replacement, type: 'image/webp' };
    } catch { }

    return null;
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
            render: {
                onDraw: async (loader, source, url) => {
                    const c = loader.canvas;
                    let tmpBitmap = source;
                    let overlapImage = null;

                    if (url && URL.canParse(url)) {
                        try {
                            const parsedUrl = URL.parse(url);
                            const response = await fetch(url);
                            const body = await response.arrayBuffer();
                            const uintBlob = new Uint8Array(body);
                            const replacementImage = getReplacementImage(uintBlob);

                            if (replacementImage) {
                                overlapImage = replacementImage;
                            }
                        } catch (err) {
                            // Failed to convert to uint8array
                        }
                    }

                    c.height = tmpBitmap.height;
                    c.width = tmpBitmap.width;
                    let ctx =
                        c.getContext("bitmaprenderer", {
                            alpha: false,
                        });
                    if (!ctx) {
                        ctx = c.getContext("2d", {
                            desynchronized: true,
                            alpha: false,
                        });
                        if (ctx) ctx.drawImage(tmpBitmap, 0, 0);
                        else console.warn("No canvas context!", ctx, tmpBitmap);

                        if (overlapImage) {
                            const subimage = overlapImage.real_img;
                            const subimage_arr = new Uint8Array(subimage);
                            const subimage_blob = new Blob([subimage_arr], { type: overlapImage.type });
                            const subimage_bitmap = await createImageBitmap(subimage_blob);
                            const watermark_x = overlapImage.x;
                            const watermark_y = overlapImage.y;

                            ctx.drawImage(subimage_bitmap, watermark_x, watermark_y);
                        }
                    } else {
                        ctx.transferFromImageBitmap(tmpBitmap);
                    }
                    tmpBitmap.close();
                    // console.log("drawBitmap", c.getAttribute("aria-label"), ctx, source);

                    loader.loaded = true;
                }
            }
        });
    };
});