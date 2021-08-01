<template>
	<!--<div>
		<v-navigation-drawer absolute permanent right width="400px" class="grey lighten-4">
			<v-container>
				<v-row>
					<v-col cols="12">
						
					</v-col>
				</v-row>
			</v-container>
		</v-navigation-drawer>
		
	</div>-->
	<div id="all">
		<v-navigation-drawer 
			v-model="drawer" 
			absolute 
			:permanent="$vuetify.breakpoint.mdAndUp" 
			stateless 
			left 
			width="400px" 
			class="teal lighten-5">
				<v-card
					class="rounded-0"
    				:loading="loading"
					v-model="addrinfo"
					v-if="addrinfo"
				>
					<template slot="progress">
						<v-progress-linear
							color="deep-purple"
							height="10"
							indeterminate
						></v-progress-linear>
					</template>

    				<v-img
      					height="250"
      					:src="addrinfo.photo"
    				></v-img>

    				<v-card-title>{{ addrinfo.title }}</v-card-title>

    				<v-divider class="mx-4"></v-divider>

					<v-card-actions class="ma-2">
						<v-btn
							color="teal"
							fab
							outlined
							small
						>
							<v-icon>mdi-pencil</v-icon>
						</v-btn>
					</v-card-actions>

					<v-divider class="mx-4"></v-divider>

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
							<tr
							v-for="item in addrinfo.attributes"
							:key="item.field"
							>
							<td>{{ item.desc }}</td>
							<td>{{ item.value }}</td>
							</tr>
						</tbody>
						</template>
					</v-simple-table>

    				<!--<v-card-title>Tonight's availability</v-card-title>

    				<v-card-text>
						<v-chip-group
							v-model="selection"
							active-class="deep-purple accent-4 white--text"
							column
						>
        					<v-chip>5:30PM</v-chip>
					        <v-chip>7:30PM</v-chip>
					        <v-chip>8:00PM</v-chip>
					        <v-chip>9:00PM</v-chip>
      					</v-chip-group>
    				</v-card-text>

					<v-card-actions>
					<v-btn
						color="deep-purple lighten-2"
						text
						@click="reserve"
					>
						Reserve
					</v-btn>
					</v-card-actions>-->
  				
				</v-card>
				<!--<v-list-item class="px-2">
					<v-btn icon @click.stop="mini = !mini">
						<v-icon v-if="mini">mdi-chevron-left</v-icon>
						<v-icon v-if="!mini">mdi-chevron-right</v-icon>
					</v-btn>
				</v-list-item>
				<v-divider></v-divider>
				<v-container>  
					<v-row>
						<v-col cols="12">
							
						</v-col>
					</v-row>
				</v-container>-->
		</v-navigation-drawer>
		<EsriMap />
		
	</div>
</template>

<script>
    import EsriMap from "./EsriMap.vue";
    
    export default {
        name: "information",
        
		components: {
            EsriMap
        
		},  

		computed: {
			addrinfo( ){
                return this.$store.state.addrinfo

            },

			drawer: {
				set( drawer ){
					this.$store.commit( "drawer", drawer )
									
				},
      			get( ){
					return this.$store.state.drawer
      			
				}
							
			},

			matid( ){
            	return this.$route.params.matid; 
          	
			
			}

    	},

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

        		mini: true
      		
			}
    	
		},

		/*beforeDestroy( ){
      		const _this = this
			
			if( typeof window === "undefined" ) 
			  	return
      		
			window.removeEventListener( "resize", _this.onResize, { passive: true } )

    	},

    	mounted( ){
			const _this = this
      		
			_this.onResize( )

      		window.addEventListener( "resize", _this.onResize, { passive: true } )
    	
		},*/

		methods: {
			//onResize( ){
				//const _this = this

				//if( [ "lg", "xl" ].includes(  _this.$vuetify.breakpoint.name ) ){
					//if( !_this.drawer ){
	//					_this.drawer = true

					//}
	//				console.log( _this.drawer )

	//			}else{
					/*if( _this.drawer ){
						_this.drawer = false

					}*/
					//console.log( _this.drawer )

				//}

				//console.log( "resize" )

				//_this.$store.commit( "drawer",  ? true : false ) )
				      		
			//}

			/*getShow( ){
                const _this = this

				let show = true

				return ( [ "xl" ].includes(  _this.$vuetify.breakpoint.name ) ? true : false )

            }*/

		}

    }
</script>

<style>
    #all {
        padding: 0;
        margin: 0;
        height: 100%;
    }

	.v-navigation-drawer__border {
		/*background-color: #009688 !important;*/
		width: 0px !important;
	}	

</style>