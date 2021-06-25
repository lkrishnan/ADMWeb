<template>
    <div id="map"></div>
</template>

<script>
    import Map from "@arcgis/core/Map"
    import MapView from "@arcgis/core/views/MapView"
    import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
    import TileLayer from "@arcgis/core/layers/TileLayer"
    import Extent from "@arcgis/core/geometry/Extent"
    import esriConfig from "@arcgis/core/config.js"
    import Editor from "@arcgis/core/widgets/Editor"
    import axios from "axios";

    esriConfig.assetsPath = './assets';

    export default {
        name: "themap",

        mounted: function( ){
            this.initMap( );

        },
        
        data: ( ) => ( {
            map: null,
            map_view: null,
            basemap: new TileLayer( { 
                    url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/basemap/MapServer" 
                } ),
            addr_layer: new FeatureLayer( { 
                    id: "addr_lyr",
                    url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/ADM/edit_layers/FeatureServer/0",
                    outFields: [ "SITEADDID", "ADDRNUM", "PREADDRNUM", "STREETNAME", "STANDTYPE", "STREETTYPE", "ADDRNUMSUF", "UNITTYPE", "UNITID", "MUNICIPALITY" ]
                } )

        } ),

        computed: {
             ws( ){
                return this.$store.state.ws
            
            }
            
        },
        
        methods: {
            initMap( ){
                const _this = this

                _this.map = new Map( {
                    layers: [ _this.basemap, _this.addr_layer ] 
                } )

                _this.map_view = new MapView( {
                    container: "map",
                    map: _this.map,
                    extent: new Extent( {
		                xmin: 1384251.24585599,
		                ymin: 460978.995855999,
		                xmax: 1537013.50075424,
		                ymax: 660946.333333335,
		                spatialReference: { wkid: 2264 }
	                } ) 

		        } )

                _this.map_view.padding.right = 400;
                
                //_this.map_view.ui.move( "zoom", "top-right" )
                _this.map_view.ui.remove( "attribution") 

                const editor = new Editor( {
                        view: _this.map_view,
                        layerInfos: [ {
                                layer: _this.addr_layer
                            } ],
                        // Set the snapping options for the Editor. By default, snapping is enabled. This can be toggled on/off using the CTRL key.
                        snappingOptions: {
                                enabled: true,
                                selfEnabled: true,
                                featureEnabled: true,
                                featureSources: [ {
                                    layer: _this.addr_layer
                                
                                    } ]
                            
                            }

                    } )
                
                // Add widget to top-right of the view
                //_this.map_view.ui.add( editor, "top-left" )
                
                _this.map_view.on( "click", _this.select_addr );

            },

            select_addr( event ){
                const _this = this

                _this.map_view.hitTest( event ).then( response => {
                    response.results.forEach( result => {
                        if( result.graphic.id === "addr_lyr" ){
                            console.log( result.graphic.attributes[ _this.addr_layer.objectIdField] )

                        }

                    } )
                    
                        
                        /*if (geometry.type === "polygon") {
                            var symbol = new SimpleFillSymbol(
                                "solid",
                                new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
                                new Color([232,104,80,0.25])
                            );
                            var graphic = new Graphic(geometry, symbol);
                            view.graphics.removeAll(); // make sure to remmove previous highlighted feature
                            view.graphics.add(graphic);
                        }*/
                    //});
                } );
            }
		    
	    }
    
    }
</script>

<style>
    #map {
        padding: 0;
        margin: 0;
        height: 100%;
    }
    .esri-view .esri-view-surface--inset-outline:focus::after {  outline: none !important;}

</style>