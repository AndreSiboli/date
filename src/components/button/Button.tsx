import styles from '@/styles/components/button/Button.module.scss';
import { CSSProperties } from 'react';

interface PropTypes {
    text: string;
    type: 'good' | 'bad';
    style?: CSSProperties;
    handleFunction: Function;
}

export default function Button(props: PropTypes) {
    const { text, type, style, handleFunction } = props;

    return (
        <button
            className={`${styles.button} ${styles[type]}`}
            style={style}
            onClick={() => handleFunction()}
        >
            {text}
        </button>
    );
}
