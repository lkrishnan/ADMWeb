<template>
	<v-container>
		<v-row>
			<v-col md="6">
				<v-card outlined color="white">
				<v-autocomplete 
					clearable
					dense 
					Event
					filled 
					hide-no-data
					hide-details
					rounded 
					color="teal"
					v-model="st_selection"
					:loading="loading"
					:items="search_results"
					:search-input.sync="searchInput"
					@click:clear="clearResults">
						<template slot="selection" slot-scope="data">
							<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
						</template>
						<template slot="item" slot-scope="data">
							<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
						</template>
				</v-autocomplete>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
  	import axios from "axios";
	
  	export default {
      	name: "search",

		mounted: function( ){
      		this.searchByMatID( )

    	},

		data: ( ) => ( {
			axios_inst: axios.create( { 
				headers: { 
					"Cache-Control": "max-age=0, no-cache, no-store",
					"Pragma": "no-cache"  
				}
			} ),
			cancel_source: null,
			loading: false,
			searchInput: null,
			st_selection: null
			
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
			
			field_desc( ){
				return this.$store.state.ws
			
			},
			
			matid( ){
            	return this.$route.params.matid; 
          	
			},

			zoom( ){
				return this.$route.meta.zoom

			},

			sel_feature: {
      			set( sel_feature ){
					this.$store.commit( "sel_feature", sel_feature )
									
				},
      			get( ){
					return this.$store.state.sel_feature
      			
				}
							
			},

			search_results: {
      			set( search_results ){
					this.$store.commit( "search_results", search_results )
									
				},
      			get( ){
					return this.$store.state.search_results
      			
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
			matid: function( ){
				console.log( "here" )
				this.searchByMatID( )

      		},

        	searchInput( val ){
				val && val !== this.st_selection && this.getItems( val )

        	},
        	
			async st_selection( new_selection, old_selection ){
				const _this = this

				if( _this.st_selection ){
					_this.zoom_to_feature = true

					//push URL hash
					_this.$router.push( { name: "Detail", params: { matid: _this.st_selection.feature.attributes.SITEADDID } } )
					
				}
				
			}
      
      	},

      	methods: {
        	getItems( v ){
				const _this = this

				if( v.length < 3 ){
					_this.search_results = [ ]
					_this.loading = false
					return

				}

				_this.loading = true
				_this.cancelSearch( )
      			_this.cancel_source = axios.CancelToken.source( )

				_this.addr_layer.queryFeatures( {
                    where: "FULLADDR like '" + v.toUpperCase( ) + "%'",
                    outFields: _this.addr_fields,
                    returnGeometry: true
                } ).then( ( results ) => {
					let search_results = [ ]

					results.features.forEach( element => {
						search_results.push( { 
							"text": element.attributes.FULLADDR, 
							"value": { 
								"tag": "Addr", 
								"feature": element 
							
							}

						} )

					} )

					_this.search_results = search_results
					_this.loading = false
            
                } )
				.catch( thrown => {
					if( axios.isCancel( thrown ) ){
						//console.log('Request canceled', thrown.message);
					
					}else{
						console.log( "parsing failed", thrown );
					
					}
					
				} )

			},
			cancelSearch( ){
				const _this = this

      			if( _this.cancel_source ){
        			_this.cancel_source.cancel( )

      			}
    		},
			
			clearResults( ){
				this.search_results = [ ];
        
        	},

			searchByMatID( ){
				const _this = this,
					regex = new RegExp( "\\d{1,6}" );

				console.log( _this.matid )

				regex.test( _this.matid )

				_this.addr_layer.queryFeatures( {
                    where: "SITEADDID = '" + _this.matid + "'",
                    outFields: _this.addr_fields,
                    returnGeometry: true
                } ).then( async ( results ) => {
					if( results.features.length > 0 ){
						const feature = results.features[ 0 ] 
						
						//set selected feature to hightlight the point on the map
						_this.sel_feature = {
							feature: feature,
							zoom: _this.zoom

						}

						//set the addrinfo to display addr infomration
						//_this.addrinfo = await FormatAddrInfo( feature.attributes )
						_this.addrinfo = feature.attributes
						
						//set edit addr information
						var { created_user, created_date, last_edited_user, last_edited_date, last_edited_agency, ...temp } = feature.attributes
						this.$store.commit( "new_addrinfo", { ...temp } );

					}

				} )
				.catch( thrown => {
					console.log( "parsing failed", thrown );
					
				} )

			}
      
      	}
  
  	}
</script>