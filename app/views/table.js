import cubec from 'cubec';

const table = cubec.view({
  name: 'stock-table',

  props: {
    _execChange(price) {
      let num = parseFloat(price);

      if (num > 0) {
        return `
          <td class="_change up">+${price}</td>
        `;
      }

      return `
        <td class="_change down">${price}</td>
      `;
    },
  },

  template: `

    <table class="stock-table_content">
      {{if _inRequest }}
      <tr class="stock-table_loading"><td>Loading...</td></tr>
      {{/if}}

      {{ var _size = struct.size() }}
      {{if _size(dataSource) && (typeof dataSource === "object") }}
      <thead>
        <tr>
          <th>symbol</th>
          <th>company</th>
          <th>delayedPrice</th>
          <th>extendedPrice</th>
          <th>high</th>
          <th>weekHigh</th>
          <th>weekLow</th>
          <th>change</th>
        </tr>
      </thead>
      <tbody>
        {{*each [stock] in dataSource }}
        <tr>
          <td class="_symbol">{{#stock.symbol}}</td>
          <td class="_company">{{#stock.companyName}}</td>
          <td class="_delayprice">{{#stock.delayedPrice}}</td>
          <td class="_extendedprice">{{#stock.extendedPrice}}</td>
          <td class="_high">{{#stock.high}}</td>
          <td class="_weekhigh">{{#stock.week52High}}</td>
          <td class="_weeklow">{{#stock.week52Low}}</td>
          {{#_execChange(stock.change)}}
        </tr>
        {{*/each}}
      </tbody>
      {{/if}}
    </table>
  `,
});

export default table;
