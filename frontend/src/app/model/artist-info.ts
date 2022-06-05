import { ArtistSimilar } from "./artist-similar";
import { Tag } from "./artist-tag";
import { Image } from "./image";

export class ArtistInfo {
  id: number = 0;
  name: string = '';
  mbid: string = '';
  url: string = '';
  image: Image[] = [];
  streamable: string = '';
  ontour: string = '';
  stats: Stats = new Stats();
  similar: Similar = new Similar();
  tags: ArtistTags = new ArtistTags();
  bio: Bio = new Bio();
}

export class Stats {
  listeners: string = '';
  playcount: string = '';
}

export class Similar {
  artist: ArtistSimilar[] = [];
}

export class ArtistTags {
  tag: Tag[] = [];
}

export class Bio {
  links: Links = new Links();
  published: string = '';
  summary: string = '';
  content: string = '';
}

export class Links {
  link: Link = new Link();
}

export class Link {
  #text: string = '';
  rel: string = '';
  href: string = '';
}

// {
//   "name": "Taylor Swift",
//   "mbid": "20244d07-534f-4eff-b4d4-930878889970",
//   "url": "https://www.last.fm/music/Taylor+Swift",
//   "image": [
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": "small"
//     },
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": "medium"
//     },
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": "large"
//     },
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": "extralarge"
//     },
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": "mega"
//     },
//     {
//       "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//       "size": ""
//     }
//   ],
//   "streamable": "0",
//   "ontour": "0",
//   "stats": {
//     "listeners": "3325523",
//     "playcount": "757123114"
//   },
//   "similar": {
//     "artist": [
//       {
//         "name": "Lorde",
//         "url": "https://www.last.fm/music/Lorde",
//         "image": [
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "small"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "medium"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "large"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "extralarge"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "mega"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": ""
//           }
//         ]
//       },
//       {
//         "name": "Halsey",
//         "url": "https://www.last.fm/music/Halsey",
//         "image": [
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "small"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "medium"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "large"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "extralarge"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "mega"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": ""
//           }
//         ]
//       },
//       {
//         "name": "Sugarland",
//         "url": "https://www.last.fm/music/Sugarland",
//         "image": [
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "small"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "medium"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "large"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "extralarge"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "mega"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": ""
//           }
//         ]
//       },
//       {
//         "name": "Kacey Musgraves",
//         "url": "https://www.last.fm/music/Kacey+Musgraves",
//         "image": [
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "small"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "medium"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "large"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "extralarge"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "mega"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": ""
//           }
//         ]
//       },
//       {
//         "name": "Selena Gomez",
//         "url": "https://www.last.fm/music/Selena+Gomez",
//         "image": [
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "small"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "medium"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "large"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "extralarge"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": "mega"
//           },
//           {
//             "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
//             "size": ""
//           }
//         ]
//       }
//     ]
//   },
//   "ArtistTags": {
//     "tag": [
//       {
//         "name": "country",
//         "url": "https://www.last.fm/tag/country"
//       },
//       {
//         "name": "pop",
//         "url": "https://www.last.fm/tag/pop"
//       },
//       {
//         "name": "female vocalists",
//         "url": "https://www.last.fm/tag/female+vocalists"
//       },
//       {
//         "name": "singer-songwriter",
//         "url": "https://www.last.fm/tag/singer-songwriter"
//       },
//       {
//         "name": "acoustic",
//         "url": "https://www.last.fm/tag/acoustic"
//       }
//     ]
//   },
//   "bio": {
//     "links": {
//       "link": {
//         "#text": "",
//         "rel": "original",
//         "href": "https://last.fm/music/Taylor+Swift/+wiki"
//       }
//     },
//     "published": "16 Aug 2006, 21:31",
//     "summary": "Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting, which is often inspired by her personal life, has received widespread media coverage and critical praise.\n\nBorn in West Reading, Pennsylvania, Swift relocated to Nashville, Tennessee in 2004 to pursue a career in country music. She broke into the country music scene with her eponymous self-titled debut studio album, \"Taylor Swift\" in 2006, which included the singles \"Teardrops on My Guitar\" and \"Our Song\". <a href=\"https://www.last.fm/music/Taylor+Swift\">Read more on Last.fm</a>",
//     "content": "Taylor Alison Swift is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting, which is often inspired by her personal life, has received widespread media coverage and critical praise.\n\nBorn in West Reading, Pennsylvania, Swift relocated to Nashville, Tennessee in 2004 to pursue a career in country music. She broke into the country music scene with her eponymous self-titled debut studio album, \"Taylor Swift\" in 2006, which included the singles \"Teardrops on My Guitar\" and \"Our Song\". Swift also released the holiday album, Sounds of the Season: The Taylor Swift Holiday Collection, later titled as \"The Taylor Swift Holiday Collection\" in October 2007.\n\nSwift rose to mainstream prominence with her second studio album, \"Fearless\" (2008), a country pop record with crossover appeal. Aided by the top-five singles \"Love Story\" and \"You Belong with Me\", Fearless was certified Diamond by the Recording Industry Recording Industry Association of America (RIAA). Swift's third studio album, \"Speak Now\" (2010), blended country pop with elements of rock and featured the top-ten singles \"Mine\" and \"Back to December\". \n\nDrawing inspiration from various pop, rock, and electronic genres, Swift's fourth studio album \"Red\" (2012) saw her transcending her country roots. She completely moved to pop with her synth-pop fifth studio album, \"1989\" (2014), and expanded the electropop sound on her next two studio albums, \"reputation\" (2017) and \"Lover\" (2019), which respectively embraced urban and retro styles. The four albums spawned a string of international top-five singles, including \"We Are Never Ever Getting Back Together\", \"I Knew You Were Trouble\", \"Shake It Off\", \"Blank Space\", \"Bad Blood\", \"Look What You Made Me Do\", \"ME! (feat. Brendon Urie of Panic! at the Disco)\" and \"You Need to Calm Down\". Swift experimented with folk and alternative rock on her eighth and ninth studio albums, \"folklore\" and \"evermore\" (both 2020), whose lead singles \"cardigan\" and \"willow\" topped charts around the world. She also released the critically acclaimed documentaries Miss Americana and Folklore: The Long Pond Studio Sessions that year. \n\nSwift began re-recording her back catalog in November 2020, as a result of a publiscized dispute with talent manager Scooter Braun and her former label Big Machine, regarding the acquisition of the masters of her back catalog. In February 2021, Swift released a re-recorded issue of her 2008 album Fearless, titled \"Fearless (Taylor's Version)\". The album was preceded by \"Love Story (Taylor’s Version)\", the re-recorded version of her original 2008 rendition, and two new tracks, \"You All Over Me (feat. Maren Morris) (Taylor’s Version) (From the Vault)\" with Maren Morris and \"Mr. Perfectly Fine (Taylor’s Version) (From the Vault)\". It debuted at number one in the US. \n\nSwift has released several songs for film soundtracks. She co-wrote two songs for the Hannah Montana: The Movie soundtrack— \"You'll Always Find Your Way Back Home\" and \"Crazier\", and contributed two songs to the Valentine's Day soundtrack, including the single \"Today Was a Fairytale\", which was her first number one on the Canadian Hot 100, and peaked at number two on the Billboard Hot 100. She also contributed two original songs to The Hunger Games soundtrack album: \"Safe & Sound - from The Hunger Games Soundtrack\", co-written and recorded with The Civil Wars and T-Bone Burnett, and \"Eyes Open\". \"Safe & Sound\" won the Grammy Award for Best Song Written for Visual Media and was nominated for the Golden Globe Award for Best Original Song. In 2013, Swift recorded \"Sweeter than Fiction\", a song she wrote and produced with Jack Antonoff for the One Chance film soundtrack, which received a Best Original Song nomination at the 71st Golden Globe Awards. Swift and English singer Zayn Malik, mononymously known as Zayn, released a single together, \"I Don't Wanna Live Forever\", for the soundtrack of the film Fifty Shades Darker (2017). She also recorded an original song called \"Beautiful Ghosts\", which she wrote with Andrew Lloyd Webber for the Cats's soundtrack (2019). In 2020, Swift's documentary Miss Americana featured the song \"Only the Young\" which was written after the 2018 United States elections.\n\nWith sales of over 200 million records worldwide, Swift is a best-selling music artist. Her accolades include 11 Grammy Awards (including three Album of the Year wins), two Brit Awards (including a Global Icon award), an Emmy Award, 28 [https://guinnessworldrecords.com/]Guinness World Records, 32 American Music Awards (the most wins by an artist), and 23 Billboard Music Awards (the most wins by a woman). She ranked eighth on Billboard's Greatest of All Time Artists Chart (2019) and was listed on Rolling Stone's 100 Greatest Songwriters of All Time (2015). Swift has been included in various power rankings, such as Time's annual list of the 100 most influential people in the world (2010, 2015 and 2019) and Forbes Celebrity 100 (placing first in 2016 and 2019). She was named Woman of the Decade (2010s) by Billboard and Artist of the Decade (2010s) by the American Music Awards. <a href=\"https://www.last.fm/music/Taylor+Swift\">Read more on Last.fm</a>. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply."
//   }
// }