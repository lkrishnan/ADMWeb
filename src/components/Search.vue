<template>
	<v-container>
		<!--<v-row justify="center">
			<v-col sm="8" md="6" lg="5">
				<v-card class="pa-5">
					<v-autocomplete
						v-model="st_selection"
						label="Enter a Street Name"
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
					</v-autocomplete>
				</v-card>
			</v-col>
		</v-row>--> 
	</v-container>
</template>

<script>
  	import axios from "axios";
	import GetInfoByADMKey from "../js/getInfoByADMKey"
	import JSONToURL from "../js/jsontourl"

  	export default {
      	name: "search",

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
			search_results: {
      			set( search_results ){
					//this.$store.commit( "search_results", search_results )
									
				},
      			get( ){
					return this.$store.state.search_results
      			
				}
							
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
				const _this = this;
					
				if( _this.st_selection ){
					try{
						const admkey = _this.st_selection.admkey,
							aliaslegalflag = _this.st_selection.aliaslegalflag,
							data = await GetInfoByADMKey( admkey, aliaslegalflag );
						
						if( data.length > 0 ){
							if( !data.some( block => block.countystcode.toString( ) === _this.stcode ) ){ //avoiding selecting the displayed stcode again
								_this.$store.commit( "admkey", admkey )
								_this.$store.commit( "blocks", data )

								if( data.length == 1 ){
									_this.$router.push( { name: "Detail", params: { stcode: data[ 0 ].countystcode } } )
								
								}

							}
						
						}
					
					}
					catch( error ){
						console.log( "parsing failed", error );

					}
					
				}
				
			}
      
      	},
      
      	methods: {
        	getItems( v ){
				const _this = this;

				if( v.length < 3 ){
					_this.search_results = [ ];
					_this.loading = false;
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
        
        	}
      
      	}
  
  	}
</script>