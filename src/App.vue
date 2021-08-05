<template>
	<v-app>
		<v-app-bar app flat color="teal">
			<v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawerChng( )"></v-app-bar-nav-icon>
			<v-avatar class="d-flex">
				<v-img max-height="48" max-width="48" src="img/icons/48x48.png"></v-img>
			</v-avatar>
			<Search />
			
			<!--Buttons for big screen -->
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-green" v-bind="attrs" v-on="on" @click="takeAction( 'Reconcile' )">
						<v-icon>mdi-download-outline</v-icon>
					</v-btn>		
				</template>
				<span>Reconcile</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-green" v-bind="attrs" v-on="on" @click="takeAction( 'Post' )">
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

			<!--<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-bind="attrs" v-on="on" v-if="( auth === '' )" @click="takeAction( 'Login' )">
						<v-icon>mdi-login-variant</v-icon>
					</v-btn>		
				</template>
				<span>Login</span>
			</v-tooltip>

			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">				
					<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-bind="attrs" v-on="on" v-if="( auth !== '' )" @click="takeAction( 'Logout' )">
						<v-icon>mdi-logout-variant</v-icon>
					</v-btn>		
				</template>
				<span>Logout</span>
			</v-tooltip>-->

			<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-if="( auth === '' )" @click="takeAction( 'Login' )">
				<v-icon left>mdi-login-variant</v-icon>Login
			</v-btn>
			<v-btn class="ma-2 d-none d-sm-flex" color="light-blue" v-if="( auth !== '' )" @click="takeAction( 'Logout' )">
				<v-icon left>mdi-logout-variant</v-icon>Logout
			</v-btn>
			
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
	import Search from "./components/Search.vue";
	
	export default {
  		name: "App",

		components: {
            Search
        
		},  

		computed: {
        	auth( ){
          		return this.$store.state.token
        	},
			
			drawer: {
				set( drawer ){
					this.$store.commit( "drawer", drawer )
									
				},
      			get( ){
					return this.$store.state.drawer
      			
				}
							
			},
			
			new_addrinfo( ){
          		return this.$store.state.new_stinfo
        	},
			
			addrinfo( ){
          		return this.$store.state.stinfo
        	},
			
			route_name( ){
				return this.$route.name; 
			}
      
      	},

		methods: {
			drawerChng( ){
				const _this = this

				console.log( "drawer change" )

				_this.drawer_flag = true
				_this.drawer = !_this.drawer
				
			},

			takeAction( type ){
				const _this = this

				switch( type ){
					case "Reconcile":
						_this.$store.dispatch( "reconcile", { task: "reconcile" } )
						break

					case "Post":
						_this.$store.dispatch( "reconcile", { task: "post" } )
						break

					case "Login":
						_this.$router.push( { name: type } )
						break

					case "Logout":
						localStorage.removeItem( "token" )
          				_this.$store.commit( "auth", "" )
						//_this.$router.push( { name: "Information" } )
						break

				}

			}

		}
	
	}
</script>