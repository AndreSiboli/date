import Head from 'next/head';

import styles from '@/styles/Home.module.scss';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Img from '@/components/utils/Img';
import Button from '@/components/button/Button';

import img1 from '@/assets/meme/1.gif';
import img2 from '@/assets/meme/2.jpg';
import img3 from '@/assets/meme/3.jpg';
import img4 from '@/assets/meme/4.jpg';
import img5 from '@/assets/meme/5.jpg';
import img6 from '@/assets/meme/6.jpg';
import img7 from '@/assets/meme/final.jpg';
import { redirect } from 'next/navigation';

export default function Home() {
    const [show, setShow] = useState(true);
    const [styleYes, setStyleYes] = useState<CSSProperties>({ fontSize: '1.2em' });
    const [styleNo, setStyleNo] = useState<CSSProperties>({});
    const [text, setText] = useState('Não');
    const [tries, setTries] = useState(0);
    const [currentImg, setCurrentImg] = useState(img1);
    const [saidYes, setSaidYes] = useState(false);
    const fontSize = useRef(1.5);

    useEffect(() => {
        if (localStorage.getItem('saw') === '1') return;
        axios
            .get('/api/hello')
            .then((res) => {
                console.log(res);
                localStorage.setItem('saw', '1');
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (localStorage.getItem('choose') === '0') {
            setShow(false);
        }
    }, []);

    useEffect(() => {
        if (tries === 1) {
            setText('talvez tenha clicado errado kk');
        } else if (tries === 2) {
            setText('outra vez kk?');
            setCurrentImg(img2);
        } else if (tries === 3) {
            setText('acho que você gosta de vermelho');
            setStyleYes((prevState) => ({ ...prevState, background: '#f00' }));
            setStyleNo((prevState) => ({ ...prevState, background: '#0f0' }));
            setCurrentImg(img3);
        } else if (tries === 4) {
            setText('espera, tá clicando de propósito?');
            setStyleYes((prevState) => ({ ...prevState, background: '#0f0' }));
            setStyleNo((prevState) => ({ ...prevState, background: '#f00' }));
            setCurrentImg(img4);
        } else if (tries === 5) {
            setText('clica sim aí, vai');
            setCurrentImg(img6);
        } else if (tries === 6) {
            setText('é sério isso?');
            setCurrentImg(img5);
        } else if (tries >= 7) {
            setText('já entendi...');

            setTimeout(() => setShow(false), 1500);
            localStorage.setItem('choose', '0');

            axios
                .post('/api/hello', { response: 'não' })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
    }, [tries]);

    function noOption() {
        const font = fontSize.current;
        setStyleYes({ fontSize: `calc(1.2em * ${font})` });
        fontSize.current += 0.5;
        setTries((prevState) => prevState + 1);
    }

    async function yesOption() {
        setSaidYes(true);
        setCurrentImg(img7);

        await axios
            .post('/api/hello', { response: 'sim' })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));

        window.location.assign('https://youtu.be/2GuX-F08fwI?si=kP9hMa6NyMAZOmQg');
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            {show ? (
                <main className={`${styles.main}`}>
                    <div className={styles.main_image}>
                        <Img src={currentImg} />
                    </div>

                    {!saidYes && (
                        <>
                            <div className={styles.main_text}>
                                <p>Quer namorar comigo?</p>
                            </div>
                            <div className={styles.main_buttons}>
                                <div className={styles.main_button}>
                                    <Button
                                        text="Sim"
                                        type="good"
                                        style={styleYes}
                                        handleFunction={yesOption}
                                    />
                                </div>
                                <div className={styles.main_button}>
                                    <Button
                                        text={text}
                                        type="bad"
                                        style={styleNo}
                                        handleFunction={noOption}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </main>
            ) : (
                <div className={styles.main_err}>
                    <p>ok</p>
                </div>
            )}
        </>
    );
}
