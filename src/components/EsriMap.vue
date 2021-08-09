<template>
    <div id="map">
    </div>
</template>

<script>
    import FormatAddrInfo from "../js/formatAddrInfo"
    import Map from "@arcgis/core/Map"
    import MapView from "@arcgis/core/views/MapView"
    import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
    import TileLayer from "@arcgis/core/layers/TileLayer"
    import Extent from "@arcgis/core/geometry/Extent"
    import esriConfig from "@arcgis/core/config.js"
    import Editor from "@arcgis/core/widgets/Editor"
    import axios from "axios";

    esriConfig.assetsPath = './assets';

    export default {
        name: "themap",

        beforeDestroy( ){
      		const _this = this
			
			if( typeof window === "undefined" ) 
			  	return
      		
			window.removeEventListener( "resize", _this.onResize, { passive: true } )

    	},

        data: ( ) => ( {
            map: null,
            map_view: null,
            basemap: new TileLayer( { 
                    url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/basemap/MapServer" 
                } ),
            highlight: null

        } ),

        computed: {
            addr_fields( ){
				return this.$store.state.addr_fields

			},

            addrinfo: {
      			set( addrinfo ){
					this.$store.commit( "addrinfo", addrinfo )
									
				},
      			get( ){
					return this.$store.state.addrinfo
      			
				}
							
			},

            addr_layer( ){
                return this.$store.state.addr_layer

            },
            oid: {
      			set( oid ){
					this.$store.commit( "oid", oid )
									
				},
      			get( ){
					return this.$store.state.oid
      			
				}
							
			},
            sel_feature: {
      			set( sel_feature ){
					this.$store.commit( "sel_feature", sel_feature )
									
				},
      			get( ){
					return this.$store.state.sel_feature
      			
				}
							
			},
            ws( ){
                return this.$store.state.ws
            
            },

			zoom_to_feature: {
      			set( zoom_to_feature ){
					this.$store.commit( "zoom_to_feature", zoom_to_feature )
									
				},
      			get( ){
					return this.$store.state.zoom_to_feature
      			
				}
							
			}
            
        },

        watch: {
      		sel_feature: function( ){
                console.log( "here" )
        		this.hightlightAddrPt( )
      		
            }

    	},
        
        methods: {
            hightlightAddrPt( ){
                const _this = this

                // highlight the feature on the view
                _this.map_view
                    .whenLayerView( _this.sel_feature.feature.layer )
                    .then( ( layer_view ) => {
                        if( _this.highlight ){
                            _this.highlight.remove( )
                        
                        }

                        _this.highlight = layer_view.highlight( _this.sel_feature.feature )

                        if( _this.zoom_to_feature ){
                            // go to point at LOD 15 with custom duration
                            _this.map_view.goTo( 
                                {
                                    target: _this.sel_feature.feature,
                                    zoom: 11
                                },               
                                {
                                    duration: 3000
                                }
                            );

                        }

                    } )

            },

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

                //_this.map_view.padding.right = 400;
                
                _this.map_view.ui.move( "zoom", "top-right" )
                _this.map_view.ui.remove( "attribution")
                _this.map_view.on( "click", _this.select_addr );
                
                _this.onResize( )
          		window.addEventListener( "resize", _this.onResize, { passive: true } )

                /*const editor = new Editor( {
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

                    } )*/
                
                // Add widget to top-right of the view
                //_this.map_view.ui.add( editor, "top-left" )
                
                

            },

            onResize( ){
				const _this = this

				_this.map_view.padding.left = ( [ "md", "lg", "xl" ].includes(  _this.$vuetify.breakpoint.name ) ? 400 : 0 )
				      		
			},

            select_addr( event ){
                const _this = this

                _this.map_view.hitTest( event ).then( response => {
                    response.results.forEach( result => {
                        if( result.graphic.layer.id === "addr_lyr" ){
                            _this.zoom_to_feature = false

                            //push URL hash
					        _this.$router.push( { name: "Detail", params: { matid: result.graphic.attributes.SITEADDID }, meta: { zoom: false } } )
                            
                            //_this.selectFeature( result.graphic.attributes[ _this.addr_layer.objectIdField ] )
                            

                        //_this.$store.commit( "new_addrinfo", [ _this.get_addrinfo( result.graphic.attributes ) ] );
                            //this.$router.push( { name: "Edit", params: { oid: result.graphic.attributes[ _this.addr_layer.objectIdField ] } } )
                        }

                    } )
                    
                } );
            },

            selectFeature( OID ){
                const _this = this

                // query feature from the server
                _this.addr_layer.queryFeatures( {
                    objectIds: [ OID ],
                    outFields: _this.addr_fields,
                    returnGeometry: true
                } ).then( async ( results ) => {
                    if( results.features.length > 0 ){
                        //set selected feature to hightlight the point on the map
                        _this.sel_feature = {
                            feature: results.features[ 0 ],
                            zoom: false
                        
                        }

					    //set the addrinfo to display addr infomration
					    _this.addrinfo = await FormatAddrInfo( results.features[ 0 ].attributes )

                        //push URL hash
					    //_this.$router.push( { name: "Detail", params: { matid: results.features[ 0 ].attributes.SITEADDID } } )

                        /*needed*/
                        //_this.$store.commit( "addrinfo", [ _this.get_addrinfo( _this.edit_feature.attributes ) ] )
                        //_this.$store.commit( "new_addrinfo", [ _this.get_addrinfo( _this.edit_feature.attributes ) ] )
                        //_this.$router.push( { name: "Edit", params: { oid: _this.edit_feature.attributes.OBJECTID } } )
                        /*needed*/
                        
                        /*_this.applyEdits( { 
                            //updateFeatures: [ _this.edit_feature ]
                            updateFeatures: [ 
                                new Graphic( { 
                                    attributes: { 
                                        "OBJECTID": _this.edit_feature.attributes.OBJECTID,
                                        "LOCATE": 6
                                    
                                    } 
                            
                                } ) 
                            
                            ]

                        } )*/
                        
                        
                    
                    }
            
                } )
            
            },

            applyEdits( params ){
                const _this = this

                // unselectFeature();
                _this.addr_layer
                    .applyEdits( params )
                    .then( ( edits_result ) => {
                        console.log( edits_result )

                    } )
                    .catch( ( error ) => {
                        console.log( "error = ", error )
                    } )

            },

            get_addrinfo( attributes ){
                const addr_fields = [ "SITEADDID", "STATUS", "STREETNAMEJURIS", 
                        "ADDRNUM", "PREADDRNUM", "STREETNAME", "STANDTYPE", "STREETTYPE", "ADDRNUMSUF", "UNITTYPE", "UNITID", 
                        "MUNICIPALITY", "PLACENAME", "ZIPCODE", "COUNTY", "STATE", "SPECIALTAXDIST", "FIREDISTRICT", "SPHEREOFINFLUENCE", 
                        "SUBDIVISION", "LOTNO", "POINTTYPE", "MECKUSE", "MECKUSEGRP", 
                        "COUNTYSTCODE", "CENTERLINEID",  
                        "YCOORD", "XCOORD", "LAT", "LON", "FULLADDR", 
                        "EFFECTIVEFROM", "EFFECTIVETO", "created_user", "created_date", "last_edited_user", "last_edited_date", 
                        "MSAG", "MSAGMANUAL" ]

                let ret_obj = { }

                addr_fields.forEach( field => {
                    ret_obj[ field ] = attributes[ field ]    

                } )

                return ret_obj

            }
		    
	    },

        mounted: function( ){
            this.initMap( );

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