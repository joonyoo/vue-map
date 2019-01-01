import deckGlService from './deckgl';
import events from '../events';

export default {
	getData() {
		deckGlService.loadHeatmap();
		events.trails.getTrails.emit('getTrails');
		events.markers.getMarkers.emit('getMarkers');
		events.layerStyles.getLayerStyles.emit('getLayerStyles');
	},
};
