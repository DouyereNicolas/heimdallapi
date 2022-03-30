import React, { FunctionComponent, useEffect, useState, useRef } from "react";



type animateN = { time: number };

const NumberMove: FunctionComponent<animateN> = ({ time }) => {

    //const targetContainer = useRef();
    const targetContainer = useRef<HTMLInputElement | null>(null);
    const [top, setTop] = useState<number>();
    const [count, setCount] = useState(0);
    const [isAnimated, setIsAnimated] = useState(false);
    const showAt = 600;
    const hideAt = 1000;
    //const animateN = 1500;

    const handleWheel = () => {
        if(targetContainer.current){
            setTop(targetContainer.current.getBoundingClientRect().top);
        }
            
    }

    useEffect(() => {
        window.addEventListener("scroll", handleWheel);

        return () => {
            window.removeEventListener("scroll", handleWheel);
        }
    });

    const animate = (n:any) => {
        setIsAnimated(true);

        for (let index = 0; index < n; index++) {
            setTimeout(() => {
                setCount(c => c + 1);
            }, 1000);
        }
    }


    useEffect(() => {
        if(top){
            if (top != null && top < showAt && !isAnimated) {
                animate(time);
            }
    
            if (top > hideAt && isAnimated) {
                setIsAnimated(false);
                setCount(0);
            }
        }
        
    }, [top ,isAnimated , time])

    return (
    <>
    <h2 className="h2" ref={targetContainer}> <span className="js-count" data-count="1000">{count}</span></h2>
    </>
    )

}
export default function SectionCount() {



    return (

        <section className="sectionImgHome">
            <div className="h-100" id="h-100" style={{ display: 'flex' }}>
                <div className="col-4 numberDiv">
                <NumberMove time={1410}/>
                    <h3>Chantiers réalisés</h3>
                </div>

                <div className="col-4 numberDiv">
                <NumberMove time={1550}/>
                    <h3>Véhicules </h3>
                </div>

                <div className="col-4 numberDiv">
                <NumberMove time={1590}/>
                    <h3>Employés</h3>
                </div>
            </div>
        </section>
    );
}
