const Relation = require('assetgraph/lib/relations/Relation');
const HtmlRelation = require('assetgraph/lib/relations/HtmlRelation');

class HtmlImportMap extends HtmlRelation {
  static getRelationsFromNode(node, asset) {
    if (
      node.nodeType === node.ELEMENT_NODE &&
      node.matches('script[type=importmap]')
    ) {
      return {
        type: 'HtmlImportMap',
        to: {
          type: 'Json',
          text: node.firstChild ? node.firstChild.nodeValue : '' // FIXME: Does empty string even make sense?
        },
        node
      };
    }
  }

  inline() {
    Relation.prototype.inline.call(this);

    const document = this.node.ownerDocument;

    const oldNode = this.node;

    this.node = document.createElement('script');
    this.node.setAttribute('type', 'importmap');

    oldNode.parentNode.replaceChild(this.node, oldNode);

    this.from.markDirty();

    return this;
  }
}

HtmlImportMap.prototype.preferredPosition = 'lastInHead';

HtmlImportMap.prototype.targetType = 'JSON';

module.exports = HtmlImportMap;
