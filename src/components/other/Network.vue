<template>
    <div name="other_network">
        <Card dis-hover>
            <p slot="title">
                <i class="fa fa-wpforms" aria-hidden="true"></i>
                title
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                刷新
            </a>
            <Alert>
              说明：这里直接将network.js文件放到mode_modules文件夹下，页面中直接引入network.js文件来使用，可以展示图片但是会报错，提示links未定义，而且点击之后提示getSelection()方法也是未定义。不要在vue中使用，要使用关系图最好用vis.js。
            </Alert>

            <div id="chartContent"></div>
        </Card>
    </div>
</template>

<script>
require('network.js')

let options = {
  width: '100%',
  height: '400px',
  links: {
    // color: 'green',
    width: 2
  },
  nodes: {
    fontColor: 'white',
    highlightColor: '#999'
  },
  // stabilize : false,
  groups: {
    idc_0: {
      borderColor: '#43A1DA',
      backgroundColor: '#43A1DA'
    },
    idc_1: {
      borderColor: '#D41E24',
      backgroundColor: '#D41E24'
    },
    idc_2: {
      borderColor: '#EC5C00',
      backgroundColor: '#EC5C00'
    },
    idc_3: {
      borderColor: '#7BB33D',
      backgroundColor: '#7BB33D'
    },
    idc_4: {
      borderColor: '#9E6AB8',
      backgroundColor: '#9E6AB8'
    },
    idc_5: {
      borderColor: '#F8B93B',
      backgroundColor: '#F8B93B'
    },
    idc_6: {
      borderColor: '#817B58',
      backgroundColor: '#817B58'
    },
    idc_999: {
      borderColor: '#333',
      backgroundColor: '#333'
    }
  }
}
let node1 = [
  {
    'id': '10.13.32.143_m_eos',
    'text': '主库10.13.32.143',
    'style': 'circle',
    'group': 'idc_0'
  },
  {
    'id': '10.13.2.105_s_eos',
    'text': '从库10.13.2.105',
    'group': 'idc_0'
  },
  {
    'id': '10.55.28.119_mb_eos',
    'text': '主备10.55.28.119',
    'group': 'idc_0'
  },
  {
    'id': '10.69.6.179_s_eos',
    'text': '从库10.69.6.179',
    'group': 'idc_0'
  },
  {
    'id': '10.77.113.135_s_eos',
    'text': '从库10.77.113.135',
    'group': 'idc_0'
  }
]
let node2 = [
  {
    'id': '20.13.32.143_m_eos',
    'text': '主库10.13.32.143',
    'style': 'circle',
    'group': 'idc_1'
  },
  {
    'id': '20.13.2.105_s_eos',
    'text': '从库10.13.2.105',
    'group': 'idc_1'
  },
  {
    'id': '20.55.28.119_mb_eos',
    'text': '主备10.55.28.119',
    'group': 'idc_1'
  },
  {
    'id': '20.69.6.179_s_eos',
    'text': '从库10.69.6.179',
    'group': 'idc_1'
  },
  {
    'id': '20.77.113.135_s_eos',
    'text': '从库10.77.113.135',
    'group': 'idc_1'
  }
]
let node3 = [
  {
    'id': '11111',
    'text': '11111',
    'group': 'idc_2'
  }
]
let link1 = [
  {
    'from': '10.13.32.143_m_eos',
    'to': '10.13.2.105_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '10.13.32.143_m_eos',
    'to': '10.55.28.119_mb_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '10.13.32.143_m_eos',
    'to': '10.69.6.179_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '10.13.32.143_m_eos',
    'to': '10.77.113.135_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  }
]
let link2 = [
  {
    'from': '20.13.32.143_m_eos',
    'to': '20.13.2.105_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '20.13.32.143_m_eos',
    'to': '20.55.28.119_mb_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '20.13.32.143_m_eos',
    'to': '20.69.6.179_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '20.13.32.143_m_eos',
    'to': '20.77.113.135_s_eos',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  }
]
let link3 = [
  {
    'from': '20.13.32.143_m_eos',
    'to': '11111',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  },
  {
    'from': '10.13.32.143_m_eos',
    'to': '11111',
    'width': 4,
    'style': 'moving-arrows',
    'title': '延时：0',
    'length': 180,
    'color': 'green'
  }
]
export default {
  name: 'other_network',
  components: {
  },
  data () {
    return {
      nodesTable: [],
      linksTable: [],
      network: null
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    initChart () {
      this.nodesTable = [...node1, ...node2, ...node3]
      this.linksTable = [...link1, ...link2, ...link3]
      this.options = options
      this.network = new links.Network(document.getElementById('chartContent'))
      this.network.draw(this.nodesTable, this.linksTable, this.options)
      links.events.addListener(this.network, 'select', function () {
        let sel = this.network.getSelection()
        for (let i = 0; i < sel.length; i++) {
          let row = sel[i].row
          this.showNodeInfo(this.nodesTable[row])
        }
      })
    },
    showNodeInfo (data) {
      console.log(data)
    }
  },
  created () {
  },
  mounted () {
    this.initChart()
  }
}
</script>

<style scoped>
</style>
