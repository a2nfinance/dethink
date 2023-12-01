import { getAttributes } from '../../../backend/prompt2Attributes.js';

export const generateItemAttributes =async (dps: string, dph: string, aps: string, dhe: string) => {
    // load model
    return (await getAttributes(dps, dph, aps, dhe));
    // change settings
    // generate item attributes
    
}