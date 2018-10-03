import cubec from 'cubec';
import api from '../api';

const unique = cubec.struct.unique('fast');
const extend = cubec.struct.extend();
const index = cubec.struct.index();

// 请求查询数据模型
const requestSearchModel = cubec.model({
  _reset() {
    this.set({}, true);
  },

  parse(data) {
    data.time = data["delayedPriceTime"];

    data.trend = "⇅" + (parseFloat(data.high) - parseFloat(data.low)).toFixed(4);

    // 合并数据时，忽略掉某些字段
    return extend({}, data, [
      'delayedSize',
      'processedTime',
      'delayedPriceTime'
    ]);
  },

  events: {

    // 当模型数据发生改变时(每次请求成功)
    change(data) {
      searchModel.merge({
        searchResult: data,
        _inRequest: false,
      });

      this._reset();
    },

    // 发起请求时(无论请求是否成功)
    // 都要重制Loading状态
    fetch() {
      searchModel.set('_inRequest', true);
    },

    // 请求发生错误时
    'fetch:error': function(error) {
      searchModel.merge({
        searchResult: 0,
        _inRequest: false,
      });

      this._reset();
    },
  },
});

// 搜索历史模型
const searchKeysStoreModel = cubec.model({
  name: 'searchKeysStoreModel',

  // 设置为本地持久化(保留搜索记录)
  store: true,

  data: {
    keys: [],
  },
});

const searchModel = cubec.model({
  name: 'searchModel',

  data: {
    keys: searchKeysStoreModel.get('keys'),
    search: '',
    searchResult: -1,

    _inRequest: false,
  },

  events: {
    'change:keys': function(data) {
      // 实时将查询历史同步到 搜索历史模型中
      searchKeysStoreModel.set(data);
    },
  },

  // 发起查询请求
  _request(query) {
    if (query) {
      requestSearchModel.url = api(`/${query.toLowerCase()}/delayed-quote`);

      requestSearchModel.fetch();
    }
  },

  // 记录搜索关键字
  _recordKey(query) {
    if (query) {
      let keys = this.get('keys');
      let i = index(keys, query);

      if (i == null && keys.length > 5) {
        keys.pop();
      }

      if (i != null) {
        keys.splice(i, 1);
        keys.unshift(query);
      } else {
        keys.unshift(query);
      }

      this.set('keys', keys);
    }
  },

  // 删除一个搜索关键字
  _deleteKey(index){
    if(index != null){
      let keys = this.get('keys');

      keys.splice(index, 1);

      this.set('keys', keys);
    }
  }
});

export default searchModel;
