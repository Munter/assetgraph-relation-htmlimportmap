const expect = require('unexpected')
  .clone()
  .use(require('unexpected-assetgraph'));
const HtmlImportMap = require('../');
const AssetGraph = require('assetgraph');

AssetGraph.Html.registerRelation(HtmlImportMap);

describe('HtmlImportMap relation', () => {
  it('should find an import map', async () => {
    const graph = new AssetGraph();

    await graph.loadAssets({
      type: 'Html',
      text: `<script type="importmap">{}</script>`
    });

    expect(graph, 'to contain relation', 'HtmlImportMap');
  });
});
