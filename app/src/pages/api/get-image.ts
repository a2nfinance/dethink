// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import https from "https";
import fs from "fs";
import path from "path";
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY, dangerouslyAllowBrowser: true });


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        if (req.method === 'POST') {
            if (req.body) {
                const data = JSON.parse(req.body);
                console.log("BODY", data);
                const response = await openai.images.generate({
                    "model": "dall-e-2",
                    "prompt": data.prompt,
                    "n": 1,
                    "size": data.size,
                });
                const imageName = new Date().getTime();
                const imageUrl = response.data[0].url;
                const file = fs.createWriteStream(path.join(process.cwd(), `/public/generate/${imageName}.jpg`));
                https.get(imageUrl, function (response) {
                    response.pipe(file)
                }
                );
                console.log("Generated done");
                res.status(200).send({ response: `/generate/${imageName}.jpg` });
            } else {
                console.log("here", 422);
                res.status(422).send({ response: "" });
            }
        } else {
            console.log("here", 422);
            res.status(422).send({ response: "" });
        }
    } catch (e) {
        console.log(e);
        console.log("here", 500);
        res.status(500).send({ response: "" });
    }
}
