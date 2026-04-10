import { useRef, useEffect } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];
    
    // Mouse context
    let mouse = {
      x: null,
      y: null,
      radius: 200 
    };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    let lastWidth = window.innerWidth;
    
    const handleResize = () => {
      // Throttle window resize to only Horizontal width changes to completely eliminate 
      // the mobile 100vh jumping bug caused by the address bar hiding on scroll!
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
      }
    };    

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        // Extreme density in the center using power of 3
        let maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
        this.radius = Math.pow(Math.random(), 3) * maxRadius;
        
        let arms = 3;
        let arm = Math.floor(Math.random() * arms);
        
        this.baseAngle = (arm * ((Math.PI * 2) / arms)) + (this.radius * 0.005);
        
        let scatterRange = this.radius * 0.35 + 10;
        this.scatterX = (Math.random() - 0.5) * scatterRange;
        this.scatterY = (Math.random() - 0.5) * scatterRange;
        
        this.size = Math.random() * 2 + 0.5;
        
        // VORTEX SPIN: Center spins much faster than outer edges!
        let distanceFactor = this.radius / maxRadius;
        this.spinSpeed = 0.0002 + (1 - distanceFactor) * 0.003;
        
        this.alpha = Math.max(0.05, 1 - distanceFactor);
        this.isBright = Math.random() > 0.9;
        
        // Color mapping: Core is intense Dragon Red, Outer is Dim White
        // We interpolate RGB values based on distance from center
        let colorMix = Math.min(1, this.radius / (maxRadius * 0.4)); // Transitions fully at 40% out
        this.r = 255; // Always strong red component
        this.g = 26 + (200 * Math.pow(colorMix, 2)); // Transitions from 26 -> 226
        this.b = 26 + (200 * Math.pow(colorMix, 2)); // Transitions from 26 -> 226
      }
      
      draw(x, y) {
        let opacity = this.isBright ? this.alpha * 1.5 : this.alpha * 0.8;
        if (opacity > 1) opacity = 1;

        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity})`; 
        ctx.beginPath();
        ctx.rect(x, y, this.size, this.size);
        ctx.closePath();
        ctx.fill();
        
        // Only glow the intense red core particles to save performance and make center look crazy
        if (this.isBright && this.g < 100) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(255, 26, 26, ${opacity})`;
        } else {
          ctx.shadowBlur = 0;
        }
      }
      
      update() {
        this.baseAngle -= this.spinSpeed;
        
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        
        let x = cx + Math.cos(this.baseAngle) * this.radius + this.scatterX;
        let y = cy + Math.sin(this.baseAngle) * this.radius + this.scatterY;

        if (mouse.x !== null) {
          let dx = mouse.x - x;
          let dy = mouse.y - y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            let force = Math.pow((mouse.radius - distance) / mouse.radius, 2); 
            // Crazy parting force
            let pushX = (dx / distance) * force * 80; 
            let pushY = (dy / distance) * force * 80;
            x -= pushX;
            y -= pushY;
          }
        }
        
        this.draw(x, y);
      }
    }

    const init = () => {
      particlesArray = [];
      let count = (canvas.width * canvas.height) / 800; // Increased density for a crazier core 
      if (count > 2500) count = 2500;
      
      for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-90" 
    />
  );
}
