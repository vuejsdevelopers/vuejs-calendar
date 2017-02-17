<template>
    <div>
        <div>{{ formattedDate }}</div>
        <button @click="dec">-</button>
        <button @click="inc">+</button>
    </div>
</template>
<script>
    export default {
        methods: {
            dec() {
                console.log('dec');
            },
            inc() {
                console.log('inc');
            }
        },
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
