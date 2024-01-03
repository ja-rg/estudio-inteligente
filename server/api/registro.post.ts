export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const email = await Usuario.findOne({ correo: body.correo })

  if (email) {
    return {
      statusCode: 400,
      message: 'El correo ya existe',
    }
  }

  const usuario = await Usuario.create({
    nombres: body.nombres,
    apellidos: body.apellidos,
    correo: body.correo,
    curso: body.curso,
    fechaRegistro: new Date(),
    suscripcion: false,
    examen: false,
    suscripcionDesde: null,
    vigenciaSuscripcion: null,
  })

  const progreso = await Progreso.create({
    correo: body.correo,
    curso: body.curso,
    examenesRealizados: 0,
    estrategiasVistas: 0,
  })

  return {
    statusCode: 200,
    message: 'success',
    body: JSON.stringify({
      usuario,
      progreso,
    }),
  }
})
