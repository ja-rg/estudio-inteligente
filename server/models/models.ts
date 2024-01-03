import { defineMongooseModel } from '#nuxt/mongoose'

export const Usuario = defineMongooseModel('usuarios', {
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    correo: { type: String, required: true },
    curso: { type: String, required: true },
    vigenciaSuscripcion: { type: Date, required: false },
    fechaRegistro: { type: Date, required: true },
    suscripcionDesde: { type: Date, required: false },
    suscripcion: { type: Boolean, required: false },
})
export const Curso = defineMongooseModel('cursos', { curso: { type: String, required: true } })

export const Progreso = defineMongooseModel('progreso', {
    correo: { type: String, required: true },
    curso: { type: String, required: true },
    examenesRealizados: { type: Number, required: true },
    estrategiasVistas: { type: Number, required: true },
    // temas-estudio is an array of {categoria: string, valor: object of {submateria: string, color: string}}
    'temas-estudio': { type: Array<{ categoria: string, valor: { submateria: string, color: string } }>(), required: true, },
}, { collection: 'progreso' })

export const Administradores = defineMongooseModel('administradores', {
    informacion: { type: String, required: true },
    correo: { type: String, required: true },
}, { collection: 'administradores' })
