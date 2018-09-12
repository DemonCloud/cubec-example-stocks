import cubec from 'cubec';
import api from '../api';
import APIPATH from '../define/apipath';
import TABS from '../define/tabs';

const stocksModel = cubec.model({
  name: 'stocksModel',

  data: {
    tab: TABS.INFOCUS,
    dataSource: [],

    _inRequest: false
  },

  events: {
    change(data){
      console.log(data);
    },

    'change:tab': function(data) {
      const tab = data.tab;

      if (tab === TABS.INFOCUS) {
        sourceModel._targetInfocus();
      } else if (tab === TABS.GAINERS) {
        sourceModel._targetGainers();
      } else if (tab === TABS.LOSERS) {
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
