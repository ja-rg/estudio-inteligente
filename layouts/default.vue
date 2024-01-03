<script lang="ts" setup>
const estructura = {
    NavItems: [
        { label: 'Plan personalizado', href: '/plan-personalizado', icon: resolveComponent('BootstrapIconCalendarFill') },
        { label: 'Programas de aprovechamiento', href: '/programas-aprovechamiento', icon: resolveComponent('BootstrapIconFastForwardBtn') },
        { label: 'Marcador de temas', href: '/temas', icon: resolveComponent('BootstrapIconBookmarkFill') },
        { label: 'Masterclass', href: '/masterclass', icon: resolveComponent('BootstrapIconPlayCircleFill') },
        { label: 'Exámenes simulacro', href: '/examenes-simulacro', icon: resolveComponent('BootstrapIconFileEarmarkTextFill') },
    ]
}

useHead({ title: 'Estudio Inteligente', })
const { status, getSession } = useAuth()
const { user } = await getSession()
</script>

<template>
    <div class="container mt-4" v-cloak>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top z-2">
            <div class="container">
                <!-- Brand Logo -->
                <NuxtLink to="/" class="navbar-brand">
                    <NuxtImg width="150" src="/img/LogoHeader.png" />
                </NuxtLink>

                <!-- Toggler Button -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#studiallyNavbar"
                    aria-controls="studiallyNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <form class="d-flex">

                    <!-- Navbar Content -->
                    <div id="studiallyNavbar" v-if="status === 'authenticated'"
                        class="collapse navbar-collapse me-auto mb-2 mb-lg-0">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <!-- Main Navigation Links -->
                            <li class="nav-item" v-for="item in estructura.NavItems" :key="item.label"
                                :class="{ 'active disabled': $route.path === item.href }">
                                <NuxtLink class="nav-link" :to="item.href" :class="{ 'active': $route.path === item.href }">
                                    <component :is="item.icon" class="me-2" width="20" height="20" />
                                    {{ item.label }}
                                </NuxtLink>
                            </li>
                            <li class="nav-item dropdown">
                                <Profile class="d-flex align-items-center" :name="user?.name" />
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </nav>
        <!-- <Mensajes :lista="mensajes" /> -->
        <main class="container my-5 pb-5">
            <slot />
        </main>

        <!-- Footer -->
        <FooterSimple />
        <div class="background-container"></div>
    </div>
</template>