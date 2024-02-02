<template>
  <table :class="{ 
    'bwi-data-table font-sans-1': true
  }">
    <thead class="bwi-data-table__head">
      <tr ref="tableHeader">
        <th 
          v-if="showSelect"
          class="bwi-data-table__select"
        >
          <bwi-checkbox-toggle 
            size="sm"
            @click="onSelectAll"
            :indeterminate="isIndeterminate"
            v-model="selectAll"
          />
        </th>
        <th v-for="(header, index) in headers" :key="index">
          <div class="bwi-data-table__column-wrapper">
            <span>
              {{ header.text }}
            </span>
            <button 
              v-if="isSortable(header)" 
              :id="header.key" 
              @click="onSort(header.key)"
            >
              <bwi-icon
                :class="[{
                  'bwi-data-table__sort-icon': true,
                  'bwi-data-table__sort-icon--transparent': sortObject[header.key] === 'no-sort'
                }]"
                name="arrow-up"
                size="14px"
                fill="#fff"
                :rotate="sortObject[header.key] === 'desc' ? 180 : 0"
              />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="bwi-data-table__body">
      <template v-if="loading">
        <tr>
          <td :colspan="columnLength">
            <div 
              class="bwi-data-table__loading" 
              :style="loadingHeight"
            >
              <bwi-spinner
                size="56"
                background="#E0E0E0"
                foreground="#1976D2"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="isDataEmpty">
        <tr valign="top">
          <td :colspan="columnLength">
            <!-- 
              @slot use this slot for any content you want
              to show when data is not available.
             -->
            <slot name="empty">
              <div class="bwi-data-table__empty">
                {{ emptyText || 'No data available' }}
              </div>
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, rowIndex) in mItems" :key="rowIndex">
          <td 
            v-if="showSelect"
            class="bwi-data-table__select"
          >
            <bwi-checkbox-toggle 
              size="sm"
              @click="onRowSelectChange(item, true)"
              :checked="isSelected(item)"
              @change="emitChanges"
            />
          </td>
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            <!-- 
              @slot dynamic scoped slots 
            -->
            <slot :name="`item.${header.key}`" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot class="bwi-data-table__footer">
      <!-- 
        @slot use this slot for any footer content you want.
      -->
      <slot name="footer">
        <tr>
          <td :colspan="columnLength">
            <bwi-pagination
              v-bind="pagination"
              @next-page="$emit('next-page', $event)"
              @previous-page="$emit('previous-page', $event)"
              @page-change="$emit('page-change', $event)"
              @per-page-change="$emit('per-page-change', $event)"
            />
          </td>
        </tr>
      </slot>
    </tfoot>
  </table>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import BwiCheckboxToggle from '../BwiCheckboxToggle'
import BwiIcon from '../BwiIcon'
import BwiPagination from '../BwiPagination'
import BwiSpinner from '../BwiSpinner'
import selectMixin from './mixins/select'
import sortMixin from './mixins/sort'

const paginationDefault = {
  currentPage: 1,
  totalRows: 0,
  itemsPerPage: 10
}

export default {
  name: 'bwi-data-table',
  components: {
    BwiIcon, 
    BwiSpinner, 
    BwiCheckboxToggle,
    BwiPagination
  },
  data() {
    return {
      mItems: null
    }
  },
  mixins: [
    localCopy('items', 'mItems'), 
    sortMixin,
    selectMixin
  ],
  props: {
    /**
     * Define header text and key using this structure:
     * { key: 'someKey', text: 'someLabel', sortable: true | false (Optional) }
     */
    headers: {
      type: Array,
      default: () => [],
    },

    /**
     * Define table data.
     */
    items: {
      type: Array,
      default: () => [],
    },

    /**
     * Show loading spinner when value is `true`
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Text shown when data is empty
     */
    emptyText: {
      type: String,
      default: ''
    },

    /**
     * Allow DataTable to sort items locally
     */
    localSort: {
      type: Boolean,
      default: false
    },

    /**
     * Allow DataTable to do row selection
     */
    showSelect: {
      type: Boolean,
      default: false
    },

    /**
     * Define what key or property used
     * when item is being selected.
     * <br><br>
     * NOTE:
     * For the row selection feature to work correctly, 
     * please make sure all items have the 
     * `itemKey` property defined.
     */
    itemKey: {
      type: String,
      default: 'id'
    }, 

   /**
    * Pagination property
    * <br><br>
    * for more information, check
    * `BwiPagination` component documentation
    */
    pagination: {
      type: Object,
      validator: pagination => Object.keys(paginationDefault).every(key => {
        const bool = key in pagination
        if (!bool) {
          console.warn(`BwiDataTable: Expected ${key} property on pagination props`)
        }
        return bool
      }),
      default: () => ({
        ...paginationDefault
      })
    }
  },

  computed: {
    isDataEmpty() {
      if (Array.isArray(this.items) && this.items.length === 0) {
        return true
      }
      return false
    },

    columnLength() {
      let length = this.headers?.length || 0
      this.showSelect ? length++ : null
      return length
    },

    loadingHeight() {
    /**
     * 42px is the minimum height
     * of the table rows
     * 
     * 10 is the default value of
     * items per page
     */
      return { height: `${(this.pagination?.itemsPerPage || 10) * 42}px` }
    }
  }
}
</script>

<style lang="scss">
@use './DataTable.scss';
</style>
