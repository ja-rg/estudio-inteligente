import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }

  // leer archivo de examen ... desde la raiz del proyecto, .../examen.json

  return 'Examen terminado'
})
