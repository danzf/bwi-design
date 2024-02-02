// Radio Button.stories.js

import storybookMixin from '../../utils/storybook';
import BwiRadioButton from './RadioButton.vue';

export default {
  component: BwiRadioButton,
  title: 'Components/RadioButton',
  argTypes:{
    responsiveness: 
    {
      description: 'The class fixed size width the radio button', 
      control: {
        type: 'inline-radio',
        options: ['none', 'fix-3','fix-6','fix-9','fix-12','full-width']
      } 
    },
  }
};

//👇 We create a “template” of how args map to rendering
const Template = (args, context) => {
  return {
    name: 'BwiRadioButtonStories',
    components: { BwiRadioButton },
    mixins: [storybookMixin(args, context)],
    computed: {
      responsiveness(){
        const { responsiveness } = args
        return responsiveness !== 'none' ? responsiveness : ''
      }
    },
    // Storybook provides all the args in a $props variable.
    // Each arg is also available as their own name.
    template: 
    `<bwi-radio-button 
      :class="responsiveness" 
      v-bind="$props"
      v-on="events"
    />`,
  }
};

//👇 Each story then reuses that template
export const Default = Template.bind({});
