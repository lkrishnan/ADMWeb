<template>
	<!--<div>
		<v-navigation-drawer absolute permanent right width="400px" class="grey lighten-4">
			<v-container>
				<v-row>
					<v-col cols="12">
						
					</v-col>
				</v-row>
			</v-container>
		</v-navigation-drawer>
		
	</div>-->
	<div id="all">
		<EsriMap />
		<v-navigation-drawer absolute permanent class="grey lighten-4">
			<v-container>
				<v-row>
					<v-col cols="12">
						
					</v-col>
				</v-row>
			</v-container>
		</v-navigation-drawer>
	</div>
</template>

<script>
    import EsriMap from "./EsriMap.vue";
    
    export default {
        name: "information",
        
		components: {
            EsriMap
        
		}  

    }
</script>

<style>
    #all {
        padding: 0;
        margin: 0;
        height: 100%;
    }

</style>