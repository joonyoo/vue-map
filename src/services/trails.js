import events from '../events';
import mapService from './map';
import trails from '../store/modules/trails';

export default {
	selectTrail(event) {
		event.stopPropagation();

		const trail = event.target.value;
		const i = trails.state.trails.findIndex(obj => obj.name === trail);

		if (trail !== trails.state.trails[0].name) {
			events.trails.setTrailActive.emit('setTrailActive', i);
			this.setTrail(trail);
		}
	},
	/* pan and zoom to selected trail */
	setTrail(trail) {
		mapService.map.flyTo({
			center: trails.state.trails[trails.state.trailsHash[trail]].center,
			zoom: trails.state.trails[trails.state.trailsHash[trail]].zoom,
		});
	},
};
