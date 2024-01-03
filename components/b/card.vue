<template>
    <div class="card mb-3 shadow-lg">
        <div class="card-header">
            <slot name="header" />
        </div>
        <div class="card-body">
            <slot name="body" />
        </div>
        <div class="card-footer">
            <slot name="footer" />
        </div>
    </div>
</template>