<template>
    <div :class="classObject">{{ day.format('D') }}</div>
</template>
<script>
    export default {
        props: [ 'day' ],
        computed: {
            classObject() {
                let today = this.day.isSame(this.$moment(), 'day');
                return {
                    day: true,
                    today,
                    past: this.day.isSameOrBefore(this.$moment(), 'day') && !today
                };
            }
        }
    }
</script>
