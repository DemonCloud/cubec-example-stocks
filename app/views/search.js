import cubec from 'cubec';
import searchModel from '../models/searchModel';

const search = cubec.view({
  name: 'stock-search',

  props: {
    // 转化时间字符串
    __convertTimeString(value, key){
      if(key === "time")
        return new Date(value).toLocaleString();
      return value;
    }
  },

  events: {
    'input:#_input': function(event) {
      let value = event.target.value;

      searchModel.merge({
        search: value,
        searchResult: -1,
      });
    },

    'keypress:#_input': function(event){
      if(event.keyCode === 13){
        this.emit("click:#_confirm");
        this.refs._input.blur();
      }
    },

    'click:#_confirm': function(event) {
      event.preventDefault();
      event.stopPropagation();

      let searchKey = searchModel.get('search').toLowerCase();

      searchModel._recordKey(searchKey);
      searchModel._request(searchKey);
    },

    'click:.stock-search_tag': function(event) {
      event.stopPropagation();

      let searchKey = event.currentTarget.key;

      searchModel.set('search', searchKey);

      this.emit('click:#_confirm');
    },

    // 冒泡问题
    'click:._deletekey': function(event) {
      event.preventDefault();
      event.stopPropagation();

      let index = event.currentTarget.key;

      searchModel._deleteKey(parseInt(index));
    },
  },

  template: `
    <search class="stock-search">
      <input id="_input" ref="_input" class="stock-search_input" type="search" value="{{#searchModel.search}}" />
      <button id="_confirm" class="stock-search_confirm">Search</button>

      <div class="stock-search_keys">
        {{*each [key, i] in searchModel.keys}}
          <div class="stock-search_tag" key="{{#key}}">
            <span>{{#key}}</span>
            <b class="_deletekey" key={{#i}}>×</b>
          </div>
        {{*/each}}
      </div>

      {{ if searchModel._inRequest }}

      <div class="stock-search_loading">Loading...</div>

      {{ elif searchModel.searchResult === 0 }}

      <div class="stock-search_msg">
          <div class="stock-search_error">
            Request error with search: "{{#searchModel.search}}"
          </div>
      </div>

      {{ elif typeof searchModel.searchResult === 'object' }}

      <div class="stock-search_msg">
        {{*each [value, key] in searchModel.searchResult }}
        <div class="stock-search_row">
          <div class="stock-search_keyword">{{#key}}</div>
          <div class="stock-search_output {{#key}}">{{#__convertTimeString(value, key)}}</div>
        </div>
        {{*/each}}
      </div>

      {{/if}}
    </search>
  `,

});

export default search;
