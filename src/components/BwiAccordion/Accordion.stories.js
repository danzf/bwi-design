import storybookMixin from '../../utils/storybook';
import BwiAccordion from './Accordion.vue';

export default {
  component: BwiAccordion,
  title: 'Components/Accordion',
  argTypes: {
    trigger: {
      options: ['header', 'icon'],
      defaultValue: 'header',
      control: {
        type: 'radio'
      }
    }
  }
};

const Template = (args, context) => {
  return {
    name: 'BwiAccordionStories',
    components: { BwiAccordion },
    mixins: [storybookMixin(args, context)],
    template: `
      <bwi-accordion
        v-bind="$props"
        v-on="events"
      >
        <div class="font-sans-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu habitant
          eu sed fermentum. Tempor, neque cursus neque, duis pretium ornare.
          Ornare ut hac lacus turpis scelerisque curabitur varius. Vel lectus
          praesent quisque nulla malesuada odio sodales faucibus.
        </div>
      </bwi-accordion>
    `,
  }
};

export const Default = Template.bind({});
Default.args = {
  title: 'Accordion'
}

