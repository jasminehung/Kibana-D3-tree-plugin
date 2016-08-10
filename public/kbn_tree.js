define(function (require) {
  require('ui/agg_table');
  require('ui/agg_table/agg_table_group');
  require('plugins/kbn_tree/kbn_tree.less');
  require('plugins/kbn_tree/kbn_tree_controller');
  require('ui/registry/vis_types').register(KbnTreeProvider);

  function KbnTreeProvider(Private) {
    var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    var Schemas = Private(require('ui/Vis/Schemas'));

    return new TemplateVisType({
      name: 'kbn_tree',
      title: 'Tree Diagram',
      icon: 'fa-code-fork',
      description: 'Tree Diagram',
      template: require('plugins/kbn_tree/kbn_tree.html'),
      params: {
        defaults: {
          showValues: false,
          color: '#ff6600',
        },
        editor: require('plugins/kbn_tree/kbn_tree_params.html')
      },
      hierarchicalData: function (vis) {
        return Boolean(vis.params.showPartialRows || vis.params.showMetricsAtAllLevels);
      },
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Count',
          min: 1,
          max: 1,
          defaults: [
            {type: 'count', schema: 'metric'}
          ]
        },
        {
          group: 'buckets',
          name: 'segment',
          title: 'Field',
          aggFilter: '!geohash_grid',
          min: 0,
          max: 5
        }
      ]),
      requiresSearch: true
    });
  }

  return KbnTreeProvider;
});
