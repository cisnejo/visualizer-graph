import { Component, createMemo, onMount } from 'solid-js';
import { startFromFile, rawData } from './audioSource';




const Canvas: Component = () => {
  let canvasRef: any;

  onMount(() => {
    const canvas: HTMLCanvasElement = canvasRef;
    const context = canvas.getContext('2d')!;

    createMemo(() => {
      const barNumber = rawData().length;
      const barWidth = (context.canvas.width) / barNumber;
      const data = rawData();
      context.clearRect(0, 0, canvas.width, canvas.height);
      let xPosition = 0;

      for (const d of data) {
        context.fillStyle = "white"
        const barHeight = d * .4;
        context.fillRect(xPosition, canvas.height - barHeight, barWidth, barHeight)
        xPosition += barWidth
      }
    })
  })

  return (
    <canvas ref={canvasRef} style='flex:1' ></canvas>
  )
}

const App: Component = () => {
  return (
    <div style=" display:flex;flex-direction:column;width:100vw; height:100vh;background-color:black ">
      <button onclick={startFromFile}>Start Song</button>
      <Canvas />
    </div>
  );
};

export default App;
