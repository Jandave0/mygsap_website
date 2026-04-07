import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import React, { useRef } from 'react'
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
    const videoref = useRef();
    const videoTimelineRef = useRef();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    useGSAP(() => {
        const heroSplit = new SplitText('.title', { type: ' words, chars' });
        const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

        heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.06,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 100,
            duration: 1.8,
            ease: 'expo.out',
            stagger: 0.06,
            delay: 0.5,
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
            .to('.right-leaf', { y: 200 }, 0)
            .to('.left-leaf', { y: -200 }, 0)

        const startValue = isMobile ? 'center 60%' : 'center 50%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
                // onEnter: () => videoref.current.play(),
                // onEnterBack: () => videoref.current.play(),
                // onLeave: () => videoref.current.pause(),
                // onLeaveBack: () => videoref.current.pause(),
            }
        });

        videoref.current.onloadedmetadata = () => {
            tl.to(videoref.current, {
                currentTime: videoref.current.duration,

            })
        }

        // videoTimelineRef.current.to(videoref.current, {
        //     y: 150,
        //     scale: 0.9,
        //     opacity: 0,
        //     ease: "none"
        // });

    }, []);
    return (
        <>
            <section id='hero' className='noisy'>
                <h1 className='title'>
                    MOJOJOJO
                </h1>
                <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
                <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />
                <div className='body'>
                    <div className='content'>
                        <div className='space-y-5 hidden md:block'>
                            <p>
                                Experience the art of mixology
                            </p>
                            <p className='subtitle'>
                                Unleash your inner bartender with <br />our exquisite cocktail recipes
                            </p>
                        </div>
                        <div className='view-cocktails'>
                            <p className='subtitle'>
                                every cocktail you can imagine, and more all in one place. That's our promise to you. youll find the most delicious, unique, and creative cocktails on our website.
                            </p>
                            <a href="#cocktails">View Cocktails</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className='video absolute inset-0'>
                <video
                    ref={videoref}
                    src='/videos/output.mp4'
                    muted
                    playsInline
                    preload='auto'

                />
            </div>
        </>
    )
}

export default Hero