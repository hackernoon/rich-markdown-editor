import {
  Uppload,
  en,
  Local,
  Preview,
  Crop,
  URL as UpploadURL,
  Unsplash,
  Pexels,
  Pixabay,
  GIPHY,
} from "@hackernoon/uppload";

import "./uppload.css";
import "./light.css";

var uploader = new Uppload({
  lang: en,
  defaultService: "local",
  uploader: file => console.log(file),
  maxSize: [1400, 1400],
  compressionFromMimes: ["image/jpeg", "image/webp", "image/png"],
  compressionToMime: "image/jpeg",
  compression: 0.8,
});

const uploaders = [
  new Local({mimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"]}),
  new Preview(),
  new Crop(),
  new UpploadURL(),
  new Unsplash("7da1761f709e24f5f9fb583e204ba251c9c293a32aba7b3ef58615d03d2557b5"),
  new Pexels("563492ad6f91700001000001feebfb59ae024f1693331c45f63f627e"),
  new Pixabay("18641614-f387f893b9d91652203cb55c9"),
  new GIPHY(),
];

uploader.use(uploaders);

export default uploader;