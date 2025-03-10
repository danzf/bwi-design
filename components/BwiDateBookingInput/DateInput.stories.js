import storybookMixin from '../../utils/storybook'
import BwiDateBookingInput from './DateBookingInput.vue'

export default {
  component: BwiDateBookingInput,
  title: 'Components/BwiDateBookingInput',
  argTypes:{
    responsiveness: 
    {
      description: 'The class fixed size width the button', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
    initValue: 
    { 
      control: {
        type: 'select',
        options: ['pattern', 'currentDate']
      } 
    },
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
  return {
    name: 'BwiDateBookingInputStories',
    components: { BwiDateBookingInput },
    mixins: [storybookMixin(args, context)],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    template: `
      <bwi-date-booking-input
        :class="responsiveness"
        v-bind="$props"
        v-on="events"
      />
    `,
  }
}

export const Default = Template.bind({});
Default.args = {
  value: "01/01/1990"
};
