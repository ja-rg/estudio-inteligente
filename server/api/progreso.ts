import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })    
    }
    const progreso = await Progreso.findOne({ correo: session?.user?.email })
    if (!progreso) return new Response('Progreso no encontrado', { status: 402 })
    return progreso
})
