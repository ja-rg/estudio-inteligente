import { getServerSession } from "#auth"
import { mongo } from "mongoose"

export default defineEventHandler(async (event) => {
    const información = await Administradores.find();
    if (!información) return new Response('Información no encontrada', { status: 404 })

    return información
})