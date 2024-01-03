import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }

  const body = await readBody(event) as {
    parámetros: { categoria: string, valor: number }[],
    materias: { materia: string, valor: number }[]
  }
  if (!body) return new Response('No se envió el body', { status: 400 })

  const totalHorasPrioridad: number[] = [150, 130, 110, 90, 70];

  const totalHoras = body.parámetros.reduce((sum: number, param) => sum + totalHorasPrioridad[param.valor], 0) / 4;
  const meses = [2, 4, 6, 9, 12];
  const totalHorasMes = Math.round(totalHoras / meses[body.parámetros[2].valor]);
  const totalHorasSemana = Math.round(totalHorasMes / 4);

  const horasMaterias = body.materias.reduce((sum: number, materia) => sum + materia.valor, 0);
  const valorUnitario = totalHorasSemana / horasMaterias;

  const progreso = await Progreso.updateOne({ correo: session?.user?.email }, {
    $set: {
      resultados: {
        totalHoras: totalHoras,
        totalHorasMes: totalHorasMes,
        totalHorasSemana: totalHorasSemana,
        materias: body.materias.map(materia => ({
          materia: materia.materia,
          horasSemana: Math.round(valorUnitario * totalHorasPrioridad[materia.valor - 1])
        }))
      }
    }
  })

  return new Response(JSON.stringify(progreso), { status: 200 })
})
