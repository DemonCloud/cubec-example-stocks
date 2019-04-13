import cubec from 'cubec';
import api from '../api';
import APIPATH from '../define/apipath';
import TABS from '../define/tabs';

const stocksModel = cubec.model({
  name: 'stocksModel',

  // 默认数据
  data: {
    // 初始化选中的tab(默认股票展示焦点关注分类)
    tab: TABS.INFOCUS,

    // 表格数据
    dataSource: [],

    // 当前数据是否正在请求中
    _inRequest: false
  },

  events: {
    'change:tab': function(newtab, prevtab) {
      if (newtab === TABS.INFOCUS) {
        sourceModel._targetInfocus();
      } else if (newtab === TABS.GAINERS) {
        sourceModel._targetGainers();
      } else if (newtab === TABS.LOSERS) {
        sourceModel._targetLosers();
      }
    },
  },
});

const sourceModel = cubec.model({
  name: 'sourceModel',

  // 默认是infocus
  url: api(APIPATH.INFOCUS),

  events: {
    init() {
      this.fetch();
    },

    fetch(){
      stocksModel.set(
        "_inRequest",
        true
      );
    },

    change(data) {
      stocksModel.merge({
        dataSource:data,
        _inRequest: false
      });
    }
  },

  // 焦点
  _targetInfocus() {
    this.url = api(APIPATH.INFOCUS);
    this.fetch();
  },

  // 上涨 受益者
  _targetGainers() {
    this.url = api(APIPATH.GAINERS);
    this.fetch();
  },

  // 下跌 亏损
  _targetLosers() {
    this.url = api(APIPATH.LOSERS);
    this.fetch();
  },
});

export default stocksModel;
