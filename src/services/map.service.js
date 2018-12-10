import mapboxgl from 'mapbox-gl';
import { canvas } from '../config/canvas.config';
import { hillshade } from '../config/hillshade.config';
import { layerStyles } from '../config/layerStyles.config';
import { mapControls } from '../config/mapControls.config';
import { mapStyles } from '../config/mapStyles.config';
import { markers } from '../config/markers.config';
import { splash } from '../config/splash.config';
import { dataService } from './data.service';
import { layerStylesService } from './layerStyles.service';
import { markersService } from './markers.service';
import { splashService } from './splash.service';
import { trailsService } from './trails.service';

export const mapService = {
	accessToken: canvas.accessToken,
	hillshade,
	layerStyles,
	mapControls,
	mapOptions: {
		container: canvas.container,
		style: mapStyles.outdoors,
		center: canvas.center,
		zoom: canvas.zoom,
	},
	mapStyle: mapStyles.outdoors,
	mapStyles,
	markers,
	splash,

	/* instantiate map instance */
	loadMap() {
		let splashElement;

		mapboxgl.accessToken = this.accessToken;

		this.map = new mapboxgl.Map(this.mapOptions)
			.addControl(new mapboxgl.NavigationControl(), this.mapControls.navigationControl.position)
			/* once markers and layers loaded, hide splash screen */
			.on('styledata', () => {
				if (markersService.markers.length === Object.keys(this.markers).length
						&& layerStylesService.layerStyles.length === Object.keys(this.layerStyles).length
						&& splashElement.className === `${this.splash.splashElement.class} active`) {
					splashService.hideSplash();
				}
			})
			.on('load', () => {
				this.map.addSource(this.hillshade.source, this.hillshade.layer);
				this.addLayerStyle(this.hillshade, this.hillshade.index);

				splashElement = document.querySelector(`${this.splash.splashElement.selector}`);

				dataService.getMarkers();
				dataService.getLayerStyles();
				trailsService.createTrailsHash();
			});
	},

	addLayerStyle(layerStyle, index) {
		this.map.addLayer(layerStyle, index);
	},

	setMapStyle() {
		if (this.mapStyle === this.mapStyles.outdoors) {
			this.mapStyle = this.mapStyles.satellite;
		} else {
			this.mapStyle = this.mapStyles.outdoors;
		}

		this.map.setStyle(this.mapStyle);

		/* add hillshading and layer styles to changed map style after 1 sec delay to load  */
		setTimeout(() => {
			if (this.mapStyle === this.mapStyles.outdoors) {
				this.map.addSource(this.hillshade.source, this.hillshade.layer);
				this.addLayerStyle(this.hillshade, this.hillshade.index);
			}

			layerStylesService.layerStyles.map((layerStyle) => {
				this.map.addLayer(layerStyle);

				if (layerStyle.layout.visibility === 'visible') {
					this.map.setLayoutProperty(layerStyle.id, 'visibility', 'visible');
				}

				return true;
			});
		}, 1000);
	},
};
