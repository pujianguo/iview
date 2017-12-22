<template>
  <div name="n_table">
      <div style="padding-bottom: 10px; overflow: hidden">
        <div v-if="hasSearch" style="float: left;">
          <Input v-model.trim="nSearchVal" @on-change="search">
            <Button slot="append" icon="ios-search"></Button>
          </Input>
        </div>
        <div style="float: right;">
          <slot name="handleButtons"></slot>
          <Button type="primary" v-if="hasExportData" @click="exportData()">导出数据</Button>
          <Poptip v-if="hasDefaultColumn" placement="bottom-end">
            <Button>自定义列</Button>
            <div class="api" slot="content">
              <ul>
                <li v-for="(c, i) in nColumns" v-if="i > 0" :key="i">
                  <Checkbox :value="nColumnsExcept.indexOf(c.key) === -1" @on-change="columnsExcept(c.key)">{{ c.title }}</Checkbox>
                </li>
              </ul>
            </div>
          </Poptip>
        </div>
      </div>
      <Table ref="nTable" class="ivu-table-auto" border :columns="filterColumns" :data="nPageData" @on-selection-change="selectionChange"></Table>
      <div v-if="hasPage" style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="nFilterData.length"
            :current="nPage.current"
            :page-size="nPage.size"
            @on-change="changePage"
            show-total
            >
          </Page>
        </div>
      </div>
  </div>
</template>

<script>
import { nCopy } from '@/utils/help'

export default {
  props: {
    nColumns: {
      type: Array,
      required: true
    },
    nData: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      default: 10
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasExportData: {
      type: Boolean,
      default: true
    },
    hasDefaultColumn: {
      type: Boolean,
      default: true
    },
    hasPage: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    nData () {
      this.nInit()
    },
    currentPage () {
      this.getPageData()
    }
  },
  computed: {
    filterColumns () {
      return this.nColumns.filter(x => {
        return this.nColumnsExcept.indexOf(x.key) === -1
      })
    },
    currentPage () {
      return this.nPage.current
    }
  },
  data () {
    return {
      nPage: {
        current: 1,
        size: this.page
      },
      nColumnsExcept: [],
      nSearchVal: '',
      nFilterData: [],
      nPageData: []
    }
  },
  methods: {
    nInit () {
      this.nPage.current = 1
      this.getPageData()
    },
    exportData () {
      this.$refs.nTable.exportCsv({
        filename: 'table'
      })
    },
    columnsExcept (key) {
      let index = this.nColumnsExcept.indexOf(key)
      if (index === -1) {
        this.nColumnsExcept.push(key)
      } else {
        this.nColumnsExcept.splice(index, 1)
      }
    },
    changePage (page) {
      this.selectionChange([])
      this.nPage.current = page
    },
    search () {
      this.selectionChange([])
      this.nPage.current = 1
      this.getPageData()
    },
    getFilterData () {
      let searchVal = this.nSearchVal
      let data = nCopy(this.nData)
      if (this.nSearchVal) {
        let ret = []
        data.map(x => {
          for (let i in this.nColumns) {
            let key = this.nColumns[i].key
            if (x[key] && (x[key] + '').indexOf(searchVal) >= 0) {
              ret.push(x)
              break
            }
          }
        })
        return ret
      }
      return data
    },
    getPageData () {
      this.nFilterData = this.getFilterData()
      let data = nCopy(this.nFilterData)
      this.nPageData = data.splice((this.nPage.current - 1) * this.nPage.size, this.nPage.size)
    },
    selectionChange (val) {
      this.$emit('selectionChange', val)
    }
  },
  created () {
    this.nInit()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
