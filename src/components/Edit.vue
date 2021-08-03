<template>
	<v-card
        class="rounded-0"
        :loading="loading"
		v-if="route_name === 'Edit'"
    >
        <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
        </template>

        <v-card-title>Edit Selected Address</v-card-title>
		
		<v-autocomplete 
			clearable
			dense 
			Event
			filled 
			hide-no-data
			hide-details
			color="teal"
			v-model="st_selection"
			:loading="loading"
			:items="search_results"
			:search-input.sync="searchInput"
			@click:clear="clearResults"
			label="Search Street Name Juris"
			class="mx-2"
		>
			<template slot="selection" slot-scope="data">
				<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
			</template>
			<template slot="item" slot-scope="data">
				<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
			</template>
		</v-autocomplete>

        <v-simple-table>
            <template v-slot:default>
				<thead>
					<tr>
					<th class="text-left">
						Field
					</th>
					<th class="text-left">
						Value
					</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Address Number</td>
						<td>
							<v-text-field 
								v-model="new_addrinfo.ADDRNUM"
								single-line
								dense
								class="pt-5"
							>
							</v-text-field>
						</td>
					</tr>
					<tr>
						<td>Effective Status</td>
						<td>
							<v-select
								v-model="new_addrinfo.STATUS"
								:items="status"
								menu-props="auto"
								label="Select"
								hide-details
								single-line
								dense>
								<template slot="selection" slot-scope="data">
									{{ data.item.text }}
								</template>
								<template slot="item" slot-scope="data">
									{{ data.item.text }}
								</template>
							</v-select>
						</td>
					</tr>
				</tbody>
            </template>
        </v-simple-table>

		<v-divider class="mx-4"></v-divider>

        <v-card-actions class="ma-2">
            <v-btn 
				class="ma-2 d-none d-sm-flex white--text" 
				color="teal" 
				@click="save( )"
			>
				<v-icon left>mdi-content-save</v-icon>Save
			</v-btn>

			<v-btn 
				class="ma-2 d-none d-sm-flex white--text" 
				color="teal"
				@click="cancel( )"
			>
				<v-icon left>mdi-arrow-left-circle</v-icon>Cancel
			</v-btn>

        </v-card-actions>

        <v-divider class="mx-4"></v-divider>


    </v-card>

</template>

<script>
	import axios from "axios"
    import JSONToURL from "../js/jsontourl"
	import ObjDiffs from "../js/objdiffs"
	import Graphic from "@arcgis/core/Graphic"
	
	export default {
        name: "detail",
        
		data( ){
      		return {
				headers: [
					{ text: "Site Address ID", value: "SITEADDID", sortable: false },
					{ text: "Effective Status", value: "STATUS", sortable: false },
					{ text: "Street Name and Juris", value: "STREETNAMEJURIS", sortable: false },
					{ text: "Address Number", value: "ADDRNUM", sortable: false },
					{ text: "Street Prefix Direction", value: "PREADDRNUM", sortable: false },
					{ text: "Street Name", value: "STREETNAME", sortable: false },
					{ text: "Standard Street Type", value: "STANDTYPE", sortable: false },
					{ text: "Meck Street Type", value: "STREETTYPE", sortable: false },
					{ text: "Street Suffix", value: "ADDRNUMSUF", sortable: false },
					{ text: "Address Unit Type", value: "UNITTYPE", sortable: false },
					{ text: "Address Unit Number", value: "UNITID", sortable: false }
					
				],

				loading: false,

				status: [
					{ value: "Deletion", text: "Deletion" },
					{ value: "Current", text: "Current" },
					{ value: "Demolition", text: "Demolition" },
					{ value: "Inactive", text: "Inactive" },
					{ value: "Temporary", text: "Temporary" }
				
				],
			
				staccess: [
					{ value: "PUB", text: "PUBLIC" },
					{ value: "PVT", text: "PRIVATE" }
				
				],

				roadtype: [
					{ value: "Road", text: "ROAD" },
					{ value: "NamedDriveway", text: "DRIVEWAY" }
				
				],

				reason: [
					{ value: "AL", text: "ALIAS NAME ONLY" },
					{ value: "AX", text: "ANNEXATION" },
					{ value: "CC", text: "COUNTY COMMISSION" },
					{ value: "NC", text: "NAME CHANGE" },
					{ value: "PC", text: "PLANNING COMMISSION" },
					{ value: "SD", text: "SUBDIVISION" },
					{ value: null, text: "NA" }
				
				],

				prefixes: [
					{ value: "N", text: "N" },
					{ value: "S", text: "S" },
					{ value: "W", text: "W" },
					{ value: "E", text: "E" },
					{ value: null, text: "" }

				],

				sttypes: [ 
					{ value: "AL", text: "AL" }, 
					{ value: "AV", text: "AV" },
					{ value: "BV", text: "BV" },
					{ value: "BY", text: "BY" },
					{ value: "CR", text: "CR" },
					{ value: "CS", text: "CS" },
					{ value: "CT", text: "CT" },
					{ value: "CV", text: "CV" },
					{ value: "DR", text: "DR" },
					{ value: "EP", text: "EP" },
					{ value: "EX", text: "EX" },
					{ value: "FR", text: "FR" },
					{ value: "HY", text: "HY" },
					{ value: "LN", text: "LN" },
					{ value: "LP", text: "LP" },
					{ value: "PL", text: "PL" },
					{ value: "PY", text: "PY" },
					{ value: "RA", text: "RA" },
					{ value: "RD", text: "RD" },
					{ value: "RN", text: "RN" },
					{ value: "RW", text: "RW" },
					{ value: "ST", text: "ST" },
					{ value: "TC", text: "TC" },
					{ value: "TL", text: "TL" },
					{ value: "TR", text: "TR" },
					{ value: "WY", text: "WY" },
					{ value: null, text: "" }
				
				],

				suffixes: [ 
					{ value: "N", text: "N" },
					{ value: "NW", text: "NW" },
					{ value: "SE", text: "SE" },
					{ value: "W", text: "W" },
					{ value: "E", text: "E" },
					{ value: "NE", text: "NE" },
					{ value: "S", text: "S" },
					{ value: "SW", text: "SW" },
					{ value: "EXT", text: "EXT" },
					{ value: "NB", text: "NB" },
					{ value: "SB", text: "SB" },
					{ value: "EB", text: "EB" },
					{ value: "WB", text: "WB" },
					{ value: "CONN", text: "CONN" },
					{ value: null, text: "" } 
				
				],

				juris: [ "MECK", "CHAR", "CORN", "DAVI", "HUNT", "MATT", "MINT", "PINE", "STAL", "OTHER" ],
				
				parcelsattach: [ "Y", "N" ],
				
				stcont: [ "Y", "N" ],
				
				valid: false,
				
				stname_rules: [ v => !!v || "Street Name is required" ],
				
				municipality_rules: [ v => !!v || "Municipality is required" ],

				citystcode_rules: [ v => !!v || "City Code is required" ],

				axios_inst: axios.create( { 
					headers: { 
						"Cache-Control": "max-age=0, no-cache, no-store",
						"Pragma": "no-cache"  
					}
				} ),

				cancel_source: null,

				loading: false,
				
				searchInput: null,
			
				st_selection: null,

				search_results: [ ]
      		
			}
    	
		},

		computed: {
			addrinfo( ){
                return this.$store.state.addrinfo

            },

			addr_layer( ){
                return this.$store.state.addr_layer

            },

			matid( ){
            	return this.$route.params.matid; 
          	
			
			},

			new_addrinfo( ){
                return this.$store.state.new_addrinfo

            },

            route_name( ){
				return this.$route.name; 
			
            },

			ws( ){
				return this.$store.state.ws
			
			}

    	},

		watch: {
			searchInput( val ){
				val && val !== this.st_selection && this.getItems( val )

        	},
        	
			async st_selection( new_selection, old_selection ){
				const _this = this

				if( _this.st_selection ){
					console.log( _this.st_selection )
					
					//_this.zoom_to_feature = true

					//push URL hash
					//_this.$router.push( { name: "Detail", params: { matid: _this.st_selection.feature.attributes.SITEADDID } } )
					
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

				const url = _this.ws.adm + "v1/query/streetfileall",
					params = {
							columns: "admkey, aliaslegalflag",
							filter: "admkey like '" + v.toUpperCase( ) + "%'",
							group: "admkey, aliaslegalflag"
						}

				_this.loading = true;
				_this.cancelSearch( );
      			_this.cancel_source = axios.CancelToken.source( )

				_this.axios_inst.get( `${ url }?${ JSONToURL( params ) }`, { cancelToken: _this.cancel_source.token } )
					.then( function( response ){
						_this.cancel_source = null
						return response.data

					} )
					.then( legal_alias_data => { 
						let search_results = [ ];

						legal_alias_data.forEach( element => {
							search_results.push( { 
								"text": element.admkey, 
								"value": { 
									"tag": ( element.aliaslegalflag ? "Legal" : "Alias" ), 
									"admkey": element.admkey, 
									"aliaslegalflag": element.aliaslegalflag 
								}

							} );

						} )

						_this.search_results = search_results

						_this.loading = false;
					
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

			save( type = null ){
        		const _this = this,
					change_row = ObjDiffs( _this.addrinfo, _this.new_addrinfo )
				console.log( change_row )

				change_row.OBJECTID = _this.addrinfo.OBJECTID

				_this.applyEdits( { 
                    updateFeatures: [ 
                        new Graphic( { 
                            attributes: change_row 
                            
                        } )        
                    
					]

                } )

      		},

			cancel( ){
				const _this = this;
        		
				_this.$router.go( -1 )
			
			},
			
			applyEdits( params ){
                const _this = this

                // unselectFeature();
                _this.addr_layer
                    .applyEdits( params )
                    .then( ( edits_result ) => {
                        //console.log( edits_result )
						this.$router.go( -1 )

                    } )
                    .catch( ( error ) => {
                        console.log( "error = ", error )
                    } )

            }

		},

    }
</script>