import { useEffect, useRef, useState } from 'react';
import './MiniGame.css';

const W = 900;
const H = 460;

export default function MiniGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const [score, setScore] = useState([0, 0]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const state = {
      playerY: H / 2 - 55,
      aiY: H / 2 - 55,
      ballX: W / 2,
      ballY: H / 2,
      vx: 5,
      vy: 3.2,
      left: 0,
      right: 0,
      active: false,
      raf: 0,
    };
    gameRef.current = state;

    const resetBall = (direction = 1) => {
      state.ballX = W / 2;
      state.ballY = H / 2;
      state.vx = 5 * direction;
      state.vy = (Math.random() > 0.5 ? 1 : -1) * (2.5 + Math.random() * 1.8);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * ratio;
      canvas.height = H * ratio;
      canvas.style.aspectRatio = `${W} / ${H}`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const gradient = ctx.createLinearGradient(0, 0, W, H);
      gradient.addColorStop(0, '#07121c');
      gradient.addColorStop(1, '#02060a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(95, 211, 255, .08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 45) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 45) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      ctx.setLineDash([10, 14]);
      ctx.strokeStyle = 'rgba(255,255,255,.18)';
      ctx.beginPath(); ctx.moveTo(W / 2, 20); ctx.lineTo(W / 2, H - 20); ctx.stroke();
      ctx.setLineDash([]);

      const glow = (x, y, color) => {
        ctx.shadowColor = color;
        ctx.shadowBlur = 24;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 12, 110);
        ctx.shadowBlur = 0;
      };
      glow(28, state.playerY, '#56e0ff');
      glow(W - 40, state.aiY, '#ff5bbd');

      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(state.ballX, state.ballY, 8, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = '800 64px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,.12)';
      ctx.fillText(`${state.left}  :  ${state.right}`, W / 2, 78);

      if (state.active) {
        state.playerY += (state.mouseY ?? state.playerY + 55 < state.ballY ? 3.8 : -3.8);
        if (state.mouseY != null) state.playerY += (state.mouseY - (state.playerY + 55)) * 0.09;
        state.playerY = Math.max(12, Math.min(H - 122, state.playerY));

        const target = state.ballY - 55;
        state.aiY += Math.max(-4, Math.min(4, target - state.aiY)) * 0.065;
        state.aiY = Math.max(12, Math.min(H - 122, state.aiY));

        state.ballX += state.vx;
        state.ballY += state.vy;
        if (state.ballY < 12 || state.ballY > H - 12) state.vy *= -1;

        if (state.ballX < 52 && state.ballX > 32 && state.ballY > state.playerY - 10 && state.ballY < state.playerY + 120) {
          state.vx = Math.abs(state.vx) + 0.15;
          state.vy += (state.ballY - (state.playerY + 55)) * 0.045;
        }
        if (state.ballX > W - 52 && state.ballX < W - 32 && state.ballY > state.aiY - 10 && state.ballY < state.aiY + 120) {
          state.vx = -Math.abs(state.vx) - 0.15;
          state.vy += (state.ballY - (state.aiY + 55)) * 0.045;
        }

        if (state.ballX < -10) { state.right += 1; setScore([state.left, state.right]); resetBall(1); }
        if (state.ballX > W + 10) { state.left += 1; setScore([state.left, state.right]); resetBall(-1); }
      }

      state.raf = requestAnimationFrame(draw);
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseY = ((event.clientY - rect.top) / rect.height) * H;
    };
    canvas.addEventListener('pointermove', move);
    draw();

    return () => {
      cancelAnimationFrame(state.raf);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggle = () => {
    const state = gameRef.current;
    if (!state) return;
    state.active = !state.active;
    setRunning(state.active);
  };

  const reset = () => {
    const state = gameRef.current;
    if (!state) return;
    state.left = 0;
    state.right = 0;
    state.ballX = W / 2;
    state.ballY = H / 2;
    state.vx = 5;
    state.vy = 3;
    state.active = false;
    setScore([0, 0]);
    setRunning(false);
  };

  return (
    <section id="mini-game" className="mini-game section">
      <div className="container">
        <div className="mini-game__heading">
          <span className="section-label">Playable Project</span>
          <h2 className="section-heading">Take a Break. Play Ping Pong.</h2>
          <p className="section-subheading">A tiny browser game built into my portfolio. Move your pointer over the court and beat the AI.</p>
        </div>
        <div className="mini-game__shell">
          <div className="mini-game__topbar">
            <div><span className="mini-game__live-dot" /> LIVE ARCADE</div>
            <div className="mini-game__score">{score[0]} <span>:</span> {score[1]}</div>
            <div>FIRST TO 7</div>
          </div>
          <canvas ref={canvasRef} className="mini-game__canvas" aria-label="Playable ping pong game" />
          <div className="mini-game__controls">
            <button className="btn btn-primary btn-sm" onClick={toggle}>{running ? 'Pause Game' : 'Start Game'}</button>
            <button className="btn btn-outline btn-sm" onClick={reset}>Reset</button>
            <span>Move mouse / touch to control the cyan paddle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
