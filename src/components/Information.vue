<template>
	<div id="all">
		<v-navigation-drawer 
			v-model="drawer" 
			absolute 
			:permanent="$vuetify.breakpoint.mdAndUp" 
			stateless 
			left 
			width="400px" 
			class="teal lighten-5">
				<Detail />
				<Edit />
		</v-navigation-drawer>
		<EsriMap />
		
	</div>
</template>

<script>
	import Detail from "./Detail.vue"
	import Edit from "./Edit.vue"
    import EsriMap from "./EsriMap.vue"
    
    export default {
        name: "information",
        
		components: {
            Detail,
			Edit,
        	EsriMap

		},  

		computed: {
			drawer: {
				set( drawer ){
					this.$store.commit( "drawer", drawer )
									
				},
      			get( ){
					return this.$store.state.drawer
      			
				}
							
			}

    	}

    }
</script>

<style>
    #all {
        padding: 0;
        margin: 0;
        height: 100%;
    }

	.v-navigation-drawer__border {
		/*background-color: #009688 !important;*/
		width: 0px !important;
	}	

</style>