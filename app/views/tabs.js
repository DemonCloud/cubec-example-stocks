import cubec from 'cubec';
import TABS from '../define/tabs';
import stocksModel from '../models/stocksModel';

const tabs = cubec.view({
  name: "stock-tab",

  props: {
    ...TABS,

    __isActive(tab, check){
      return tab === check ? "active" : "";
    }
  },

  template: `
    <tabs class="stock-tabs">
      <tab class="stock-tabs_aim {{#__isActive(stocksModel.tab, INFOCUS)}}" _key={{#INFOCUS}}>Infocus</tab>
      <tab class="stock-tabs_aim {{#__isActive(stocksModel.tab, GAINERS)}}" _key={{#GAINERS}}>Gainers</tab>
      <tab class="stock-tabs_aim {{#__isActive(stocksModel.tab, LOSERS)}}" _key={{#LOSERS}}>Losers</tab>
    </tabs>
  `,

  events: {
    // 切换tab分类
    "click:.stock-tabs_aim": function(event){
      event.preventDefault();
      event.stopPropagation();

      let target = event.target;

      stocksModel.set("tab", parseInt(target._key || 0));
    }
  }
});

export default tabs;
