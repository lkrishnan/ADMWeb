<template>
	<v-card
        class="rounded-0"
        :loading="loading"
        v-model="addrinfo"
        v-if="addrinfo && route_name === 'Detail'"
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
                v-for="item in addrinfo.attributes"
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
    export default {
        name: "detail",
        
		computed: {
			addrinfo( ){
                return this.$store.state.addrinfo

            },

			matid( ){
            	return this.$route.params.matid; 
          	
			
			},

            new_addrinfo( ){
                return this.$store.state.new_addrinfo

            },

            route_name( ){
				return this.$route.name; 
			
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

				loading: false
      		
			}
    	
		},

		methods: {
			takeAction( route_name ){
				const _this = this

				switch( route_name ){
					case "Edit":
                        this.$router.push( { name: route_name, params: { matid: _this.new_addrinfo.SITEADDID } } )
						break;
				
				}
      		
			}

		}

    }
</script>