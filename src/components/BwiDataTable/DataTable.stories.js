import { directive as clickaway } from 'vue-clickaway'
import BwiButton from '../BwiButton/Button.vue'
import BwiIcon from '../BwiIcon/Icon.vue'
import BwiOptions from '../BwiOptions/Options.vue'
import BwiPopover from '../BwiPopover/Popover.vue'
import BwiDataTable from './DataTable.vue'

import { hideArgTypes, hideEvents, default as storybookMixin } from '../../utils/storybook'

export default {
  component: BwiDataTable,
  title: 'Components/DataTable',
  parameters: {
    backgrounds: {
      default: 'gray'
    }
  },
  argTypes: {
    popoverOptions: {
      name: 'popover-options',
      defaultValue: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            }
          }
        ]
      },
      table: {
        disable: true
      }
    }
  }
}

const Template = (args, context) => {
  return {
    name: 'BwiDataTableStories',
    components: {
      BwiDataTable,
      BwiButton,
      BwiPopover,
      BwiOptions,
      BwiIcon
    },
    directives: {
      clickaway,
    },
    mixins: [storybookMixin(args, context)],
    props: ['popoverOptions'],
    template: `
      <bwi-data-table
        v-bind="$props" 
        v-on="events" 
      >
        <template #item.action="{ item }"> 
          <bwi-button variant="primary">Click Me</bwi-button>
        </template>

        <template #item.action2="{ item }">
          <bwi-popover :options="popoverOptions">
            <template v-slot:activator="{ on, close }">
              <bwi-button v-on="on" v-clickaway="close" variant="secondary">
                <div style="display:flex; align-item:center">
                  Action
                  <bwi-icon name="chevron-down" size="sm" style="margin-left:8px"/>
                </div>
              </bwi-button>
            </template>
            <bwi-options
              class="font-sans-1"
              style="width:100px"
              :options="[
                { value: 'action1', label: 'Action 1' },
                { value: 'action2', label: 'Action 2' },
                { value: 'action3', label: 'Action 3' }
              ]"
            />
          </bwi-popover>
        </template>
      </bwi-data-table>
    `
  }
}

export const Default = Template.bind({})
Default.args = {
  headers: [
    { key: 'id', text: 'ID', sortable: true },
    { key: 'name', text: 'Name', sortable: true },
    { key: 'email', text: 'Email', sortable: true },
    { key: 'body', text: 'Comments', sortable: true }
  ],
  items: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@doe.com',
      body: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: '2',
      name: 'Peter Smith',
      email: 'peter@smith.com',
      body: 'Lorem ipsum dolor sit amet.'
    },
    {
      id: '3',
      name: 'Tony White',
      email: 'tony@white.com',
      body: 'Lorem ipsum dolor sit amet.'
    }
  ],
  localSort: true,
  loading: false,
  showSelect: true,
  itemKey: 'id',
  emptyText: '',
  pagination: {
    currentPage: 1,
    totalRows: 200,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 30, 40, 50],
    disabled: false
  }
}

export const EmptyState = Template.bind({})
EmptyState.args = {
  ...Default.args,
  items: [],
  emptyText: ''
}
EmptyState.storyName = 'Empty State'
hideArgTypes(EmptyState, [
  'headers',
  'items',
  'localSort',
  'showSelect',
  'itemKey',
  'loading',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(EmptyState, [
  'change:sort',
  'change:select'
])

export const ActionWithButton = Template.bind({})
ActionWithButton.args = {
  ...Default.args,
  headers: [
    ...Default.args.headers,
    { key: 'action', text: 'Action' }
  ]
}
ActionWithButton.storyName = 'Action with Button'

const actionWithButtonDocs = `
<template>
  <bwi-data-table>
    <template v-slot:item.action="{ item }">
      <bwi-button variant="primary">Click Me</bwi-button>
    </template>
  </bwi-data-table>
</template>
`

ActionWithButton.parameters = {
  docs: {
    source: {
      code: actionWithButtonDocs,
      language: 'html'
    }
  }
}
hideArgTypes(ActionWithButton, [
  'items',
  'localSort',
  'showSelect',
  'itemKey',
  'loading',
  'emptyText',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(ActionWithButton, ['change:sort', 'change:select'])

export const ActionWithDropdown = Template.bind({})
ActionWithDropdown.args = {
  ...Default.args,
  headers: [
    ...Default.args.headers,
    { key: 'action2', text: 'Action' }
  ]
}
ActionWithDropdown.storyName = 'Action with Dropdown'

const actionWithDropdownDocs = `
 
<template>
  <bwi-data-table>
    <template v-slot:item.action="{ item }">
      <bwi-popover :options="popoverOptions">
        <template v-slot:activator="{ on, close }">
          <bwi-button v-on="on" variant="secondary">
            <div style="display:flex; align-item:center">
              Action
              <bwi-icon name="chevron-down" size="sm" style="margin-left:8px" />
            </div>
          </bwi-button>
        </template>
        <bwi-options
          class="font-sans-1"
          style="width:100px"
          :options="[
            { value: 'action1', label: 'Action 1' },
            { value: 'action2', label: 'Action 2' },
            { value: 'action3', label: 'Action 3' }
          ]"
        />
      </bwi-popover>
    </template>
  </bwi-data-table>
</template>

<script>
export default {
  data() {
    return {
      popoverOptions: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            }
          }
        ]
      }
    }
  }
}
</script>
`

ActionWithDropdown.parameters = {
  docs: {
    source: {
      code: actionWithDropdownDocs,
      language: 'html'
    }
  }
}
hideArgTypes(ActionWithDropdown, [
  'items',
  'localSort',
  'showSelect',
  'itemKey',
  'loading',
  'emptyText',
  'pagination',
  'next-page',
  'previous-page',
  'page-change',
  'per-page-change'
])
hideEvents(ActionWithDropdown, ['change:sort', 'change:select'])
