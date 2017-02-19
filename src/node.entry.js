import VueCalendar from './entry';

export default function(context) {
  return VueCalendar(context.events);
}
