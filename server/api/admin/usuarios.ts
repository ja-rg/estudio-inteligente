export default defineEventHandler(async (event) => {
  const usuarios = await Usuario.find();
  return usuarios;
})
