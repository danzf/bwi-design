import { default as storybookMixin } from '../../utils/storybook'
import BwiSimpleTable from './SimpleTable.vue'

export default {
  component: BwiSimpleTable,
  title: 'Components/SimpleTable',
}

const Template = (args, context) => {
  return {
    name: 'BwiSimpleTableStories',
    components: { BwiSimpleTable },
    mixins: [storybookMixin(args, context)],
    template: `
    <bwi-simple-table>
      <thead>
        <tr>
          <th>Header Table</th>
          <th>Header Table</th>
          <th>Header Table</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
        <tr>
          <td>Data Table</td>
          <td>Data Table</td>
          <td>Data Table</td>
        </tr>
      </tbody>
    </bwi-simple-table>
    `,
  }
}

export const Default = Template.bind({})
