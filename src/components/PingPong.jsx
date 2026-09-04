import { useEffect, useRef, useState } from 'react';
import './PingPong.css';

export default function PingPong() {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState({ you: 0, cpu: 0 });
  const state = useRef({ ball:{x:.5,y:.5,vx:.34,vy:.18}, p:.5, ai:.5, last:0, you:0, cpu:0 });

  useEffect(() => {
    const c=canvasRef.current, ctx=c.getContext('2d');
    let raf;
    const resize=()=>{ const r=c.getBoundingClientRect(), d=Math.min(devicePixelRatio||1,2); c.width=r.width*d;c.height=r.height*d;ctx.setTransform(d,0,0,d,0,0); };
    const reset=()=>{const s=state.current;s.ball={x:.5,y:.5,vx:(Math.random()>.5?.34:-.34),vy:(Math.random()-.5)*.42};s.p=.5;s.ai=.5;};
    const draw=(t)=>{
      const r=c.getBoundingClientRect(),w=r.width,h=r.height,s=state.current,dt=Math.min((t-s.last)/1000,.035);s.last=t;
      if(running){
        s.ball.x+=s.ball.vx*dt;s.ball.y+=s.ball.vy*dt;
        if(s.ball.y<.045||s.ball.y>.955){s.ball.y=Math.max(.045,Math.min(.955,s.ball.y));s.ball.vy*=-1;}
        s.ai += (s.ball.y-s.ai)*Math.min(1,dt*5.5);
        const py=s.p*.82+.09, ay=s.ai*.82+.09;
        if(s.ball.x<.09&&Math.abs(s.ball.y-py)<.13&&s.ball.vx<0){s.ball.x=.09;s.ball.vx=Math.abs(s.ball.vx)*1.035;s.ball.vy+=(s.ball.y-py)*.7;}
        if(s.ball.x>.91&&Math.abs(s.ball.y-ay)<.13&&s.ball.vx>0){s.ball.x=.91;s.ball.vx=-Math.abs(s.ball.vx)*1.035;s.ball.vy+=(s.ball.y-ay)*.7;}
        if(s.ball.x<-.03){s.cpu++;reset();setScore({you:s.you,cpu:s.cpu});}
        if(s.ball.x>1.03){s.you++;reset();setScore({you:s.you,cpu:s.cpu});}
      }
      ctx.clearRect(0,0,w,h);ctx.fillStyle='#07100e';ctx.fillRect(0,0,w,h);
      ctx.strokeStyle='rgba(75,255,185,.22)';ctx.setLineDash([6,10]);ctx.beginPath();ctx.moveTo(w/2,0);ctx.lineTo(w/2,h);ctx.stroke();ctx.setLineDash([]);
      const ph=.82*h*.5; ctx.shadowBlur=18;ctx.shadowColor='#59ffc0';ctx.fillStyle='#59ffc0';ctx.fillRect(18,s.p*.82*h+ph*.18-30,9,60);ctx.fillStyle='#ff7bdb';ctx.shadowColor='#ff7bdb';ctx.fillRect(w-27,s.ai*.82*h+ph*.18-30,9,60);
      ctx.fillStyle='#fff';ctx.shadowColor='#fff';ctx.beginPath();ctx.arc(s.ball.x*w,s.ball.y*h,6,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;raf=requestAnimationFrame(draw);
    };
    const move=e=>{const r=c.getBoundingClientRect(),y=(e.touches?e.touches[0].clientY:e.clientY);state.current.p=Math.max(0,Math.min(1,(y-r.top)/r.height));};
    c.addEventListener('mousemove',move);c.addEventListener('touchmove',move,{passive:true});window.addEventListener('resize',resize);resize();raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);c.removeEventListener('mousemove',move);c.removeEventListener('touchmove',move);window.removeEventListener('resize',resize)};
  },[running]);

  const toggle=()=>{setRunning(v=>!v)};
  const reset=()=>{state.current.you=0;state.current.cpu=0;state.current.ball={x:.5,y:.5,vx:.34,vy:.18};setScore({you:0,cpu:0});setRunning(false)};
  const winner=score.you>=7||score.cpu>=7;
  return <section className="mini-game" id="ping-pong">
    <div className="mini-game__copy"><span className="section-label">Playable Project</span><h2 className="section-heading">Ping Pong — <em>Beat the CPU.</em></h2><p>Take control of the paddle and play a competitive first-to-7 match against an adaptive computer opponent.</p><div className="mini-score"><b>{score.you}</b><span>YOU</span><i>:</i><span>CPU</span><b>{score.cpu}</b></div><div className="mini-actions"><button onClick={toggle}>{winner?'REMATCH':running?'PAUSE':'PLAY NOW'}</button><button onClick={reset}>RESET</button></div><small>Move your mouse or finger vertically over the court.</small></div>
    <div className="mini-court"><canvas ref={canvasRef}/><div className="mini-badge">CPU <span>● ONLINE</span></div></div>
  </section>;
}
