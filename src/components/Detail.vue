<template>
	<v-card
        class="rounded-0"
        :loading="loading"
        v-model="addrinfo"
        v-if="formated_addrinfo && route_name === 'Detail'"
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
            :src="formated_addrinfo.photo"
        ></v-img>

        <v-card-title>{{ formated_addrinfo.title }}</v-card-title>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions class="ma-2">
            <v-btn
                color="teal"
                fab
                outlined
                small
                @click="takeAction( 'Edit' )"
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
                v-for="item in formated_addrinfo.attributes"
                :key="item.field"
                >
                <td>{{ item.desc }}</td>
                <td>{{ item.value }}</td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>

    </v-card>

</template>

<script>
    import FormatAddrInfo from "../js/formatAddrInfo"
    
    export default {
        name: "detail",
        
        mounted: function( ){
      		this.searchByMatID( )

    	},

		data( ){
      		return {
                formated_addrinfo: null,
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
				loading: false
      		
			}
    	
		},

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

			matid( ){
            	return this.$route.params.matid; 
          	
			
			},

            new_addrinfo( ){
                return this.$store.state.new_addrinfo

            },

            route_name( ){
				return this.$route.name; 
			
            },

            sel_feature: {
      			set( sel_feature ){
					this.$store.commit( "sel_feature", sel_feature )
									
				},
      			get( ){
					return this.$store.state.sel_feature
      			
				}
							
			}

    	},

        watch: {
            matid: async function( ){
                const _this = this
                
                _this.searchByMatID( )
                /*,
                    feature = await getInfoByMatID( _this.matid )

                if( feature ){
                    console.log( feature.attributes )
                    //set selected feature to hightlight the point on the map
					_this.sel_feature = {
						feature: feature,
						zoom: _this.zoom

					}

                    //set the addrinfo to display addr infomration
				    _this.addrinfo = await FormatAddrInfo( feature.attributes )

                }*/

            }  
        
        },

		methods: {
			takeAction( route_name ){
				const _this = this

				switch( route_name ){
					case "Edit":
                        //set edit addr information
						var { created_user, created_date, last_edited_user, last_edited_date, last_edited_agency, ...temp } = _this.addrinfo
						this.$store.commit( "new_addrinfo", { ...temp } );
                        this.$router.push( { name: route_name, params: { matid: _this.new_addrinfo.SITEADDID } } )
						break;
				
				}
      		
			},

            searchByMatID( ){
				const _this = this,
					regex = new RegExp( "\\d{1,6}" );

				if( regex.test( _this.matid ) ){
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
                            _this.addrinfo = feature.attributes
                            this.formated_addrinfo = await FormatAddrInfo( feature.attributes )
                            
                        }

                    } )
                    .catch( thrown => {
                        console.log( "parsing failed", thrown );
                        
                    } )
                    
                }

			}

		}

    }
</script>