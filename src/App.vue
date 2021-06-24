<template>
	<v-app>
		<v-app-bar app color="white">
			<v-toolbar-title class="headline">
				<div class="d-none d-sm-flex font-weight-bold">
					ADM Web
				</div>
				<v-avatar class="d-flex d-sm-none">
					<v-img max-height="48" max-width="48" src="img/icons/48x48.png"></v-img>
				</v-avatar>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!--Buttons for big screen -->
			<v-btn class="ma-2 d-none d-sm-flex font-weight-medium" outlined>
				<v-icon left>mdi-plus-circle</v-icon>Add New Legal
			</v-btn>
			<v-btn class="ma-2 d-none d-sm-flex font-weight-medium" outlined>
				<v-icon left>mdi-login-variant</v-icon>Login
			</v-btn>
			<v-btn class="ma-2 d-none d-sm-flex font-weight-medium" outlined>
				<v-icon left>mdi-logout-variant</v-icon>Logout
			</v-btn>
		</v-app-bar>

		<v-main>
			<v-navigation-drawer absolute permanent right width="400px" class="grey lighten-4">
				<v-container>
    				<v-row>
      					<v-col cols="12">
        					
      					</v-col>
    				</v-row>
  				</v-container>
			</v-navigation-drawer>
			<EsriMap />
		</v-main>
	</v-app>
</template>

<script>
	import EsriMap from "./components/EsriMap.vue"
	import Search from "./components/Search.vue"
	export default {
  		name: "App",

		components: {
            EsriMap,
			Search
		},  

  		data: () => ( {
    	//
  		} )
	
	}
</script>