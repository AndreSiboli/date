import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface PropsType {
    src: StaticImport | string;
    alt?: string;
    style?: CSSProperties;
}

export default function Img(props: PropsType) {
    const { src, alt = '', style } = props;

    return (
        <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', display: ' block', ...style }}
        />
    );
}
