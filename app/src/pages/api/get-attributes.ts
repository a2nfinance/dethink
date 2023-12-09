import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY, dangerouslyAllowBrowser: true });
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        if (req.method === 'POST') {
            // need to validate
            if (req.body) {
                console.log("Results:", req.body);
                const data = JSON.parse(req.body);
                console.log(data);
                const completion = await openai.chat.completions.create({
                    messages: [
                        { role: "user", content: data.prompt }
                    ],
                    model: "gpt-3.5-turbo",
                });

                console.log(completion);

                res.status(200).send(completion.choices[0].message.content);
            } else {
                res.status(422).send("");
            }
        } else {
            res.status(422).send("");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("");
    }
}
