import { SpeechPlayer } from '../lib/index.js';
/** 
 * You need create a file named openai.js and export key.
 * Example: ```export const key = "your key";```
 * 
 * */
import { key } from './openai.js';

async function main() {
  const audioEl = document.querySelector('audio');
  const player = new SpeechPlayer({
    audio: audioEl,
    onPlaying: () => { },
    onPause: () => { },
    onChunkEnd: () => { },
    mimeType: 'audio/mpeg',
  });
  await player.init();

  var myHeaders = new Headers();
  myHeaders.append("Cache-Control", "no-store");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${key}`);

  var raw = JSON.stringify({
    "model": "tts-1",
    "input": "Do not share your API key with others or expose it in the browser or other client-side code. To protect your account's security, OpenAI may automatically disable any API key that has leaked publicly.",
    "voice": "shimmer",
    "response_format": "mp3",
    "speed": 1
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://api.openai.com/v1/audio/speech", requestOptions);
  player.feedWithResponse(response);
}

const btn = document.querySelector('button');

btn.onclick = () => {
  main();
};
