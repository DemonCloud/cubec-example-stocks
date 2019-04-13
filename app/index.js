import './index.css';
import cubec from 'cubec';

// model
import searchModel from './models/searchModel';
import stocksModel from './models/stocksModel';

import search from './views/search';
import table from './views/table';
import tabs from './views/tabs';

const dataAtom = cubec.atom({
  use: [searchModel, stocksModel],
  connect: true,
});

const App = cubec.view({
  name: 'stocks',

  connect: dataAtom,

  template: `
    <slot>views.search</slot>
    <slot>views.table</slot>
    <slot>views.tabs</slot>
  `,

  views: {
    search,
    tabs,
    table,
  },
});

// 挂载视图
App.mount(
  document.getElementById("app"),
  dataAtom
);
