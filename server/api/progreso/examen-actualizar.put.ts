import { getServerSession } from "#auth"
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }

  const progreso = await Progreso.updateOne({
    correo: session.user?.email,
  }, { $inc: { examenesRealizados: 1 } })

  if (!progreso) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }

  return 'Resultados guardados'
})
