import axios from "axios"
import FormatDate from "./formatDate"
import JSONToURL from "./jsontourl"
import store from "../store"

export default async function formatAddrInfo( addr_row ){
	const axios_inst = axios.create( { 
			headers: { 
				"Cache-Control": "max-age=0, no-cache, no-store",
				"Pragma": "no-cache"  
			}
	  	} ),
        date_fields = [ "EFFECTIVEFROM", "EFFECTIVETO", "created_date", "last_edited_date" ],
        field_desc = { 
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
        formatTheDate = ( input_date ) => {
            return FormatDate( new Date( input_date ), "MM/DD/YYYY" ) + " " + new Date( input_date ).toLocaleTimeString( );
          
        },
	  	ws_url = store.getters[ "ws" ].tax + "v1/query/tb_property_photo",
		getParams = ( taxpid ) => {
			return {
                filter: "taxpid = '" + taxpid + "'"
			  }
		
        },
        prop_photo  = await axios_inst.get( `${ ws_url }?${ JSONToURL( getParams( addr_row.TAXPID ) ) }` ),
        formatInfo = ( addr_row ) => {
            let attributes = [ ]
					
            for( const field in addr_row ){
                if( field in field_desc ){
                    attributes.push( { 
                        field: field, 
                        desc: field_desc[ field ], 
                        value: ( date_fields.includes( field ) ? formatTheDate( addr_row[ field ] ) : addr_row[ field ] ) 
                    
                    } )
                
                } 
                                        
            }

            return attributes

        } 
 
	return {
        title: addr_row.FULLADDR,
        photo: ( prop_photo.data.length > 0 ? prop_photo.data[ 0 ].image_path : "./assets/no-property-image.gif" ),
        attributes: formatInfo( addr_row )
    
    }

}