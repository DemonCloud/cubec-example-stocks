import cubec from 'cubec';
import TABS from '../define/tabs';
import stocksModel from '../models/stocksModel';

const tabs = cubec.view({
  name: "stock-tab",

  props: {
    ...TABS,

    _active(tab, check){
      return tab === check ? "active" : "";
    }
  },

  template: `
    <tabs class="stock-tabs">
      <tab class="stock-tabs_aim {{#_active(tab, INFOCUS)}}" _key={{#INFOCUS}}>Infocus</tab>
      <tab class="stock-tabs_aim {{#_active(tab, GAINERS)}}" _key={{#GAINERS}}>Gainers</tab>
      <tab class="stock-tabs_aim {{#_active(tab, LOSERS)}}" _key={{#LOSERS}}>Losers</tab>
    </tabs>
  `,

  events: {
    "click:.stock-tabs_aim": function(event){
      event.preventDefault();
      event.stopPropagation();

      let target = event.target;

      stocksModel.set("tab", parseInt(target._key || 0));
    }
  }
});

export default tabs;
