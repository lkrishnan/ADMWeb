import Information from "./components/Information.vue"
import store from "./store"
import Vue from "vue"
import VueRouter from "vue-router"

Vue.use( VueRouter )

const routes = [
  	{
    	path: "/",
    	name: "Search",
    	component: Information
  	
	}, 

	{
    	path: "/:matid",
    	name: "Detail",
    	component: Information
  	
	},   
	  
	{
		path: "/edit/:matid",
		name: "Edit",
		component: Information	
	}, 
	
	{
		path: "/login",
		name: "Login",
		component: ( ) => import( /* webpackChunkName: "login" */ "./components/Login.vue" ),
		beforeEnter( to, from, next ){
			if( store.getters[ "auth" ] === '' ){ //user not logged show the login page
				next( )
			}else{ // user logged in so show the info page //
				next( {	name: "Information" } );

			}
			
		}
	
	}	

]

const router = new VueRouter( {
  		routes

 	} )

router.beforeEach( ( to, from, next ) => {
	
	//auto login
	if( store.getters[ "auth" ] === '' && localStorage.getItem( "token" ) ){
		const item = JSON.parse( localStorage.getItem( "token" ) ), 
			now = new Date( )

		// compare the expiry time of the item with the current time
		if( now.getTime( ) > item.expiry ){
			// If the item is expired, delete the item from storage
			// and return null
			localStorage.removeItem( "token" )
			store.commit( "auth", "" )
			
		}else{
			store.commit( "auth", item.token )
			
		}

	}

	switch( to.name ){
		case "Edit": case "Add":
			if( store.getters[ "auth" ] === '' ){ //user not logged show the login page
				next( {	name: "Login" } );
			
			}else{
				next( )
			
			}

			break

		default: 
			next( )
	
	}	
	
} )

export default router