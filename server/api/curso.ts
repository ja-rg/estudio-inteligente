import { getServerSession } from "#auth"
import { mongo } from "mongoose"

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }

    const usuario = await Usuario.findOne({ _id: new mongo.ObjectId((session as any)?.uid) })
    if (!usuario) return new Response('Usuario no encontrado', { status: 404 })

    const curso = await Curso.findOne({ curso: usuario?.curso })
    if (!curso) return new Response('Curso no encontrado', { status: 404 })

    return curso
})
