import React, { useState, useEffect } from 'react';
import css from './MeanWise.module.scss';
import Timeline from '@components/lpc/Odvp/02_MeanWise/Timeline';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Lottie from 'react-lottie';
import { InView, useInView } from 'react-intersection-observer';
import starsLeft from '../../../../../public/front-static/icons/odvp/lottie/Doublant - Stars_leftside.json';
import starsRight from '../../../../../public/front-static/icons/odvp/lottie/Doublant - Stars_rightside.json';
import wise from '../../../../../public/front-static/icons/odvp/lottie/wording - sage V2.json';
import useWindowSize from '@components/common/hooks/useWindowSize';
import { S_DEVICE, XL_DEVICE } from '@components/lpc/Constants';

const MeanWise = () => {
    const [showLottie, setShowLottie] = useState(false);
    const [startAnimation, setStartAnimation] = useState(false);
    const [isComponentInView, setIsComponentInView] = useState(false);
    const { width } = useWindowSize();
    const [ref, inView] = useInView({
        threshold: 1,
        delay: 250,
    });

    useEffect(() => {
        inView ? setStartAnimation(true) : setStartAnimation(false);
    }, [inView]);

    useEffect(() => {
        startAnimation ? setTimeout(() => setShowLottie(true), 800) : setShowLottie(false);
    }, [startAnimation]);

    useScrollPosition(
        ({ currPos }) => {
            if (width < S_DEVICE || !isComponentInView) {
                return;
            }

            const scrollY = currPos.y;
            const item = document.getElementById('title');

            item.style.transform = isComponentInView && `translateX(${-scrollY * 0.2}px)`;
        },
        [width, isComponentInView],
    );

    const starsLeftOptions = {
        loop: true,
        autoplay: true,
        animationData: starsLeft,
    };

    const starsRightOptions = {
        loop: true,
        autoplay: true,
        animationData: starsRight,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    const wiseOptions = {
        loop: false,
        autoplay: true,
        animationData: wise,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <InView onChange={setIsComponentInView}>
            <div className={css.container}>
                {width > S_DEVICE && width < XL_DEVICE ? (
                    <div className={css.title}>
                        <h1 id={'title'}>Du 04 au 14 décembre</h1>
                    </div>
                ) : (
                    <div className={css.title}>
                        <h1 id={'title'}>
                            Du 04 au 14 décembre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Du 04
                            au 14 décembre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Du 04 au 14
                            décembre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Du 04 au 14
                            décembre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Du 04 au 14
                            décembre&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                    </div>
                )}

                <div className={css.content}>
                    <div className={css.content__text}>
                        <div className={css.lottie}>
                            {showLottie && <Lottie options={wiseOptions} width={211} height={127} />}
                        </div>

                        {width > S_DEVICE ? (
                            <>
                                <p>
                                    Parce que vous avez été très
                                    <span
                                        ref={ref}
                                        className={`${css.content__text__bold} ${css.content__text__mean} ${
                                            startAnimation ? css.strike : ''
                                        }`}
                                    >
                                        méchants
                                    </span>
                                    cette année
                                </p>
                                <p>
                                    <span className={css.content__text__bold}>Le Pot Commun et Virgin Radio</span> ont
                                    décidé de vous gâter en
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Parce que vous avez été très
                                    <span
                                        ref={ref}
                                        className={`${css.content__text__bold} ${css.content__text__mean} ${
                                            startAnimation ? css.strike : ''
                                        }`}
                                    >
                                        méchants
                                    </span>{' '}
                                    <br />
                                    cette année&nbsp;
                                    <span className={css.content__text__bold}>Le Pot Commun et Virgin Radio</span> ont
                                    décidé de vous gâter en
                                </p>
                            </>
                        )}
                        <div className={css.content__stars}>
                            <div className={css.content__stars__icon}>
                                <Lottie options={starsLeftOptions} width={100} height={100} />
                            </div>
                            <p className={css.content__stars__txt}>DOUBLANT VOS CAGNOTTES !</p>
                            <div className={css.content__stars__icon}>
                                <Lottie options={starsRightOptions} width={100} height={100} />{' '}
                            </div>
                        </div>
                    </div>

                    <Timeline />
                </div>
            </div>
        </InView>
    );
};

export default React.memo(MeanWise);
