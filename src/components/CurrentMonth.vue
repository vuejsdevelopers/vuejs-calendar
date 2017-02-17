<template>
    <div>{{ formattedDate }}</div>
</template>
<script>
    export default {
        computed: {
            formattedDate() {
                return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
            },
            month() {
                return this.$store.state.currentMonth;
            },
            year() {
                return this.$store.state.currentYear;
            },
        }
    }
</script>
