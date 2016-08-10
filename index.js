module.exports = function(kibana){
	return new kibana.Plugin({
		name: 'kbn_tree',
		require: ['kibana', 'elasticsearch'],
		uiExports: {
			visTypes: [
				'plugins/kbn_tree/kbn_tree'
				]
		}
	});
};
