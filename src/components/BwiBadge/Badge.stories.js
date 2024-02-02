import storybookMixin, { hideArgTypes } from '../../utils/storybook'
import BwiBadgeInlineStory from './Badge.Inline.stories.vue'
import BwiBadge from './Badge.vue'


export default {
  title: 'Components/Badge',
  component: BwiBadge,
  argTypes: {
    // intentionally set as empty object
    // to ensure `show` appears first in storybook controls
    show: {},
    value: {
      control: {
        type: 'text'
      }
    },
    position: {
      defaultValue: 'right',
      options: ['left', 'right'],
      control: {
        type: 'radio'
      }
    },
    align: {
      defaultValue: 'top',
      options: ['top', 'middle'],
      control: {
        type: 'radio'
      }
    },
  }
}

const Template = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      BwiBadge
    },
    template: `
      <bwi-badge
        v-bind="$props"
        v-on="events"
      >
        <span class="font-sans-2">
          Notification
        </span>
      </bwi-badge>
    `
  }
}

export const Default = Template.bind({})
Default.args = {
  dot: true,
}

// eslint-disable-next-line no-unused-vars
export const Inline = (args, context) => {
  return {
    mixins: [storybookMixin(args, context)],
    components: {
      BwiBadgeInlineStory,
    },
    template: `
      <BwiBadgeInlineStory :align="$props.align" :color="$props.color" />
    `
  }
}
Inline.args = {
  color: 'blue'
}
hideArgTypes(Inline, [
  'show',
  'value',
  'position',
  'inline',
  'dot',
  'size',
])
