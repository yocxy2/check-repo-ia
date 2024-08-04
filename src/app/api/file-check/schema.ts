import { z } from 'zod';

// define a schema for description of good practices of the file
export const checkSchema = z.object({
    description: z.string().describe("Evaluacion del archivo"),
    type: z.string().describe("Tipo de archivo"),
    fixes: z.array(z.string()).describe("Arreglo de posibles correcciones"),
    rate: z.number().describe("Puntuacion del archivo del 0 al 100"),
});