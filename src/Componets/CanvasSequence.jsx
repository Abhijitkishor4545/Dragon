import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)


export const CanvasSequence = () => {
    const Total_frames = 250;

    function getframeSrc(i) {
        const padded = String(i).padStart(3, "0");
        return `/assets/ezgif-frame-${padded}.jpg`
    }

    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")
        let concelled = false;

        // ----------- canvas -----------------
        function resizeCanvas() {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;

        }
        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        //------------- frame Redering -----------

        const images = new Array(Total_frames).fill(null);
        //[null, null, null, null, ....]
        let settledCount = 0;
        const imageSeq = { frame: 0 }

        function renderFrame() {
            const img = images[Math.floor(imageSeq.frame)];
            if (!img?.complete || !img.naturealWidth) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            //clearRect(x,y,width,height)

            const scale = Math.max(
                canvas.width / img.naturealWidth,
                canvas.height / img.naturealHeight

            )

            const x = (canvas.width - img.naturealWidth * scale) / 2;
            const y = (canvas.height - img.naturealHeight * scale) / 2;

            ctx.drawImage(img, x, y, img.naturealWidth * scale, img.naturealHeight * scale);

            //249.1 === 250



        }

        //------ GSAP INTI------------

        function initGSAP() {
            renderFrame();
            //canvas fadd out 
            gsap.fromTo(canvas,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, ease: "power2.inOut" }
            )
            gsap.fromTo(canvas,
                { opacity: 0 },
                { opacity: 1, duration: 1.2, ease: "power2.inOut" }
            )
        }





    },
        function initGSAP() {
            renderFrame();

            //invisiable to  visiable aniamation and it fades in
            gsap.fromTo(canvas,
                { opacity: 0 },
                { opacity: 1, duration: "1.2", ease: "power2.inOut" }
            )
        },
        gsap.to(imageSeq,{
            frame:TOTAL_FRAMES - 1,
            ease:"none",
            ScrollTrigger
        })

        [])
    return (

        <div>
            <canvas />
        </div>
    )
}
