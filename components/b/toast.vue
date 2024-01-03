<script setup>
import { Toast } from 'bootstrap'
defineProps(['colour', 'message', 'title', 'success'])

onMounted(() => new Toast(document.querySelector('.toast')).show())
</script>

<template>
    <div class="position-fixed top-0 end-0 p-3 z-3" style="z-index: 11">
        <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header" :class="`bg-${colour} text-white`">
                <BootstrapIconXCircleFill v-if="success === false" class="me-2" />
                <BootstrapIconCheckLg v-else-if="success === true" class="me-2" />
                <BootstrapIconInfoLg v-else class="me-2" />

                <strong class="me-auto">{{ title }}</strong>
                <!-- <small>{{ new Date().toLocaleTimeString() }}</small> -->
                <button type="button" class="btn-close text-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                {{ message }}
            </div>
        </div>
    </div>
</template>