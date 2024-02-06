// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import process from 'process';

type Data = {
    message?: string;
    err?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const smtp = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.email,
            pass: process.env.pass,
        },
    });

    if (req.method === 'POST') {
        const message = `
    <p>A resposta foi ${req.body.response}</p>
    </br>
    <p>${req.body.response}... ${req.body.response}... Isso mesmo que ouviu, a resposta foi <strong>${req.body.response}</strong></p>
    `;
        const config = {
            from: process.env.email,
            to: process.env.email2,
            subject: 'A resposta foi...',
            html: message,
        };

        await new Promise((resolved, rejected) => {
            smtp.sendMail(config)
                .then((response) => {
                    smtp.close();
                    res.status(200).json({ message: 'Your message has sent' });
                    return resolved(response);
                })
                .catch((err) => {
                    res.status(500).json({ err: 'Your message has not sent' });
                    smtp.close();
                    return rejected(err);
                });
        });
    }
    if (req.method === 'GET') {
        const message = `<p>Ela está vendo o site</p>
      `;
        const config = {
            from: process.env.email,
            to: process.env.email2,
            subject: 'Ela está vendo o site',
            html: message,
        };

        await new Promise((resolved, rejected) => {
            smtp.sendMail(config)
                .then((response) => {
                    smtp.close();
                    res.status(200).json({ message: 'Your message has sent' });
                    return resolved(response);
                })
                .catch((err) => {
                    res.status(500).json({ err: 'Your message has not sent' });
                    smtp.close();
                    return rejected(err);
                });
        });
    } else {
        res.status(500).json({ err: 'It was not a POST.' });
    }
}
