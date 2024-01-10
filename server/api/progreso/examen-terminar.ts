import { getServerSession } from "#auth"
import { GoogleAuth } from 'google-auth-library'
import { google } from 'googleapis'
export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }

  const auth = new GoogleAuth({
    keyFile: 'studially-online-deb47268b9bb.json',
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client } as any);
  const usuario = await Usuario.findOne({ correo: session.user?.email, })
  if (!usuario) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }
  const progreso = await Progreso.findOne({ correo: session.user?.email, })
  if (!progreso) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }
  const curso = await Curso.findOne({ curso: usuario?.curso, })
  if (!curso) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }
  const spreadsheetId = curso?.examenes[Number(progreso?.examenesRealizados) - 1].respuestas;
  const range = 'A:C'
  const { data } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  /* 
  [[
      "29/10/2023 21:20:44",
      "29 / 128",
      "davidalejandro.gr11@gmail.com"
  ], ...],
  */
  // search for the user

  const resultados = data.values?.find((value) => value[2] === session.user?.email)
  if (!resultados) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }

  // push into progreso.examenes
  progreso?.examenes.push(resultados);
  const result = await progreso?.save();

  if (!result) {
    throw createError({ statusMessage: 'Not found', statusCode: 404 })
  }

  return 'Resultados guardados'
})