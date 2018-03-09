<template>
    <v-card v-if="topTopicsTable.items">
        <p class="text-lg-right ma-0 pa-2">
            <v-btn color="success" :disabled="toTopTopics.length <= 0" @click="addToTopTopics()">Add to top topics</v-btn>
        </p>
        <v-data-table
            v-model="topTopicsTable.selected"
            :headers="topTopicsTable.headers"
            :items="topTopicsTable.items"
            hide-actions
            item-key="url"
            select-all>
            <template slot="items" slot-scope="props">
                <tr v-if="props.item.topic">
                    <td>
                        <v-checkbox
                            primary
                            hide-details
                            v-model="props.selected">
                        </v-checkbox>
                    </td>
                    <td>{{ props.index + 1 }}</td>
                    <td>{{ props.item.topic.displayName }}</td>
                    <td>{{ props.item.count }}</td>
                </tr>
                <tr v-else>
                    <td v-for="i in 4">
                        <content-placeholders>
                            <content-placeholders-text :lines="1" />
                        </content-placeholders>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
    <v-card v-else class="px-3 pt-3 pb-2">
        <content-placeholders>
            <content-placeholders-text :lines="10" />
        </content-placeholders>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import dashboardService from '../dashboard.service'
import helpers from '../../../../helpers'

export default {
    name: 'top-topics',
    data() {
        return {
            topTopicsTable: {
                selected: [],
                headers: [{
                    text: '#',
                    sortable: false,
                    width: '10%'
                }, {
                    text: 'Topic Name',
                    sortable: false,
                    value: 'name',
                    width: '70%'
                }, {
                    text: 'Count',
                    sortable: false,
                    value: 'count',
                    width: '20%'
                }],
                items: null
            }
        }
    },
    mounted() {
        dashboardService.getTopTopics(this)
            .then(async (response) => {
                this.topTopicsTable.items = response.data.logs || []
                if(this.topTopicsTable.items && this.topTopicsTable.items.length > 0) {
                    this.topTopicsTable.items = this.topTopicsTable.items.sort((a, b) => b.count - a.count)
                    for(let i = 0; i < this.topTopicsTable.items.length; i++) {
                        const topic = this.topTopicsTable.items[i]
                        try {
                            const response = await dashboardService.getTopic(this, topic.url)
                            this.$set(topic, 'topic', response.data || {})
                        } catch (e) {
                            this.topTopicsTable.items.splice(i, 1)
                            i--
                        }
                    }
                }
            })
            .catch(error => console.log(error))
    },
    methods: {
        isEmpty(value) {
            return helpers.isEmpty(value)
        },
        addToTopTopics() {
            console.log(this.toTopTopics)
        }
    },
    computed: {
        toTopTopics() {
            return this.topTopicsTable.selected.map(element => element.url)
        }
    }
}
</script>

<style>
</style>
