import { z } from "zod";

export const loginSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario es requerido'
    }),
    password: z.string({
        required_error: 'Constraseña es requerida',
    }).min(4, {
        message: 'La contraseña debe tener al menos 4 caracteres'
    }),
});