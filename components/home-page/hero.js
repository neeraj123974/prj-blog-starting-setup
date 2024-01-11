import Image from 'next/image';

import classes from './hero.module.css'

function Hero(){
    return(
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/max.png" alt="An image show Max" width={300} height={300}/>
            </div>
            <h1>Hi, I am Max</h1>
            <p>I blog about the web development, specially about the freamework reactjs or angular</p>
        </section>
    )
}

export default Hero;