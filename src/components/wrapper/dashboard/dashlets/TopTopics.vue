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
                    <td v-for="i of (topTopicsTable.headers.length + 1)">
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
import { helpers } from '@/config'

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
                    text: 'Name',
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
            .then(response => {
                const items = response.data.logs || []
                if(items && items.length > 0) {
                    this.topTopicsTable.items = items.sort((a, b) => b.count - a.count)
                    this.getTopic(this.topTopicsTable.items)
                }
            })
            .catch(error => {
                this.topTopicsTable.items = []
            })
    },
    methods: {
        isEmpty(value) {
            return helpers.isEmpty(value)
        },
        addToTopTopics() {
            console.log(this.toTopTopics)
        },
        async getTopic(items, start = 0) {
            const topics = []
            for(let i = start; i < items.length; i++) {
                const item = items[i]
                try {
                    const response = await dashboardService.getTopic(this, item.url)
                    topics.push(Object.assign(item, { topic: response.data || {}}))
                } catch (e) { }
            }
            items.splice(start, items.length, ...topics)
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
