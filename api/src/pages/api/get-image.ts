// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generateImages } from '@/core/generate-image';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    success: boolean,
    data?: string[] // '?' : Optional attribute
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method === 'POST') {
            // need to validate
            if (req.body) {
                // Call a core function to generate images from the request prompt.
                const imageURLs = await generateImages(req.body.prompt);
                res.status(200).send({ success: true, data: imageURLs });
            } else {
                res.status(422).send({ success: false });
            }
        } else {
            res.status(422).send({ success: false });
        }
    } catch (e) {
        res.status(500).send({success: false});
    }
}
