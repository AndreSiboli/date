import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
                <title>Echo</title>
                <meta
                    name="description"
                    content="This is a fictional site about a photo studio called Echo."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="author" content="André Siboli" />
                <meta name="keywords" content="gallery, echo, photo, photography, studio" />
                <link rel="icon" href="./favicon.ico" />
            </Head>

            <div className={inter.className} style={{ height: '100%' }}>
                {children}
            </div>
        </>
    );
}
