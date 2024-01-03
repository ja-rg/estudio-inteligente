import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session) {
        throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })    
    }

    const progreso = await Progreso.findOne({ correo: session?.user?.email })
    if (!progreso) return new Response('Progreso no encontrado', { status: 402 })

    const increment = await Progreso.updateOne({ correo: session?.user?.email }, { $inc: { estrategiasVistas: 1 } })
    if (!increment) return new Response('Error al incrementar', { status: 402 })

    return new Response('Incrementado', { status: 200 })
})