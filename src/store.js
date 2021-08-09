import axios from "axios"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import router from "./router"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

export default new Vuex.Store( {
  	state: {
		addr_fields: [ "OBJECTID", "SITEADDID", "STATUS", "STREETNAMEJURIS", 
				"ADDRNUM", "PREADDRNUM", "STREETNAME", "STANDTYPE", "STREETTYPE", "ADDRNUMSUF", "UNITTYPE", "UNITID", 
				"MUNICIPALITY", "PLACENAME", "ZIPCODE", "COUNTY", "STATE", "SPECIALTAXDIST", "FIREDISTRICT", "SPHEREOFINFLUENCE", 
				"SUBDIVISION", "LOTNO", "POINTTYPE", "MECKUSE", "MECKUSEGRP", 
				"COUNTYSTCODE", "CENTERLINEID",  
				"YCOORD", "XCOORD", "LAT", "LON", "FULLADDR", 
				"EFFECTIVEFROM", "EFFECTIVETO", "created_user", "created_date", "last_edited_user", "last_edited_date", 
				"MSAG", "MSAGMANUAL", "TAXPID" 
			],
		
		addrinfo: null,
		
		addr_layer: new FeatureLayer( { 
			id: "addr_lyr",
			url: "https://maps.mecklenburgcountync.gov/agsadaptor/rest/services/ADM/edit_layers/FeatureServer/0",
			outFields:  [ "SITEADDID", "STATUS", "STREETNAMEJURIS", 
				"ADDRNUM", "PREADDRNUM", "STREETNAME", "STANDTYPE", "STREETTYPE", "ADDRNUMSUF", "UNITTYPE", "UNITID", 
				"MUNICIPALITY", "PLACENAME", "ZIPCODE", "COUNTY", "STATE", "SPECIALTAXDIST", "FIREDISTRICT", "SPHEREOFINFLUENCE", 
				"SUBDIVISION", "LOTNO", "POINTTYPE", "MECKUSE", "MECKUSEGRP", 
				"COUNTYSTCODE", "CENTERLINEID",  
				"YCOORD", "XCOORD", "LAT", "LON", "FULLADDR", 
				"EFFECTIVEFROM", "EFFECTIVETO", "created_user", "created_date", "last_edited_user", "last_edited_date", 
				"MSAG", "MSAGMANUAL" ]
		} ),
		
		drawer: false,
		
		error_msgs: {
			login: null
		
		},
		
		field_desc: { 
			"SITEADDID": "Site Address ID",
			"STATUS": "Effective Status",
			"STREETNAMEJURIS": "Street Name and Juris",
			"ADDRNUM": "Address Number",
			"PREADDRNUM": "Street Prefix Direction",
			"STREETNAME": "Street Name",
			"STANDTYPE": "Standard Street Type",
			"STREETTYPE": "Meck Street Type",
			"ADDRNUMSUF": "Street Suffix",
			"UNITTYPE": "Address Unit Type",
			"UNITID": "Address Unit Number",
			"MUNICIPALITY": "Municipality" , 
			"PLACENAME": "Postal City", 
			"ZIPCODE": "Address Zipcode", 
			"COUNTY": "Address County", 
			"STATE": "Address State", 
			"SPECIALTAXDIST": "Special Tax District", 
			"FIREDISTRICT": "Fire District", 
			"SPHEREOFINFLUENCE": "Sphere of Influence", 
			"SUBDIVISION": "Subdivsion Name and Phase", 
			"LOTNO": "Lot No on Plat", 
			"POINTTYPE": "Location", 
			"MECKUSE": "Meck Use Code", 
			"MECKUSEGRP": "Meck Use Group", 
			"COUNTYSTCODE": "Address County Street Code", 
			"CENTERLINEID": "Centerline ID",  
			"YCOORD": "State Plane X Coordinate", 
			"XCOORD": "State Plane Y Coordinate", 
			"LAT": "Latitude", 
			"LON": "Longitude", 
			"FULLADDR": "Full Address" , 
			"EFFECTIVEFROM": "Effective From Date", 
			"EFFECTIVETO": "Effective To Date", 
			"created_user": "Added By", 
			"created_date": "Added Date", 
			"last_edited_user": "Modified By", 
			"last_edited_date": "Modified Date", 
			"MSAG": "MSAG Community", 
			"MSAGMANUAL": "MSAG Community Manual", 
			"TAXPID": "Tax Parcel ID"
		},
		
		new_addrinfo: null,
		
		oid: null,
		
		progress: {
			login: 0
		
		},

		refresh_detail: false,
		
		search_results: [ ],
		
		sel_feature: null,
		
		token: "",
		
		ws: {
			adm: "https://maps.mecklenburgcountync.gov/api/adm/",
			gis: "https://maps.mecklenburgcountync.gov/api/gis/",
			tax: "https://maps.mecklenburgcountync.gov/api/tax/"
	  	},

		zoom_to_feature: true

	},
	
	getters: {
		addrinfo : state => state.addrinfo,
		addr_layer : state => state.addr_layer,
		auth: state => state.token,
		drawer: state => state.drawer,
		error_msgs: state => state.error_msgs,
		field_desc: state => state.field_desc,
		new_stinfo: state => state.new_stinfo,
		oid: state => state.oid,
		progress: state => state.progress,
		refresh_detail: state => state.refresh_detail,
		search_results: state => state.search_results,
		sel_feature: state => state.sel_feature,
		ws: state => state.ws,
		zoom_to_feature: state => state.zoom_to_feature
	
	},

  	mutations: {
		addrinfo( state, payload ){
			state.addrinfo = payload
		
		},
		addr_layer( state, payload ){
			state.addr_layer = payload
		
		},
		auth( state, token ){
			state.token = token
		
		},
		drawer( state, payload ){
			state.drawer = payload
		
		},
		error_msgs( state, payload ){
			for( let key in payload ){
				state.error_msgs[ key ] = payload[ key ]
			
			}
		
		},
		field_desc( state, payload ){
			state.field_desc = payload
		
		},
		new_addrinfo( state, payload ){
			state.new_addrinfo = payload
		
		},
		oid( state, payload ){
			state.oid = payload
		
		},
		progress( state, payload ){
			for( let key in payload ){
				state.progress[ key ] = payload[ key ]
			
			}
		
		},
		refresh_detail( state, payload ){
			state.refresh_detail = payload

		},
		search_results( state, payload ){
			state.search_results = payload

		},
		sel_feature( state, payload ){
			state.sel_feature = payload
		
		},
		zoom_to_feature( state, payload ){
			state.zoom_to_feature = payload
		
		}
		
	},

  	actions: {
		async login( { commit }, login_data ){
			let reply = ( await axios.post( "https://maps.mecklenburgcountync.gov/auth/v1/login", login_data ) ).data;
			
			if( reply.result === "success" ){
				if( reply.hasOwnProperty( "token") ){
					const now = new Date( ),
						item = {
							token: reply.token,
							expiry: now.getTime( ) + ( 4320000000 ) //expires in 12 hours
						};
				
					localStorage.setItem( "token", JSON.stringify( item ) )
					console.log( "here" ) 
					commit( "auth", reply.token )
					commit( "error_msgs", { login: null } )

				}else{
					commit( "error_msgs", { login: "Unable to login, try again." } )
					commit( "auth", "" )

				}
							
			}else if( reply.result === "failure" ){
				console.log( reply.error)
				commit( "error_msgs", { login: reply.error })
				commit( "auth", "" )

			}

			commit( "progress", { login: 0 } )
		
		},

		async reconcile( { commit }, reconcile_data ){
			let reconcile_instance = axios.create( {
					headers: ( this.state.token.length > 0 ? { "Authorization": this.state.token } : { } )
				} ),
				reply = ( await reconcile_instance.post( "https://maps.mecklenburgcountync.gov/auth/v1/reconcile", reconcile_data ) ).data
		
			if( reply.result === "success" ){
				//router.replace( { name: "Detail", params: { stcode: reply.stcode } } )
				console.log( "success" )
				
			}else if( reply.result === "failure" ){
				console.log( reply.error)

			}

		}

  	}

} )