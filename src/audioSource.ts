import { createSignal } from "solid-js";

const [rawData, setRawData] = createSignal<number[]>([]);

export const startFromFile = async () => {
  const res = fetch("/MEGALOVANIA.mp3");
  const byteArray = await (await res).arrayBuffer();

  const context = new AudioContext();
  const audioBuffer = await context.decodeAudioData(byteArray);

  const source = context.createBufferSource();
  source.buffer = audioBuffer;

  const gainNode = context.createGain();
  gainNode.gain.value = 0.1; //10%;
  gainNode.connect(context.destination);

  const analyzer = context.createAnalyser();
  analyzer.fftSize = 2048;

  source.connect(analyzer);
  analyzer.connect(gainNode);
  source.start();

  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const update = () => {
    analyzer.getByteFrequencyData(dataArray);
    setRawData(Array.from(dataArray));
    //console.log(dataArray);
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
};

export { rawData };
