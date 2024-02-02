import storybookMixin from '../../utils/storybook'
import BwiDateInput from './DateInput.vue'

export default {
  component: BwiDateInput,
  title: 'Components/DateInput',
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
    name: 'BwiDateInputStories',
    components: { BwiDateInput },
    mixins: [storybookMixin(args, context)],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    template: `
      <bwi-date-input
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
