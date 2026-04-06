import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import React from 'react'
import gsap from 'gsap';

const Hero = () => {
    useGSAP(() => {
        const heroSplit = new SplitText('.title',  {type: ' words, chars'});
        const paragraphSplit = new SplitText('.subtitle',  {type: 'lines'});

        heroSplit.chars.forEach((char) =>char.classList.add('text-gradient'));

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
            scrollTrigger:{
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        })
        .to('.right-leaf', {y:200 }, 0)
        .to('.left-leaf', {y: -200}, 0)
    }, []);
  return (
    <>
    <section id='hero' className='noisy'>
        <h1 className='title'>
            MOJOJOJO
        </h1>
        <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf'/>
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf'/>
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
    </>
  )
}

export default Hero