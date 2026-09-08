import './style.css';
import { Game } from './game/Game';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root is missing');
app.innerHTML = `
  <div class="hud">
    <div class="title-block"><div class="eyebrow">CHAPTER 1 / THE QUIET CITY</div><h1>イチカのいる街</h1><p>二人だけの街</p></div>
    <div class="status-block"><span class="status-dot"></span><span id="camera-mode">THIRD PERSON</span></div>
    <div class="controls"><b>W A S D</b> 移動　 <b>V</b> 視点　 <b>Q / E</b> 見回す</div>
    <div id="interaction-prompt" class="interaction-prompt"><span>F</span> 話しかける</div><div class="crosshair"></div>
  </div>`;
new Game(app);