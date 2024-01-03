import { getServerSession } from "#auth"
import { mongo } from "mongoose"

export default defineEventHandler(async (event) => {
    const cursos = await Curso.find({}, {curso: 1})
    return cursos
})
