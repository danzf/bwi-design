// Button.stories.js

import storybookMixin from '../../utils/storybook'
import BwiCalendar from './Calendar.vue'

export default {
  component: BwiCalendar,
  title: 'Components/Calendar',
  argTypes:{
    type: 
    { 
      control: {
        type: 'select',
        options: ['picker', 'range']
      } 
    },
  }
}

const Template = (args, context) => {
  const { argTypes } = context
  return {
    name: 'BwiCalendarStories',
    components: { BwiCalendar },
    props: Object.keys(argTypes),
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-calendar
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({})
