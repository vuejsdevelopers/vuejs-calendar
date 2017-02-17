<template>
    <div>
        <div v-for="week in weeks">
            Week
            <div v-for="day in week">{{ day }}</div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                month: 2,
                year: 2017
            };
        },
        computed: {
            days() {

                // Generating all days in current month
                let days = [];
                let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === this.month);

                // Add previous days to start
                currentDay = this.$moment(days[0]);

                const SUNDAY = 0;
                const MONDAY = 1;

                if (currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        days.unshift(currentDay);
                    } while(currentDay.day() !== MONDAY);
                }

                // Add following days to end
                currentDay = this.$moment(days[days.length - 1]);

                if (currentDay.day() !== SUNDAY) {
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                    } while(currentDay.day() !== SUNDAY);
                }

                return days;
            },
            weeks() {
                let weeks = [];
                let week = [];

                for (let day of this.days) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }

                return weeks;
            }
        }
    }
</script>
