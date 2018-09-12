import './index.css';
import cubec from 'cubec';

// model
import searchModel from './models/searchModel';
import stocksModel from './models/stocksModel';

import search from './views/search';
import table from './views/table';
import tabs from './views/tabs';

const App = cubec.view({
  name: 'stocks',

  template: `
    <slot>views.search::searchModel</slot>
    <slot>views.table::stocksModel</slot>
    <slot>views.tabs::stocksModel</slot>
  `,

  views: {
    search,
    tabs,
    table,
  },

  models: {
    searchModel,
    stocksModel
  },

  events: {
    completeRender(){
      // 将模型和视图关联起来
      search.connect(searchModel);
      tabs.connect(stocksModel);
      table.connect(stocksModel);
    }
  }

});

window.searchModel =  searchModel;

App.mount(
  document.getElementById("app"),
  App.models
);
