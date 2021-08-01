<template>
  	<v-container>
    	<v-form v-model="valid" ref="form" v-if="new_addrinfo">
			<v-row>
				<v-col cols="12">
					<v-card class="my-5 pa-5">
						<v-card-title>{{ title }}</v-card-title>
						<v-row>
							<v-col cols="12">
								<v-data-table 
									:headers="headers" 
									:items="new_addrinfo" 
									:items-per-page="1"
									hide-default-footer>
									<!--<v-autocomplete
										v-model="item.STREETNAMEJURIS"
										label="Enter StreetNameJuris"
										:loading="loading"
										:items="search_results"
										:search-input.sync="searchInput"
										clearable
										Event
										@click:clear="clearResults">
										<template slot="selection" slot-scope="data">
											<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
										</template>
										<template slot="item" slot-scope="data">
											<v-chip class="mr-2" color="primary" outlined label>{{ data.item.value.tag }}</v-chip>{{ data.item.text }}
										</template>
									</v-autocomplete>-->
									<template v-slot:item.STATUS="{item}">
										<v-select
											v-model="item.STATUS"
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
									</template>
								</v-data-table> 
							</v-col>
            			</v-row>
						<v-row>
              				<v-col cols="12">
                				<v-data-table 
									:headers="headers2" 
									:items="new_addrinfo" 
									:items-per-page="1" 
									hide-default-footer>
									
                				</v-data-table>
              				</v-col>
            			</v-row>
            		</v-card>
				</v-col>
			</v-row>
			<v-row>
        		<v-col cols="12">
          			<v-alert
						dense
						outlined
						type="error"
						v-if="nochanges">
						No edits were detected. Make some changes before saving or hit <strong>Cancel</strong> to exit edit mode.
					</v-alert>
					<v-btn 
						class="ma-2" 
						color="primary" 
						x-large
						@click="save( )">
						<v-icon left>mdi-content-save</v-icon>Save
					</v-btn>
					<v-btn 
						class="ma-2" 
						color="primary" 
						x-large
						@click="cancel( )">
						<v-icon left>mdi-arrow-left-circle</v-icon>Cancel
					</v-btn>
        		</v-col>
      		</v-row>
      	</v-form>
  	</v-container>
</template>

<script>
  	import GetInfoByADMKey from "../js/getInfoByADMKey"
	import ObjDiffs from "../js/objdiffs"
	import ObjToUppercase from "../js/objtouppercase"
  	
  	export default {
    	name: "edit",
    	
		data: ( ) => ( {
			loading: false,
			searchInput: null,
			st_selection: null,
      		headers: [
				{ text: "Street Name Juris", value: "STREETNAMEJURIS", sortable: false },
				{ text: "Status", value: "STATUS", sortable: false }
			
			],

			headers2: [
				{ text: "Dir", value: "PREADDRNUM", sortable: false },
				{ text: "Street Name", value: "STREETNAME", sortable: false },
				{ text: "Street Type", value: "STREETTYPE", sortable: false },
				{ text: "Street Suffix", value: "ADDRNUMSUF", sortable: false },
				{ text: "Jurisdiction", value: "MUNICIPALITY", sortable: false }
			
			],
			
			headers3: [
				{ text: "Directions to Street", value: "directions", sortable: false },
				{ text: "Comments", value: "comments", sortable: false },
				{ text: "Reason for Name Change", value: "reason", sortable: false }
			
			],
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
			stname_rules: [
				v => !!v || 'Street Name is required'
			
			],
			municipality_rules: [
				v => !!v || 'Municipality is required'
			
			],
			citystcode_rules: [
				v => !!v || 'City Code is required'
			
			],
			nochanges: false,
			stcode: null

    	} ),

    	computed: {
			addrinfo: {
      			set( addrinfo ){
					this.$store.commit( "addrinfo", addrinfo )
									
				},
      			get( ){
					return this.$store.state.addrinfo
      			
				}
							
			},
			
			new_addrinfo: {
      			set( new_addrinfo ){
					this.$store.commit( "new_addrinfo", new_addrinfo )
									
				},
      			get( ){
					return this.$store.state.new_addrinfo
      			
				}
							
			},

			route_name( ){
				return this.$route.name;

			},
			
			search_results: {
      			set( search_results ){
					this.$store.commit( "search_results", search_results )
									
				},
      			get( ){
					return this.$store.state.search_results
      			
				}
							
			},
			
			title( ){
				return this.$route.meta.title
			
			}

    	},

		watch: {
        	searchInput( val ){
				val && val !== this.st_selection && this.getItems( val )

        	},
        	async st_selection( new_selection, old_selection ){
				const _this = this;
					
				if( _this.st_selection ){
					try{
						const admkey = _this.st_selection.admkey,
							aliaslegalflag = _this.st_selection.aliaslegalflag,
							data = await GetInfoByADMKey( admkey, aliaslegalflag );
						
						
					
					}
					catch( error ){
						console.log( "parsing failed", error );

					}
					
				}
				
			}
      
      	},

		methods: {
			save( type = null ){
        		const _this = this;

				if( _this.$refs.form.validate( ) ){
					switch( _this.route_name ){
						case "Edit":
							_this.edit( type )
						break

						case "Add":							
							_this.add( )
						break

					}
				
				}

      		},

			edit( type ){
        		const _this = this,
					change_row = ObjDiffs( _this.addrinfo[ 0 ], _this.new_addrinfo[ 0 ] )
				
				if( Object.keys( change_row ).length > 0 ){
          			_this.nochanges = false;

					let update_row = { }

					console.log( this.new_addrinfo[ 0 ] )

					update_row = { ...change_row };

					console.log( update_row )

					/*if( Object.keys( update_row ).length > 0 ){
						dispatch_data.update = {
								filter: _this.new_stinfo[ 0 ].objectid, 
								data: JSON.stringify( ObjToUppercase( update_row ) ) 
							}
					}
					
					//update the specific row
					this.$store.dispatch( "update", dispatch_data );*/
					
        		}else{
          			_this.nochanges = true;

        		}

      		},

			cancelSearch( ){
				const _this = this

      			if( _this.cancel_source ){
        			_this.cancel_source.cancel( )

      			}
    		},
			
			clearResults( ){
				this.search_results = [ ];
        
        	}

		}

  	}
</script>