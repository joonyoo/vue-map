<template>
	<div>
		<Header />
		<Map />
	</div>
</template>

<script>
import Header from './components/Header.vue';
import Map from './components/Map.vue';
import ee from './events';

export default {
	name: 'App',
	components: {
		Header,
		Map,
	},
	created() {
		ee.on('reinitializeHeatmapParams', () => this.$store.dispatch('heatmap/reinitializeParams'));
		ee.on('setHeatmapActive', () => this.$store.dispatch('heatmap/setActive'));
		ee.on('setHeatmapParams', (param, value) => this.$store.dispatch('heatmap/setParams', { param, value }));
		ee.on('setLayerActive', i => this.$store.dispatch('layers/setActive', i));
		ee.on('getLayerStyles', () => this.$store.dispatch('layerStyles/getLayerStyles'));
		ee.on('setLayerStyleActive', name => this.$store.dispatch('layerStyles/setActive', name));
		ee.on('getMapSettings', () => this.$store.dispatch('mapSettings/getSettings'));
		ee.on('setMapSettings', mapSettings => this.$store.dispatch('mapSettings/setSettings', mapSettings));
		ee.on('getMapStyle', () => this.$store.dispatch('mapStyles/getStyle'));
		ee.on('setMapStyle', name => this.$store.dispatch('mapStyles/setStyle', name));
		ee.on('getMarkers', () => this.$store.dispatch('markers/getMarkers'));
		ee.on('loadMarker', marker => this.$store.dispatch('markers/loadMarker', marker));
		ee.on('setMarkerActive', marker => this.$store.dispatch('markers/setActive', marker));
		ee.on('setMarkerHidden', markers => this.$store.dispatch('markers/setHidden', markers));
		ee.on('hideSplashScreen', () => this.$store.dispatch('splashScreen/setActive'));
		ee.on('getTrails', () => this.$store.dispatch('trails/getTrails'));
		ee.on('setTrailActive', i => this.$store.dispatch('trails/setActive', i));
		ee.on('setTrailsDisabled', () => this.$store.dispatch('trails/setDisabled'));
	},
	mounted() {
		/* eslint-disable-next-line global-require */
		require('./services/events').default.setEvents();
		ee.emit('loadMap');
	},
};
</script>

<style lang="scss">
div.office-marker {
	background-image: url('./assets/office.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.places-marker {
	background-image: url('./assets/places.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}

div.trails-marker {
	background-image: url('./assets/trails.png');
	cursor: pointer;
	height: 25px;
	width: 22px;
}
</style>
