import { getServerSession } from "#auth"

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  const body = await readBody(event) as { materia: string, subtema: string, color: string } | undefined
  if (!body) return new Response('No se envió el body', { status: 400 })

  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }

  const progreso = await Progreso.findOne({ correo: session?.user?.email })
  if (!progreso) return new Response('Progreso no encontrado', { status: 402 })

  // Check if the user already has the submateria, if so delete it
  const tema = progreso['temas-estudio'].find(tema => tema.categoria === body.materia) as { categoria: string, valor: { submateria: string, color: string }[] } | undefined
  if (tema) {
    const removal = await Progreso.updateOne(
      { correo: session?.user?.email },
      {
        $pull: {
          'temas-estudio': {
            $and: [
              { categoria: body.materia },
              { 'valor.submateria': body.subtema }
            ]
          }
        }
      }
    );

    if (!removal) return new Response('No se pudo remover el tema', { status: 400 })
  }

  const pull = await Progreso.updateOne({ correo: session?.user?.email }, {
    $push: {
      'temas-estudio': {
        categoria: body.materia,
        valor: {
          submateria: body.subtema,
          valor: body.color
        }
      }
    }
  })

  if (!pull) return new Response('No se pudo actualizar el tema', { status: 400 })
  return new Response('Incrementado', { status: 200 })
})