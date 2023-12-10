// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY, dangerouslyAllowBrowser: true });
type Data = {
    response: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method === 'POST') {
            // need to validate
            if (req.body) {
                const data = JSON.parse(req.body);
                const response = await openai.images.generate({
                    "model": "dall-e-3",
                    "prompt": data.prompt,
                    "n": 1,
                    "size": data.size,
                });
                console.log(response.data[0].url);
                res.status(200).send({ response: response.data[0].url });
            } else {
                res.status(422).send({ response: "" });
            }
        } else {
            res.status(422).send({ response: "" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ response: "" });
    }
}
