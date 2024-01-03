import { getServerSession } from "#auth"
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { data } = await useFetch('/api/usuario')

    if (!data.value?.suscripcion)
        return navigateTo('/suscripcion-vencida')

    if (data.value?.suscripcion && to.path === '/suscripcion-vencida')
        return navigateTo('/')
})
