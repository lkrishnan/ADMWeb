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
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-green" v-bind="attrs" v-on="on">
						<v-icon>mdi-download-outline</v-icon>
					</v-btn>		
				</template>
				<span>Reconcile</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-green" v-bind="attrs" v-on="on">
						<v-icon>mdi-upload-outline</v-icon>
					</v-btn>		
				</template>
				<span>Post</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="orange" v-bind="attrs" v-on="on">
						<v-icon>mdi-plus-circle-outline</v-icon>
					</v-btn>		
				</template>
				<span>Add</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="orange" v-bind="attrs" v-on="on">
						<v-icon>mdi-pencil-outline</v-icon>
					</v-btn>		
				</template>
				<span>Edit</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-bind="attrs" v-on="on">
						<v-icon>mdi-login-variant</v-icon>
					</v-btn>		
				</template>
				<span>Login</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-bind="attrs" v-on="on">
						<v-icon>mdi-logout-variant</v-icon>
					</v-btn>		
				</template>
				<span>Logout</span>
			</v-tooltip>
			
		</v-app-bar>

		<v-main>
			<Information />
		</v-main>
	</v-app>
</template>

<script>
	import Information from "./components/Information.vue"
	import Search from "./components/Search.vue"
	export default {
  		name: "App",

		components: {
            Information,
			Search
		},  

  		data: () => ( {
    	//
  		} )
	
	}
</script>