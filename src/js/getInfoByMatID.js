import store from "../store"

export default async function infoByMatID( matid ){
    try{
        const addr_layer = store.getters[ "addr_layer" ],
            addr_fields = store.getters[ "addr_fields" ];
                        
        let results = await addr_layer.queryFeatures( {
            where: "SITEADDID = '" + matid + "'",
            outFields: addr_fields,
            returnGeometry: true
        } )

        if( results.features.length > 0 ){
            console.log( results.features)
            return results.features[ 0 ] 
        
        }
        else{
            return null

        }
        
    }
    catch( err ){
        return null

    }
    
}