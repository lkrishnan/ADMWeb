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

        <v-img
            height="250"
            :src="addrinfo.photo"
        ></v-img>

        <v-card-title>{{ addrinfo.title }}</v-card-title>

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
						<td>Street Name and Juris</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address Number</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Street Prefix Direction</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Street Name</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Street Name</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Street Name</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Standard Street Type</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Meck Street Type</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address Unit Type</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address Unit Number</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Municipality</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
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
					<tr>
						<td>Tax Parcel ID</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Sphere of Influence</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Postal City</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address Zipcode</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address County</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
						</td>
					</tr>
					<tr>
						<td>Address State</td>
						<td>
							{{ new_addrinfo.SITEADDID }}
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
			stname_rules: [
				v => !!v || 'Street Name is required'
			
			],
			municipality_rules: [
				v => !!v || 'Municipality is required'
			
			],
			citystcode_rules: [
				v => !!v || 'City Code is required'
			
			]
      		
			}
    	
		},

		methods: {
			save( type = null ){
        		const _this = this

      		},

			 cancel( ){
				const _this = this;
        		
				_this.$router.go( -1 )
			
			} 

		}

    }
</script>